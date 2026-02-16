const { User, Category, Lecture, Transaction, TransactionDetail, sequelize } = require("../models");
const { Op } = require("sequelize");
const Mux = require('@mux/mux-node');

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
const mux = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

class AdminController {
  // Transaction Management Methods
  static async getTransactions(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      // Return transactions directly as an array, not wrapped in an object
      res.json(transactions);
    } catch (err) {
      res.json([]);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          },
          {
            model: Lecture,
            through: { attributes: ['price'] }
          }
        ]
      });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.json({ transaction });
    } catch (err) {
      next(err);
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      if (!["Pending", "Processing", "Completed", "Cancelled"].includes(status)) {
        return res.status(400).json({ 
          message: "Invalid status. Status must be one of: Pending, Processing, Completed, Cancelled" 
        });
      }

      const transaction = await Transaction.findByPk(id);
      
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      transaction.status = status;
      await transaction.save();
      
      res.json({ 
        message: "Transaction status updated successfully", 
        transaction 
      });
    } catch (err) {
      next(err);
    }
  }

  static async exportTransactions(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          },
          {
            model: Lecture,
            through: { attributes: ['price'] }
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      // Transform data for export
      const exportData = transactions.map(t => ({
        id: t.id,
        invoice_number: t.invoice_number,
        user: `${t.User.username} (${t.User.email})`,
        total_amount: t.total_amount,
        payment_method: t.payment_method,
        status: t.status,
        created_at: t.createdAt,
        items: t.Lectures.map(l => ({
          lecture_title: l.title,
          price: l.TransactionDetail.price
        }))
      }));
      
      res.json(exportData);
    } catch (err) {
      res.json([]);
    }
  }

  // Payment Management Methods
  static async getPayments(req, res, next) {
    try {
      // For now, since we might not have a separate Payment table,
      // we'll return transaction data but formatted as payment data
      const transactions = await Transaction.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      // Transform transactions to payment format
      const payments = transactions.map(t => ({
        id: t.id,
        transactionId: t.id,
        amount: t.total_amount,
        paymentMethod: t.payment_method,
        status: t.status,
        user: t.User,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        invoiceNumber: t.invoice_number
      }));

      res.json(payments);
    } catch (err) {
      res.json([]);
    }
  }

  static async getPaymentById(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          }
        ]
      });

      if (!transaction) {
        return res.status(404).json({ message: "Payment not found" });
      }

      // Transform transaction to payment format
      const payment = {
        id: transaction.id,
        transactionId: transaction.id,
        amount: transaction.total_amount,
        paymentMethod: transaction.payment_method,
        status: transaction.status,
        user: transaction.User,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        invoiceNumber: transaction.invoice_number
      };

      res.json({ payment });
    } catch (err) {
      next(err);
    }
  }

  static async updatePayment(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      if (!["Pending", "Processing", "Completed", "Failed", "Cancelled"].includes(status)) {
        return res.status(400).json({ 
          message: "Invalid status. Status must be one of: Pending, Processing, Completed, Failed, Cancelled" 
        });
      }

      const transaction = await Transaction.findByPk(id);
      
      if (!transaction) {
        return res.status(404).json({ message: "Payment not found" });
      }
      
      transaction.status = status;
      await transaction.save();
      
      res.json({ 
        message: "Payment status updated successfully", 
        payment: {
          id: transaction.id,
          status: transaction.status,
          updatedAt: transaction.updatedAt
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async exportPayments(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      // Transform data for export
      const exportData = transactions.map(t => ({
        id: t.id,
        transaction_id: t.id,
        invoice_number: t.invoice_number,
        user: `${t.User.username} (${t.User.email})`,
        amount: t.total_amount,
        payment_method: t.payment_method,
        status: t.status,
        created_at: t.createdAt,
        updated_at: t.updatedAt
      }));
      
      res.json(exportData);
    } catch (err) {
      res.json([]);
    }
  }

  static async getPendingPayments(req, res, next) {
    try {
      const pendingPayments = await Transaction.findAll({
        where: { 
          status: 'Pending',
          payment_method: 'Manual_Transfer'
        },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email']
          },
          {
            model: TransactionDetail,
            include: [{
              model: Lecture,
              attributes: ['name', 'price']
            }]
          }
        ],
        order: [['createdAt', 'ASC']] // Oldest first for priority
      });

      res.json({
        message: "Pending payments retrieved successfully",
        payments: pendingPayments,
        total: pendingPayments.length
      });
    } catch (error) {
      next(error);
    }
  }

  static async approvePayment(req, res, next) {
    try {
      const { invoice_number } = req.params;
      const { note } = req.body; // Optional admin note

      const transaction = await Transaction.findOne({
        where: { 
          invoice_number,
          payment_method: 'Manual_Transfer',
          status: 'Pending'
        },
        include: [{
          model: User,
          attributes: ['username', 'email']
        }]
      });

      if (!transaction) {
        throw { name: "NotFound", message: "Pending transaction not found" };
      }

      await transaction.update({ 
        status: 'Completed',
        admin_note: note || `Approved by ${req.user.username} on ${new Date().toISOString()}`
      });

      res.json({
        message: "Payment approved successfully",
        transaction: {
          invoice_number: transaction.invoice_number,
          user: transaction.User.username,
          amount: transaction.total_amount,
          status: transaction.status,
          approved_by: req.user.username,
          approved_at: new Date()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async rejectPayment(req, res, next) {
    try {
      const { invoice_number } = req.params;
      const { reason } = req.body; // Required rejection reason

      const transaction = await Transaction.findOne({
        where: { 
          invoice_number,
          payment_method: 'Manual_Transfer',
          status: 'Pending'
        },
        include: [{
          model: User,
          attributes: ['username', 'email']
        }]
      });

      if (!transaction) {
        throw { name: "NotFound", message: "Pending transaction not found" };
      }

      await transaction.update({ 
        status: 'Cancelled',
        admin_note: `Rejected by ${req.user.username}: ${reason || 'No reason provided'}`
      });

      res.json({
        message: "Payment rejected successfully",
        transaction: {
          invoice_number: transaction.invoice_number,
          user: transaction.User.username,
          amount: transaction.total_amount,
          status: transaction.status,
          rejected_by: req.user.username,
          rejected_at: new Date(),
          reason: reason || 'No reason provided'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentStats(req, res, next) {
    try {
      const stats = await Transaction.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          [sequelize.fn('SUM', sequelize.col('total_amount')), 'total_amount']
        ],
        group: ['status']
      });

      const formattedStats = stats.reduce((acc, stat) => {
        acc[stat.status] = {
          count: parseInt(stat.dataValues.count),
          total_amount: parseInt(stat.dataValues.total_amount) || 0
        };
        return acc;
      }, {});

      res.json({
        message: "Payment statistics retrieved successfully",
        stats: formattedStats
      });
    } catch (error) {
      next(error);
    }
  }

  // Dashboard and Statistics Methods
  static async getDashboard(req, res, next) {
    try {
      // Fetch all necessary data for the dashboard in a single endpoint
      const totalUsers = await User.count();
      const totalCourses = await Lecture.count();
      const totalCategories = await Category.count();
      
      // Revenue and orders data
      let totalOrders = 0;
      let totalRevenue = 0;
      
      try {
        totalOrders = await Transaction.count();
        const revenueResult = await Transaction.sum('total_amount', {
          where: { status: 'Completed' }
        });
        totalRevenue = revenueResult || 0;
      } catch (err) {
        totalOrders = 0;
        totalRevenue = 0;
      }
      
      // Latest user data
      const recentUsers = await User.findAll({
        attributes: ['id', 'username', 'email', 'role', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: 5
      });
      
      // Latest order data
      let recentOrders;
      try {
        recentOrders = await Transaction.findAll({
          include: [{
            model: User,
            attributes: ['id', 'username', 'email']
          }],
          order: [['createdAt', 'DESC']],
          limit: 5
        });
      } catch (err) {
        recentOrders = [];
      }
      
      // Combine all data
      res.json({
        totalUsers,
        totalCourses,
        totalCategories,
        totalOrders,
        totalRevenue,
        recentUsers,
        recentOrders
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
      
      // If the Transaction model is not yet available, use dummy data
      let totalOrders = 0;
      let revenue = 0;
      
      try {
        totalOrders = await Transaction.count();
        const revenueResult = await Transaction.sum('total_amount', {
          where: { status: 'Completed' }
        });
        revenue = revenueResult || 0;
      } catch (err) {
        totalOrders = 0;
        revenue = 0;
      }

      res.json({
        totalUsers,
        totalCourses,
        totalCategories,
        totalOrders,
        revenue
      });
    } catch (err) {
      next(err);
    }
  }

  static async getRecentUsers(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'role', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit
      });
      
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getRecentOrders(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      
      // If the Transaction model is not yet available, use dummy data
      try {
        const orders = await Transaction.findAll({
          include: [{
            model: User,
            attributes: ['id', 'username', 'email']
          }],
          order: [['createdAt', 'DESC']],
          limit
        });
        
        res.json(orders);
      } catch (err) {
        res.json([]);
      }
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

  static async getMonthlySales(req, res, next) {
    try {
      // If the Transaction model is not ready, use dummy data
      try {
        const currentYear = new Date().getFullYear();
        
        const result = await Transaction.findAll({
          attributes: [
            [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'orderCount'],
            [sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']
          ],
          where: {
            createdAt: {
              [Op.gte]: new Date(`${currentYear}-01-01`),
              [Op.lt]: new Date(`${currentYear+1}-01-01`)
            },
            status: 'Completed'
          },
          group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
          order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']]
        });
        
        // Format data
        const monthlySales = result.map(item => {
          const data = item.toJSON();
          return {
            month: new Date(data.month).toLocaleString('en-US', { month: 'short' }),
            orderCount: parseInt(data.orderCount),
            revenue: parseInt(data.revenue)
          };
        });
        
        res.json(monthlySales);
      } catch (err) {
        res.json([]);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteLecture(req, res, next) {
    try {
      const { id } = req.params;
      const lecture = await Lecture.findByPk(id);

      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }

      // If the lecture has a videoUrl, delete the Mux asset
      if (lecture.videoUrl) {
        const assetId = lecture.videoUrl.split('/').pop().replace('.m3u8', '');
        await mux.video.assets.delete(assetId);
      }

      await lecture.destroy();

      res.json({ message: "Lecture deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;