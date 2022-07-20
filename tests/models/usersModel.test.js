const User = require("../../src/db/model/user");
const { connectToMongo, disconnect } = require("../utils/db");

describe("Users", () => {
  beforeEach(async () => {
    await connectToMongo();
  });
  afterEach(async () => {
    await User.deleteMany();
    await disconnect();
  });

  test("only one user can have a given email", async () => {
    expect.hasAssertions();
    await User.create([
      {
        email: "gmail@google.com",
        name: "Rocky",
        password: "somepasss",
      },
      {
        email: "bill@microsoft.com",
        name: "Ronaldo",
        password: "somepasss",
      },
      { email: "test@gmail.com", name: "Jordan", password: "somepasss" },
    ]);

    await User.init();
    try {
      await User.create({
        email: "gmail@google.com",
        name: "unnamed",
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
        name: "unnamed",
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
        "User validation failed: name: Path `name` is required."
      );
    }
  });
  test("field email is required", async () => {
    expect.hasAssertions();

    try {
      await User.create({
        name: "unnamed",
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
          name: "Ronaldo",
          password: "xxxxx",
        },
      ]);

      const findUser = await User.findOne({ email: "ronaldo@gmail.com"});
      const authenticate = await findUser.authenticate("xxxxx");
      expect(authenticate).toBe(true);
    });
  });
});
