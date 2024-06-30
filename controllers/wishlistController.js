const asyncHandler = require('express-async-handler');
const wishlistService = require('../services/wishlistService');
const httpStatusText = require('../utils/httpStatusText');

const createWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.createWishlist(req.body);
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { wishlist } });
});

const getAllWishlists = asyncHandler(async (req, res) => {
    const wishlists = await wishlistService.GetAllWishlists();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { wishlists } });
});

const deleteWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.deleteWishlist(req.params.id);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { wishlist } });
});

module.exports = { createWishlist, getAllWishlists, deleteWishlist };
