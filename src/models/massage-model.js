'use strict'

const massageModel = (sequelize, DataTypes) =>
  sequelize.define("massages", {
    message: {
      type: DataTypes.STRING,
      required: true
    },
    // status: {
    //   type: DataTypes.STRING,
    // },
    reciver_id: {
      type: DataTypes.INTEGER,
    },
    // foreign key
    user_id: {
      type: DataTypes.INTEGER,
    }
  });

module.exports = massageModel;