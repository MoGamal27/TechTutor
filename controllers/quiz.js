const asyncHandler = require('express-async-handler');
const quizService = require('../services/quizService');
const httpStatusText = require('../utils/httpStatusText');

const getAllQuiz = asyncHandler(async (req, res) => {
    const quizzes = await quizService.getAllQuizzes();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { quizzes } });
});

const getQuiz = asyncHandler(async (req, res, next) => {
    try {
        const quiz = await quizService.getQuizById(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { quiz } });
    } catch (error) {
        next(error);
    }
});

const postQuiz = asyncHandler(async (req, res, next) => {
    try {
        const quiz = await quizService.createQuiz(req.body);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { quiz } });
    } catch (error) {
        next(error);
    }
});

const editQuiz = asyncHandler(async (req, res, next) => {
    try {
        const quiz = await quizService.updateQuiz(req.params.id, req.body);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { quiz } });
    } catch (error) {
        next(error);
    }
});

const deleteQuiz = asyncHandler(async (req, res, next) => {
    try {
        const quiz = await quizService.deleteQuiz(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { quiz } });
    } catch (error) {
        next(error);
    }
});

module.exports = { getAllQuiz, getQuiz, postQuiz, editQuiz, deleteQuiz };

