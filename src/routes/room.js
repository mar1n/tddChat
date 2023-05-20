const express = require("express");
const routerRoom = express.Router();
const { addMsg, createRoom } = require("../controller/room");

routerRoom.post("/room/create", createRoom);
routerRoom.post("/room/new", addMsg);


module.exports = routerRoom;
