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

module.exports = router;
