const Rooms = require("../db/model/room");

exports.createRoom = async (req, res, next) => {
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
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This room title exisits!",
      });
    }
    next(error);
  }
};

exports.addMsg = async (req, res, next) => {
  const { text, name, room } = req.body;
  const rooms = new Rooms();

  res.set("Content-Type", "applicaton/json");

  try {
    await rooms.addMsg(room, { text, name });
    res.status(200);
    res.json({
      message: "message has been added",
    });
  } catch (error) {
    if (error === "User does not exist!!!") {
      return res.status(400).json({
        message: error,
      });
    }
    next(error);
  }
};

exports.addMsgWebSocket = async (roomDetails) => {
  const { text, name, room } = roomDetails;
  const rooms = new Rooms();

  try {
    const msg = await rooms.addMsg(room, { text, name });
    console.log('Message', msg);

  } catch (error) {
    if (error) {
      console.log("error",error);
      return {
        message: error,
      };
    }
  }
};
