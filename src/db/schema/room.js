const mongoose = require("mongoose");
const messageSchema = require("./message");

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
  users: [
    {
      name: { type: String, required: true },
    },
  ],
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
