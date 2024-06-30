const Coupon = require('../models/coupon');
const appError = require('../utils/appError');

const createCoupon = async (couponData) => {
    return await Coupon.create(couponData);
};

const applyCoupon = async (courseId, couponCode) => {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
        throw appError.create('Invalid coupon code', 400);
    }
    if (new Date(coupon.expiryDate) < new Date()) {
        throw appError.create('Coupon has expired', 400);
    }
    // Assume there's a function to get course by ID and update the price
    const course = await Course.findById(courseId); // Assuming Course is already required
    if (!course) {
        throw appError.create('Course not found', 404);
    }
    const discountedPrice = course.price * ((100 - coupon.discount) / 100);
    course.price = discountedPrice;
    await course.save();
    return course;
};

module.exports = {
    createCoupon,
    applyCoupon
};
