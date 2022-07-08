const mongoose = require("mongoose");
const rooms = require("../../../src/db/model/room");

const userSchema = mongoose.Schema({
  //name: { type: String, required: true },
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
