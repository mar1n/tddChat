const createServer = require("../../server");
const User = require("../../src/db/model/user");
const supertest = require("supertest");
const { connectToMongo, disconnect } = require("../utils/db");
const { JsonWebTokenError } = require("jsonwebtoken");


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
    send: jest.fn()
  };
});

const sgMail = require("@sendgrid/mail");

beforeEach(async () => {
  await connectToMongo();
});

afterEach(async () => {
  await disconnect();
});

const app = createServer();

describe("Users controller", () => {
  afterEach(async () => {
    jest.clearAllMocks();
    //jest.mockReset();
    await User.deleteMany();
  });
  test("email has been sent", async () => {
      sgMail.send.mockResolvedValue(fakeSgMailResponse);
        const response = await supertest(app)
      .post("/user/email")
      .send({
        name: "Ronaldo", email: "cykcykacz@gmail.com", password: "asdzxcz"
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toEqual("Email has been sent!!!");
  });
  test("user email is taken", async () => {
    User.create([{ email: "szymon@gmail.com", name: "Szymon" }]);
    const response = await supertest(app)
      .post("/user/signup")
      .send({
        name: "Szymon",
        email: "szymon@gmail.com",
        password: "randomTEXT",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    const { message } = response.body;
    expect(message).toEqual("Email is taken!!!");
  });


  test('Account activation', async () => {
    const response = await supertest(app)
      .post("/user/activation")
      .send({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3p5bW9uIiwiZW1haWwiOiJzenltb25AZ21haWwuY29tIiwicGFzc3dvcmQiOiJyYW5kb21URVhUIiwiaWF0IjoxNjU3ODEyODQ5LCJleHAiOjE2NTc4MTM0NDl9.q7dFO95DTW_zQy5jlxYwTQZIHdoI4x2JXJ_fYpxGYTE"})
      .set("Accept", "application/josn")
      .expect("Content-Type", /json/)
      .expect(200)

      const { message } = response.body;

      expect(message).toEqual("Account has been created!!!");
  });
});
