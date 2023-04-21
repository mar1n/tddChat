const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    firstName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = messageSchema;
