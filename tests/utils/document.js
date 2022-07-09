const Rooms = require("../../src/db/model/room");

const createRoom = async (title = "Space", name = "Robin") => {
  const room = new Rooms({
    title: title,
    users: [{ name: name }],
  });
  return await room.save();
};

const findById = async (roomId) => {
    return await Rooms.findById(roomId);
}

module.exports = { createRoom, findById };
