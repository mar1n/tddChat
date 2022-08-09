import React from "react";
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"
describe("Signup", () => {
  test("renders a form", () => {
    render(
   <MemoryRouter><Signup /></MemoryRouter> );
    const form = screen.getByRole("form", { name: /signup form/i });
    expect(form).toBeInTheDocument();
  });
});
