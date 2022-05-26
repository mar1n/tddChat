const Rooms = require("./room");

async function addMsg(room, msg) {
    const filter = { _id: room._id };
    await Rooms.findOneAndUpdate(filter, { $push: { messages: msg } });

}

module.exports = addMsg;