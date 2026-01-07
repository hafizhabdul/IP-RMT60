const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');
const authentication = require('../middlewares/authentication');
const { adminAuthorization } = require('../middlewares/authorization');

// Public routes (still need auth for tracking)
router.get('/questions', QuizController.getQuestions);
router.get('/filters', QuizController.getFilters);

// User routes (require authentication)
router.post('/submit', authentication, QuizController.submitQuiz);
router.get('/history', authentication, QuizController.getHistory);
router.get('/attempts/:id', authentication, QuizController.getAttempt);

// Admin routes
router.get('/admin/questions', authentication, adminAuthorization, QuizController.getAllQuestions);
router.post('/admin/questions', authentication, adminAuthorization, QuizController.createQuestion);
router.put('/admin/questions/:id', authentication, adminAuthorization, QuizController.updateQuestion);
router.delete('/admin/questions/:id', authentication, adminAuthorization, QuizController.deleteQuestion);

module.exports = router;
