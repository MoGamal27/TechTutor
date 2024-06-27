const mongoose = require('mongoose');


const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video:[
        {
            title: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            cloudinary_id: { 
                type: String, 
                required: true 
            }
        }, 
    ],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
});

module.exports = mongoose.model('Lessons', LessonSchema)