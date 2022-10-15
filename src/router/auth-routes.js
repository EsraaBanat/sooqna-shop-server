'use strict';

require('dotenv').config();
const socketPort = process.env.SOCKET_PORT;
const io = require('socket.io-client');
let host = `http://localhost:${socketPort}/`;

const serverConnection = io.connect(host);

const {
  users,
} = require('../models/index-model');

function homePage(req, res) {
  res.status(200).send("Sooqna E-commerce isn't the cherry on the cake, it's the new cake");
}

/*......................Auth......................*/

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };

    res.status(201).json(output);
  } catch (e) {
    console.error('Error in siginUp function', e);
    next(e.message);
  }
}


async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    next(e.message);
  }
}

async function handleSignIn(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    if (user){
     serverConnection.emit('signin', user);  
    }
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
}

/*....................END Auth....................*/

module.exports = {
  //API
  homePage,

  //AUTH
  handleSignup,
  handleGetUsers,
  handleSignIn,

}