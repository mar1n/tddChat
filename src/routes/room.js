const express = require('express');
const router = express.Router();
const {roomController} = require("../controller/room");

router.post("/room", roomController);

module.exports = router;