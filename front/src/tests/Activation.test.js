import React from "react";
import Activation from "../components/Activation/Activation";
import { render, screen } from "@testing-library/react";
import { createContainer } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";
import { renderWithProviders } from "./utils/test-utils";
import { act } from "react-dom/test-utils";
import jwt from "jsonwebtoken";

describe("Activation", () => {
  let renderRouter, clickAndWait;

  beforeEach(() => {
    ({ renderRouter, clickAndWait } = createContainer());
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
    const activationRoute = `/activation/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3p5bW9uIiwiZW1haWwiOiJzenltb25AZ21haWwuY29tIiwicGFzc3dvcmQiOiJhc2R6eGNxd2UiLCJpYXQiOjE2OTcxNDI0NzEsImV4cCI6MTY5NzE0MzA3MX0.l4icyEF2L2x9NgTAE-rMiIWiiuKekzgkhTOr5ZmOQBE`;

    await act (async () => {
      renderWithProviders(
        <MemoryRouter initialEntries={[activationRoute]}>
          <Router />
        </MemoryRouter>
      );
    })

    const buttonLink = screen.getByRole("button");
    await clickAndWait(buttonLink);

    const validationError = await screen.findByText("Expired link. Signup again.");
    expect(validationError).toBeInTheDocument();
  });
  test('Account has been activated, pls signin', async () => { 
    const token = jwt.sign(
      { firstName: "Szymon", email: "szymon@gmail.com", password: "asdzxcqwe" },
      "8787SADA888DAdAD888DAS",
      { expiresIn: "10m" }
    );

    const activationRoute = `/activation/${token}`;

    await act(async () => {
      renderWithProviders(
        <MemoryRouter initialEntries={[activationRoute]}>
          <Router />
        </MemoryRouter>
      )
    })

    const buttonLink = screen.getByRole("button");
    await clickAndWait(buttonLink);

    expect(await screen.findByText("Account has been created!!!")).toBeInTheDocument();
   })
});
