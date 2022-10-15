'use strict';

require('dotenv').config();

const {
    Sequelize,
    DataTypes
} = require('sequelize');
const productModel = require('./product-model');
const cartModel = require('./cart-model');
const commentModel = require('./comment-model');
const massageModel = require('./massage-model');
const wishlistModel = require('./wishlist-model');
const userModel = require('./user-model');
const Collection = require('./data-collection');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
    process.env.NODE_ENV === "production" ? {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            native: true
        }
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

sequelize.options.logging = false;

const productTabel = productModel(sequelize, DataTypes);
const cartTabel = cartModel(sequelize, DataTypes);
const commentTabel = commentModel(sequelize, DataTypes);
const massageTabel = massageModel(sequelize, DataTypes);
const wishlistTabel = wishlistModel(sequelize, DataTypes);
const userTabel = userModel(sequelize, DataTypes);

const productCollection = new Collection(productTabel);
const cartCollection = new Collection(cartTabel);
const commentCollection = new Collection(commentTabel);
const massageCollection = new Collection(massageTabel);
const wishlistCollection = new Collection(wishlistTabel);

//RealtionShip:

// User has many products:
userTabel.hasMany(productTabel, {
    foreignKey: "user_id",
    sourceKey: "id"
});

productTabel.belongsTo(userTabel, {
    foreignKey: "user_id",
    targetKey: "id",
});

// User has many comments
userTabel.hasMany(commentTabel, {
    foreignKey: "user_id",
    sourceKey: "id"
});

commentTabel.belongsTo(userTabel, {
    foreignKey: "user_id",
    targetKey: "id",
});

// User has many messages
userTabel.hasMany(massageTabel, {
    foreignKey: "user_id",
    sourceKey: "id"
});

massageTabel.belongsTo(userTabel, {
    foreignKey: "user_id",
    targetKey: "id",
});

// User has one Cart
userTabel.hasOne(cartTabel, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
cartTabel.belongsTo(userTabel, {
    foreignKey: 'user_id',
    targetKey: 'id'
});

// User has one wishlist
userTabel.hasOne(wishlistTabel, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
wishlistTabel.belongsTo(userTabel, {
    foreignKey: 'user_id',
    targetKey: 'id'
});

// Cart has many Products
cartTabel.hasMany(productTabel, {
    foreignKey: "cart_id",
    sourceKey: "id"
});

productTabel.belongsTo(cartTabel, {
    foreignKey: "cart_id",
    targetKey: "id",
});

// Wishlist has many Products
wishlistTabel.hasMany(productTabel, {
    foreignKey: "wishlist_id",
    sourceKey: "id"
});

productTabel.belongsTo(wishlistTabel, {
    foreignKey: "wishlist_id",
    targetKey: "id",
});

// Product has many comments
productTabel.hasMany(commentTabel, {
    foreignKey: "comment_id",
    sourceKey: "id"
});

commentTabel.belongsTo(productTabel, {
    foreignKey: "comment_id",
    targetKey: "id",
});


module.exports = {
    db: sequelize,
    product: productCollection,
    cart: cartCollection,
    comment: commentCollection,
    massage: massageCollection,
    wishlist: wishlistCollection,
    users: userTabel,

    //Export Models
    productTabel,
    cartTabel,
    commentTabel,
    massageTabel,
    wishlistTabel,
    userTabel
}