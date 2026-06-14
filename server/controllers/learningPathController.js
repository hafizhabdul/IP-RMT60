const { LearningPath, Module, LessonStep, UserEnrollment, UserModuleProgress, UserStepProgress, User, QuizQuestion, Certificate, sequelize } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');

// Recompute a user's module progress from their step records.
// Replicated from progressController (those helpers are internal/not exported)
// so gradeQuiz can keep module + path progress consistent after a passed assessment.
async function recomputeModuleProgress(userId, moduleId, transaction) {
  const totalSteps = await LessonStep.count({ where: { ModuleId: moduleId }, transaction });
  if (totalSteps === 0) return null;

  const doneSteps = await UserStepProgress.count({
    where: { UserId: userId, status: 'done' },
    include: [{ model: LessonStep, as: 'lessonStep', where: { ModuleId: moduleId }, required: true }],
    transaction
  });

  const completionPercent = Math.round((doneSteps / totalSteps) * 100);
  const status = completionPercent >= 100 ? 'done' : completionPercent > 0 ? 'in_progress' : 'not_started';

  const [moduleProgress] = await UserModuleProgress.findOrCreate({
    where: { UserId: userId, ModuleId: moduleId },
    defaults: {
      UserId: userId,
      ModuleId: moduleId,
      status,
      completionPercent,
      startedAt: new Date()
    },
    transaction
  });

  await moduleProgress.update({
    status,
    completionPercent,
    completedAt: status === 'done' ? new Date() : null
  }, { transaction });

  return moduleProgress;
}

async function recomputePathProgress(userId, pathId, transaction) {
  const totalModules = await Module.count({ where: { LearningPathId: pathId }, transaction });
  if (totalModules === 0) return null;

  const doneModules = await UserModuleProgress.count({
    where: { UserId: userId, status: 'done' },
    include: [{ model: Module, as: 'module', where: { LearningPathId: pathId }, required: true }],
    transaction
  });

  const completionPercent = Math.round((doneModules / totalModules) * 100);
  const enrollment = await UserEnrollment.findOne({
    where: { UserId: userId, LearningPathId: pathId },
    transaction
  });

  if (enrollment) {
    await enrollment.update({
      completionPercent,
      status: completionPercent >= 100 ? 'completed' : 'active',
      completedAt: completionPercent >= 100 ? new Date() : null
    }, { transaction });
  }
  return enrollment;
}

async function computePathProgressFromSteps(userId, pathId) {
  // Count total steps across all modules in this path
  const totalSteps = await LessonStep.count({
    include: [{ model: Module, as: 'module', where: { LearningPathId: pathId }, required: true, attributes: [] }]
  });
  if (totalSteps === 0) return { percent: 0, doneSteps: 0, totalSteps: 0 };

  const doneSteps = await UserStepProgress.count({
    where: { UserId: userId, status: 'done' },
    include: [{
      model: LessonStep,
      as: 'lessonStep',
      required: true,
      attributes: [],
      include: [{ model: Module, as: 'module', where: { LearningPathId: pathId }, required: true, attributes: [] }]
    }]
  });

  return {
    percent: Math.round((doneSteps / totalSteps) * 100),
    doneSteps,
    totalSteps
  };
}

const METHOD_GRADIENTS = {
  UT: ['#0EA5E9', '#06B6D4'],
  MT: ['#8B5CF6', '#A855F7'],
  PT: ['#EA580C', '#F59E0B'],
  RT: ['#10B981', '#059669'],
  VT: ['#F43F5E', '#E11D48'],
  ET: ['#475569', '#334155']
};

