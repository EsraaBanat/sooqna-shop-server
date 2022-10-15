'use strict';

const { product , productTabel} = require('../models/index-model');

// Create new product :
async function createProduct(req, res) {
    const userId = req.user.id;
    let obj = req.body;
    obj.user_id = userId;
    let newRecord = await product.create(obj);
    res.status(201).json(newRecord);
}

// Show all products to see it :
async function getAllProducts(req, res) {
    // const id = req.user.id;
    let allRecords = await productTabel.findAll();
    res.status(200).json(allRecords);
}

// Show all products posted by user to see it :
async function getAllProductsForUser(req, res) {
    const userId = req.user.id;
    console.log('AAAAAAA',userId);
    let allRecords = await productTabel.findAll({
        where: {
            user_id:userId
        }
    });
    res.status(200).json(allRecords);
}

// get one product with details
async function getOneProduct(req, res){
    const id = req.params.id;
    // const id2 = req.user.id;
    // const obj = req.body;
    let detailsRecord = await product.get(id);
    res.status(200).json(detailsRecord);
}

// To Edit specific product :
async function updateProduct(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    const obj = req.body;
    obj.user_id = userId;
    let updatedRecord = await product.update(id, obj, userId)
    if (updatedRecord) {
        res.status(201).json(updatedRecord);
    } else {
        res.status(403).send("Access denied");
    }
}

// To Delete one or specific product :
async function deleteOneProduct(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    let deletedRecord = await product.delete(id, userId);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).json(deletedRecord);
}

// To Delete All product :
async function deleteAllProduct(req, res) {
    const id = req.user.id;
    let deletedRecord = await product.deleteAll(id);
    if (deletedRecord == 0) {
        res.status(403).send("Access denied");
    }
    res.status(204).send('Record is deleted Successfully')
}

module.exports = {
    // Products Functions:
    getAllProducts,
    getAllProductsForUser,
    createProduct,
    updateProduct,
    deleteOneProduct,
    deleteAllProduct,
    getOneProduct,
}