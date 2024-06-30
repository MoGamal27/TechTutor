const express = require('express');

const router = express.Router();

const {getAllWishlists, createWishlist, deleteWishlist} = require('../controllers/wishlistController');

router.get('/', getAllWishlists);
router.post('/', createWishlist);
router.delete('/:id', deleteWishlist);

module.exports = router
