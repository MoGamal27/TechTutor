const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    certificateUrl: {
        type: String,
        required: true
    }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
