const mongoose = require('mongoose');

const quiz = new mongoose.Schema({
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lessons',
        required: true,
    },
    questions:[
        {
            questionText: {
                type: String,
                required: true
            },
            answers:[
                {
                    answerText: {
                        type: String,
                        required: true
                    },
                    isCorrect: { 
                        type: Boolean,
                    }
                }
            ]
        }
    ]

    } 
);

module.exports = mongoose.model('Quiz', quiz)