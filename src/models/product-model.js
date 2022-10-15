'use strict';

const productModel = (sequelize, DataTypes) =>
    sequelize.define('Products', {
        title: {
            type: DataTypes.STRING,
            required: true
        },
        description: {
            type: DataTypes.STRING(1000),
        },
        image: {
            type: DataTypes.STRING,
            required: true
        },
        price: {
            type: DataTypes.STRING,
            required: true
        },
        quantity: {
            type: DataTypes.STRING,
            required: true
        },
        color: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
            // required: true
        },
        // foreign key
        cart_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        wishlist_id: {
            type: DataTypes.INTEGER,
        },
        comment_id: {
            type: DataTypes.STRING,
        },
    });
module.exports = productModel;
