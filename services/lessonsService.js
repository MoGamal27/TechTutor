const Lesson = require('../models/lessons');
const appError = require('../utils/appError');
const { uploader } = require('cloudinary').v2;

const getAllLessons = async () => {
    return await Lesson.find();
};

const getLessonById = async (id) => {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
        throw appError.create('Lesson not found', 404);
    }
    return lesson;
};

const createLesson = async (lessonData, fileBuffer) => {
    const { title, description, course, videoTitle } = lessonData;

    return new Promise((resolve, reject) => {
        uploader.upload_stream(
            { resource_type: 'video', folder: 'videos' },
            async (error, result) => {
                if (error) {
                    return reject(new Error(error.message));
                }
                
                const lesson = new Lesson({
                    title,
                    description,
                    video: [{
                        title: videoTitle,
                        url: result.secure_url,
                        cloudinary_id: result.public_id
                    }],
                    course
                });

                try {
                    await lesson.save();
                    resolve(lesson);
                } catch (err) {
                    reject(new Error(err.message));
                }
            }
        ).end(fileBuffer);
    });
};

const updateLesson = async (id, lessonData) => {
    const lesson = await Lesson.findByIdAndUpdate(id, lessonData, { new: true });
    if (!lesson) {
        throw appError.create('Lesson not found', 404);
    }
    return lesson;
};

const deleteLesson = async (id) => {
    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) {
        throw appError.create('Lesson not found', 404);
    }
    return lesson;
};

module.exports = {
    getAllLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};
