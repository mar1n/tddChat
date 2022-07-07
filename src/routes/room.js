const express = require("express");
const router = express.Router();
const { addMsg } = require("../controller/room");

router.post("/room/new", addMsg);

module.exports = router;
