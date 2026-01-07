const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');
const authentication = require('../middlewares/authentication');

// Public routes
router.get('/', ArticleController.getArticles);
router.get('/filters', ArticleController.getFilters);
router.get('/search', ArticleController.search);
router.get('/:slug', ArticleController.getArticle);
router.get('/:slug/related', ArticleController.getRelated);

// Authenticated routes
router.post('/:articleId/progress', authentication, ArticleController.updateProgress);
router.get('/user/progress', authentication, ArticleController.getUserProgress);

module.exports = router;
