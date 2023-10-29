import { rest } from "msw";
import jwt from "jsonwebtoken";

export const handlers = [
  rest.post("http://localhost:5000/user/signup", async (req, res, ctx) => {
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
    if(scenario === "emialExist") {
      return res(
        ctx.json({ error: "Email has been taken!!!"}),
        ctx.status(422)
      )
    }
    return res(
      ctx.json({ message: "Email has been sent!!!" }),
      ctx.status(200)
    );
  }),

  rest.post("http://localhost:5000/user/signin", async (req, res, ctx) => {
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
  rest.get(
    "http://localhost:5000/user/activation/:token",
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
          ctx.json({ error: "Expired link. Signup again." }),
          ctx.status(401)
        );
      }
    }
  ),
  rest.get("http://localhost:5000/room/all", async (req, res, ctx) => {
    const firstName = req.url.searchParams.get("firstName");
    const initialRoomState = [];
    if (
      initialRoomState.find((room) =>
        room.users.find((user) => {
          return user.name === firstName;
        })
      )
    ) {
      const result = initialRoomState.filter((room) =>
        room.users.find((user) => firstName)
      );
      return res(ctx.json({message: "", room: result}), ctx.status(201));
    } else {
      return res(ctx.json({message: "", room: []}), ctx.status(201));
    }
  }),
  rest.get("http://localhost:5000/user/seekUsers", async (req, res, ctx) => {
    return res(
      ctx.json({
        message: "You, have found users.",
        users: [
          { firstName: "Sheriff of Nottingham" },
          { firstName: "John, King of England" },
        ],
      })
    );
  }),
  rest.post("http://localhost:5000/room/create", async (req, res, ctx) => {
    const { title, usersList } = await req.json();
    const users = usersList.split(",").map((value) => ({ firstName: value }));

    if (title) {
      return res(
        ctx.json({
          message: "Room has been created.",
          room: {
            title: title,
            users: [...users],
            messages: [],
          },
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
  rest.post("http://localhost:5000/room/new", async (req, res, ctx) => {
    const { text, firstName, room } = await req.json();

    if (room.users.find((value) => value.firstName === firstName)) {
      room.messages.push({ text: text, firstName: firstName });
      return res(
        ctx.json({
          message: "Message has been added.",
          room: room,
        })
      );
    }
    return res(
      ctx.json({
        error: "User doesn't exist.",
      }),
      ctx.status(400)
    );
  }),
];
