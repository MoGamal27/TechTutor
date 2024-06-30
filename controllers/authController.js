const asyncHandler = require('express-async-handler');
const { registerUser, loginUser, logout } = require('../services/authservice');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const logger = require('../utils/logger');

const register = asyncHandler(async (req, res, next) => {
    try {
        const { fullName, email, password, confirmPassword, role } = req.body;
        const { buffer } = req.file;

        const newUser = await registerUser({ fullName, email, password, confirmPassword, role, buffer });

        res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
        
        logger.info('Register user');
    } catch (error) {
        const err = appError.create(error.message, 400, httpStatusText.ERROR);
        res.status(400).json({ error: err.message, status: httpStatusText.ERROR });
        logger.error(error); 
    }
});

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser({ email, password });

        res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
        
        logger.info('Login user');
    } catch (error) {
        const err = appError.create(error.message, 400, httpStatusText.ERROR);
        res.status(400).json({ error: err.message, status: httpStatusText.ERROR });
        logger.error(error);
    }
});

const logout_get = (req, res) => {

    logout(req, res);

    res.redirect('/');
   logger.info('Logout user');
};

module.exports = {
    register,
    login,
    logout_get
};
