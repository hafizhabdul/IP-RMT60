const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const CertificateController = require('../controllers/certificateController');

router.get('/verify/:qrToken', CertificateController.verify); // public
router.get('/me', authentication, CertificateController.listMine);

module.exports = router;
