import React from "react";
import Signin from "../components/Signin/Signin";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { createContainer } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";
import { renderWithProviders } from "./utils/test-utils";
import cookie from "js-cookie";

describe("Signin", () => {
  let renderRouter, form, field, label, submit, changeAndWait, withEvent;

  beforeEach(() => {
    ({ renderRouter, form, field, label, submit, changeAndWait, withEvent } =
      createContainer());
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

  test("render a form", () => {
    renderWithProviders(<MemoryRouter><Signin /></MemoryRouter>);
    expect(form("signin form")).toBeInTheDocument();
  });
  test("render submit button", () => {
    renderWithProviders(<MemoryRouter><Signin /></MemoryRouter>);
    const submitButton = screen.getByRole("submit");
    expect(submitButton).not.toBeDisabled();
  });
  const rendersLabelField = (name) =>
    test("renders a label for the field", () => {
      renderWithProviders(<MemoryRouter><Signin /></MemoryRouter>);
      expect(label(name).tagName).toEqual("LABEL");
      expect(label(name)).toBeInTheDocument();
    });
  const renderAsATextBox = (name) =>
    test("renders the field as text box", () => {
      renderWithProviders(<MemoryRouter><Signin /></MemoryRouter>);
      expect(field(name)).not.toBeNull();
      expect(field(name).tagName).toEqual("INPUT");
      expect(field(name).type).toEqual("text");
    });
  const includeTheExistingValue = (fieldName, value) =>
    test("includes the existing value", async () => {
      renderWithProviders(<MemoryRouter><Signin /></MemoryRouter>);
      await changeAndWait(field(fieldName), withEvent(fieldName, value));
      expect(field(fieldName).value).toEqual(value);
    });
  describe("Email field", () => {
    renderAsATextBox("email");
    rendersLabelField("Email");
    includeTheExistingValue("email", "randomtext");
  });
  describe("Password field", () => {
    renderAsATextBox("password");
    rendersLabelField("Password");
    includeTheExistingValue("password", "randomText");
  });
  test("user is authenticated, redirect  to home page", async () => {
    const signinRoute = "/signin";
    renderWithProviders(
      <MemoryRouter initialEntries={[signinRoute]}>
        <Router />
      </MemoryRouter>
    );
    await changeAndWait(
      field("email"),
      withEvent("email", "cykcykacz@gmail.com")
    );
    await changeAndWait(
      field("password"),
      withEvent("password", "testPassword")
    );

    await submit(form("signin form"));

    const homeText = screen.getByText("You are at home");
    expect(homeText).toBeInTheDocument();
    expect(screen.getByText(/Hello cykcykacz@gmail.com/i)).toBeInTheDocument();
  });
});
