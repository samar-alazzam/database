'use strict';
require('dotenv').config();

// if(process.env.NODE_ENV === "test"){
//     const POSTGRES_URI = "sqlite:memory:";

// }else{
//     const POSTGRES_URI = process.env.DATABASE_URL;

// }
const POSTGRES_URI = process.env.NODE_ENV === "test"? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize , DataTypes} = require("sequelize");

let sequelizeOptions= process.env.NODE_ENV === "production" ? {
    dialectOptions:{ 
        ssl: {
            require: true ,
            rejectUnauthorized:false ,


        },

    },
}:{};

let sequelize = new Sequelize( POSTGRES_URI , sequelizeOptions );
const people= require("./people.model");
const customerModel = require("./customer.model");
const orderModel = require("./order.model");
const Order = require('./order.model');

const Collection = require('./lib/collection');



const customerTable=customerModel(sequelize , DataTypes);
const orderTable=orderModel(sequelize , DataTypes);

const customerCollection = new Collection(customerTable);
const orderCollection = new Collection(orderTable);


customerTable.hasMany(orderTable,{
    foreignKey:"customerId",
    sourceKey: "id",
});

orderTable.belongsTo(customerTable,{
    foreignKey: "customerId",
    targetKey: "id",
});





module.exports={
    db : sequelize ,
    People: people(sequelize , DataTypes),
    CustomerTable: customerCollection,
    OrderTable: orderCollection,

}


