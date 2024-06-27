const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

categorySchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'category',
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Category', categorySchema)