const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const LearningPathController = require('../controllers/learningPathController');

// Optional-auth middleware: if token is valid, populate req.user; otherwise continue anonymously.
async function optionalAuth(req, res, next) {
  if (!req.headers.authorization) return next();
  try {
    await authentication(req, res, (err) => {
      if (err) {
        // ignore — proceed without user
        req.user = undefined;
      }
      next();
    });
  } catch (e) {
    next();
  }
}

router.get('/', optionalAuth, LearningPathController.list);
router.get('/:code', optionalAuth, LearningPathController.detail);
router.get('/:code/modules/:number', optionalAuth, LearningPathController.getModule);
router.post('/:code/enroll', authentication, LearningPathController.enroll);

module.exports = router;
