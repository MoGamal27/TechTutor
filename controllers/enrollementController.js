const asyncHandler = require('express-async-handler');
const enrollmentService = require('../services/enrollmentService');
const httpStatusText = require('../utils/httpStatusText');

const createEnrollment = asyncHandler(async (req, res) => {
    const enrollment = await enrollmentService.createEnrollment(req.body);
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { enrollment } });
});

const getAllEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await enrollmentService.GetAllEnrollments();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { enrollments } });
}); 

const getEnrollmentById = asyncHandler(async (req, res, next) => {
    
    try {
        const enrollment = await enrollmentService.GetEnrollmentById(req.params.id);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { enrollment } });
    } catch (error) {
        next(error);
    }

})


module.exports = 
{
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById
}