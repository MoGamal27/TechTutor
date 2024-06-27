const express = require('express');

const router = express.Router();

const {getAllReview, getReview, postReview, editReview, deleteReview} = require('../controllers/reviewController');


router.get('/', getAllReview);
router.get('/:id', getReview);
router.post('/', postReview);
router.put('/:id', editReview);
router.delete('/:id', deleteReview);


module.exports = router