const mongoose = require("mongoose");
const createServer = require("../../server");
const Message = require("../../src/db/model/message");
const Room = require("../../src/db/model/room");
const User = require("../../src/db/model/user");
const supertest = require("supertest");

// beforeEach(async () => {
//     const connectToMongo = async () => {
//       let connect = await mongoose.connect("mongodb://0.0.0.0:27017/tddChat", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       return connect;
//     };
//     await connectToMongo();
//   });

//   afterEach(async () => {
//     await Room.deleteMany();
//     await mongoose.connection.close();
//   });

const app = createServer();

describe("rooom controller", () => {
  test("testing server", async () => {
    // const user = new User({
    //     title: "new room"
    // });

    // const room = new Room({
    //     title:
    // })
    await supertest(app)
      .post("/room/new")
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      
  });
});
