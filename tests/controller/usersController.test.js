const createServer = require("../../server");
const User = require("../../src/db/model/user");
const supertest = require("supertest");
const { connectToMongo, disconnect } = require("../utils/db");

beforeEach(async () => {
  await connectToMongo();
});

afterEach(async () => {
  await User.deleteMany();
  await disconnect();
});

const app = createServer();

describe("Users controller", () => {
  User.create([{ email: "szymon@gmail.com", name: "Szymon" }]);
  test.only("user email is taken", async () => {
    const response = await supertest(app)
      .post("/user/signup")
      .send({ name: "Szymon", email: "szymon@gmail.com", password: "randomTEXT" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.message).toEqual("Email is taken!!!");
  });
});
