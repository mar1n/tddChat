const Rooms = require("../db/model/room");

exports.createRoom = async (req, res) => {
  res.set("Content-Type", "application/json");
  const { title, name } = req.body;
  const room = new Rooms({
    title,
    users: [{ name: name }],
  });

  try {
    await room.save();
    res.status(200).json({
      message: "Room has been created",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This room title exisits!",
      });
    }
    res.status(500).json({
      message: err,
    });
  }
};

exports.addMsg = async (req, res) => {
  const { text, name, room } = req.body;
  const rooms = new Rooms();

  res.set("Content-Type", "applicaton/json");

  try {
    await rooms.addMsg(room, { text, name });
    res.status(200);
    res.json({
      message: "message has been added",
    });
  } catch (err) {
    if (err === "User does not exist!!!") {
      return res.status(400).json({
        message: err,
      });
    }
    res.status(500).json({
      message: err,
    });
  }
};
