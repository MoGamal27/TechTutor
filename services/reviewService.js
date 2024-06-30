const Review = require('../models/review');
const appError = require('../utils/appError');

const getAllReviews = async () => {
    return await Review.find();
};

const getReviewById = async (id) => {
    const review = await Review.findById(id);
    if (!review) {
        throw appError.create('Review not found', 404);
    }
    return review;
};

const createReview = async (reviewData) => {
    return await Review.create(reviewData);
};

const updateReview = async (id, reviewData) => {
    const review = await Review.findByIdAndUpdate(id, reviewData, { new: true });
    if (!review) {
        throw appError.create('Review not found', 404);
    }
    return review;
};

const deleteReview = async (id) => {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
        throw appError.create('Review not found', 404);
    }
    return review;
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
