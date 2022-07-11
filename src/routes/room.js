const express = require("express");
const router = express.Router();
const { addMsg, createRoom } = require("../controller/room");
const { signup } = require("../controller/user");

router.post("/room/create", createRoom);
router.post("/room/new", addMsg);
router.post("/user/signup", signup);

module.exports = router;
