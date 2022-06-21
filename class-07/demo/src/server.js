'use strict';

require("dotenv").config();


const express = require("express");
const bcrypt= require('bcrypt');
const users = require("./models/users.model");
const app = express();
app.use(express.json());

const basic= require("./middlewares/basic");
const bearer= require("./middlewares/bearer"); 
const acl=require("./middlewares/acl");



app.post("/signin",basic, async(req , res)=>{
    res.status(200).json(req.user);
});

app.post("/signup", async(req , res)=>{
    try{
        let username= req.body.username;
        let password= await bcrypt.hash(req.body.password , 10);
        let role = req.body.role;
        // console.log('username' , username);
        // console.log('password' , password);

        const record = await users.create({
            username: username,
            password: password,
            role:role

        });
        res.status(201).json(record);
    }
    catch(e){
        throw new Error("signup error");
    }
});

app.get("/myorders" , bearer , (req , res)=>{
    res.json({
        'message': 'you are authorized to view the user orders',
        'user': req.user,
    });


});

app.get('/img',bearer, acl('read'),(req , res)=>{
    res.send('this is new image');
});

app.post('/img', bearer , acl('create'),(req,res)=>{
    res.send('new image was created ');
});

app.put('/img',bearer,acl('update'),(req,res)=>{
    res.send('new img was updated');
});

app.delete('/img', bearer,acl('delete'),(req,res)=>{
    res.send('new img was deleted');
});





function start(PORT){
    app.listen(PORT, ()=>{
        console.log(`listen and running on PORT ${PORT}`);
    });
}

module.exports={
    app:app,
    start:start
}