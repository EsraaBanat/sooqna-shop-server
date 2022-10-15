'use strict';

const { wishlist } = require('../models/index-model');

// Show all wishes in wishlist to see it ( For specific user ) :
async function getAllWishlist(req, res) {
    const id = req.user.id;
    let allRecords = await wishlist.getAll(id);
    console.log('GGGGGG',allRecords)
    res.status(200).json(allRecords);
}

// DELETE one product in specific user wishlist :
async function deleteOneWishlist(req, res) {
    const id = req.params.id;
    const id2 = req.user.id;
    let deletedRecord = await wishlist.delete(id, id2);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).json(deletedRecord);
}

// DELETE all products in specific user wishlist :
async function deleteAllWishlist(req, res) {
    const id = req.user.id;
    let deletedRecord = await wishlist.deleteAll(id);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).json(deletedRecord);
}

module.exports = {
    // Wishlist Functions:
    getAllWishlist,
    deleteOneWishlist,
    deleteAllWishlist,
}