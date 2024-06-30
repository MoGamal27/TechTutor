const User = require('../models/users');
const appError = require('../utils/appError');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw appError.create('User not found', 404);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl = `https://localhost:3000/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetUrl}\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 minutes)',
        message
    });

    return resetToken;
};

const resetPassword = async (token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw appError.create('Token is invalid or has expired', 400);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return user;
};

module.exports = {
    forgotPassword,
    resetPassword
};
