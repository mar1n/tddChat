const createServer = require("../../server");
const User = require("../../src/db/model/user");
const supertest = require("supertest");
const { connectToMongo, disconnect } = require("../utils/db");
const jwt = require("jsonwebtoken");
const FakeTimers = require("@sinonjs/fake-timers");


const fakeSgMailResponse = [
  {
    statusCode: 202,
    body: "",
    headers: {
      server: "nginx",
      date: "Tue, 12 Jul 2022 12:31:08 GMT",
      "content-length": "0",
      connection: "close",
      "x-message-id": "oxAishRxSdqXEVCDFtWWIQ",
      "access-control-allow-origin": "https://sendgrid.api-docs.io",
      "access-control-allow-methods": "POST",
      "access-control-allow-headers":
        "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
      "access-control-max-age": "600",
      "x-no-cors-reason":
        "https://sendgrid.com/docs/Classroom/Basics/API/cors.html",
      "strict-transport-security": "max-age=600; includeSubDomains",
    },
  },
];

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn(),
  };
});
const sgMail = require("@sendgrid/mail");

let clock;
beforeEach(async () => {
  clock = FakeTimers.install();
  await connectToMongo();
});

afterEach(async () => {
  clock = clock.uninstall();
  await disconnect();
});

const app = createServer();

describe("Users controller", () => {
  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany();
  });
  describe("Singup the User", () => {
    test("emial has been sent", async () => {
      sgMail.send.mockResolvedValue(fakeSgMailResponse);
      const response = await supertest(app)
        .post("/user/signup")
        .send({
          firstName: "Ronaldo",
          email: "ronaldo@gmail.com",
          password: "asdadadadad",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      const { message } = response.body;
      expect(message).toEqual("Email has been sent!!!");
    });
    describe("validation", () => {
      test("filed name", async () => {
        const response = await supertest(app)
          .post("/user/signup")
          .send({
            firstName: "",
            email: "szymon@gmail.com",
            password: "randomTEXT",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(422);

        const { error } = response.body;
        expect(error).toEqual("firstName is required");
      });
      test("password lenght", async () => {
        const response = await supertest(app)
          .post("/user/signup")
          .send({
            firstName: "Szymon",
            email: "gmail.com",
            password: "randommm",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(422);

        const { error } = response.body;
        expect(error).toEqual("Must be a valid email address");
      });
      test("password lenght", async () => {
        const response = await supertest(app)
          .post("/user/signup")
          .send({
            firstName: "Szymon",
            email: "szymon@gmail.com",
            password: "ran",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(422);

        const { error } = response.body;
        expect(error).toEqual("Password must be at least 6 characteres long");
      });
    });
  });
  describe("Account activation", () => {
    test("Account created succesfully", async () => {
      const token = jwt.sign(
        { firstName: "Szymon", email: "szymon@gmail.com", password: "asdzxcqwe" },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" }
      );
      
      const response = await supertest(app)
        .post("/user/activation")
        .send({
          token: token,
        })
        .set("Accept", "application/josn")
        .expect("Content-Type", /json/)
        .expect(201);

      const { message } = response.body;
      expect(message).toEqual("Account has been created!!!");
      const findUser = await User.findOne({email: "szymon@gmail.com"});
      expect(findUser.firstName).toEqual("Szymon");
    });
    test("Token has been expired", async () => {
      const hoursInMs = n => 1000 * 60 * 60 * n;

      const token = jwt.sign(
        { firstName: "Szymon", email: "szymon@gmail.com", password: "asdzxcqwe" },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" }
      );

      clock.tick(hoursInMs(4));

      const response = await supertest(app)
        .post("/user/activation")
        .send({
          token: token,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401);

      const { error } = response.body;

      expect(error).toEqual("Expired link. Signup again.");
    });
  });
  describe('Signin User', () => {
    test('User does not exist', async () => {
      const response = await supertest(app)
        .post("/user/signin")
        .send({
          email: "cykcykacz@gmail.com",
          password: "zxcasdqwe"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)

      const { error } = response.body;
      expect(error).toEqual("Email and password do not match!");
    });
    test('Password is incorrect', async () => {
      await User.create([{ firstName: "Szymon", email: "cykcykacz@gmail.com", password: "zxcasdqwe"}]);
      const response = await supertest(app)
        .post("/user/signin")
        .send({
          email: "cykcykacz@gmail.com",
          password: "zxcasdqwf"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)

      const { error } = response.body;
      expect(error).toEqual("Email and password do not match!");
    });
    test('User email and password match ', async () => {
      await User.create([{ firstName: "Szymon", email: "cykcykacz@gmail.com", password: "zxcasdqwe"}]);
      const response = await supertest(app)
        .post("/user/signin")
        .send({
          email: "cykcykacz@gmail.com",
          password: "zxcasdqwe"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)

        const { message } = response.body;
        expect(message).toEqual("Login details are correct. Welcome in service.")
    });
  });
});
