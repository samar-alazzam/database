'use strict';
require("dotenv").config();
const server=require('./src/server');
const { sequelize } = require('./src/models/index');

sequelize.sync().then(()=>{
    server.start(6000);
})







