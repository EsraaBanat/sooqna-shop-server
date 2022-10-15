'use strict';
require('dotenv').config();
const server = require('./src/server');
const { db } = require('./src/models/index-model');

db.sync().then(() => {
    server.start();
});

