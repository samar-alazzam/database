'use strict';



const Order= (sequelize , DataTypes) =>
 sequelize.define('order', {
     name :{
         type : DataTypes.STRING,
         allowNull: false,
     },
     custoemerId:{
         type: DataTypes.INTEGER,
         allowNull: false,
     }
 });

 module.exports= Order;