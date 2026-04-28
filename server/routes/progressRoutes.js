const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const ProgressController = require('../controllers/progressController');

router.use(authentication);

router.get('/me', ProgressController.getMyProgress);
router.post('/steps/:id/start', ProgressController.startStep);
router.post('/steps/:id/complete', ProgressController.completeStep);

module.exports = router;
