const express = require("express");
const router = require("./src/routes/room");
const {errFiveHundred, errNotFound} = require("./src/controller/errors");
const http = require("http");

function createServer() {
  require("dotenv").config();
  const app = express();
  app.use(express.json());

  app.use("/", router);
  app.use(errNotFound);
  app.use(errFiveHundred);

  var httpServer = http.createServer(app);
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    router.post("/room/new", addMsg);
    socket.on("/room/new", (msg) => {
      
    })
    // const backEndMessage = {
    //   name: "BackEnd Message",
    //   message: "Hello from backEnd",
    // };
    // console.log("connect");
    // socket.emit("backEnd", backEndMessage);
    // socket.on("addMessage", (msg) => {
    //   console.log("msg", msg);
    //   io.emit("responseBackEnd", true);
    // });
  });
  return httpServer;
}

module.exports = createServer;
