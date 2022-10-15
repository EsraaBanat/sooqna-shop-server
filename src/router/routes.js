'use strict';

const express = require('express');
const router = express.Router();
// const dataModules = require('../models/data-collection');
const basicAuth = require('../middlewares/basic');
const bearerAuth = require('../middlewares/bearer');
const permissions = require('../middlewares/acl');


const {
    // AUTH Functions :
    handleSignup,
    handleGetUsers,
    handleSignIn,
    homePage
} = require('./auth-routes');

const {
    // Admin Functions :
    deleteUser,
    getUsersAdmin,
    getProductAdmin,
    deleteOneProductByAdmin,
} = require('./adminRoutes');

const {
    // Products Functions :
    getAllProducts,
    getAllProductsForUser,
    createProduct,
    updateProduct,
    deleteOneProduct,
    deleteAllProduct,
    getOneProduct,
} = require('./products-routes');


const {
    // Wishlist Functions :
    getAllWishlist,
    deleteOneWishlist,
    deleteAllWishlist,
} = require('./wishList-routes');

const {
    //  Cart Functions : 
    getAllCart,
    deleteOneCart,
    deleteAllCart,
} = require('./cart-routes');


const {
    //Shopping Functions :
    addProductToCart,
    addProductToWishList,
    addProductFromWishListToCart,
} = require('./shop-route-functios');

const {
    // Setting Functions for User profile :
    userInfo,
    updateUserProfile,
    deleteUserProfile,
} = require("./userAccountSetting");


const {
    //Rating Functions :
    addComment,
    getComment
} = require('./comment-route');

const {
    // Messageing Functions :
    joinConversation,
    sendMessage,
    getMessgesBetweenUsers,
    getAllMessages,

} = require("./meseging");



/*..................AUTH ROUTES......................*/
router.get('/', homePage);
router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignIn);
router.get('/users', bearerAuth, permissions('delete'), handleGetUsers);

/*..................Admin ROUTES......................*/
router.get('/admin/users', bearerAuth, getUsersAdmin);
router.get('/admin/product', bearerAuth, getProductAdmin);
router.delete('/admin/deleteuser/:id', bearerAuth, deleteUser);
router.delete('/admin/deleteproduct/:id', bearerAuth, deleteOneProductByAdmin);


/*..................Product ROUTES......................*/
router.get('/product',  getAllProducts);
router.get('/product/user/:userId', bearerAuth, getAllProductsForUser);
router.get('/product/:id', getOneProduct);
router.post('/product', bearerAuth, createProduct);
router.put('/product/:id', bearerAuth, updateProduct);
router.delete('/product/:id', bearerAuth, deleteOneProduct);
router.delete('/product', bearerAuth, deleteAllProduct);

/*..................Wishlist ROUTES......................*/
router.get('/wishlist', bearerAuth, getAllWishlist); 
router.delete('/wishlist/:id', bearerAuth, deleteOneWishlist); 
router.delete('/wishlist', bearerAuth, deleteAllWishlist);

/*..................Cart ROUTES......................*/
router.get('/cart', bearerAuth, getAllCart);
router.delete('/cart/:id', bearerAuth, deleteOneCart); 
router.delete('/cart', bearerAuth, deleteAllCart);

/*..................Shop ROUTES......................*/
router.post('/addtocart/:id', bearerAuth, addProductToCart);
router.post('/addtowishlist/:id', bearerAuth, addProductToWishList);
router.post('/productfromwishlisttocart/:id', bearerAuth, addProductFromWishListToCart);

/*..................User Setting ROUTES......................*/
router.get('/userinfo', bearerAuth, userInfo); // we can handel it in frontend , we don't need this userInfo route
router.put('/updateprofile', bearerAuth, updateUserProfile);
router.delete('/deleteprofile', bearerAuth, deleteUserProfile);

/*..................Comment ROUTES......................*/
router.get('/comment/:id', bearerAuth, getComment);
router.post('/comment/:id', bearerAuth, addComment);

/*............... Messages / Chat ROUTES...................*/
router.post('/joinroom/:id', bearerAuth, joinConversation);
router.post('/sendmessage/:id', bearerAuth, sendMessage);
router.get('/allmessages/:id', bearerAuth, getMessgesBetweenUsers);
router.get('/allmessages', bearerAuth, getAllMessages);


module.exports = router;
