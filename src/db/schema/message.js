const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
      text: {type: String, required: true },
      user: {type: String, required: true} 
});

//const message = mongoose.model('Message', messageSchema);

module.exports = messageSchema;
