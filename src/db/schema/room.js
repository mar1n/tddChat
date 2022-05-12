const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema({
    title: String,
    users: [{
        name: String,
    }],
    message: [{
        text: String,
        {user: String, required: true}
    }]
});

module.exports = roomsSchema;