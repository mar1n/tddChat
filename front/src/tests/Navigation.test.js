import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import RouterButton from "../components/navigation/RouterButton";
import userEvent from "@testing-library/user-event";

describe("Navigation", () => {
  test("render all links", () => {
    render(
      <MemoryRouter>
        <Navigation>
          <RouterButton pathname={"/"}>Home</RouterButton>
          <RouterButton pathname={"/signup"}>Signup</RouterButton>
          <RouterButton pathname={"/signin"}>Signin</RouterButton>
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
});
