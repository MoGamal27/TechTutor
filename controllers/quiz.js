const asyncHandler = require('express-async-handler');
const Quiz = require('../models/quiz');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');


const getAllQuiz = asyncHandler(async (req, res, next) => {

    const quizs = await Quiz.find();

    res.status(200).json({status: httpStatusText.SUCCESS, data: {quizs: quizs}})

})

const getQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.findById(req.params.id);

    if(!quiz){
        const error = appError.create('Quiz not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {quiz: quiz}})

})

const postQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.create(req.body);

    res.status(200).json({status: httpStatusText.SUCCESS, data: {quiz: quiz}})

})


const editQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!quiz){
        const error = appError.create('Quiz not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {quiz: quiz}})

})

const deleteQuiz = asyncHandler(async (req, res, next) => {

    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if(!quiz){
        const error = appError.create('Quiz not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {quiz: quiz}})

})

module.exports = {getAllQuiz, getQuiz, postQuiz, editQuiz, deleteQuiz}