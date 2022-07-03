const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");
const Messages = require("../../src/db/model/message");
const User = require("../../src/db/model/user");

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
        autoIndex: true
      });
      return connect;
    };
    await connectToMongo();
  });

  afterEach(async () => {
    await Rooms.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });
  test.skip("add room", async () => {
    const room = new Rooms({
      title: "Space",
    });
    await room.save();

    const findRoom = await Rooms.findById(room._id).exec();

    expect(findRoom._id).toEqual(room._id);
  });
  test.skip("add message to room", async () => {
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

  test.skip("join and leave room", async () => {
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

  test.skip("unknow user can not post message", async () => {
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
      users: [ {email: "cykcykacz@gmail.com"}]
    });
    await room.save();

    const threeUsers = { email: "attack@gmail.com" };

    const joinThisRoom = { _id: room._id };

    // await Rooms.findOneAndUpdate(joinThisRoom, {
    //   $push: { users: { $each: threeUsers } },
    // }, { runValidators: true });
    await Rooms.findOneAndUpdate({ _id: room._id, 'users.email': { $ne: "attack@gmail.com" }}, {
      $push: { users: threeUsers },
    }, { runValidators: true, new: false, upsert: true });

    const numberOfUsers = await Rooms.findOne({ title: "new room" });
    console.log('numberOfUsers', numberOfUsers);
    //numberOfUsers.validate();
    expect(numberOfUsers.users.length).toEqual(3);

    const joinUser = await Rooms.findById(joinThisRoom).exec();
    await room.removeUser(room, joinUser);
    const oneUserLeft = await Rooms.findOne({ title: "new room" });
    expect(oneUserLeft.users.length).toEqual(2);
  });

  test.skip("leave empty room give an error", async () => {
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

  test.skip("msg include timeStamp", async () => {
    const date = new Date().toISOString();

    const msg1 = new Messages({
      text: "random text",
      name: "Szymon",
      timeStamp: date,
    });
    const msg2 = new Messages({
      text: "random text",
      name: "Szymon",
      timeStamp: date,
    });
    const msg3 = new Messages({
      text: "random text",
      name: "Szymon",
      timeStamp: date,
    });

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

  test.skip("if message is invalid message wont be added", async () => {
    try {
      const date = new Date().toISOString();

      const msg1 = new Messages({
        text: "random text",
        timeStamp: date,
      });

      const room = new Rooms({
        title: "new Room",
      });
      await room.save();
      await room.addMsg(room, msg1);
    } catch (err) {
      expect(err.message).toEqual(
        "Messages validation failed: name: Path `name` is required."
      );
    }
  });
  test.skip("only one user can have a given email", async () => {
    await User.create([
      { email: "gmail@google.com" },
      { email: "bill@microsoft.com" },
      { email: "test@gmail.com" },
    ]);
    console.log("User", User);
    console.log("User ", await User.init());
    try {
      await User.create({ email: "gmail@gooogle.com" });
    } catch (error) {
      error.message; // 'E11000 duplicate key error...'
    }
  });
  test.skip("add new users to the room", async () => {
    const room = new Rooms({
      title: "new Room",
    });
    await room.save(async (err, user) => {
      if (err) {
        console.log("xxxx");
      }
      await user.users.save([
        { email: "gmail@google.com" },
        { email: "bill@microsoft.com" },
        { email: "test@gmail.com" },
      ]);
      try {
        await user.users.save({ email: "gmail@gooogle.com" });
      } catch (error) {
        error.message; // 'E11000 duplicate key error...'
      }
      console.log("user", user);
      // console.log('user', user.users.create([
      //   { email: "gmail@google.com" },
      //   { email: "bill@microsoft.com" },
      //   { email: "test@gmail.com" },
      // ]));
    });

    console.log("room", room);

    // await User.create([
    //   { email: "gmail@google.com" },
    //   { email: "bill@microsoft.com" },
    //   { email: "test@gmail.com" },
    // ]);
  });
});
