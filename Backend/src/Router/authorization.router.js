const express = require("express");
const { SignUp, logIn, logout } = require("../Controller/authorization.controller");


const authRouter = express.Router();

authRouter.post("/register", SignUp);

authRouter.post("/login", logIn);

authRouter.get("/logout", logout);

module.exports = { authRouter };