class LearningPathController {
  static async list(req, res, next) {
    try {
      const userId = req.user?.id;

      const paths = await LearningPath.findAll({
        where: { isPublished: true },
        order: [['orderIndex', 'ASC']],
        include: [
          {
            model: LearningPath,
            as: 'prerequisite',
            attributes: ['id', 'code', 'title']
          }
        ]
      });

      let enrollmentsMap = {};
      let pathProgressMap = {};
      if (userId) {
        const enrollments = await UserEnrollment.findAll({
          where: { UserId: userId }
        });
        enrollments.forEach((e) => {
          enrollmentsMap[e.LearningPathId] = e.toJSON();
        });

        // Recompute true progress from step records (covers cases where enrollment.completionPercent is stale or user has progress without formal enrollment)
        await Promise.all(paths.map(async (p) => {
          pathProgressMap[p.id] = await computePathProgressFromSteps(userId, p.id);
        }));
      }

      const result = paths.map((p) => {
        const json = p.toJSON();
        const enrollment = enrollmentsMap[p.id] || null;
        const progress = pathProgressMap[p.id] || { percent: 0, doneSteps: 0, totalSteps: 0 };
        // True progress: prefer computed (live count) over stored enrollment.completionPercent
        const livePercent = progress.percent;
        const hasProgress = progress.doneSteps > 0;
        const isEnrolled = !!enrollment || hasProgress;

        return {
          id: json.id,
          code: json.code,
          method: json.method,
          level: json.level,
          title: json.title,
          description: json.description,
          totalModules: json.totalModules,
          estHours: json.estHours,
          orderIndex: json.orderIndex,
          gradient: METHOD_GRADIENTS[json.method] || ['#64748B', '#475569'],
          prerequisite: json.prerequisite,
          enrollment: enrollment ? {
            id: enrollment.id,
            status: enrollment.status,
            completionPercent: livePercent,
            currentModuleId: enrollment.currentModuleId,
            currentStepId: enrollment.currentStepId,
            enrolledAt: enrollment.enrolledAt
          } : (hasProgress ? {
            id: null,
            status: 'active',
            completionPercent: livePercent,
            currentModuleId: null,
            currentStepId: null,
            enrolledAt: null
          } : null),
          isEnrolled,
          progressPercent: livePercent,
          stepsDone: progress.doneSteps,
          stepsTotal: progress.totalSteps
        };
      });

      res.status(200).json({ success: true, paths: result });
    } catch (err) {
      next(err);
    }
  }

