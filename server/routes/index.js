const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const lectureRoutes = require("./lectureRoutes");
const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const chatbotRoutes = require("./chatbotRoutes");
const lessonRoutes = require("./lessonRoutes");
const quizRoutes = require("./quizRoutes");
const articleRoutes = require("./articleRoutes");
const learningPathRoutes = require("./learningPathRoutes");
const progressRoutes = require("./progressRoutes");
const certificateRoutes = require("./certificateRoutes");

// Public routes
router.use("/public", publicRoutes);

// Auth routes
router.use("/users", userRoutes);

// Protected routes
router.use("/categories", categoryRoutes);
router.use("/lectures", lectureRoutes);
router.use("/admin", adminRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/lessons", lessonRoutes);
router.use("/quiz", quizRoutes);
router.use("/articles", articleRoutes);

// E-Learning routes (Phase 2)
router.use("/learning-paths", learningPathRoutes);
router.use("/progress", progressRoutes);
router.use("/certificates", certificateRoutes);

module.exports = router;
