const mongoose = require("mongoose");
const messagesSchema = require("../schema/message");

const messages = mongoose.model("Messages", messagesSchema);
module.exports = messages;