import React from "react";
import Activation from "../components/Activation/Activation";
import { render, screen } from "@testing-library/react";
import { createContainer } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";

describe("Activation", () => {
  let renderRouter;

  beforeEach(() => {
    ({ renderRouter } = createContainer());
  });

  test("render button link", () => {
    renderRouter(<Activation />);
    const buttonLink = screen.getByRole("button");
    expect(buttonLink).toBeInTheDocument();
  });
  test("render activation text welcome text", () => {
    const activationRoute = "/activation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3p5bW9uIiwiZW1haWwiOiJzenltb25AZ21haWwuY29tIiwicGFzc3dvcmQiOiJhc2R6eGNxd2UiLCJpYXQiOjAsImV4cCI6NjAwfQ.NC4hxKs_tAnUkZhg12PJWpVOGEUqRxh97ghKNiUZzKU";
    render(
      <MemoryRouter initialEntries={[activationRoute]}>
        <Router />
      </MemoryRouter>
    );
    const welcomeText = screen.getByText(/Hey Szymon, active your account/i);
    expect(welcomeText).toBeInTheDocument();
  });
});
