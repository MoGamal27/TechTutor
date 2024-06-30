const Enrollment = require('../models/enrollment');

const createEnrollment = async (enrollmentData) => {
    const enrollment = new Enrollment(enrollmentData);
    await enrollment.save();
    return enrollment;
};

const GetAllEnrollments = async () => {
    return await Enrollment.find();
};

const GetEnrollmentById = async (id) => {
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
        throw appError.create('Enrollment not found', 404);
    }
    return enrollment;
}
module.exports = {
    createEnrollment,
    GetAllEnrollments,
    GetEnrollmentById
}
