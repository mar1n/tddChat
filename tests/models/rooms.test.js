const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");

describe("hello world", () => {
  test("should first", () => {
    expect(true).toEqual(true);
  });
});

describe("create room", () => {
  beforeEach(async () => {
    const connectToMongo = async () => {
      let connect = await mongoose.connect("mongodb://0.0.0.0:27017/tddChat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return connect;
    };
    await connectToMongo();
  });

  afterEach(async () => {
    await Rooms.deleteMany();
    await mongoose.connection.close();
  });
  test("add room", async () => {
    const room = new Rooms({
      title: "Space",
      //message: [{ text: "test", name: "Szymon" }],
    });
    await room.save();

    const findRoom = await Rooms.find();
    expect(findRoom.length).toEqual(1);
  });
  test("add message to room", async () => {
    const room = new Rooms({
      title: "Space",
    });
    await room.save();

    const filter = { title: "Space" };
    const update = { text: "First Msg" };

    let roomUpdate = await Rooms.findOneAndUpdate(filter, { message: update });

    roomUpdate = await Rooms.findOne(filter);
    expect(roomUpdate.message[0].text).toEqual("First Msg");
  });

  test("join user to room", async () => {
    const room = new Rooms({
      title: "Space",
      users: { name: "Ralph" },
    });

    await room.save();

    const filter = { name: "Ralph" };

    let findRoom = await Rooms.find({ users: { $elemMatch: filter } });
    expect(findRoom.length).toEqual(1);
  });
});

// add message to the room and read message beack

//start to thinkg how to allow Users to join or leave a room
// add test for a user to join a room and test for user to leave a room
// add test that proves that user that is not part of the room can't post msg there
// add test oposiit to higher one
