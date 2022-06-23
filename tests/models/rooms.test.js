const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");
const Messages = require("../../src/db/model/message");

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

    const msg = { text: "First Msg", name: "Szymon", ara: "cool" };
    const msg2 = { text: "second Msg", name: "Robert" };
    const msg3 = { text: "Third Msg", name: "Max" };
    await room.addMsg(room, msg);
    await room.addMsg(room, msg2);
    await room.addMsg(room, msg3);

    const roomMsg = await Rooms.findById({ _id: room._id }).exec();

    expect(roomMsg.messages[0].text).toEqual("First Msg");
    expect(roomMsg.messages[1].text).toEqual("second Msg");
    expect(roomMsg.messages[2].text).toEqual("Third Msg");
  });

  test("join and leave room", async () => {
    const room = new Rooms({
      title: "new room",
    });

    await room.save();

    const joinThisRoom = { _id: room._id };

    const newUser = { name: "Szymon" };

    await Rooms.findOneAndUpdate(joinThisRoom, { $push: { users: newUser } });

    const joinUser = await Rooms.findById(joinThisRoom).exec();

    expect(joinUser.users[0].name).toEqual("Szymon");

    await room.removeUser(room, joinUser);

    expect(room.users.length).toEqual(0);
  });

  test("unknow user can not post message", async () => {
    const room = new Rooms({
      title: "new room",
    });

    await room.save();

    const joinThisRoom = { _id: room._id };

    const newUser = { name: "Szymon" };

    await Rooms.findOneAndUpdate(joinThisRoom, { $push: { users: newUser } });

    try {
      const msg = { text: "First Msg", name: "Stranger", ara: "cool" };
      await room.addMsg(room, msg);
    } catch (err) {
      expect("User does not exist!!!").toEqual(err);
    }
  });

  test("3 people inside the room, one user left room, number of people is 2", async () => {
    const room = new Rooms({
      title: "new room",
    });

    await room.save();

    const threeUsers = [{ name: "Szymon" }, { name: "Max" }, { name: "John" }];

    const joinThisRoom = { _id: room._id };

    await Rooms.findOneAndUpdate(joinThisRoom, {
      $push: { users: { $each: threeUsers } },
    });

    const numberOfUsers = await Rooms.findOne({ title: "new room" });
    expect(numberOfUsers.users.length).toEqual(3);

    const joinUser = await Rooms.findById(joinThisRoom).exec();
    await room.removeUser(room, joinUser);
    const oneUserLeft = await Rooms.findOne({ title: "new room" });
    expect(oneUserLeft.users.length).toEqual(2);
  });

  test("leave empty room give an error", async () => {
    try {
      const room = new Rooms({ title: "new room" });

      await room.save();

      const joinThisRoom = { _id: room._id };

      const joinUser = await Rooms.findById(joinThisRoom).exec();

      await room.removeUser(room, joinUser);
    } catch (err) {
      expect("You can not leave empty room!!!").toEqual(err);
    }
  });

  test("msg include timeStamp", async () => {
    const date = new Date().toISOString();

    const msg1 = new Messages({
      text: "random text",
      name: "Szymon",
      timeStamp: date,
    });
    await msg1.save();
    const msg2 = new Messages({
      text: "random text",
      name: "Szymon",
      timeStamp: date,
    });
    await msg2.save();
    const msg3 = new Messages({
      text: "random text",
      name: "Szymon",
      timeStamp: date,
    });
    await msg3.save();

    const room = new Rooms({
      title: "new Room",
    });
    await room.save();

    await room.addMsg(room, msg1);
    await room.addMsg(room, msg2);
    await room.addMsg(room, msg3);

    const roomMsg = await Rooms.findById({ _id: room._id }).exec();

    expect(roomMsg.messages[0].timeStamp.toISOString()).toEqual(date);
    expect(roomMsg.messages[1].timeStamp.toISOString()).toEqual(date);
    expect(roomMsg.messages[2].timeStamp.toISOString()).toEqual(date);

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
