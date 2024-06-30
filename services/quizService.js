const Quiz = require('../models/quiz');
const appError = require('../utils/appError');

const getAllQuizzes = async () => {
    return await Quiz.find();
};

const getQuizById = async (id) => {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
        throw appError.create('Quiz not found', 404);
    }
    return quiz;
};

const createQuiz = async (quizData) => {
    return await Quiz.create(quizData);
};

const updateQuiz = async (id, quizData) => {
    const quiz = await Quiz.findByIdAndUpdate(id, quizData, { new: true });
    if (!quiz) {
        throw appError.create('Quiz not found', 404);
    }
    return quiz;
};

const deleteQuiz = async (id) => {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
        throw appError.create('Quiz not found', 404);
    }
    return quiz;
};

module.exports = {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
};
