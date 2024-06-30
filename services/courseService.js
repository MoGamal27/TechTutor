const Course = require('../models/course');
const User = require('../models/users');
const appError = require('../utils/appError');
const sendEmail = require('../utils/sendEmail');

const getAllCourses = async () => {
    return await Course.find();
};

const getCourseById = async (id) => {
    const course = await Course.findById(id);
    if (!course) {
        throw appError.create('Course not found', 404);
    }
    return course;
};

const createCourse = async (courseData) => {
    const course = await Course.create(courseData);
    const user = await User.findById(course.instructor);
    const message = `Hello ${user.name},\n\nA new course titled "${course.title}" has been created.\n\nBest regards,\nYour Team`;

    await sendEmail({
        email: user.email,
        subject: 'New Course Created',
        message: message
    });
    return course;
};

const updateCourse = async (id, courseData) => {
    const course = await Course.findByIdAndUpdate(id, courseData, { new: true });
    if (!course) {
        throw appError.create('Course not found', 404);
    }
    return course;
};

const deleteCourse = async (id) => {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
        throw appError.create('Course not found', 404);
    }
    return course;
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
