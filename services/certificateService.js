const Certificate = require('../models/certificate');
const appError = require('../utils/appError');
const { generateCertificatePDF } = require('../utils/certificateGenerator'); // Assume this utility function generates and returns the URL of the certificate PDF

const createCertificate = async (courseId, userId) => {
   
    const certificateUrl = await generateCertificatePDF(courseId, userId);
    
    const certificate = new Certificate({
        course: courseId,
        user: userId,
        certificateUrl
    });

    await certificate.save();
    return certificate;
};

const getCertificate = async (courseId, userId) => {
    const certificate = await Certificate.findOne({ course: courseId, user: userId });
    if (!certificate) {
        throw appError.create('Certificate not found', 404);
    }
    return certificate;
};

module.exports = {
    createCertificate,
    getCertificate
};
