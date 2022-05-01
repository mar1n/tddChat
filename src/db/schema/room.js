const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema({
    title: String,
    user: String,
    message: String
});

module.exports = roomsSchema;