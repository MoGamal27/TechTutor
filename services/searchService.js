const Course = require('../models/course');
const User = require('../models/users');
const Category = require('../models/category');

const search = async (query, category, priceMin, priceMax, ratingMin, ratingMax) => {
    const filter = {};

    if (query) {
        filter.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }

    if (category) {
        const categoryDoc = await Category.findOne({ name: category });
        if (categoryDoc) {
            filter.category = categoryDoc._id;
        }
    }

    if (priceMin !== undefined) filter.price = { ...filter.price, $gte: priceMin };
    if (priceMax !== undefined) filter.price = { ...filter.price, $lte: priceMax };
    if (ratingMin !== undefined) filter.rating = { ...filter.rating, $gte: ratingMin };
    if (ratingMax !== undefined) filter.rating = { ...filter.rating, $lte: ratingMax };

    const courses = await Course.find(filter).populate('instructor', 'name').populate('category', 'name');

    return courses;
};

module.exports = {
    search
};
