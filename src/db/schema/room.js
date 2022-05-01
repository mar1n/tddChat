const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema({
    title: String,
    message: [{
        text: String,
        user: String
    }]
});

module.exports = roomsSchema;