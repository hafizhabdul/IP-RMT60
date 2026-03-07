const { Lesson, Lecture, UserProgress, User, Transaction, TransactionDetail, LessonTranslation, sequelize } = require('../models');
const { Op } = require('sequelize');
const { resolveLanguage } = require('../utils/language');

const applyTranslation = (record, translation) => {
  if (!translation) {
    return record;
  }
  return {
    ...record,
    title: translation.title || record.title,
    description: translation.description ?? record.description
  };
};

class LessonController {
  // Get all lessons for a lecture
  static async getLessonsByLecture(req, res, next) {
    try {
      const { lectureId } = req.params;
      const userId = req.user?.id;

      // Check if user has purchased the course
      let hasPurchased = false;
      if (userId) {
        const purchase = await TransactionDetail.findOne({
          include: [{
            model: Transaction,
            where: { 
              UserId: userId,
              status: 'success'
            }
          }],
          where: { LectureId: lectureId }
        });
        hasPurchased = !!purchase;
      }

      // Get lessons
      const language = resolveLanguage(req);

      const lessons = await Lesson.findAll({
        where: { LectureId: lectureId },
        order: [['order', 'ASC']],
        include: [{
          model: Lecture,
          as: 'lecture',
          attributes: ['id', 'title', 'name']
        }, {
          model: LessonTranslation,
          as: 'translations',
          required: false,
          where: {
            language
          }
        }]
      });

      // Filter lessons based on purchase status
      const filteredLessons = lessons.map(lesson => {
        const lessonData = lesson.toJSON();
        const translation = lessonData.translations?.[0];
        delete lessonData.translations;
        const translatedLesson = applyTranslation(lessonData, translation);

        // If user hasn't purchased and lesson is not preview, hide video URL
        if (!hasPurchased && !lesson.isPreview) {
          translatedLesson.videoUrl = null;
          translatedLesson.isLocked = true;
        } else {
          translatedLesson.isLocked = false;
        }

        return translatedLesson;
      });

      res.status(200).json({
        success: true,
        data: filteredLessons,
        hasPurchased
      });
    } catch (error) {
      next(error);
    }
  }

  // Get single lesson details
  static async getLessonById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const language = resolveLanguage(req);

      const lesson = await Lesson.findByPk(id, {
        include: [{
          model: Lecture,
          as: 'lecture',
          attributes: ['id', 'title', 'name', 'price']
        }, {
          model: LessonTranslation,
          as: 'translations',
          required: false,
          where: {
            language
          }
        }]
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
      }

      // Check if user has purchased the course
      let hasPurchased = false;
      if (userId) {
        const purchase = await TransactionDetail.findOne({
          include: [{
            model: Transaction,
            where: { 
              UserId: userId,
              status: 'success'
            }
          }],
          where: { LectureId: lesson.LectureId }
        });
        hasPurchased = !!purchase;
      }

      const lessonData = lesson.toJSON();
      const translation = lessonData.translations?.[0];
      delete lessonData.translations;
      const translatedLesson = applyTranslation(lessonData, translation);

      // If user hasn't purchased and lesson is not preview, hide video URL
      if (!hasPurchased && !lesson.isPreview) {
        translatedLesson.videoUrl = null;
        translatedLesson.isLocked = true;
      } else {
        translatedLesson.isLocked = false;
      }

      res.status(200).json({
        success: true,
        data: translatedLesson,
        hasPurchased
      });
    } catch (error) {
      next(error);
    }
  }

  // Update user progress
  static async updateProgress(req, res, next) {
    try {
      const { lessonId } = req.params;
      const { watchTime, isCompleted } = req.body;
      const userId = req.user.id;

      const lesson = await Lesson.findByPk(lessonId);
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
      }

      // Check if user has purchased the course
      const purchase = await TransactionDetail.findOne({
        include: [{
          model: Transaction,
          where: { 
            UserId: userId,
            status: 'success'
          }
        }],
        where: { LectureId: lesson.LectureId }
      });

      if (!purchase) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Please purchase the course first.'
        });
      }

      // Use transaction to prevent race conditions on concurrent progress updates
      const progress = await sequelize.transaction(async (t) => {
        const [record] = await UserProgress.findOrCreate({
          where: {
            UserId: userId,
            LectureId: lesson.LectureId
          },
          defaults: {
            currentLessonId: lessonId,
            completedLessons: [],
            progressPercentage: 0,
            totalWatchTime: 0,
            lastWatchedAt: new Date()
          },
          lock: t.LOCK.UPDATE,
          transaction: t
        });

        // Update progress
        record.currentLessonId = lessonId;
        record.lastWatchedAt = new Date();
        
        if (watchTime) {
          record.totalWatchTime += watchTime;
        }

        // Mark lesson as completed
        if (isCompleted && !record.completedLessons.includes(lessonId)) {
          record.completedLessons = [...record.completedLessons, lessonId];
        }

        // Calculate progress percentage
        const totalLessons = await Lesson.count({
          where: { LectureId: lesson.LectureId },
          transaction: t
        });
        
        record.progressPercentage = (record.completedLessons.length / totalLessons) * 100;
        record.isCompleted = record.progressPercentage === 100;

        await record.save({ transaction: t });
        return record;
      });

      res.status(200).json({
        success: true,
        data: progress
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user progress for a course
  static async getUserProgress(req, res, next) {
    try {
      const { lectureId } = req.params;
      const userId = req.user.id;

      const progress = await UserProgress.findOne({
        where: {
          UserId: userId,
          LectureId: lectureId
        },
        include: [{
          model: Lesson,
          as: 'currentLesson',
          attributes: ['id', 'title', 'order']
        }]
      });

      if (!progress) {
        return res.status(404).json({
          success: false,
          message: 'No progress found for this course'
        });
      }

      res.status(200).json({
        success: true,
        data: progress
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LessonController;
