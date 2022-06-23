const mongoose = require("mongoose");
const messageSchema = require("./message");
const userSchema = require("./user");

messageSchema.pre("validate", function (next) {
 console.log('validate');
  // next();
  // if (this.timeStamp === undefined) {
  //   return next(new Error('#sadpanda'));
  // }
  next();
});

// messageSchema.pre("save", function (next) {
//   console.log("3");
//   next();
// });
const roomsSchema = mongoose.Schema({
  title: { type: String, required: true },
  users: [userSchema],
  messages: [messageSchema],
});
roomsSchema.pre("validate", function (next) {
  console.log('validate');
   // next();
   // if (this.timeStamp === undefined) {
   //   return next(new Error('#sadpanda'));
   // }
   next();
 });

module.exports = roomsSchema;
