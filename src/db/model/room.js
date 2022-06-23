const mongoose = require("mongoose");
const roomsSchema = require("../schema/room");
const messagesModel = require("../model/message");


roomsSchema.methods.addMsg = async function (room, msg) {

  await msg.save();
  const userIn = this.model("Rooms").findOne({ "users.name": msg.name }).exec();
  if (userIn === null) {
    throw "User does not exist!!!";
  } else {
    const roomId = { _id: room._id };
   // const message = new messagesModel({ text: "ssss", name: "Szymon"})
    //let something = message.validateSync();
    //console.log('validate', something);
    return this.model("Rooms").findOneAndUpdate(roomId, {
      $push: { messages: msg },
    });
  }
};

roomsSchema.methods.removeUser = async function (room, joinUser) {
  if (joinUser.users[0] === undefined) {
    throw "You can not leave empty room!!!";
  } else {
    return this.model("Rooms")
      .findOneAndUpdate(
        { _id: room._id },
        {
          $pull: {
            users: {
              _id: joinUser.users[0]._id,
            },
          },
        },
        { new: true }
      )
      .exec();
  }
};

const rooms = mongoose.model("Rooms", roomsSchema);
module.exports = rooms;
