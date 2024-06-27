const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');
const { uploader } = require('cloudinary').v2;


const register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, confirmPassword, role } = req.body;
    const { buffer } = req.file;

    const existUser = await User.findOne({ email });

    if (existUser) {
        const error = appError.create('User already exists', 400, httpStatusText.ERROR);
        return res.status(400).json({ error: error.message, status: httpStatusText.ERROR });
    }

    if (password !== confirmPassword) {
        const error = appError.create('Passwords do not match', 400, httpStatusText.ERROR);
        return res.status(400).json({ error: error.message, status: httpStatusText.ERROR });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    uploader.upload_stream(
        { resource_type: 'image', folder: 'avatars' },
        async (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
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

            res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
        }
    ).end(buffer);
});



const login = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user){
        const error = appError.create('User not register', 400, httpStatusText.ERROR);
        return res.status(400).json({error: error.message, status: httpStatusText.ERROR,});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        const error = appError.create('Wrong password', 400, httpStatusText.ERROR);
        return res.status(400).json({error: error.message, status: httpStatusText.ERROR,});
}
   
    const token = await generateJWT({id: user._id, role: user.role});

    user.token = token;

    await user.save()
    
    res.status(200).json({status: httpStatusText.SUCCESS, data: {user: user}})
})


const logout_get = (req, res) => {
    res.redirect('/');
  }

module.exports = {
    register,
    login,
    logout_get
}