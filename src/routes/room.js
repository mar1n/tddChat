const express = require("express");
const router = express.Router();
const { addMsg, createRoom } = require("../controller/room");
const { signup, signin, activation } = require("../controller/user");
const { userSignupValidator, userSigninValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/room/create", createRoom);
router.post("/room/new", addMsg);
router.post("/user/signup", userSignupValidator, runValidation, signup);
router.post("/user/signin", userSigninValidator, runValidation, signin);
router.get("/user/activation/:token", activation);

module.exports = router;
