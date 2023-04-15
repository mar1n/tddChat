const { addMsgWebSocket } = require("../../src/controller/room");

function handleWebSocketConnection(io) {
  io.on("connection", (socket) => {
    //router.post("/room/new", addMsg);
    socket.on("/room/new", (roomDetails) => {
        addMsgWebSocket(roomDetails)
    });

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
}

module.exports = handleWebSocketConnection;
