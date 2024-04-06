const createServer = require("../../server");
const supertest = require("supertest");
const { connectToMongo, disconnect } = require("../utils/db");
const { connectDB, dropDB } = require("../utils/setuptestdb");
const User = require("../../src/db/model/user");

// jest.mock("jsonwebtoken", () => {
//   const originalModule = jest.requireActual("jsonwebtoken");

//   return {
//     ...originalModule,
//     verify: jest.fn((token, secretOrPublicKey, callback) => {
//       console.log('mockkkkkk')
//       return callback(null);
//     }),
//   };
// });

const jwt = require("jsonwebtoken");

beforeEach(async () => {
  await connectDB();
});

afterEach(async () => {
  await dropDB();
});

const app = createServer();

describe("Users controller", () => {
  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany();
  });
  describe("Account activation", () => {
    test("Account created succesfully", async () => {
      const token = jwt.sign(
        { firstName: "Szymon", email: "szymon@gmail.com", password: "asdzxcqwe" },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" }
      );

      const response = await supertest(app)
        .get(`/user/activation/${token}`)
        .expect("Content-Type", /json/)
        .expect(201);

      const { message } = response.body;

      expect(message).toEqual("Account has been created!!!");
    });
  });
});
