const mongoose = require("mongoose");
const roomsSchema = require("../schema/room");
const messagesModel = require("../model/message");
const Messages = require("../model/message");

roomsSchema.methods.addMsg = async function (room, msg) {
  await Messages.create(msg);

  const userIn = await this.model("Rooms").find({ "users.firstName": msg.firstName });

  if (userIn.length === 0) {
    console.log("errr")
    throw "User does not exist!!!";
  } else {
    const roomId = { _id: room._id };
    return this.model("Rooms").findOneAndUpdate(roomId, {
      $push: { messages: msg },
    }, {new: true });
  }
};

roomsSchema.methods.removeUser = async function (room, joinUser) {
  if (joinUser.users[0] === undefined) {
    throw "You can not leave this room!!!";
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
