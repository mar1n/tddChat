const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");
socket.on("connect", () => {
  console.log(socket.connected); // true
  socket.emit("addMessage", "Hi Robin!");
  socket.on("responseBackEnd", (msg) => {
    console.log('msg', msg);
  })
});
