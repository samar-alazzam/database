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

module.exports={
    db : sequelize ,
    People: people(sequelize , DataTypes),

}


