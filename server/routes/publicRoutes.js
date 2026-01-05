const express = require("express");
const router = express.Router();
const PublicController = require("../controllers/publicController");

// Public routes for categories
router.get("/categories", PublicController.getCategories);
router.get("/categories/:id", PublicController.getCategoryById);

// Public routes for lectures
router.get("/lectures", PublicController.getLectures);
router.get("/lectures/:id", PublicController.getLectureById);

// Homepage bundle
router.get("/homepage-bundle", PublicController.getHomepageBundle);

// Public requests: contact and enrollment (no auth)
router.post("/contact", PublicController.postContactRequest);
router.post("/enrollments", PublicController.postEnrollmentRequest);

// Public alumni listing
router.get("/alumni", PublicController.getAlumni);

// Public events (schedule)
router.get("/events", PublicController.getEvents);
router.get("/events/:id", PublicController.getEventById);

module.exports = router;
