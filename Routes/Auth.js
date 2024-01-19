const express = require("express");
const { Login, SignUp } = require("../Controllers/AuthController.js");
const Router = express.Router();

Router.post("/login", Login);
Router.post("/signup", SignUp);

module.exports = Router;
