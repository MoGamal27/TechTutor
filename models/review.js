const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    rating: {
        type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
        type: String,
        required: true    
    }
});


module.exports = mongoose.model('Review', reviewSchema)