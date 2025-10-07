const { Category, Lecture, User, sequelize } = require("../models");
const fs = require("fs");
const path = require("path");
const { sendEnrollmentEmails } = require("../services/emailService");

const REQUESTS_FILE = path.join(__dirname, "..", "data", "requests.json");
const EVENTS_FILE = path.join(__dirname, "..", "data", "events.json");

async function readRequestsFile() {
  try {
    const raw = await fs.promises.readFile(REQUESTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === "ENOENT") return { contacts: [], enrollments: [], alumni: [] };
    throw e;
  }
}

async function writeRequestsFile(data) {
  const content = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(REQUESTS_FILE, content, "utf8");
}

async function readEventsFile() {
  try {
    const raw = await fs.promises.readFile(EVENTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
}
const { Op } = require("sequelize");

class PublicController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          include: [
            [sequelize.fn("COUNT", sequelize.col("Lectures.id")), "lectureCount"]
          ]
        },
        include: [
          {
            model: Lecture,
            attributes: []
          }
        ],
        group: ["Category.id"]
      });
      
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
  
  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      
      const category = await Category.findByPk(id, {
        attributes: {
          include: [
            [sequelize.fn("COUNT", sequelize.col("Lectures.id")), "lectureCount"]
          ]
        },
        include: [
          {
            model: Lecture,
            attributes: []
          }
        ],
        group: ["Category.id"]
      });
      
      if (!category) {
        throw { name: "NotFound", message: "Category not found" };
      }
      
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
  
  static async getLectures(req, res, next) {
    try {
      const {
        page = 1,
        limit = 9,
        search = "",
        categoryId,
        minPrice,
        maxPrice,
        sortBy = "createdAt",
        sortDirection = "DESC"
      } = req.query;
      
      const offset = (page - 1) * limit;
      
      // Build where clause for filtering
      const whereClause = {};
      if (search) {
        whereClause.name = { [Op.iLike]: `%${search}%` };
      }
      
      if (categoryId) {
        whereClause.CategoryId = categoryId;
      }
      
      // Price filtering
      if (minPrice || maxPrice) {
        whereClause.price = {};
        if (minPrice) whereClause.price[Op.gte] = minPrice;
        if (maxPrice) whereClause.price[Op.lte] = maxPrice;
      }
      
      const { count, rows } = await Lecture.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Category,
            as: 'category'
          },
          {
            model: User,
            attributes: ['username'],
            required: false
          }
        ],
        order: [[sortBy, sortDirection]],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
      
      // Calculate pagination info
      const totalItems = count;
      const totalPages = Math.ceil(totalItems / limit);
      
      res.json({
        lectures: rows,
        currentPage: parseInt(page),
        totalPages,
        totalItems
      });
    } catch (err) {
      console.error("Error in getLectures:", err);
      next(err);
    }
  }
  
  static async getLectureById(req, res, next) {
    try {
      const { id } = req.params;
      
      const lecture = await Lecture.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'category'
          }
        ]
      });
      
      if (!lecture) {
        throw { name: "NotFound", message: "Lecture not found" };
      }
      
      res.json(lecture);
    } catch (err) {
      next(err);
    }
  }
  
  static async getHomepageBundle(req, res, next) {
    try {
      // Get featured lectures (explicitly selecting only existing columns)
      const featuredLectures = await Lecture.findAll({
        attributes: [
          'id', 'name', 'title', 'technique', 'CategoryId', 
          'experience_years', 'certifications', 'description', 
          'price', 'availability', 'image', 'createdAt', 'updatedAt'
        ],
        include: [{
          model: Category,
          as: 'category'
        }],
        limit: 3,
        order: [['createdAt', 'DESC']]
      });
      
      // Get latest lectures (same as featured for now, could be different criteria)
      const latestLectures = await Lecture.findAll({
        attributes: [
          'id', 'name', 'title', 'technique', 'CategoryId', 
          'experience_years', 'certifications', 'description', 
          'price', 'availability', 'image', 'createdAt', 'updatedAt'
        ],
        include: [{
          model: Category,
          as: 'category'
        }],
        limit: 3,
        order: [['createdAt', 'DESC']]
      });
      
      // Get popular categories
      const popularCategories = await Category.findAll({
        limit: 3
      });
      
      // Get statistics
      const totalLectures = await Lecture.count();
      const totalCategories = await Category.count();
      const totalUsers = await User.count();
      
      res.json({
        featuredLectures,
        latestLectures,
        popularCategories,
        statistics: {
          totalLectures,
          totalCategories,
          totalUsers
        }
      });
    } catch (err) {
      console.error("Error in getHomepageBundle:", err);
      next(err);
    }
  }

  // Store contact request (no auth)
  static async postContactRequest(req, res, next) {
    try {
      const { name, email, phone, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
      }
      const db = await readRequestsFile();
      const item = { id: Date.now(), type: "contact", name, email, phone, message, createdAt: new Date().toISOString() };
      db.contacts.push(item);
      await writeRequestsFile(db);
      res.status(201).json({ message: "Contact request submitted", data: item });
    } catch (err) {
      next(err);
    }
  }

  // Store enrollment (no auth)
  static async postEnrollmentRequest(req, res, next) {
    try {
      const { name, email, phone, method, note } = req.body;
      if (!name || !email || !phone || !method) {
        return res.status(400).json({ message: "Name, email, phone, and method are required" });
      }

      // Save to database/file
      const db = await readRequestsFile();
      const item = { id: Date.now(), type: "enrollment", name, email, phone, method, note, createdAt: new Date().toISOString() };
      db.enrollments.push(item);
      await writeRequestsFile(db);

      // Send emails
      try {
        const emailResults = await sendEnrollmentEmails({ name, email, phone, method, note });

        // Log email results for debugging
        console.log('Email sending results:', emailResults);

        // If both emails fail, we still return success but log the error
        if (emailResults.adminEmail === 'failed' && emailResults.userEmail === 'failed') {
          console.error('Both emails failed to send:', emailResults);
        }

        res.status(201).json({
          message: "Enrollment submitted successfully",
          data: item,
          emailStatus: emailResults
        });
      } catch (emailError) {
        console.error('Email service error:', emailError);
        // Still return success for enrollment, but note email failed
        res.status(201).json({
          message: "Enrollment submitted (email notification failed)",
          data: item,
          emailError: emailError.message
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // Public alumni list
  static async getAlumni(req, res, next) {
    try {
      const db = await readRequestsFile();
      res.json(db.alumni || []);
    } catch (err) {
      next(err);
    }
  }

  // Public events (schedule)
  static async getEvents(req, res, next) {
    try {
      const { search = "", method = "", from = "", to = "", limit } = req.query;
      const events = await readEventsFile();
      const filtered = events.filter((ev) => {
        const s = search ? (ev.title?.toLowerCase().includes(search.toLowerCase()) || ev.location?.toLowerCase().includes(search.toLowerCase())) : true;
        const m = method ? ev.method?.toLowerCase() === method.toLowerCase() : true;
        const f = from ? new Date(ev.startDate) >= new Date(from) : true;
        const t = to ? new Date(ev.endDate || ev.startDate) <= new Date(to) : true;
        return s && m && f && t;
      }).sort((a,b)=> new Date(a.startDate) - new Date(b.startDate));
      const result = limit ? filtered.slice(0, Number(limit)) : filtered;
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
