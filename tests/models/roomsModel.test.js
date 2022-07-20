const mongoose = require("mongoose");
const Rooms = require("../../src/db/model/room");
const User = require("../../src/db/model/user");
const { connectToMongo, disconnect } = require("../utils/db");
const { date, userName, message } = require("../utils/values");
const { createRoom, findById } = require("../utils/document");



describe("rooms", () => {
  beforeEach(async () => {
    await connectToMongo()
  });
  afterEach(async () => {
    await Rooms.deleteMany();
    await User.deleteMany();
    await disconnect();
  });
  test("add room", async () => {
    const room = await createRoom();

    const findRoom = await findById(room._id);

    expect(findRoom._id).toEqual(room._id);
  });
  test("add message to room", async () => {
    const room = await createRoom();

    const msg = message("First Msg", "Szymon", date);
    const msg2 = message("second Msg", "Robert", date);
    const msg3 = message("Third Msg", "Max", date);

    await room.addMsg(room, msg);
    await room.addMsg(room, msg2);
    await room.addMsg(room, msg3);

    const roomMsg = await findById(room._id);

    expect(roomMsg.messages[0].text).toEqual("First Msg");
    expect(roomMsg.messages[1].text).toEqual("second Msg");
    expect(roomMsg.messages[2].text).toEqual("Third Msg");
  });

  test("join and leave room", async () => {
    const room = await createRoom();

    const user = userName("Ronaldo");

    await Rooms.findOneAndUpdate(room._id, { $push: { users: user } });

    const joinUser = await findById(room._id);

    expect(joinUser.users[1].name).toEqual("Ronaldo");

    await room.removeUser(room, joinUser);

    expect(room.users.length).toEqual(1);
  });

  test("unknown user can not post message", async () => {
    const room = await createRoom();

    const user = userName("Rivaldo");

    await Rooms.findOneAndUpdate(room._id, { $push: { users: user } });

    try {
      const msg = message("First Msg", "Starnger", date);
      await room.addMsg(room, msg);
    } catch (err) {
      expect("User does not exist!!!").toEqual(err);
    }
  });

  test("3 people inside the room, one user left room, number of people is 2", async () => {
    const room = await createRoom("new room");

    const user1 = userName("Ronaldo");
    const user2 = userName("Rivaldo");

    await Rooms.findOneAndUpdate(
      { _id: room._id, "users.name": { $ne: user1.name } },
      {
        $push: { users: user1 },
      }
    );

    await Rooms.findOneAndUpdate(
      { _id: room._id, "users.name": { $ne: user2.name } },
      {
        $push: { users: user2 },
      }
    );

    const numberOfUsers = await Rooms.findOne({ title: "new room" });

    expect(numberOfUsers.users.length).toEqual(3);

    const joinUser = await findById(room._id);
    await room.removeUser(room, joinUser);
    const oneUserLeft = await Rooms.findOne({ title: "new room" });
    expect(oneUserLeft.users.length).toEqual(2);
  });

  test("you can't leave the room if you are not a member ", async () => {
    try {
      const room = await createRoom();

      const joinUser = await findById(room._id);

      await room.removeUser(room, joinUser);
    } catch (err) {
      expect("You can not leave this room!!!").toEqual(err);
    }
  });

  test("msg include timeStamp", async () => {
    const msg1 = message("First Msg", "Szymon");
    const msg2 = message("second Msg", "Robert");
    const msg3 = message("Third Msg", "Max");

    const room = await createRoom();

    await room.addMsg(room, msg1);
    await room.addMsg(room, msg2);
    await room.addMsg(room, msg3);

    const roomMsg = await findById(room._id);
    expect(roomMsg.messages[0].createdAt.toISOString()).toBeTruthy();
    expect(roomMsg.messages[1].createdAt.toISOString()).toBeTruthy();
    expect(roomMsg.messages[2].createdAt.toISOString()).toBeTruthy();
  });

  test("if message is invalid message wont be added", async () => {
    expect.hasAssertions();

    const room = await createRoom();
    try {
      await room.addMsg(room, { text: "random", timeStamp: date });
    } catch (err) {
      expect(err.message).toEqual(
        "Messages validation failed: name: Path `name` is required."
      );
    }
  });

  test("only one room can have one title", async () => {
    expect.hasAssertions();
    await User.create([
      { email: "gmail@google.com", name: "Rocky", hashed_password: "asdaczczcasda" },
      { email: "bill@microsoft.com", name: "Ronaldo", hashed_password: "asdaczczcasda" },
      { email: "test@gmail.com", name: "Jordan", hashed_password: "asdaczczcasda" },
    ]);
    await User.init();
    const user = await User.findOne({ email: "bill@microsoft.com" });

    await createRoom("title", user.name);

    try {
      await createRoom("title", user.name);
    } catch (err) {
      expect(err.code).toEqual(11000);
    }
  });
});
