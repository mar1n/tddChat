const mongoose = require("mongoose");
const messageSchema = require("./message");

const roomsSchema = mongoose.Schema({
  title: { type: String, required: true },
  users: [
    {
      name: { type: String, required: true },
    },
  ],
  messages: [messageSchema]
});

module.exports = roomsSchema;
