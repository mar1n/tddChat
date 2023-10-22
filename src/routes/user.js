const express = require("express");
const routerUser = express.Router();
const { signup, signin, activation, seekUsers } = require("../controller/user");
const { userSignupValidator, userSigninValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

routerUser.post("/user/signup", userSignupValidator, runValidation, signup);
routerUser.post("/user/signin", userSigninValidator, runValidation, signin);
routerUser.get("/user/seekUsers", seekUsers)
routerUser.get("/user/activation/:token", activation);

module.exports = routerUser;