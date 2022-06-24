const express = require("express");
const router = require("./src/routes/room");

function createServer() {
  const app = express();
  app.use(express.json());
  app.get("/post-test", async (req, res) => {
    res.set('Content-Type', 'applicaton/json');
    res.send({
        id: '1234'
    });
    console.log("Got body:", req.body);
    res.status(200);
  });
  app.use("/", router);
  return app;
}

module.exports = createServer;
