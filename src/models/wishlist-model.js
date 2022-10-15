'use strict'

const wishListModel = (sequelize, DataTypes) =>
sequelize.define('wishlists', {
    product_id: {
        type: DataTypes.INTEGER,
        // required: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        // required: true
    }
})
module.exports = wishListModel;
