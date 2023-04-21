const createServer = require("../../server");
const Rooms = require("../../src/db/model/room");
const supertest = require("supertest");
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
  test("create room", async () => {
    await supertest(app)
      .post("/room/create")
      .send({ title: "Room 1", firstName: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const createdRoom = await Rooms.findOne({ title: "Room 1" });
    expect(createdRoom.title).toEqual("Room 1");
  });
  test("the room title exists", async () => {
    await createRoom("Room 1", "Robin");

    await supertest(app)
      .post("/room/create")
      .send({ title: "Room 1", firstName: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
  test("add the message to the room", async () => {
    const room = await createRoom()

    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", firstName: "Robin", room: room })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response._body).toEqual({ message: "message has been added" });
    const messageInRoom = await Rooms.findOne({ title: "Space" });
    expect(messageInRoom.messages[0].text).toEqual("my msg");
  });
  test("add the message to the room that doesnt exist", async () => {
    const room = await createRoom()

    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", firstName: "Robin", room: "Unknow" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    // expect(response._body).toEqual({ message: "message has been added" });
    // const messageInRoom = await Rooms.findOne({ title: "Space" });
    // expect(messageInRoom.messages[0].text).toEqual("my msg");
  });
});
