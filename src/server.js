'use strict';
require ("dotenv").config();
const PORT= process.env.PORT || 3035 ;
const express = require("express");
const app= express();


const notFoundHandler= require("./handlers/404");
const serverErrorHandler= require("./handlers/500");
const peopleRotes = require("./routes/people.route.js");
const customerRotes= require("./routes/customer.route.js");
const orderRotes= require("./routes/order.route.js");

app.use(express.json());
app.use(peopleRotes);
app.use(customerRotes);
app.use(orderRotes);
app.use('*', notFoundHandler);
app.use(serverErrorHandler);


function start(PORT){
    app.listen(PORT, ()=>{
        console.log(`listen and running on PORT ${PORT}`);
    });
}

module.exports={
    app:app,
    start:start
}



