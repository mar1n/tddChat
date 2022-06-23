const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  //name: { type: String, required: true },
  email: { 
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  }
});

module.exports = userSchema;
