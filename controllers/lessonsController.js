const asyncHandler = require('express-async-handler');
const lessonService = require('../services/lessonService');
const httpStatusText = require('../utils/httpStatusText');

const getAllLesson = asyncHandler(async (req, res) => {
    const lessons = await lessonService.getAllLessons();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { lessons } });
});

const getLesson = asyncHandler(async (req, res, next) => {
    try {
        const lesson = await lessonService.getLessonById(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { lesson } });
    } catch (error) {
        next(error);
    }
});

const postLesson = asyncHandler(async (req, res, next) => {
    try {
        const lesson = await lessonService.createLesson(req.body, req.file.buffer);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { lesson } });
    } catch (error) {
        next(error);
    }
});

const editLesson = asyncHandler(async (req, res, next) => {
    try {
        const lesson = await lessonService.updateLesson(req.params.id, req.body);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { lesson } });
    } catch (error) {
        next(error);
    }
});

const deleteLesson = asyncHandler(async (req, res, next) => {
    try {
        const lesson = await lessonService.deleteLesson(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { lesson } });
    } catch (error) {
        next(error);
    }
});

module.exports = { getAllLesson, getLesson, postLesson, editLesson, deleteLesson };


