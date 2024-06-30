const Category = require('../models/category');
const appError = require('../utils/appError');

const getAllCategories = async () => {
    return await Category.find();
};

const getCategoryById = async (id) => {
    const category = await Category.findById(id).populate('courses').exec();
    if (!category) {
        throw appError.create('Category not found', 404);
    }
    return category;
};

const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

const updateCategory = async (id, categoryData) => {
    const category = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    if (!category) {
        throw appError.create('Category not found', 404);
    }
    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw appError.create('Category not found', 404);
    }
    return category;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
