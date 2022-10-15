'use strict';
const {
    users
} = require('../models/index-model');

// show all information for logged in user
async function userInfo(req, res, next) {
    let userId = req.user.id;
    try {
        const userInfo = await users.findOne({
            where: {
                id: userId
            }
        });
        res.status(200).json(userInfo);
    } catch (e) {
        next(e.message);
    }
}

// UPDATE user profile of himself 
async function updateUserProfile(req, res) {
    let userId = req.user.id;
    let newInfo = req.body;
    try {
        let newUpdate = await users.update({
            username: newInfo.username,
            email: newInfo.email,
            phonenumber: newInfo.phonenumber,
            password: newInfo.password,
            adress: newInfo.adress,
            role: req.user.role,
        }, {
            where: {
                id: userId,
            }
        });
        console.log(newUpdate);
        res.send(newUpdate);

    } catch (e) {
        console.log(e.message);
    }
}

// DELETE user profile of himself 
async function deleteUserProfile(req, res) {
    let userId = req.user.id;
    try {
        let deletedRecord = await users.destroy({
            where: {
                id: userId
            }
        });
        if (deletedRecord == 1) {
            res.status(204).send(`Your profile with id ${userId} is deleted Successfully`);
        } else {
            res.status(403).send("Profile delete is failed");
        }
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    userInfo,
    updateUserProfile,
    deleteUserProfile,
}