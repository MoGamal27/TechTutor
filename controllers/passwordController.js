const asyncHandler = require('express-async-handler');
const passwordService = require('../services/passwordService');
const httpStatusText = require('../utils/httpStatusText');

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    await passwordService.forgotPassword(email);
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Token sent to email!' });
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const { token, newPassword } = req.body;
    const user = await passwordService.resetPassword(token, newPassword);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});

module.exports = { forgotPassword, resetPassword };
