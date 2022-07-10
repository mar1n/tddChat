const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { 
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  name: {
    type:String,
    required: true
  }
});

module.exports = userSchema;
