const express = require("express");
const routerRoom = express.Router();
const { all, addMsg, createRoom } = require("../controller/room");

routerRoom.get("/room/all", all);
routerRoom.post("/room/create", createRoom);
routerRoom.post("/room/new", addMsg);


module.exports = routerRoom;
