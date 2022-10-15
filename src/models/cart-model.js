"use strict";

const cartModel = (sequelize, DataTypes) =>
    sequelize.define("carts", {
        // foreign key
        user_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            // required: true,
        },
    });

module.exports = cartModel;