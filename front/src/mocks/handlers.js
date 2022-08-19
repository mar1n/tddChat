import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:500/signup", async (req, res, ctx) => {
    console.log('url.location', window.location.search);
    console.log('req', req);
    // Persist user's authentication in the session
    console.log('req.json()', await req.json())
    console.log('req', req.body.firstName === "");
    if(req.body.firstName === "") {
      return res(
        ctx.json({ error: "some Msg"}),
        ctx.status(422)
      )
    }
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.json({key: 'value'}),
      ctx.status(200)
    );
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
