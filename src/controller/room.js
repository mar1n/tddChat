const Rooms = require("../db/model/room");

exports.all = async (req, res, next) => {
  console.log("req.body", req)
  const { firstName } = req.body;
  res.set("Content-Type", "application/json");
  console.log("first Name", firstName);
  try {
    await Rooms.find({ users: { $elemMatch: { firstName: firstName }}});
    res.status(200).json({
      message: "Room has been found.XXXXX"
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message
    })
  }
};

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
  const rooms = new Rooms();

  res.set("Content-Type", "applicaton/json");

  try {
    await rooms.addMsg(room, { text, firstName });
    res.status(200);
    res.json({
      message: "message has been added",
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

exports.seekUsers = async(req, res, next) => {
  const { firstName } = req.body;

  const rooms = new Rooms();
  
  res.set("Content-Type", "applicaton/json");

  try {
    await rooms.seekUsers(firstName);
  } catch (error) {
    console.log("seekUsers", error);
  }
}

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
