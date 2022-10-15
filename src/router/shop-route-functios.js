'use strict';

require('dotenv').config();
const socketPort = process.env.SOCKET_PORT;
const io = require('socket.io-client');
let host = `http://localhost:${socketPort}/`;

const serverConnection = io.connect(host);

const {
    productTabel,
    orderTabel,
    cartTabel,
    commentTabel,
    // massageTabel,
    wishlistTabel,
    userTabel,
} = require('../models/index-model');

async function addProductToCart(req, res) {
    const product_id = req.params.id;
    const userId = req.user.id;
    let product = await productTabel.findOne({
        where: {
            id: product_id
        }
    });
    if (product) {
            let newProduct = await cartTabel.create({
                product_id,
                user_id: userId,
            })
            console.log(newProduct);
            let originalProduct = await productTabel.findOne({
                where: {
                    id: product_id,
                }
            })
            res.status(201).json(originalProduct);

    } else {
        console.log('Product is not avaliable');
        res.status(403).send('Product is not avaliable');
    }
}

async function addProductToWishList(req, res) {
    const product_id = req.params.id;
    const userId = req.user.id;
    let product = await productTabel.findOne({
        where: {
            id: product_id
        }
    });

    if (product) {
        let newProduct = await wishlistTabel.create({
                    product_id,
                    user_id: userId,
        })
                res.status(201).json(newProduct);
    } else {
        console.log('Product is not avaliable');
        res.status(403).send('Product is not avaliable');
    }
}


async function addProductFromWishListToCart(req, res) {
    const productId = req.params.id;
    const userId = req.user.id;
    let productInWishList = await wishlistTabel.findOne({
        where: {
            product_id: productId
        }
    });
    if (productInWishList) {
        let productInCart = await cartTabel.create({
            user_id: userId,
            product_id: productId,
        });
        res.status(201).json(productInCart);
    } else {
        console.log('Product is not in your Wishlist');
        res.status(403).send('Product is not avaliable in your Wishlist');
    }
}


module.exports = {
    addProductToCart,
    addProductToWishList,
    addProductFromWishListToCart,
};
