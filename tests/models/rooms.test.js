const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");

describe("hello world", () => {
  test("should first", () => {
    expect(true).toEqual(true);
  });
});

describe("create room", () => {
  beforeAll(async () => {
    const connectToMongo = async () => {
      let connect = await mongoose.connect("mongodb://0.0.0.0:27017/tddChat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return connect;
    };
    await connectToMongo();
  });
  
  afterAll(async () => {
    await Rooms.deleteMany();
    await mongoose.connection.close();
  });
  test("add room", async () => {
    const room = new Rooms({ title: 'space', name: "Szymon", msg: "my message" });
    const ret = await room.save();

    // let saveRoom = Rooms.find() // use.All find all rooms inside collectiuon of the mongodb
    // expect(saveRoom.length).toEqual(1);
  });
});

// add message to the room and read message beack

//start to thinkg how to allow Users to join or leave a room
// add test for a user to join a room and test for user to leave a room
// add test that proves that user that is not part of the room can't post msg there
// add test oposiit to higher one
