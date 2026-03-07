const { User, Category, Lecture, sequelize } = require("../models");

class AdminController {
  static async getDashboard(req, res, next) {
    try {
      const totalUsers = await User.count();
      const totalCourses = await Lecture.count();
      const totalCategories = await Category.count();

      const recentUsers = await User.findAll({
        attributes: ['id', 'username', 'email', 'role', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: 5
      });

      res.json({
        totalUsers,
        totalCourses,
        totalCategories,
        recentUsers
      });
    } catch (err) {
      next(err);
    }
  }

  static async getStatistics(req, res, next) {
    try {
      const totalUsers = await User.count();
      const totalCourses = await Lecture.count();
      const totalCategories = await Category.count();

      res.json({ totalUsers, totalCourses, totalCategories });
    } catch (err) {
      next(err);
    }
  }

  static async getCategoriesStats(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: [
          'id',
          'name',
          [sequelize.fn('COUNT', sequelize.col('Lectures.id')), 'courseCount']
        ],
        include: [{
          model: Lecture,
          attributes: []
        }],
        group: ['Category.id'],
        order: [[sequelize.fn('COUNT', sequelize.col('Lectures.id')), 'DESC']]
      });

      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
