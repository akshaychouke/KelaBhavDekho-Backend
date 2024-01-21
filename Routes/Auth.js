const express = require("express");
const { Login, SignUp} = require("../Controllers/AuthController.js");
const {auth,isFarmer,isKelaGroup} = require("../Middlewares/Auth.js");
const Router = express.Router();

Router.post("/login", Login);
Router.post("/signup", SignUp);


//routes for testing api and middlewares
Router.get("/test",auth,(req,res)=>{
    res.status(200).json({message:"Welcome to the test auth route"});
});

Router.get("/farmer",auth,isFarmer,(req,res)=>{
    res.status(200).json({message:"Welcome to the farmer route"});
});

Router.get("/kelagroup",auth,isKelaGroup,(req,res)=>{
    res.status(200).json({message:"Welcome to the Kelagroup route"});
});


module.exports = Router;
