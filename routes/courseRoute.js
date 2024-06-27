const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const allowTo = require('../middleware/allowedTo');

const userRoles = require('../utils/userRoles');

const { getAllCourse, getCourse, postCourse, editCourse, deleteCourse } = require('../controllers/courseController');


router.get('/', getAllCourse);
router.get('/:id', getCourse);
router.post('/', verifyToken , allowTo(userRoles.INSTRUCTOR),postCourse);
router.put('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR) ,editCourse);
router.delete('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR), deleteCourse);

module.exports = router