  static async detail(req, res, next) {
    try {
      const { code } = req.params;
      const userId = req.user?.id;

      const path = await LearningPath.findOne({
        where: { code },
        include: [
          {
            model: Module,
            as: 'modules',
            order: [['orderIndex', 'ASC']],
            include: [{
              model: LessonStep,
              as: 'steps',
              // Lightweight structure only — step content (contentJson) and quiz
              // questions are loaded lazily per-module via getModule(), so the
              // path-detail roadmap/sidebar never ships the whole path's reading
              // content + question banks (that made detail() take 7-17s).
              attributes: ['id', 'orderIndex', 'kind', 'title', 'durationSeconds'],
              order: [['orderIndex', 'ASC']]
            }]
          },
          {
            model: User,
            as: 'instructor',
            attributes: ['id', 'username', 'email']
          },
          {
            model: LearningPath,
            as: 'prerequisite',
            attributes: ['id', 'code', 'title']
          }
        ]
      });

      if (!path) {
        throw { name: 'NotFound', message: `Learning path ${code} not found` };
      }

      // Sort modules and their steps
      const json = path.toJSON();
      json.modules = (json.modules || []).sort((a, b) => a.orderIndex - b.orderIndex)
        .map((m) => ({
          ...m,
          steps: (m.steps || []).sort((a, b) => a.orderIndex - b.orderIndex)
        }));

      // Attach user-specific data
      let enrollment = null;
      let moduleProgressMap = {};
      let stepProgressMap = {};

      if (userId) {
        enrollment = await UserEnrollment.findOne({
          where: { UserId: userId, LearningPathId: path.id }
        });

        const moduleIds = json.modules.map((m) => m.id);
        const moduleProgresses = await UserModuleProgress.findAll({
          where: { UserId: userId, ModuleId: { [Op.in]: moduleIds } }
        });
        moduleProgresses.forEach((mp) => { moduleProgressMap[mp.ModuleId] = mp.toJSON(); });

        const stepIds = json.modules.flatMap((m) => (m.steps || []).map((s) => s.id));
        if (stepIds.length > 0) {
          const stepProgresses = await UserStepProgress.findAll({
            where: { UserId: userId, LessonStepId: { [Op.in]: stepIds } }
          });
          stepProgresses.forEach((sp) => { stepProgressMap[sp.LessonStepId] = sp.toJSON(); });
        }
      }

      // Compute module status with locking based on previous module completion
      let prevModuleDone = true;
      json.modules = json.modules.map((m, idx) => {
        const mp = moduleProgressMap[m.id];
        const status = mp?.status || 'not_started';
        const completionPercent = mp?.completionPercent || 0;
        const locked = idx > 0 && !prevModuleDone && status !== 'done';
        const isFinalAssessment = !!m.isFinalAssessment;

        const stepsWithStatus = (m.steps || []).map((s) => ({
          ...s,
          progressStatus: stepProgressMap[s.id]?.status || 'not_started',
          score: stepProgressMap[s.id]?.score ?? null
        }));

        const result = {
          ...m,
          steps: stepsWithStatus,
          progressStatus: status,
          completionPercent,
          locked
        };

        if (status === 'done') prevModuleDone = true;
        else if (idx === 0 || (idx > 0 && prevModuleDone)) prevModuleDone = false;

        return result;
      });

      // Live progress: count done steps across all modules in this path
      let livePercent = 0;
      let stepsDone = 0;
      let stepsTotal = 0;
      if (userId) {
        const live = await computePathProgressFromSteps(userId, path.id);
        livePercent = live.percent;
        stepsDone = live.doneSteps;
        stepsTotal = live.totalSteps;
      }
      const hasProgress = stepsDone > 0;

      res.status(200).json({
        success: true,
        path: {
          id: json.id,
          code: json.code,
          method: json.method,
          level: json.level,
          title: json.title,
          description: json.description,
          totalModules: json.totalModules,
          estHours: json.estHours,
          gradient: METHOD_GRADIENTS[json.method] || ['#64748B', '#475569'],
          instructor: json.instructor,
          prerequisite: json.prerequisite,
          modules: json.modules,
          enrollment: enrollment ? {
            ...enrollment.toJSON(),
            completionPercent: livePercent
          } : (hasProgress ? {
            id: null,
            status: 'active',
            completionPercent: livePercent,
            currentModuleId: null,
            currentStepId: null
          } : null),
          isEnrolled: !!enrollment || hasProgress,
          progressPercent: livePercent,
          stepsDone,
          stepsTotal
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async enroll(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { code } = req.params;
      const userId = req.user.id;

      const path = await LearningPath.findOne({
        where: { code },
        include: [{ model: Module, as: 'modules', order: [['orderIndex', 'ASC']] }]
      });
      if (!path) {
        throw { name: 'NotFound', message: `Learning path ${code} not found` };
      }

      // Check prerequisite
      if (path.prerequisitePathId) {
        const prereqEnrollment = await UserEnrollment.findOne({
          where: { UserId: userId, LearningPathId: path.prerequisitePathId, status: 'completed' }
        });
        if (!prereqEnrollment) {
          throw { name: 'Forbidden', message: 'Prerequisite path not completed' };
        }
      }

      const sortedModules = (path.modules || []).sort((a, b) => a.orderIndex - b.orderIndex);
      const firstModule = sortedModules[0] || null;
      let firstStep = null;
      if (firstModule) {
        firstStep = await LessonStep.findOne({
          where: { ModuleId: firstModule.id },
          order: [['orderIndex', 'ASC']]
        });
      }

      const [enrollment, created] = await UserEnrollment.findOrCreate({
        where: { UserId: userId, LearningPathId: path.id },
        defaults: {
          UserId: userId,
          LearningPathId: path.id,
          currentModuleId: firstModule?.id || null,
          currentStepId: firstStep?.id || null,
          status: 'active',
          enrolledAt: new Date()
        },
        transaction: t
      });

      await t.commit();
      res.status(created ? 201 : 200).json({
        success: true,
        enrollment: enrollment.toJSON(),
        created
      });
    } catch (err) {
      await t.rollback().catch(() => {});
      next(err);
    }
  }

  static async getModule(req, res, next) {
    try {
      const { code, number } = req.params;
      const userId = req.user?.id;

      const path = await LearningPath.findOne({ where: { code } });
      if (!path) throw { name: 'NotFound', message: `Path ${code} not found` };

      const moduleRow = await Module.findOne({
        where: { LearningPathId: path.id, orderIndex: parseInt(number, 10) },
        include: [{
          model: LessonStep,
          as: 'steps',
          order: [['orderIndex', 'ASC']],
          include: [{
            model: QuizQuestion,
            as: 'quizQuestions',
            separate: true, // batched query instead of a duplicating JOIN (perf)
            required: false,
            attributes: ['id', 'question', 'options', 'difficulty']
          }]
        }]
      });
      if (!moduleRow) throw { name: 'NotFound', message: `Module ${number} not found` };

      const json = moduleRow.toJSON();
      json.steps = (json.steps || []).sort((a, b) => a.orderIndex - b.orderIndex);

      // Attach progress
      if (userId) {
        const stepIds = json.steps.map((s) => s.id);
        if (stepIds.length > 0) {
          const stepProgresses = await UserStepProgress.findAll({
            where: { UserId: userId, LessonStepId: { [Op.in]: stepIds } }
          });
          const map = {};
          stepProgresses.forEach((sp) => { map[sp.LessonStepId] = sp.toJSON(); });
          json.steps = json.steps.map((s) => ({
            ...s,
            progressStatus: map[s.id]?.status || 'not_started',
            score: map[s.id]?.score ?? null
          }));
        }
      }

      res.status(200).json({
        success: true,
        module: { ...json, pathCode: path.code, pathTitle: path.title }
      });
    } catch (err) {
      next(err);
    }
  }

  // Server-authoritative quiz grading. Optional auth: anonymous users get graded
  // feedback (review) but no progress is persisted and no certificate is issued.
  static async gradeQuiz(req, res, next) {
    const userId = req.user?.id || null;
    const t = userId ? await sequelize.transaction() : null;
    try {
      const { stepId } = req.params;
      const answers = (req.body && req.body.answers) || {};

      const step = await LessonStep.findByPk(stepId, {
        include: [
          {
            model: Module,
            as: 'module',
            include: [{ model: LearningPath, as: 'learningPath' }]
          },
          {
            model: QuizQuestion,
            as: 'quizQuestions',
            required: false,
            attributes: ['id', 'question', 'options', 'correctAnswer', 'explanation', 'difficulty']
          }
        ],
        transaction: t || undefined
      });

      if (!step) {
        if (t) await t.rollback().catch(() => {});
        throw { name: 'NotFound', message: 'Step not found' };
      }

      const questions = step.quizQuestions || [];

      // FAIL CLOSED: never grade an empty assessment.
      if (questions.length === 0) {
        if (t) await t.rollback().catch(() => {});
        return res.status(422).json({
          success: false,
          code: 'assessment_unavailable',
          message: 'Soal untuk asesmen ini belum tersedia.'
        });
      }

      const module = step.module;
      const passingScore = (module && module.passingScore) || 75;

      const total = questions.length;
      let correctCount = 0;
      const review = questions.map((q) => {
        const hasAnswer = Object.prototype.hasOwnProperty.call(answers, q.id);
        const yourAnswer = hasAnswer ? Number(answers[q.id]) : null;
        const isCorrect = Number(answers[q.id]) === q.correctAnswer;
        if (isCorrect) correctCount++;
        return {
          id: q.id,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          yourAnswer,
          isCorrect
        };
      });

      const score = Math.round((correctCount / total) * 100);
      const passed = score >= passingScore;

      let certificate = null;

      // Persist progress + issue certificate only for authenticated users (MASTERY GATE).
      if (userId) {
        const [progress] = await UserStepProgress.findOrCreate({
          where: { UserId: userId, LessonStepId: step.id },
          defaults: {
            UserId: userId,
            LessonStepId: step.id,
            status: passed ? 'done' : 'in_progress',
            score,
            startedAt: new Date(),
            completedAt: passed ? new Date() : null
          },
          transaction: t
        });

        const existingScore = typeof progress.score === 'number' ? progress.score : 0;
        const bestScore = Math.max(existingScore, score);
        await progress.update({
          // MASTERY GATE: only mark done when passed; otherwise keep/set in_progress.
          status: passed ? 'done' : (progress.status === 'done' ? 'done' : 'in_progress'),
          score: bestScore,
          completedAt: passed ? (progress.completedAt || new Date()) : progress.completedAt
        }, { transaction: t });

        // Recompute module + path progress.
        await recomputeModuleProgress(userId, step.ModuleId, t);
        await recomputePathProgress(userId, module.LearningPathId, t);

        // Final assessment certificate — issued ONLY here, with the SERVER score.
        if (module.isFinalAssessment && passed && module.learningPath) {
          const path = module.learningPath;
          const existing = await Certificate.findOne({
            where: { UserId: userId, LearningPathId: path.id },
            transaction: t
          });
          if (!existing) {
            const serial = `SNS-${path.code}-${String(Date.now()).slice(-6)}`;
            const qrToken = crypto.randomBytes(16).toString('hex');
            certificate = await Certificate.create({
              UserId: userId,
              LearningPathId: path.id,
              serialNumber: serial,
              score,
              issuedAt: new Date(),
              qrToken
            }, { transaction: t });
          } else {
            certificate = existing;
          }
        }

        await t.commit();
      }

      res.status(200).json({
        success: true,
        score,
        passed,
        passingScore,
        correctCount,
        total,
        review,
        certificate: certificate ? certificate.toJSON() : null
      });
    } catch (err) {
      if (t) await t.rollback().catch(() => {});
      next(err);
    }
  }
}

module.exports = LearningPathController;
