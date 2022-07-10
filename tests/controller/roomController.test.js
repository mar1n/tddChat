const createServer = require("../../server");
const Rooms = require("../../src/db/model/room");
const User = require("../../src/db/model/user");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { connectToMongo, disconnect } = require("../utils/db");
const { createRoom } = require("../utils/document");

beforeEach(async () => {
  await connectToMongo()
});

afterEach(async () => {
  await Rooms.deleteMany();
  await disconnect();
});

const app = createServer();

describe("rooom controller", () => {
  test.skip("create room", async () => {
    await supertest(app)
      .post("/room/create")
      .send({ title: "Room 1", name: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const createdRoom = await Rooms.findOne({ title: "Room 1" });
    expect(createdRoom.title).toEqual("Room 1");
  });
  test("the room title exists", async () => {
    await Rooms.create({
      title: "Room 1",
      users: [{ name: "Robin" }],
    });

    await supertest(app)
      .post("/room/create")
      .send({ title: "Room 1", name: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
  test.skip("add the message to the room", async () => {
    const room = new Rooms({
      title: "title",
      users: [{ name: "Romario" }],
    });
    await room.save();

    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", name: "Romario", room: room })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response._body).toEqual({ message: "message has been added" });
    const messageInRoom = await Rooms.findOne({ title: "title" });
    expect(messageInRoom.messages[0].text).toEqual("my msg");
  });
});
