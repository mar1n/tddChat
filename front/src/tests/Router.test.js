import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";
import { renderWithProviders } from "./utils/test-utils";

describe("Router", () => {
  test("Display home page", () => {
    renderWithProviders(<MemoryRouter><Router /></MemoryRouter>);

    const home = screen.getByText(/You are at home/i);
    expect(home).toBeInTheDocument();
  });
  test("display home page content after click home link", async() => {
    renderWithProviders(<MemoryRouter><Router /></MemoryRouter>);
    const user = userEvent.setup();
    const home = screen.getByText(/You are at home/i);
    expect(home).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    await user.click(homeLink);
    expect(home).toBeInTheDocument();
  });
  test("display home page content after click signup link", async () => {
    renderWithProviders(<MemoryRouter><Router /></MemoryRouter>);
    const user = userEvent.setup();
    const home = screen.getByText(/You are at home/i);
    expect(home).toBeInTheDocument();

    const sinupLink = screen.getByRole("link", { name: "Signup" });
    
    await user.click(sinupLink);
    const signupContent = screen.getByText(/Signup Page/i);
    expect(signupContent).toBeInTheDocument();
  });
  test("display home page content after click signin link", async () => {
    renderWithProviders(<MemoryRouter><Router /></MemoryRouter>);
    const user = userEvent.setup();
    const home = screen.getByText(/You are at home/i);
    expect(home).toBeInTheDocument();

    const sinupLink = screen.getByRole("link", { name: "Signin" });

    await user.click(sinupLink);
    const signupContent = screen.getByText(/Signin Page/i);
    expect(signupContent).toBeInTheDocument();
  });
  test("page not found", () => {
    const badRoute = "/some/bad/route";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Router />
      </MemoryRouter>
    );

    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
  test("signup page", () => {
    const signupRoute = "/signup";
    render(
      <MemoryRouter initialEntries={[signupRoute]}>
        <Router />
      </MemoryRouter>
    );

    const signupPage = screen.getByText(/Signup page/i);
    expect(signupPage).toBeInTheDocument();
  });
  test("signin page", () => {
    const signinRoute = "/signin";
    render(
      <MemoryRouter initialEntries={[signinRoute]}>
        <Router />
      </MemoryRouter>
    );

    const signupPage = screen.getByText(/Signin page/i);
    expect(signupPage).toBeInTheDocument();
  });
});
