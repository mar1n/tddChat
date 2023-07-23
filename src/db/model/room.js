const mongoose = require("mongoose");
const roomsSchema = require("../schema/room");
const messagesModel = require("../model/message");
const Messages = require("../model/message");

roomsSchema.methods.addMsg = async function (room, msg) {
  await Messages.create(msg);

  const userIn = await this.model("Rooms").find({
    "users.firstName": msg.firstName,
  });

  console.log("userIn", userIn);

  const roomIn = await this.model("Rooms").findOne({
    title: room.title,
  });

  console.log("roomIn", roomIn);

  if (roomIn === null) {
    return Promise.reject(new Error("Room does not exist!!!"));
  } else if (userIn.length === 0) {
    console.log("userOut");
    return Promise.reject(new Error("User does not exist!!!"));
  } else {
    console.log("room", room._id);
    const roomId = { _id: room._id };
    return this.model("Rooms").findOneAndUpdate(
      roomId,
      {
        $push: { messages: msg },
      },
      { new: true }
    );
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

roomsSchema.methods.addUser = async function (room, user) {
  const roomId = { _id: room._id };
  
  // console.log(
  //   "addUser",
  //   this.model("Rooms").findOneAndUpdate(
  //     roomId,
  //     {
  //       $push: { users: user },
  //     },
  //     function (error, success) {
  //       if (error) {
  //           console.log('errorAddUser',error);
  //       } else {
  //         console.log('roomId', roomId);
  //           console.log('errorSuccess',success);
  //       }
  //   }),
  //     { new: true }
  //   )
  // ;
  return this.model("Rooms").findOneAndUpdate(
    roomId,
    {
      $push: { users: user },
    },
    { new: true }
  );
};

roomsSchema.methods.seekUsers = async function(firstName) {
  return this.model("Rooms").findOne({"users.firstName" : firstName})
}

const rooms = mongoose.model("Rooms", roomsSchema);
module.exports = rooms;
