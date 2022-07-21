const express = require("express");
const router = express.Router();
const { addMsg, createRoom } = require("../controller/room");
const { signup, sendEMailTest, activation } = require("../controller/user");
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators")

const { work } = require("../validators/work")

router.post("/room/create", createRoom);
router.post("/room/new", addMsg);
router.post("/user/signup",userSignupValidator, runValidation, signup);
router.post("/user/email", sendEMailTest);
router.post("/user/activation", work, activation);

module.exports = router;
