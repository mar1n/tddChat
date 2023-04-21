const mongoose = require("mongoose");
const messageSchema = require("./message");
const userSchema = require("./user");

const roomsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      firstName: {
        type: String,
        required: true,
      },
    },
  ],
  messages: { type: [messageSchema], required: true },
});

module.exports = roomsSchema;
