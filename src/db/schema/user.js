const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { 
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  name: {
    type:String,
    trim: true,
    required: true,
    max: 32
  },
  hashed_password: {
    type:String,
    required: true,
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    default: 'subscriber'
  },
  resetPasswordLink: {
    data:String,
    default: ''
  }
}, {timestamps: true});

module.exports = userSchema;
