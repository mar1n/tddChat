const mongoose = require("mongoose");
const messageSchema = require("./message");
const userSchema = require("./user");

const roomsSchema = mongoose.Schema({
  title: { type: String, required: true },
  users: {type: [userSchema], validate: v => Array.isArray(v) && v.length > 0 },
  messages: {type: [messageSchema], required:true}
});

module.exports = roomsSchema;
