const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail , 'filed must be a valid email address']
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    confirmPassword: {
        type: String,
        required:[true, 'Confirm password is required'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords must match'
        }
    },

    token: {
        type: String
    },

    role: {
        type: String, 
        enum: [userRoles.STUDENT, userRoles.ADMIN, userRoles.INSTRUCTOR],
        default: userRoles.STUDENT
    },

    avatar:[
        {
            url: {
                type: String,
                required: true
            },
            cloudinary_id: { 
                type: String, 
                required: true 
            }
        }
    ] 
        

})

module.exports = mongoose.model('users', userSchema);
