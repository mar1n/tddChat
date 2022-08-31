import React from "react";
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { createContainer } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";

describe("Signup", () => {
  let renderRouter, form, field, label, submit, changeAndWait, withEvent;

  beforeEach(() => {
    ({ renderRouter, form, field, label, submit, changeAndWait, withEvent } =
      createContainer());
  });

  let location;
  const mockLocation = new URL("http://localhost/signup?scenario=validation");
  afterEach(() => {
    delete window.location;
    window.location = location;
  });
  const rendersForm = (name) =>
    test("renders a form", () => {
      renderRouter(<Signup />);
      expect(form(name)).toBeInTheDocument();
    });
  rendersForm();
  test("render submit button", () => {
    renderRouter(<Signup />);
    const submitButton = screen.getByRole("submit");
    expect(submitButton).not.toBeDisabled();
  });
  const renderAsATextBox = (name) =>
    test("renders the field as text box", () => {
      renderRouter(<Signup />);
      expect(field(name)).not.toBeNull();
      expect(field(name).tagName).toEqual("INPUT");
      expect(field(name).type).toEqual("text");
    });
  const includeTheExistingValue = (fieldName, value) =>
    test("includes the existing value", async () => {
      renderRouter(<Signup />);
      await changeAndWait(field(fieldName), withEvent(fieldName, value));
      expect(field(fieldName).value).toEqual(value);
    });
  const rendersLabelField = (name) =>
    test("renders a label for the field", () => {
      renderRouter(<Signup />);
      expect(label(name).tagName).toEqual("LABEL");
      expect(label(name)).toBeInTheDocument();
    });

  const saveFirstNameError = (fieldName, value) =>
    test("saves first name error occure", async () => {
      window.location = mockLocation;
      expect.hasAssertions();

      renderRouter(<Signup />);

      await changeAndWait(field(fieldName), withEvent(fieldName, value));

      await changeAndWait(
        field("email"),
        withEvent("email", "cykcykacz@gmail.com")
      );

      expect(field(fieldName).value).toEqual(value);

      await submit(form("signup form"));
      screen.getByText("Name is required");
    });
  const saveEmailError = (fieldName, value) =>
    test("saves when email error occure", async () => {
      window.location = mockLocation;
      expect.hasAssertions();

      renderRouter(<Signup />);
      await changeAndWait(field(fieldName), withEvent(fieldName, value));

      await changeAndWait(field("firstName"), withEvent("firstName", "Szymon"));
      await changeAndWait(field("password"), withEvent("password", "1234567"));

      expect(field(fieldName).value).toEqual(value);
      await submit(form("signup form"));

      screen.getByText("Must be a valid email address");

      const submitButton = screen.getByRole("submit");
      expect(submitButton).toBeDisabled();
    });
  const savePasswordError = (fieldName, value) =>
    test("saves when passwod error occure", async () => {
      window.location = mockLocation;
      expect.hasAssertions();

      renderRouter(<Signup />);
      await changeAndWait(field(fieldName), withEvent(fieldName, value));

      await changeAndWait(field("firstName"), withEvent("firstName", "Szymon"));
      await changeAndWait(
        field("email"),
        withEvent("email", "cykcykacz@gmail.com")
      );

      expect(field(fieldName).value).toEqual(value);

      await submit(form("signup form"));

      screen.getByText("Password must be at least 6 characteres long");
    });
  describe("First name field", () => {
    renderAsATextBox("firstName");
    rendersLabelField("First Name");
    includeTheExistingValue("firstName", "randomText");
    saveFirstNameError("firstName", "");
  });
  describe("Email field", () => {
    rendersLabelField("Email");
    renderAsATextBox("email");
    includeTheExistingValue("email", "randomText");
    saveEmailError("email", "cykcykaczgmail.com");
  });
  describe("Password", () => {
    rendersLabelField("Password");
    renderAsATextBox("password");
    includeTheExistingValue("password", "randomText");
    savePasswordError("password", "12345");
  });
});
