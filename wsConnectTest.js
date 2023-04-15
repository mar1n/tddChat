const { io } = require("socket.io-client");

const clientSocket = io("http://localhost:5000");

clientSocket.on("connect", () => {
  console.log(clientSocket.connected); // true
});

clientSocket.emit("/room/new", { text: "My message", name: "Szymon", room: "Google session." })

clientSocket.on("disconnect", () => {
    console.log(clientSocket.connected); // false
  });

// exports.emitEvent = (ioo, name, content) => {
//     ioo.sockets.emit(name, content)
// }
// exports.listenEvent = (ioo, name, content) => {
//     ioo.sockets.on(name, content)
// }