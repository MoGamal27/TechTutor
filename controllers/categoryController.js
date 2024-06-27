const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');


const getAllCategory = asyncHandler(async (req, res, next) => {

    const categories = await Category.find();

    res.status(200).json({status: httpStatusText.SUCCESS, data: {categories: categories}})


})

const getCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id).populate('courses').exec();

    if(!category){
        const error = appError.create('Category not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {category: category}})


})

const postCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.create(req.body);

    res.status(201).json({status: httpStatusText.SUCCESS, data: {category: category}})


})

const editCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!category){
        const error = appError.create('Category not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {category: category}})

})

const deleteCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findByIdAndDelete(req.params.id);

    if(!category){
        const error = appError.create('Category not found', 404, httpStatusText.ERROR);
        return next(error);
    }
    

    res.status(200).json({status: httpStatusText.SUCCESS, data: {category: category}})


})



module.exports = {
    getAllCategory, 
    getCategory, 
    postCategory, 
    editCategory, 
    deleteCategory
}