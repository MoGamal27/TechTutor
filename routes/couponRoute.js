const express = require('express');
const { applyCoupon, createCoupon } = require('../controllers/couponController');
const router = express.Router();
const allowTo = require('../middleware/allowedTo');

router.post('/api/coupons/apply', applyCoupon);

// Create Coupon (Admin)
router.post('/api/admin/coupons', allowTo('admin'), createCoupon);

module.exports = router;
