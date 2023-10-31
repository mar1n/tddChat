const User = require("../../src/db/model/user");
const { connectToMongo, disconnect } = require("../utils/db");

beforeEach(async () => {
  await connectToMongo();
  await User.deleteMany();
});
afterEach(async () => {
  await User.deleteMany();
  await disconnect();
});

describe("Users", () => {

  test("only one user can have a given email", async () => {
    expect.hasAssertions();
    await User.create([
      {
        email: "gmail@google.com",
        firstName: "Rocky",
        password: "somepasss",
      },
      {
        email: "bill@microsoft.com",
        firstName: "Ronaldo",
        password: "somepasss",
      },
      { email: "test@gmail.com", firstName: "Jordan", password: "somepasss" },
    ]);

    await User.init();
    try {
      await User.create({
        email: "gmail@google.com",
        firstName: "unnamed",
        password: "somepasss",
      });
    } catch (error) {
      expect(error.code).toEqual(11000);
    }
  });

  test("field hashed_password is required", async () => {
    expect.hasAssertions();

    try {
      await User.create({
        email: "gmail@google.com",
        firstName: "unnamed",
      });
    } catch (error) {
      expect(error.message).toEqual(
        "User validation failed: hashed_password: Path `hashed_password` is required."
      );
    }
  });
  test("field name is required", async () => {
    expect.hasAssertions();

    try {
      await User.create({
        email: "gmail@google.com",
        password: "somepasss",
      });
    } catch (error) {
      expect(error.message).toEqual(
        "User validation failed: firstName: Path `firstName` is required."
      );
    }
  });
  test("field email is required", async () => {
    expect.hasAssertions();

    try {
      await User.create({
        firstName: "unnamed",
        password: "somepasss",
      });
    } catch (error) {
      expect(error.message).toEqual(
        "User validation failed: email: Path `email` is required."
      );
    }
  });
  describe("user authentication", () => {
    test("user provide correct password", async () => {
      await User.create([
        {
          email: "ronaldo@gmail.com",
          firstName: "Ronaldo",
          password: "xxxxx",
        },
      ]);

      const findUser = await User.findOne({ email: "ronaldo@gmail.com"});
      const authenticate = await findUser.authenticate("xxxxx");
      expect(authenticate).toBe(true);
    });
  });
});
