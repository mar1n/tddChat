import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "./utils/test-utils";
import Navigation from "../components/navigation/Navigation";
import RouterButton from "../components/navigation/RouterButton";
import Router from "../components/Router/Router";
import userEvent from "@testing-library/user-event";

describe("Navigation", () => {
  test("render all links", () => {
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
  test('default path has style/className active', async () => { 
    renderWithProviders(
      <MemoryRouter>
        <Router/>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    
    const signin = screen.getByRole("link", { name: "Signin"});
    await user.click(signin);
    const signin2 = screen.getByRole("link", { name: "Signin"});
    expect(signin2).toHaveClass("active");
    const home = screen.getByRole("link", { name: "Home"});
    expect(home).toHaveClass("button");
   })
});
