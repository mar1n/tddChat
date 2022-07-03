const Room = require("../db/model/room");

exports.roomController = async (req, res) => {
    console.log("Got body:", req.body);
    const { name, text } = req.body;
    res.set('Content-Type', 'applicaton/json');
    res.json({
        id: '1234'
    });
    res.status(200);
}