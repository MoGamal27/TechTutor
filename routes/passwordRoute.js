const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/passwordController');
const router = express.Router();

router.post('/api/users/forgot-password', forgotPassword);
router.post('/api/users/reset-password', resetPassword);

module.exports = router;
