const express = require('express');
const { generateCertificate, getCertificate } = require('../controllers/certificateController');
const router = express.Router();
const allowTo = require('../middleware/allowedTo');

router.post('/api/courses/:courseId/certificate', allowTo('admin'), generateCertificate);


router.get('/api/courses/:courseId/certificate/:userId', getCertificate);

module.exports = router;
