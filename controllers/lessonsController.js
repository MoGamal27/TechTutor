const asyncHandler = require('express-async-handler');
const Lesson = require('../models/lessons');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const { uploader } = require('cloudinary').v2;

const getAllLesson = asyncHandler(async (req, res, next) => {

    const lessons = await Lesson.find();

    res.status(200).json({status: httpStatusText.SUCCESS, data: {lessons: lessons}})

})

const getLesson = asyncHandler(async (req, res, next) => {

    const lesson = await Lesson.findById(req.params.id);

    if(!lesson){
        const error = appError.create('Lesson not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {lesson: lesson}})

})

const postLesson = asyncHandler(async (req, res, next) => {
     
        const { title, description, course } = req.body;
        const { buffer } = req.file;
        
        uploader.upload_stream(
            { resource_type: 'video', folder: 'videos' },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                
                
                const lesson = new Lesson({
                    title,
                    description,
                    video: [{
                        title: req.body.videoTitle, 
                        url: result.secure_url,
                        cloudinary_id: result.public_id
                    }],
                    course
                });
    
                try {
                    await lesson.save();
                    res.status(200).json({ status: httpStatusText.SUCCESS, data: { lesson } });
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
        ).end(buffer);

})

const editLesson = asyncHandler(async (req, res, next) => {

    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!lesson){    
        const error = appError.create('Lesson not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {lesson: lesson}})

})

const deleteLesson = asyncHandler(async (req, res, next) => {

    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if(!lesson){
        const error = appError.create('Lesson not found', 404, httpStatusText.ERROR);
        return next(error);
    }

    res.status(200).json({status: httpStatusText.SUCCESS, data: {lesson: lesson}})

})



module.exports = {getAllLesson, getLesson, postLesson, editLesson, deleteLesson}

