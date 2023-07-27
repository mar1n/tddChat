const express = require("express");
const mongoose = require("mongoose");
const createServer = require("./server"); // new

mongoose
  .connect("mongodb://0.0.0.0:27017/tddChat", { useNewUrlParser: true })
  .then(() => {
    const app = createServer(); // new
    app.listen(5666, () => {
      console.log("Server has started!");
    });
  });
