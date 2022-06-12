'use strict';
const express= require("express");

const { OrderTable } = require("../models/index.model");

const orderRouter= express.Router();

orderRouter.get("/order" , getOrder);
orderRouter.get("/order/:id" , getOneOrder);
orderRouter.post("/order" , createOrder);
orderRouter.put("/order/:id" , updateOrder);
orderRouter.delete("/order/:id", deleteOrder);

async function getOrder(req , res){
    let order = await OrderTable.read();
    res.status(200).json(order);

}

async function getOneOrder(req , res){
    const orderId = parseInt(req.params.id);
    let order =  await OrderTable.read(orderId);
    res.status(200).json(order);
    
}

async function createOrder(req , res){
    let newOrder= req.body;
    let order = await OrderTable.create(newOrder);
    res.status(201).json(order);
    
}

async function updateOrder(req , res){
    let orderId = parseInt(req.params.id);
    let updateOrder= req.body;
    let foundOrder= await OrderTable.read(orderId);
    if(foundOrder){
        let updatedOrder= await foundOrder.update(updateOrder);
        res.status(201).json(updatedOrder);
    }
    
    
}
async function deleteOrder(req , res){
    let orderId = parseInt(req.params.id);
    let deleteOrder= await OrderTable.delete(orderId);
    res.status(204).send('record deleted');
    
}



module.exports= orderRouter;

