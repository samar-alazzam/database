'use strict';
require ("dotenv").config();
let PORT= process.env.PORT || 3035;
const server = require("./src/server");
const {db} = require("./src/models/index.model");
db.sync().then(()=>{
    server.start(PORT);


})

