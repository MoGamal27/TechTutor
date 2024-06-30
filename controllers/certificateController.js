const asyncHandler = require('express-async-handler');
const certificateService = require('../services/certificateService');
const httpStatusText = require('../utils/httpStatusText');

const generateCertificate = asyncHandler(async (req, res, next) => {
    const { courseId, userId } = req.body;
    try {
        const certificate = await certificateService.createCertificate(courseId, userId);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { certificate } });
    } catch (error) {
        next(error);
    }
});

const getCertificate = asyncHandler(async (req, res, next) => {
    const { courseId, userId } = req.params;
    try {
        const certificate = await certificateService.getCertificate(courseId, userId);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { certificate } });
    } catch (error) {
        next(error);
    }
});

module.exports = { generateCertificate, getCertificate };
