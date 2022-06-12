'use strict';


const Customer =(sequelize , DataTypes )=>

sequelize.define('customers', {
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    }

});

module.exports = Customer;