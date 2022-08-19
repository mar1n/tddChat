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
  test("should first", () => {
    renderWithProviders(<MemoryRouter><Router /></MemoryRouter>);
    const user = userEvent.setup();
    const home = screen.getByText(/You are at home/i);
    expect(home).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    user.click(homeLink);
    expect(home).toBeInTheDocument();
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
});
