const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const allowTo = require('../middleware/allowedTo');

const userRoles = require('../utils/userRoles');

const {getAllQuiz, getQuiz, postQuiz, editQuiz, deleteQuiz} = require('../controllers/quiz')

router.get('/', getAllQuiz);
router.get('/:id', getQuiz);
router.post('/', verifyToken , allowTo(userRoles.INSTRUCTOR),postQuiz);
router.put('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR) ,editQuiz);
router.delete('/:id', verifyToken, allowTo(userRoles.INSTRUCTOR), deleteQuiz);

module.exports = router