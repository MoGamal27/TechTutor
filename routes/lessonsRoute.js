const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const allowTo = require('../middleware/allowedTo');
const userRoles = require('../utils/userRoles');
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

 

const { getAllLesson, getLesson, postLesson, editLesson, deleteLesson } = require('../controllers/lessonsController');


router.get('/', getAllLesson);
router.get('/:id', getLesson);
router.post('/', verifyToken , allowTo(userRoles.INSTRUCTOR),'/upload', upload.single('video'),postLesson);
router.put('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR) ,editLesson);
router.delete('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR), deleteLesson);


module.exports = router