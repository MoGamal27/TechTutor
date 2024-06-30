const Wishlist = require('../models/wishlist');

const createWishlist = async (wishlistData) => {
    const wishlist = new Wishlist(wishlistData);
    await wishlist.save();
    return wishlist;
};

const GetAllWishlists = async () => {
    return await Wishlist.find();
};  

const deleteWishlist = async (id) => {
    const wishlist = await Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
        throw appError.create('Wishlist not found', 404);
    }
    return wishlist;
};

module.exports = {
    createWishlist,
    GetAllWishlists,
    deleteWishlist
}
