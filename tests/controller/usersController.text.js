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
  test("signUp of the user", async () => {
    const response = await supertest(app)
      .post("/user/signup")
      .send({ name: "Szymon", password: "randomTEXT" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

      
  });
});
