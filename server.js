require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParses = require("body-parser");
const routerRoom = require("./src/routes/room");
const routerUser = require("./src/routes/user");
const {errFiveHundred, errNotFound} = require("./src/controller/errors");
const http = require("http");
const { addMsgWebSocket, fetchRoomWebSocket } = require("./src/controller/room");

function createServer() {
  const app = express();
  app.use(bodyParses.json());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
  app.use(express.json());

  app.use("/", routerRoom);
  app.use("/", routerUser);
  app.use(errNotFound);
  app.use(errFiveHundred);

  var httpServer = http.createServer(app);
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"] 
    },
  });
 
  io.on("connection", (socket) => {
    socket.on("/room/new", async (msg) => {
      const responsMmessage = await addMsgWebSocket(msg);
      socket.emit("/room/new", responsMmessage); 

    })
    socket.on("/room/all", async(firstName) => {
      const responseRoomAll = await fetchRoomWebSocket(firstName);
      socket.emit("/room/all", responseRoomAll);
    })

  });
  return httpServer;
}

module.exports = createServer;
