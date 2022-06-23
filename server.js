const express = require("express");
const routes = require("./src/routes/room");

function createServer() {
  const app = express();
  app.use(express.json());
  app.post("/post-test", (req, res) => {
    console.log("Got body:", req.body);
    res.sendStatus(200);
  });
  app.use("/api", routes);
  return app;
}

module.exports = createServer;
