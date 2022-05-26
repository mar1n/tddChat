const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");
const Message = require("../../src/db/schema/message");

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
    });
    await room.save();

    const findRoom = await Rooms.findById(room._id).exec();

    expect(findRoom._id).toEqual(room._id);
  });
  test("add message to room", async () => {
    const room = new Rooms({
      title: "Space",
    });
    await room.save();
    
    console.log('room', room);
    const filter = { _id: room._id };
    const msg = { text: "First Msg", user: "Szymon", ara: 'cool' };
    const msg2 = { text: "second Msg", user: "Robert" };
    const msg3 = { text: "Third Msg", user: "Max" };

    await Rooms.findOneAndUpdate(filter, { $push: { messages :  msg } });
    await Rooms.findOneAndUpdate(filter, { $push: { messages :  msg2 } });
    await Rooms.findOneAndUpdate(filter, { $push: { messages :  msg3  } });

    const roomMsg = await Rooms.findById(filter).exec();
    console.log('roomMsg', roomMsg)

    expect(roomMsg.messages[0].text).toEqual("First Msg");
    expect(roomMsg.messages[1].text).toEqual("second Msg");
    expect(roomMsg.messages[2].text).toEqual("Third Msg");
  });

  test('join room', async () => {
    
  });

  // test("join user to room", async () => {
  //   const room = new Rooms({
  //     title: "Space",
  //     users: { name: "Ralph" },
  //   });

  //   await room.save();

  //   const filter = { name: "Ralph" };

  //   const findRoom = await Rooms.find({ users: { $elemMatch: filter } });
  //   expect(findRoom.length).toEqual(1);
  // });
  // test('user add message to room', () => {
  //   const room = new Rooms({
  //     title: "Space",
  //     users: { name: "Ralph" },
  //   });

  //   await room.save();
  // });

  // test.skip('user can leave room', () => {
  //   const room = new Rooms({
  //     title:"Space",
  //     users: { name: "Boris"}
  //   });

  //   await room.save();

  //   const filter = { name: "Boris"};
  //   const leaveRoom = await Rooms.findByIdAndRemove({});
    
  // });
});

// add message to the room and read message beack

//start to thinkg how to allow Users to join or leave a room
// add test for a user to join a room and test for user to leave a room
// add test that proves that user that is not part of the room can't post msg there
// add test oposiit to higher one


