const { LessonStep, Module, LearningPath, UserEnrollment, UserStepProgress, UserModuleProgress, sequelize } = require('../models');
const { Op } = require('sequelize');

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

class ProgressController {
  static async startStep(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const step = await LessonStep.findByPk(id);
      if (!step) throw { name: 'NotFound', message: 'Step not found' };

      const [progress] = await UserStepProgress.findOrCreate({
        where: { UserId: userId, LessonStepId: id },
        defaults: {
          UserId: userId,
          LessonStepId: id,
          status: 'in_progress',
          startedAt: new Date()
        }
      });

      if (progress.status === 'not_started') {
        await progress.update({ status: 'in_progress', startedAt: new Date() });
      }

      res.status(200).json({ success: true, progress: progress.toJSON() });
    } catch (err) {
      next(err);
    }
  }

  static async completeStep(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { score, timeSpentSeconds } = req.body || {};
      const userId = req.user.id;

      const step = await LessonStep.findByPk(id, {
        include: [{
          model: Module,
          as: 'module',
          include: [{ model: LearningPath, as: 'learningPath' }]
        }],
        transaction: t
      });
      if (!step) throw { name: 'NotFound', message: 'Step not found' };

      const [progress] = await UserStepProgress.findOrCreate({
        where: { UserId: userId, LessonStepId: id },
        defaults: {
          UserId: userId,
          LessonStepId: id,
          status: 'done',
          score: typeof score === 'number' ? score : null,
          timeSpentSeconds: timeSpentSeconds || 0,
          startedAt: new Date(),
          completedAt: new Date()
        },
        transaction: t
      });

      await progress.update({
        status: 'done',
        score: typeof score === 'number' ? score : progress.score,
        timeSpentSeconds: (progress.timeSpentSeconds || 0) + (timeSpentSeconds || 0),
        completedAt: new Date()
      }, { transaction: t });

      // Recompute module + path progress
      const moduleProgress = await recomputeModuleProgress(userId, step.ModuleId, t);
      const enrollment = await recomputePathProgress(userId, step.module.LearningPathId, t);

      // Move enrollment cursor to next step
      const nextStep = await LessonStep.findOne({
        where: {
          ModuleId: step.ModuleId,
          orderIndex: { [Op.gt]: step.orderIndex }
        },
        order: [['orderIndex', 'ASC']],
        transaction: t
      });

      if (enrollment) {
        if (nextStep) {
          await enrollment.update({ currentStepId: nextStep.id }, { transaction: t });
        } else {
          // Find next module
          const nextModule = await Module.findOne({
            where: {
              LearningPathId: step.module.LearningPathId,
              orderIndex: { [Op.gt]: step.module.orderIndex }
            },
            order: [['orderIndex', 'ASC']],
            transaction: t
          });
          if (nextModule) {
            const firstStepNextMod = await LessonStep.findOne({
              where: { ModuleId: nextModule.id },
              order: [['orderIndex', 'ASC']],
              transaction: t
            });
            await enrollment.update({
              currentModuleId: nextModule.id,
              currentStepId: firstStepNextMod?.id || null
            }, { transaction: t });
          }
        }
      }

      // NOTE: Certificates are NEVER issued here. Client-supplied scores are not
      // trustworthy. Certificate issuance (with a server-computed score) happens only
      // in LearningPathController.gradeQuiz. completeStep only marks steps done and
      // advances the enrollment cursor.

      await t.commit();

      res.status(200).json({
        success: true,
        progress: progress.toJSON(),
        moduleProgress: moduleProgress?.toJSON() || null,
        nextStepId: nextStep?.id || null,
        certificate: null
      });
    } catch (err) {
      await t.rollback().catch(() => {});
      next(err);
    }
  }

  static async getMyProgress(req, res, next) {
    try {
      const userId = req.user.id;

      const enrollments = await UserEnrollment.findAll({
        where: { UserId: userId },
        include: [
          {
            model: LearningPath,
            as: 'learningPath',
            attributes: ['id', 'code', 'method', 'level', 'title', 'totalModules']
          },
          {
            model: Module,
            as: 'currentModule',
            attributes: ['id', 'orderIndex', 'title'],
            required: false
          },
          {
            model: LessonStep,
            as: 'currentStep',
            attributes: ['id', 'orderIndex', 'title', 'ModuleId'],
            required: false,
            include: [{ model: Module, as: 'module', attributes: ['id', 'orderIndex'] }]
          }
        ],
        order: [['updatedAt', 'DESC']]
      });

      // Aggregate totals
      const stepProgresses = await UserStepProgress.findAll({
        where: { UserId: userId, status: 'done' }
      });
      const moduleProgresses = await UserModuleProgress.findAll({
        where: { UserId: userId, status: 'done' }
      });
      const totalTimeSpent = stepProgresses.reduce((sum, p) => sum + (p.timeSpentSeconds || 0), 0);

      // Streak — based on distinct days with completion
      const days = new Set();
      stepProgresses.forEach((p) => {
        if (p.completedAt) {
          days.add(new Date(p.completedAt).toISOString().slice(0, 10));
        }
      });
      const sortedDays = Array.from(days).sort().reverse();
      let streak = 0;
      let cursor = new Date();
      for (const d of sortedDays) {
        const dCheck = cursor.toISOString().slice(0, 10);
        if (d === dCheck) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
        } else {
          break;
        }
      }

      // Quiz average
      const quizScores = stepProgresses.filter((p) => p.score !== null && p.score !== undefined).map((p) => p.score);
      const avgQuiz = quizScores.length > 0 ? Math.round((quizScores.reduce((s, v) => s + v, 0) / quizScores.length) * 10) / 10 : null;

      // Activity stream — last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentSteps = await UserStepProgress.findAll({
        where: {
          UserId: userId,
          status: 'done',
          completedAt: { [Op.gte]: sevenDaysAgo }
        },
        include: [{
          model: LessonStep,
          as: 'lessonStep',
          include: [{ model: Module, as: 'module', include: [{ model: LearningPath, as: 'learningPath' }] }]
        }],
        order: [['completedAt', 'DESC']],
        limit: 10
      });

      const activity = recentSteps.map((sp) => ({
        type: sp.lessonStep?.kind === 'quiz' ? 'quiz' : 'step',
        title: sp.lessonStep?.title || 'Step',
        path: sp.lessonStep?.module?.learningPath?.code || null,
        score: sp.score,
        completedAt: sp.completedAt
      }));

      res.status(200).json({
        success: true,
        summary: {
          enrollmentsCount: enrollments.length,
          modulesDone: moduleProgresses.length,
          stepsDone: stepProgresses.length,
          totalTimeSeconds: totalTimeSpent,
          streak,
          quizAverage: avgQuiz
        },
        enrollments: enrollments.map((e) => {
          const json = e.toJSON();
          // Build a deep-link-ready resume target.
          // Prefer the module that actually owns the current step (guards against a
          // stale currentModuleId), then fall back to the enrollment's currentModule.
          const stepId = json.currentStep?.id ?? json.currentStepId ?? null;
          const moduleOrderIndex =
            json.currentStep?.module?.orderIndex ??
            json.currentModule?.orderIndex ??
            null;
          json.resume =
            stepId && moduleOrderIndex != null && json.learningPath?.code
              ? {
                  code: json.learningPath.code,
                  moduleOrderIndex,
                  stepId
                }
              : null;
          return json;
        }),
        activity
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProgressController;
