const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const allowTo = require('../middleware/allowedTo');

const userRoles = require('../utils/userRoles');

const { getAllCategory, getCategory, postCategory, editCategory, deleteCategory } = require('../controllers/categoryController');


router.get('/', getAllCategory);
router.get('/:id', getCategory);
router.post('/', verifyToken , allowTo(userRoles.INSTRUCTOR),postCategory);
router.put('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR),editCategory);
router.delete('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR),deleteCategory);


module.exports = router