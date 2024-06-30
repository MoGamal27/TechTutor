const asyncHandler = require('express-async-handler');
const courseService = require('../services/courseService');
const httpStatusText = require('../utils/httpStatusText');
const logger = require('../utils/logger');

const getAllCourse = asyncHandler(async (req, res) => {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
    logger.info('Get all courses');
});

const getCourse = asyncHandler(async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
        logger.info('Get course');
    } catch (error) {
        next(error);
    }
});

const postCourse = asyncHandler(async (req, res, next) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } });
        logger.info('Post course');
    } catch (error) {
        next(error);
    }
});

const editCourse = asyncHandler(async (req, res, next) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
        logger.info('Edit course');
    } catch (error) {
        next(error);
    }
});

const deleteCourse = asyncHandler(async (req, res, next) => {
    try {
        const course = await courseService.deleteCourse(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
        logger.info('Delete course');
    } catch (error) {
        next(error);
    }
});

module.exports = { getAllCourse, getCourse, postCourse, editCourse, deleteCourse };



