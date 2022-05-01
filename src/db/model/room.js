const mongoose = require("mongoose");
const roomsSchema = require("../schema/room");

const rooms = mongoose.model('Rooms', roomsSchema);

module.exports = rooms;

