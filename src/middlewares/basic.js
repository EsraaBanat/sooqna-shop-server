'use strict';

const base64 = require('base-64');
const { users } = require('../models/index-model');
// console.log(users);
module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  // console.log(user, pass);
  try {
    req.user = await users.authenticateBasic(user, pass)
    // console.log(req.user);
    next();
  } catch (e) {
    console.log('Error inside basic auth middleware/catch');
    _authError()
  }

  function _authError() {
    console.log('Error inside basic auth middleware');
    res.status(403).send('Invalid Login');
  }

}
