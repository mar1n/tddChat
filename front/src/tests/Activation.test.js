import React from "react";
import Activation from "../components/Activation/Activation";
import { render, screen } from "@testing-library/react";
import { createContainer } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";
import jwt from "jsonwebtoken";
const FakeTimers = require("@sinonjs/fake-timers");

describe("Activation", () => {
  let renderRouter, clickAndWait, clock;

  beforeEach(() => {
    clock = FakeTimers.install();
    ({ renderRouter, clickAndWait } = createContainer());
  });

  afterEach(() => {
    clock = clock.uninstall();
  });

  test("render button link", () => {
    renderRouter(<Activation />);
    const buttonLink = screen.getByRole("button");
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).not.toBeDisabled();
  });
  test("render activation text welcome text", () => {
    const activationRoute =
      "/activation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3p5bW9uIiwiZW1haWwiOiJzenltb25AZ21haWwuY29tIiwicGFzc3dvcmQiOiJhc2R6eGNxd2UiLCJpYXQiOjAsImV4cCI6NjAwfQ.NC4hxKs_tAnUkZhg12PJWpVOGEUqRxh97ghKNiUZzKU";
    render(
      <MemoryRouter initialEntries={[activationRoute]}>
        <Router />
      </MemoryRouter>
    );
    const welcomeText = screen.getByText(/Hey Szymon, active your account/i);
    expect(welcomeText).toBeInTheDocument();
  });
  test("button not disabled after click link", async () => {
    renderRouter(<Activation />);

    const buttonLink = screen.getByRole("button");
    await clickAndWait(buttonLink);

    expect(buttonLink).not.toBeDisabled();
  });
  test("wrong token validation error", () => {
    const activationRoute = "/activation/M";
    render(
      <MemoryRouter initialEntries={[activationRoute]}>
        <Router />
      </MemoryRouter>
    );
    const validationError = screen.getByText("Invalid token");
    expect(validationError).toBeInTheDocument();
  });
  test("token has been expired", async () => {
    const token = jwt.sign(
      { name: "Szymon", email: "szymon@gmail.com", password: "asdzxcqwe" },
      "8787SADA888DAdAD888DAS",
      { expiresIn: "10m" }
    );
    const activationRoute = `/activation/${token}`;

    const hoursInMs = (n) => 1000 * 60 * 60 * n;
    clock.tick(hoursInMs(4));

    render(
      <MemoryRouter initialEntries={[activationRoute]}>
        <Router />
      </MemoryRouter>
    );
    const buttonLink = screen.getByRole("button");
    await clickAndWait(buttonLink);

    const validationError = screen.getByText("Expired link. Signup again.");
    expect(validationError).toBeInTheDocument();
  });
});
