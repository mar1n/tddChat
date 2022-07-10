const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = messageSchema;
