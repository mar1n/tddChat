const Rooms = require("../db/model/room");

exports.createRoom = async (req, res, next) => {
  res.set("Content-Type", "application/json");
  const { title, firstName } = req.body;
  const room = new Rooms({
    title,
    users: [{ firstName: firstName }],
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
  const { text, firstName, room } = req.body;
  console.log('addMsg', room);
  const rooms = new Rooms();

  res.set("Content-Type", "applicaton/json");

  try {
    await rooms.addMsg(room, { text, firstName });
    console.log("addMsg",await rooms.addMsg(room, { text, firstName }))
    res.status(200);
    res.json({
      message: "message has been added",
    });
  } catch (error) {
    console.log('error addMsg', error);
    console.log('error.message', error.message);
    if (error.message === "User does not exist!!!") {
      console.log(40000)
      return res.status(400).json({
        message: error.message,
      });
    }
    if (error.message === "Room does not exist!!!") {
      return res.status(400).json({
        message: error.message,
      });
    }
    next(error);
  }
};

exports.addMsgWebSocket = async (roomDetails) => {
  const { text, firstName, room } = roomDetails;
  const rooms = new Rooms();

  try {
    const msg = await rooms.addMsg(room, { text, firstName });
  } catch (error) {
    if (error) {
      return {
        message: error,
      };
    }
  }
};
