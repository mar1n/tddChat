const express = require("express");
const router = require("./src/routes/room");
const error = require("./src/controller/errors");

function createServer() {
  require('dotenv').config();
  const app = express();
  app.use(express.json());
  
  app.use("/", router);
  app.use(error);

  return app;
}

module.exports = createServer;
