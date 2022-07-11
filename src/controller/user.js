const User = require("../db/model/user");

exports.signup = async (req, res) => {
    console.log('anything');
    //res.set("Content-Type", "application/json");
    return res.status(200).json({ message: "done"});
}