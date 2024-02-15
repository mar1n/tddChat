require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParses = require("body-parser");
const routerRoom = require("./src/routes/room");
const routerUser = require("./src/routes/user");
const {errFiveHundred, errNotFound} = require("./src/controller/errors");
const http = require("http");
const { addMsgWebSocket } = require("./src/controller/room");

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
    //router.post("/room/new", addMsg);
    socket.on("/room/new", async (msg) => {
      console.log('msg', msg)
      //console.log(await addMsgWebSocket(msg));
      const responsMmessage = await addMsgWebSocket(msg);
      socket.emit("/room/new", responsMmessage); 

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
