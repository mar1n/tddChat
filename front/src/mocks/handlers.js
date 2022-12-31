import { rest } from "msw";
import jwt from "jsonwebtoken";

export const handlers = [
  rest.post("http://localhost:500/signup", async (req, res, ctx) => {
    const PageParams = new URLSearchParams(window.location.search);
    const scenario = PageParams.get("scenario");

    if (scenario === "validation") {
      const { firstName, email, password } = await req.json();

      if (firstName === "") {
        return res(ctx.json({ error: "Name is required" }), ctx.status(422));
      }
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        return res(
          ctx.json({ error: "Must be a valid email address" }),
          ctx.status(422)
        );
      }
      if (password.length < 6) {
        return res(
          ctx.json({ error: "Password must be at least 6 characteres long" }),
          ctx.status(422)
        );
      }
    }

    return res(
      ctx.json({ message: "Email has been sent!!!" }),
      ctx.status(200)
    );
  }),

  rest.post("http://localhost:500/signin", async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email !== "cykcykacz@gmail.com") {
      return res(
        ctx.json({ message: "Email and password do not match!" }),
        ctx.status(400)
      );
    }

    if (password !== "testPassword") {
      return res(
        ctx.json({ message: "Email and password do not match!" }),
        ctx.status(400)
      );
    }
    try {
      const token = jwt.sign({ _id: 1123 }, "9989897DSDADA888DA", {
        expiresIn: "7d",
      });

      return res(
        ctx.json({
          message: "Login details are correct. Welcome in service.",
          token,
          user: {
            _id: 1223,
            name: "Szymon",
            email: "cykcykacz@gmail.com",
            role: "admin",
          },
        }),
        ctx.status(201)
      );
    } catch (error) {
      console.log("error signin", error);
    }
  }),
  rest.post(
    "http://localhost:500/account-activation",
    async (req, res, ctx) => {
      const { token } = await req.json();
      try {
        jwt.verify(token, "8787SADA888DAdAD888DAS");
        return res(
          ctx.json({ message: "Account has been created!!!" }),
          ctx.status(201)
        );
      } catch (error) {
        return res(
          ctx.json({ message: "Expired link. Signup again." }),
          ctx.status(401)
        );
      }
    }
  ),
  rest.get("http://localhost:500/rooms", async (req, res, ctx) => {
    const { userName } = await req.json();
    console.log("userName", userName);
    const initialRoomState = [
      {
        title: "Robin book",
        users: [{ name: "Robin" }, { name: "John" }, { name: "Szymon" }],
        messages: [],
      },
    ];
    if (
      initialRoomState.find((room) =>
        room.users.find((user) => {
          console.log("user", user);
          return user.name === userName;
        })
      )
    ) {
      const result = initialRoomState.filter((room) =>
        room.users.find((user) => userName)
      );
      console.log("result", result);
      return res(ctx.json(result[0]), ctx.status(201));
    } else {
      console.log("not found");
      return res(
        ctx.json({
          error: "Room not found.",
        }),
        ctx.status(400)
      );
    }
  }),
  rest.get("http://localhost:500/seekUsers", async (req, res, ctx) => {
    return res(
      ctx.json({
        message: "You, have found users.",
        users: [
          { name: "Sheriff of Nottingham" },
          { name: "John, King of England" },
        ],
      })
    );
  }),
  rest.post("http://localhost:500/createRoom", async (req, res, ctx) => {
    const { title } = await req.json();
    if (title) {
      return res(
        ctx.json({
          title: title,
          users: [{ name: "Marian" }],
          messages: [],
        }),
        ctx.status(201)
      );
    } else {
      return res(
        ctx.json({
          error: "There is some problem with creating room.",
        }),
        ctx.status(400)
      );
    }
  }),
  rest.get("http://localhost:500/selectRoom", async (req, res, ctx) => {
    const { title, user } = await req.json();
    if (title === "room of peace" && user === "Robin") {
      return res(
        ctx.json({
          messages: [{ text: "My nam is Robin from a forest.", name: "Robin" }],
        }),
        ctx.status(201)
      );
    }
  }),
  rest.post("http://localhost:500/addMsg", async (req, res, ctx) => {
    const { text, name, roomTitle } = await req.json();
    const room = {
      title: "Robin Hood Room",
      users: [{ name: "Szymon" }],
      messages: [{ text: "Robin is from forest.", name: "Szymon" }],
    };
    const roomtwo = {
      title: "Robin adventure",
      users: [{ name: "Szymon" }],
      messages: [{ text: "Robin is from Sherwood.", name: "Norbert" }],
    };
    console.log("roomTitle", roomTitle);
    if (room.title === roomTitle) {
      room.messages.push({ text, name });
      return res(
        ctx.json({
          message: "Message has been added.",
          room: room,
        })
      );
    }
    if (roomtwo.title === "Robin adventure") {
      roomtwo.messages.push({ text, name });
      return res(
        ctx.json({
          message: "Message has been added.",
          room: roomtwo,
        })
      );
    }
  }),
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session

    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error

      return res(
        ctx.status(403),

        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details

    return res(
      ctx.status(200),

      ctx.json({
        username: "admin",
      })
    );
  }),
];
