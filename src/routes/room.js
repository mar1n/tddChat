const express = require("express");
const router = express.Router();
const { addMsg, createRoom } = require("../controller/room");

router.post("/room/create", createRoom);
router.post("/room/new", addMsg);

module.exports = router;
