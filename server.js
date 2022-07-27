const express = require("express");
const router = require("./src/routes/room");
const {errFiveHundred, errNotFound} = require("./src/controller/errors");

function createServer() {
  require("dotenv").config();
  const app = express();
  app.use(express.json());

  app.use("/", router);
  app.use(errNotFound);
  app.use(errFiveHundred);

  return app;
}

module.exports = createServer;
