const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// This function generates a PDF certificate and returns the URL
const generateCertificatePDF = async (courseId, userId) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const certPath = path.join(__dirname, '..', 'certificates', `${courseId}-${userId}.pdf`);
        
        doc.pipe(fs.createWriteStream(certPath));

        doc.fontSize(25).text('Certificate of Completion', 100, 80);
        doc.fontSize(20).text(`This certifies that user ${userId} has completed the course ${courseId}.`, 100, 150);

        doc.end();

        doc.on('finish', () => {
            resolve(`http://localhost:3000/certificates/${courseId}-${userId}.pdf`);
        });

        doc.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = {
    generateCertificatePDF
};
