'use strict';

const commentModel = (sequelize, DataTypes) =>
    sequelize.define('comments', {
        comment: {
            type: DataTypes.STRING,
            required: true
        },
        // foreign key
        product_id: {
            type: DataTypes.INTEGER,
            // required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            // required: true
        }
    });
module.exports = commentModel;
