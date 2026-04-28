const { LearningPath, Module, LessonStep, UserEnrollment, UserModuleProgress, UserStepProgress, User, QuizQuestion, sequelize } = require('../models');
const { Op } = require('sequelize');

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
              attributes: ['id', 'orderIndex', 'kind', 'title', 'durationSeconds', 'simulationRef', 'contentJson'],
              order: [['orderIndex', 'ASC']],
              include: [{
                model: QuizQuestion,
                as: 'quizQuestions',
                required: false,
                attributes: ['id', 'question', 'options', 'correctAnswer', 'explanation', 'difficulty']
              }]
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
            required: false,
            attributes: ['id', 'question', 'options', 'correctAnswer', 'explanation', 'difficulty']
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
}

module.exports = LearningPathController;
