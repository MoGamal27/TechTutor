const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const generateJWT = require('../utils/generateJWT');
const { uploader } = require('cloudinary').v2;

const registerUser = async ({ fullName, email, password, confirmPassword, role, buffer }) => {
    const existUser = await User.findOne({ email });

    if (existUser) {
        throw appError.create('User already exists', 400, httpStatusText.ERROR);
    }

    if (password !== confirmPassword) {
        throw appError.create('Passwords do not match', 400, httpStatusText.ERROR);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        uploader.upload_stream(
            { resource_type: 'image', folder: 'avatars' },
            async (error, result) => {
                if (error) {
                    return reject(error);
                }

                const newUser = new User({
                    fullName,
                    email,
                    password: hashedPassword,
                    confirmPassword: hashedPassword,
                    role,
                    avatar: [{
                        url: result.secure_url,
                        cloudinary_id: result.public_id
                    }]
                });

                const token = await generateJWT({ id: newUser._id, role: newUser.role });
                newUser.token = token;

                await newUser.save();

                resolve(newUser);
            }
        ).end(buffer);
    });
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw appError.create('User not registered', 400, httpStatusText.ERROR);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw appError.create('Wrong password', 400, httpStatusText.ERROR);
    }

    const token = await generateJWT({ id: user._id, role: user.role });

    user.token = token;

    await user.save();

    return user;
};

const logout = async (req, res, next) => {

    req.user.token = null;
    await req.user.save();

    res.redirect('/');

}
module.exports = {
    registerUser,
    loginUser,
    logout
};




