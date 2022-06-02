const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");
const addMsg = require("../../src/db/model/addMsg");
const removeUser = require("../../src/db/model/removeUser");

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

    console.log("room", room);
    

    const msg = { text: "First Msg", user: "Szymon", ara: "cool" };
    const msg2 = { text: "second Msg", user: "Robert" };
    const msg3 = { text: "Third Msg", user: "Max" };
    await room.addMsg(room, msg);
    await room.addMsg(room, msg2);
    await room.addMsg(room, msg3);

    const roomMsg = await Rooms.findById({_id: room._id}).exec();
    console.log("roomMsg", roomMsg);

    expect(roomMsg.messages[0].text).toEqual("First Msg");
    expect(roomMsg.messages[1].text).toEqual("second Msg");
    expect(roomMsg.messages[2].text).toEqual("Third Msg");
  });

  test("join room", async () => {
    const room = new Rooms({
      title: "new room",
    });

    await room.save();

    const joinThisRoom = { _id: room._id };

    const newUser = { name: "Szymon" };

    await Rooms.findOneAndUpdate(joinThisRoom, { $push: { users: newUser } });

    const joinUser = await Rooms.findById(joinThisRoom).exec();
    console.log("joinUser", joinUser);

    expect(joinUser.users[0].name).toEqual("Szymon");
    console.log('_id', joinUser.users[0]._id)
    await removeUser(room, joinUser);

    const leave = await Rooms.findOne();
    expect(leave.users.length).toEqual(0);
   
    // console.log('userLeaveRoom', await Rooms.findOne());
    // console.log("joinUser", joinUser);
    //expect(joinUser.users.length).toEqual(0);
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
