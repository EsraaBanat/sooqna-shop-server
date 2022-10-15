'use strict';
const logger = (req, res, next) => {
    console.log(`Request => Method: ${res.method} , Path: ${res.path}`);
    next();
}

module.exports=logger