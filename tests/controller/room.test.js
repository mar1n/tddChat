const mongoose = require("mongoose");
const createServer = require("../../server");
const Message = require("../../src/db/model/message");
const Room = require("../../src/db/model/room");
const User = require("../../src/db/model/user");
const supertest = require("supertest");

const app = createServer();

describe("rooom controller", () => {
  test("testing server", async () => {
    const response = await supertest(app)
      .post("/room/new")
      .send({ name: "Szymon", text: "random msg"})
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200);

      console.log('response', response._body);
      expect(response._body).toEqual({ message: 'msg has been added'})
  });
});
