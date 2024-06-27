const asyncHandler = require('express-async-handler');
const Review = require('../models/review');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');


const getAllReview = asyncHandler(async (req, res, next) => {

    const reviews = await Review.find();

    res.status(200).json({status: httpStatusText.SUCCESS, data: {reviews: reviews}})

})

const getReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findById(req.params.id);

    if(!review){
        const error = appError.create('Review not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {review: review}})

})

const postReview = asyncHandler(async (req, res, next) => {

    const review = await Review.create(req.body);

    res.status(200).json({status: httpStatusText.SUCCESS, data: {review: review}})

})

const editReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!review){
        const error = appError.create('Review not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {review: review}})

})

const deleteReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findByIdAndDelete(req.params.id);

    if(!review){
        const error = appError.create('Review not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {review: review}})

})


module.exports = {
    getAllReview, 
    getReview, 
    postReview, 
    editReview, 
    deleteReview
}
