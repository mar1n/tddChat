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
      .query({ firstName: "Ronaldo "})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("create room", async () => {
    const response = await supertest(app)
      .post("/room/create")
      .send({ title: "Room 1", usersList: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

      expect(response.body.message).toEqual("Room has been created.")

    const createdRoom = await Rooms.findOne({ title: "Room 1" });
    expect(createdRoom.title).toEqual("Room 1");
  });
  test("the room title exists", async () => {
    await createRoom("Room 1", "Robin");

    const response = await supertest(app)
      .post("/room/create")
      .send({ title: "Room 1", usersList: "Ronaldo" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

      expect(response.body).toEqual({ message: "This room title exists!"})
  });
  test('The room contain few users.', async () => {
    const usersString = "Szymon,Arnold,Robin"
    const response = await supertest(app)
    .post("/room/create")
    .send({ title: "Dream room", usersList: usersString})
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

    expect(response.body.message).toEqual("Room has been created.");
    expect(response.body.room.users.map(value => value.firstName)).toEqual(["Szymon", "Arnold", "Robin"]);
  });
  test("200", async () => {
    await createRoom("Room 1", "Robin");

    await supertest(app)
      .post("/room/create")
      .send({ title: "Room 2", usersList: "Ronaldo" })
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

      const { message } = response.body;
    expect(message).toEqual("message has been added");
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
  describe("Web Socket", () => {
    test("add the message to the room", async () => {
      await addMsgWebSocket();
    });
  });
});
