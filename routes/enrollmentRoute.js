const express = require('express');

const router = express.Router();
const {createEnrollment, GetAllEnrollments, GetEnrollmentById} = require('../controllers/enrollmentController');

router.post('/', createEnrollment);
router.get('/', GetAllEnrollments);
router.get('/:id', GetEnrollmentById);

module.exports = router