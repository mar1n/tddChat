const { errFiveHundred } = require("../../src/controller/errors");
const supertest = require("supertest");
const createServer = require("../../server");
const app = createServer();

const req = jest.fn();
const res = {
  status: jest.fn(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Errors Controller", () => {
  test("errors fn has been call with error code 500", () => {
    const err = { name: "Validation" };
    errFiveHundred(err, req, res, next);
    expect(res.status.mock.calls.length).toEqual(1);
    expect(res.status.mock.calls[0][0]).toEqual(500);
  });
  test("Page not found ", async () => {
    const response = await supertest(app)
      .get("/not-found")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);

    const {error} = response.body;
    expect(error).toEqual("Page not found.");
  });
});
