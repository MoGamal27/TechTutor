const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

router.route('/register') 
               .post('/upload', upload.single('avatar'),authController.register)

router.route('/login')
              .post(authController.login) 

router.route('/logout')
       .get(authController.logout_get)
 
module.exports = router  