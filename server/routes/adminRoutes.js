const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const LectureController = require("../controllers/lectureController");
const UserController = require("../controllers/userController");
const AdminController = require("../controllers/adminController");
const AlumniController = require("../controllers/alumniController");
const EventController = require("../controllers/eventController");
const authentication = require("../middlewares/authentication");
const { adminAuthorization } = require("../middlewares/authorization");

router.use(authentication);
router.use(adminAuthorization);

// Dashboard
router.get("/dashboard", AdminController.getDashboard);
router.get("/statistics", AdminController.getStatistics);
router.get("/categories/stats", AdminController.getCategoriesStats);

// Categories
router.get("/categories", CategoryController.getAllCategories);
router.post("/categories", CategoryController.createCategory);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

// Courses (Lectures)
router.get("/lectures", LectureController.getAllLectures);
router.post("/lectures", LectureController.createLecture);
router.put("/lectures/:id", LectureController.updateLecture);
router.delete("/lectures/:id", LectureController.deleteLecture);

// Users
router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Events (Schedule)
router.get("/events", EventController.list);
router.post("/events", EventController.create);
router.put("/events/:id", EventController.update);
router.delete("/events/:id", EventController.remove);

// Alumni
router.get("/alumni", AlumniController.list);
router.post("/alumni", AlumniController.create);
router.put("/alumni/:id", AlumniController.update);
router.delete("/alumni/:id", AlumniController.remove);

module.exports = router;
