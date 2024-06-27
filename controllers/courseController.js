const asyncHandler = require('express-async-handler');
const Course = require('../models/course');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const logger = require('../utils/logger');
const User = require('../models/users');
const sendEmail = require('../utils/sendEmail');

const getAllCourse = asyncHandler(async (req, res, next) => {

    const courses = await Course.find();

    res.status(200).json({status: httpStatusText.SUCCESS, data: {courses: courses}})
     
    logger.info('Get all courses')

})

const getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id);

    if(!course){
        const error = appError.create('Course not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {course: course}})

    logger.info('Get course')
})


const postCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.create(req.body);

    const user = await User.findById(course.instructor); 
    const message = `Hello ${user.name},\n\nA new course titled "${course.title}" has been created.\n\nBest regards,\nYour Team`;
  
    await sendEmail({
      email: user.email,
      subject: 'New Course Created',
      message: message
    });
  
    res.status(201).json({status: httpStatusText.SUCCESS, data: {course: course}});
    logger.info('Post course');

})

const editCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!course){
        const error = appError.create('Course not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {course: course}})

     logger.info('Edit course')
})

const deleteCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findByIdAndDelete(req.params.id);

    if(!course){
        const error = appError.create('Course not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {course: course}})

    logger.info('Delete course')
})


module.exports = {getAllCourse, getCourse, postCourse, editCourse, deleteCourse}



