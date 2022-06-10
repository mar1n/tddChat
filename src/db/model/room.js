const mongoose = require("mongoose");
const roomsSchema = require("../schema/room");

roomsSchema.methods.addMsg = async function (room, msg) {
  const roomId = { _id: room._id };
  return this.model('Rooms').findOneAndUpdate(roomId, { $push: { messages: msg } });
}

roomsSchema.methods.removeUser = async function (room, joinUser) {
  if(joinUser.users[0] === undefined) {
    throw "You can not leave empty room!!!"
  } else {
    return this.model('Rooms').findOneAndUpdate(
      { _id: room._id },
      {
        $pull: {
          users: {
            _id: joinUser.users[0]._id,
          },
        },
      },
      { new: true }
      ).exec();
  }
}

const rooms = mongoose.model('Rooms', roomsSchema);
module.exports = rooms;

