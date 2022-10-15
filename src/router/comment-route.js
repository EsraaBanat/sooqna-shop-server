'use strict';

const {
  comment,commentTabel
} = require('../models/index-model');


// user add rating on specific product
async function addComment(req, res) {
  let userId = req.user.id;
  let obj = req.body;
  let productId = req.params.id
  obj.user_id = userId;
  obj.product_id = productId;

  let newComment = await comment.create(obj);
  res.status(201).json(newComment);
}

async function getComment(req, res) {
  let productId = req.params.id
  let comments = await commentTabel.findAll({where: {
                product_id: productId
            }})
  res.status(200).json(comments);
}


module.exports = {
  addComment,
  getComment
};