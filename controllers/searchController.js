const asyncHandler = require('express-async-handler');
const searchService = require('../services/searchService');
const httpStatusText = require('../utils/httpStatusText');

const advancedSearch = asyncHandler(async (req, res, next) => {
    const { query, category, priceMin, priceMax, ratingMin, ratingMax } = req.query;
    const courses = await searchService.search(query, category, priceMin, priceMax, ratingMin, ratingMax);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
});

module.exports = { advancedSearch };
