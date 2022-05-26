const Rooms = require("./room");

async function removeUser(room, joinUser) {
    await Rooms.findOneAndUpdate(
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

module.exports = removeUser