const express = require("express");
const router = express.Router();
const LectureController = require("../controllers/lectureController");
const authentication = require("../middlewares/authentication");
const { adminAuthorization } = require("../middlewares/authorization");
const { checkCourseAccess } = require("../middlewares/courseAccess");

// Public routes
router.get("/", LectureController.getAllLectures);

// User protected routes (course access for paid users) - put specific routes first
router.get("/my-courses", authentication, LectureController.getUserCourses);
router.get("/content/:id", authentication, checkCourseAccess, LectureController.getCourseContent);

// Public route with parameter (put after specific routes)
router.get("/:id", LectureController.getLectureById);

// Protected routes (Admin only)
router.use(authentication);
router.use(adminAuthorization);
router.post("/", LectureController.createLecture);
router.put("/:id", LectureController.updateLecture);
router.delete("/:id", LectureController.deleteLecture);

module.exports = router;