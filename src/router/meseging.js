'use strict';

require('dotenv').config();
const socketPort = process.env.SOCKET_PORT;
const io = require('socket.io-client');
let host = `http://localhost:${socketPort}/`;

const serverConnection = io.connect(host);

const { Op } = require('sequelize');

const {
    massageTabel,
    userTabel
} = require('../models/index-model');


async function joinConversation(req, res) {
    const sender = req.user;
    const reciverId = req.params.id;
    let reciver = await userTabel.findOne({
        where: {
            id: reciverId
        }
    })
    let room = [];
    //   const joinRoom = () => {
    // if (username !== "" && room !== "") {
    serverConnection.emit("join_room", room, sender, reciver);
    res.status(201).json(`User: ${sender.username} has joined room: ${room} with User : ${reciver.username}`)
    // }
    //   };
}

async function sendMessage(req, res) {
    const sender = req.user;
    const reciverId = req.params.id;
    let reciver = await userTabel.findOne({
        where: {
            id: reciverId
        }
    })
    let obj = req.body;
    let storedMessage = await massageTabel.create({
        message: obj.message,
        reciver_id: reciverId,
        user_id: sender.id
    })
     // sender and rec id edit model
    //   const joinRoom = () => {
    // if (username !== "" && room !== "") {
    serverConnection.emit("send_message", storedMessage, sender, reciver);
    res.status(201).json(storedMessage)
    // }
    //   };
}


async function getAllMessages(req, res) {
    const userId = req.user.id;
    const conversation = await massageTabel.findAll({
        where: {
            user_id: userId,
        }
    })
    res.status(200).json(conversation);
}

async function getMessgesBetweenUsers(req, res) {
    const reciverId = req.params.id;
    const userId = req.user.id;
    const converstaion = await massageTabel.findAll({
        where: {
            [Op.or]: [{ user_id: userId }, { user_id: reciverId }],
            [Op.or]: [{reciver_id:userId} , {reciver_id:reciverId}],
        }
    })
    res.status(200).json(converstaion);
}


module.exports = {
    joinConversation,
    sendMessage,
    getAllMessages,
    getMessgesBetweenUsers

}