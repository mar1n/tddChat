const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
      text: {type: String, required: true },
      name: {type: String, required: true},
      timeStamp: {type: Date, required: true} 
});

module.exports = messageSchema;
