const mongoose = require("mongoose");
const userSchema = require("../schema/user");

const user = mongoose.model("User", userSchema);

module.exports = user;