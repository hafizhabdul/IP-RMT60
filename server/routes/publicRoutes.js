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
router.get("/events/:id", async (req, res, next) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const EVENTS_FILE = path.join(__dirname, "..", "data", "events.json");
    const raw = await fs.promises.readFile(EVENTS_FILE, 'utf8').catch(()=>"[]");
    const events = JSON.parse(raw || "[]");
    const event = events.find(e => String(e.id) === String(req.params.id));
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) { next(err); }
});

module.exports = router;
