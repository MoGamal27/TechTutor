const asyncHandler = require('express-async-handler');
const reviewService = require('../services/reviewService');
const httpStatusText = require('../utils/httpStatusText');

const getAllReview = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { reviews } });
});

const getReview = asyncHandler(async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { review } });
    } catch (error) {
        next(error);
    }
});

const postReview = asyncHandler(async (req, res, next) => {
    try {
        const review = await reviewService.createReview(req.body);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { review } });
    } catch (error) {
        next(error);
    }
});

const editReview = asyncHandler(async (req, res, next) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.body);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { review } });
    } catch (error) {
        next(error);
    }
});

const deleteReview = asyncHandler(async (req, res, next) => {
    try {
        const review = await reviewService.deleteReview(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { review } });
    } catch (error) {
        next(error);
    }
});

module.exports = { getAllReview, getReview, postReview, editReview, deleteReview };
