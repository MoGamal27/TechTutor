const asyncHandler = require('express-async-handler');
const couponService = require('../services/couponService');
const httpStatusText = require('../utils/httpStatusText');

const applyCoupon = asyncHandler(async (req, res, next) => {
    const { courseId, couponCode } = req.body;
    try {
        const course = await couponService.applyCoupon(courseId, couponCode);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
    } catch (error) {
        next(error);
    }
});

const createCoupon = asyncHandler(async (req, res, next) => {
    const { code, discount, expiryDate } = req.body;
    try {
        const coupon = await couponService.createCoupon({ code, discount, expiryDate });
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { coupon } });
    } catch (error) {
        next(error);
    }
});

module.exports = { applyCoupon, createCoupon };
