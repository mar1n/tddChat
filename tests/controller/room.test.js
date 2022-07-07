const mongoose = require("mongoose");
const createServer = require("../../server");
const Message = require("../../src/db/model/message");
const Rooms = require("../../src/db/model/room");
const User = require("../../src/db/model/user");
const supertest = require("supertest");

const app = createServer();

describe("rooom controller", () => {
  beforeEach(async () => {
    const connectToMongo = async () => {
      let connect = await mongoose.connect("mongodb://0.0.0.0:27017/tddChat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
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
  test("testing server", async () => {
    const room = new Rooms({
      title: "title",
      users: [{ email: "creatorOfRoom@gmail.com" }],
    });
    await room.save();

    const response = await supertest(app)
      .post("/room/new")
      .send({ text: "my msg", email: "creatorOfRoom@gmail.com", room: room })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    
    expect(response._body).toEqual({ message: "message has been added" });
    const messageInRoom = await Rooms.findOne({ title: "title" });
    expect(messageInRoom.messages[0].text).toEqual("my msg");
    
  });
});
