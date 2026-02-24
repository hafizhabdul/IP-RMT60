const { Lecture, Category, User, Transaction, TransactionDetail, LectureTranslation } = require("../models");
const Mux = require('@mux/mux-node');
const { resolveLanguage, applyTranslation } = require('../utils/language');

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
const mux = MUX_TOKEN_ID && MUX_TOKEN_SECRET ? new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET) : null;

class LectureController {
  static async getAllLectures(req, res, next) {
    try {
      const language = resolveLanguage(req);

      const lectures = await Lecture.findAll({
        include: [
          {
            model: Category,
            as: "category"
          },
          {
            model: User,
            attributes: ["username", "email"]
          },
          {
            model: LectureTranslation,
            as: 'translations',
            required: false,
            where: {
              language
            }
          }
        ],
        order: [["id", "ASC"]]
      });

      const translatedLectures = lectures.map((lecture) => {
        const record = lecture.toJSON();
        const translation = record.translations?.[0];
        delete record.translations;
        return applyTranslation(record, translation);
      });

      res.status(200).json(translatedLectures);
    } catch (err) {
      next(err);
    }
  }

  static async getLectureById(req, res, next) {
    try {
      const { id } = req.params;
      const language = resolveLanguage(req);
      const lecture = await Lecture.findByPk(id, {
        include: [
          {
            model: Category,
            as: "category"
          },
          {
            model: User,
            attributes: ["username", "email"]
          },
          {
            model: LectureTranslation,
            as: 'translations',
            required: false,
            where: {
              language
            }
          }
        ]
      });

      if (!lecture) {
        throw { name: "NotFound", message: "Lecture not found" };
      }

      const lectureData = lecture.toJSON();
      const translation = lectureData.translations?.[0];
      delete lectureData.translations;

      res.status(200).json(applyTranslation(lectureData, translation));
    } catch (err) {
      next(err);
    }
  }

  static async createLecture(req, res, next) {
    try {
      const {
        name,
        title,
        technique,
        CategoryId,
        experience_years,
        certifications,
        description,
        price,
        availability,
        image
      } = req.body;

      // Set the current admin as the lecture creator
      const UserId = req.user.id;

      const newLecture = await Lecture.create({
        name,
        title,
        technique,
        CategoryId,
        experience_years,
        certifications,
        description,
        price,
        availability,
        image,
        UserId
      });

      res.status(201).json(newLecture);
    } catch (err) {
      next(err);
    }
  }

  static async updateLecture(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        title,
        technique,
        CategoryId,
        experience_years,
        certifications,
        description,
        price,
        availability,
        image,
        videoUrl // Include videoUrl in the destructuring
      } = req.body;

      const lecture = await Lecture.findByPk(id);

      if (!lecture) {
        throw { name: "NotFound", message: "Lecture not found" };
      }

      // If a new videoUrl is provided and it's different from the old one,
      // and the old one exists, delete the old Mux asset.
      if (videoUrl && lecture.videoUrl && videoUrl !== lecture.videoUrl) {
        const oldAssetId = lecture.videoUrl.split('/').pop().replace('.m3u8', '');
        await mux.video.assets.delete(oldAssetId);
      }

      await lecture.update({
        name,
        title,
        technique,
        CategoryId,
        experience_years,
        certifications,
        description,
        price,
        availability,
        image,
        videoUrl // Update videoUrl
      });

      res.status(200).json(lecture);
    } catch (err) {
      next(err);
    }
  }

  static async deleteLecture(req, res, next) {
    try {
      const { id } = req.params;
      const lecture = await Lecture.findByPk(id);

      if (!lecture) {
        throw { name: "NotFound", message: "Lecture not found" };
      }

      // If the lecture has a videoUrl, delete the Mux asset
      if (lecture.videoUrl) {
        const assetId = lecture.videoUrl.split('/').pop().replace('.m3u8', '');
        await mux.video.assets.delete(assetId);
      }

      await lecture.destroy();

      res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  // Get course content for paid users only
  static async getCourseContent(req, res, next) {
    try {
      const { id } = req.params;
      const UserId = req.user.id;

      // Double check access (middleware should handle this, but extra security)
      const transaction = await Transaction.findOne({
        where: {
          UserId,
          status: 'Completed'
        },
        include: [{
          model: TransactionDetail,
          where: { LectureId: id }
        }]
      });

      if (!transaction) {
        throw { name: "Forbidden", message: "Please complete payment to access this course" };
      }

      const language = resolveLanguage(req);
      const lecture = await Lecture.findByPk(id, {
        include: [
          {
            model: Category,
            as: "category"
          },
          {
            model: User,
            attributes: ["username", "email"]
          },
          {
            model: LectureTranslation,
            as: 'translations',
            required: false,
            where: {
              language
            }
          }
        ]
      });

      if (!lecture) {
        throw { name: "NotFound", message: "Lecture not found" };
      }

      const lectureData = lecture.toJSON();
      const translation = lectureData.translations?.[0];
      delete lectureData.translations;

      res.json({
        message: "Course content accessed successfully",
        lecture: applyTranslation(lectureData, translation),
        access_granted: true,
        transaction_info: {
          invoice_number: transaction.invoice_number,
          purchase_date: transaction.createdAt,
          payment_method: transaction.payment_method
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user's purchased courses
  static async getUserCourses(req, res, next) {
    try {
      const UserId = req.user.id;
      const language = resolveLanguage(req);

      // First, let's check if user has any transactions at all
      const allTransactions = await Transaction.findAll({
        where: { UserId },
        attributes: ['id', 'status', 'total_amount', 'payment_method']
      });

      const transactions = await Transaction.findAll({
        where: {
          UserId,
          status: 'Completed'
        },
        include: [{
          model: TransactionDetail,
          include: [{
            model: Lecture,
            include: [{
              model: Category,
              as: "category"
            }, {
              model: LectureTranslation,
              as: 'translations',
              required: false,
              where: { language }
            }]
          }]
        }],
        order: [['createdAt', 'DESC']]
      });

      // If no completed transactions, return empty but successful response
      if (transactions.length === 0) {
        return res.json({
          message: "No completed purchases found",
          courses: [],
          total_courses: 0,
          debug: {
            userId: UserId,
            totalTransactions: allTransactions.length,
            completedTransactions: 0
          }
        });
      }

      // Flatten the data structure for easier frontend consumption
      const courses = [];
      transactions.forEach(transaction => {
        if (transaction.TransactionDetails && transaction.TransactionDetails.length > 0) {
          transaction.TransactionDetails.forEach(detail => {
            if (detail.Lecture) {
              const lectureData = detail.Lecture.toJSON ? detail.Lecture.toJSON() : detail.Lecture;
              const translation = lectureData.translations?.[0];
              const translated = applyTranslation(lectureData, translation);
              courses.push({
                id: translated.id,
                name: translated.name,
                description: translated.description,
                technique: translated.technique,
                imgUrl: translated.imgUrl,
                category: translated.category,
                purchase_date: transaction.createdAt,
                invoice_number: transaction.invoice_number,
                payment_method: transaction.payment_method,
                access_granted: true
              });
            }
          });
        }
      });

      res.json({
        message: "User courses retrieved successfully",
        courses,
        total_courses: courses.length
      });
    } catch (error) {
      console.error('Error in getUserCourses:', error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
}

module.exports = LectureController;
