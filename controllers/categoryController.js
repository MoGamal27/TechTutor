const asyncHandler = require('express-async-handler');
const categoryService = require('../services/categoryService');
const httpStatusText = require('../utils/httpStatusText');

const getAllCategory = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { categories } });
});

const getCategory = asyncHandler(async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { category } });
    } catch (error) {
        next(error);
    }
});

const postCategory = asyncHandler(async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { category } });
    } catch (error) {
        next(error);
    }
});

const editCategory = asyncHandler(async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { category } });
    } catch (error) {
        next(error);
    }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { category } });
    } catch (error) {
        next(error);
    }
});

module.exports = { getAllCategory, getCategory, postCategory, editCategory, deleteCategory };
