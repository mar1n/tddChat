const createServer = require("../../server");
const Rooms = require("../../src/db/model/room");
const Users = require("../../src/db/model/user")
const supertest = require("supertest");
const { connectToMongo, disconnect } = require("../utils/db");
const { createRoom } = require("../utils/document");
const { addMsgWebSocket } = require("../../src/controller/room");

beforeEach(async () => {
  await connectToMongo();
});

afterEach(async () => {
  await Rooms.deleteMany();
  await Users.deleteMany();
  await disconnect();
});

const app = createServer();

describe("rooom controller", () => {
  test("fetch rooms", async () => {
    await createRoom("Room 1", "Ronaldo");
    await supertest(app)
      .get("/room/all")
      .send({ title: "Room 1", firstName: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
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
  test("200", async () => {
    await createRoom("Room 1", "Robin");

    await supertest(app)
      .post("/room/create")
      .send({ title: "Room 2", firstName: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("add the message to the room", async () => {
    const room = await createRoom();

    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", firstName: "Robin", room })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response._body).toEqual({ message: "message has been added" });
    const messageInRoom = await Rooms.findOne({ title: "Space" });
    expect(messageInRoom.messages[0].text).toEqual("my msg");
  });
  test("the room that doesnt exist", async () => {
    const room = { title: "unKnow" };
    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", firstName: "Robin", room })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response._body).toEqual({ message: "Room does not exist!!!" });
    // const messageInRoom = await Rooms.findOne({ title: "Space" });
    // expect(messageInRoom.messages[0].text).toEqual("my msg");
  });
  test("user doesnt exist in room", async () => {
    const room = await createRoom();

    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", firstName: "Steve", room })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response._body).toEqual({ message: "User does not exist!!!" });
  });
  test("seek users", async () => {
    await createRoom();

    await supertest(app)
      .get("/room/seekUsers")
      .send({ firstName: "Szymon" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  describe("Web Socket", () => {
    test("add the message to the room", async () => {
      await addMsgWebSocket();
    });
  });
});
