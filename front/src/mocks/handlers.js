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
    console.log("email", email);
    console.log("password", password);
    if (email !== "cykcykacz@gmail.com") {
      return res(
        ctx.json({ message: "Email has been sent!!!" }),
        ctx.status(400)
      );
    }

    if (password !== "testPassword") {
      return res(
        ctx.json({ message: "Email has been sent!!!" }),
        ctx.status(400)
      );
    }

    return res(
      ctx.json({
        _id: 1223,
        name: "Szymon",
        email: "szym0nd4widowicz@gmail.com",
        role: "admin",
      }),
      ctx.status(201)
    );
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
        return res(ctx.json({ message: "Expired link. Signup again." }), ctx.status(401));
      }
    }
  ),
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
