const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
      text: {type: String, required: true },
      user: {type: String, required: true} 
});

module.exports = messageSchema;
