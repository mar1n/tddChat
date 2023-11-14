const Rooms = require("../db/model/room");

exports.all = async (req, res, next) => {
  const { firstName } = req.query;
  res.set("Content-Type", "application/json");
  try {
    const room = await Rooms.find({ users: { $elemMatch: { firstName: firstName }}});
    res.status(200).json({
      message: "Room has been found.",
      room
    })
  } catch (error) {
    if(error.code === 400) {
      return res.status(400).json({
        message: error.message
      })
    }
    next(error)
  }
};

exports.createRoom = async (req, res, next) => {
  res.set("Content-Type", "application/json");
  const { title, usersList } = req.body;
  const users = usersList.split(",").map((value) => ({firstName: value}));
  const room = new Rooms({
    title,
    users: [...users],
  });

  try {
    await room.save();
    const createdRoom = await Rooms.findOne({title: title});
    res.status(200).json({
      message: "Room has been created.",
      room: createdRoom
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This room title exists!",
      });
    }
    next(error);
  }
};

exports.addMsg = async (req, res, next) => {
  const { text, firstName, room } = req.body;
  const rooms = new Rooms();
  res.set("Content-Type", "applicaton/json");

  try {
    await rooms.addMsg(room, { text, firstName });
    const createdRoom = await Rooms.findOne({title: room.title});
    res.status(200);
    res.json({
      message: "message has been added",
      room: createdRoom
    });
  } catch (error) {
    if (error.message === "User does not exist!!!") {
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
    const createdRoom = await Rooms.findOne({title: room.title});
    return {
      message: "message has been added",
      room: createdRoom
    };
  } catch (error) {
    if (error) {
      return {
        message: error,
      };
    }
  }
};
