const Rooms = require("../db/model/room");

exports.addMsg = async (req, res) => {
    console.log("Got body:", req.body);
    const { text, email, room } = req.body;
    const rooms = new Rooms();

    res.set('Content-Type', 'applicaton/json');

    try {
        await rooms.addMsg(room, {text, email})
        res.status(200);
        res.json({
            message: "message has been added"
        })
    } catch(err) {
        console.log('err', err);
        if(err === "User does not exist!!!") {
            res.status(400).json({
                message: err
            })
        }
        res.status(500).json({
            message: err
        })
    }
}