const Rooms = require("../../src/db/model/room");

const createRoom = async (title = "Space", firstName = "Robin") => {
  const room = new Rooms({
    title: title,
    users: [{ firstName }],
  });
  return await room.save();
};

const findById = async (roomId) => {
    return await Rooms.findById(roomId);
}

module.exports = { createRoom, findById };
