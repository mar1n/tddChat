import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "./utils/test-utils";
import Navigation from "../components/navigation/Navigation";
import RouterButton from "../components/navigation/RouterButton";
import Router from "../components/Router/Router";
import userEvent from "@testing-library/user-event";
import cookie from "js-cookie";

describe("Navigation", () => {
  test("Render all links.", () => {
    render(
      <MemoryRouter>
        <Navigation>
          <RouterButton path={"/"}>Home</RouterButton>
          <RouterButton path={"/signup"}>Signup</RouterButton>
          <RouterButton path={"/signin"}>Signin</RouterButton>
        </Navigation>
      </MemoryRouter>
    );

    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toBeInTheDocument();
    const signup = screen.getByRole("link", { name: "Signup" });
    expect(signup).toBeInTheDocument();
    const signin = screen.getByRole("link", { name: "Signin" });
    expect(signin).toBeInTheDocument();
  });
  test("Default path has style/className active.", async () => {
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Router />
        </MemoryRouter>
      );
    }) 
    const user = userEvent.setup();

    const signin = screen.getByRole("link", { name: "Signin" });
    await user.click(signin);
    const signin2 = screen.getByRole("link", { name: "Signin" });
    expect(signin2).toHaveClass("active");
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveClass("button");
  });
  describe("Navigation for login user.", () => {
    beforeEach(() => {
      jest.spyOn(cookie, "get").mockImplementation(() => {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjExMjMsImlhdCI6MTY2Mzk2NTg4MiwiZXhwIjoxNjY0NTcwNjgyfQ.H0hKZMENmc7UTQF55gzlodyC9yvukGb1rkD_Fck-uos";
      });
      jest
        .spyOn(window.localStorage.__proto__, "getItem")
        .mockImplementation(() => {
          return '{"_id":1223,"name":"Szymon","email":"szym0nd4widowicz@gmail.com","role":"admin"}';
        });
    });

    afterEach(() => {
      cookie.get.mockClear();
      window.localStorage.__proto__.getItem.mockClear();
    });
    test("Login user can see only home and log out links.", async () => {
      await act(() => {
        renderWithProviders(
          <MemoryRouter>
            <Router />
          </MemoryRouter>
        );
      }) 

      const home = screen.getByRole("link", { name: "Home" });
      expect(home).toBeInTheDocument();
      const signOut = screen.getByRole("link", { name: "Signout" });
      expect(signOut).toBeInTheDocument();
      const rooms = screen.getByRole("link", { name: "Rooms"});
      expect(rooms).toBeInTheDocument();
      const signIn = screen.queryByText("Signin");
      expect(signIn).toBeNull();
      const signUp = screen.queryByText("Signup");
      expect(signUp).toBeNull();
    });
  });
});
