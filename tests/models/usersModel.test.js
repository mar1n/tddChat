const User = require("../../src/db/model/user");
const { connectToMongo, diconnect } = require("../utils/db");

describe("Users", () => {
  beforeEach(async () => {
    await connectToMongo();
  });
  afterEach(async () => {
    await User.deleteMany();
    await diconnect();
  });

  test.skip("only one user can have a given email", async () => {
    expect.hasAssertions();
    await User.create([
      { email: "gmail@google.com", name: "Rocky" },
      { email: "bill@microsoft.com", name: "Ronaldo" },
      { email: "test@gmail.com", name: "Jordan" },
    ]);

    await User.init();
    try {
      await User.create({ email: "gmail@google.com", name: "unnamed" });
    } catch (error) {
      expect(error.code).toEqual(11000);
    }
  });
});
