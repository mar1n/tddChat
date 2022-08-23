import React from "react";
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { renderRouter, form, label, field } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";


describe("Signup", () => {
  let location;
  const mockLocation = new URL("http://localhost/signup?scenario=validation");
  afterEach(() => {
    delete window.location;
    window.location = location;
  })
  const rendersForm = (name) =>
    test("renders a form", () => {
      renderRouter(<Signup />);
      expect(form(name)).toBeInTheDocument();
    });
  rendersForm();
  const renderAsATextBox = (name) =>
    test("renders the field as text box", () => {
      renderRouter(<Signup />);
      expect(field(name)).not.toBeNull();
      expect(field(name).tagName).toEqual("INPUT");
      expect(field(name).type).toEqual("text");
    });
  const includeTheExistingValue = (name) =>
    test("includes the existing value", () => {
      renderRouter(<Signup />);
      expect(field(name).value).toEqual("");
    });
  const rendersLabelField = (name) =>
    test("renders a label for the field", () => {
      renderRouter(<Signup />);
      expect(label(name).tagName).toEqual("LABEL");
      expect(label(name)).toBeInTheDocument();
    });

  const saveNewValue = (fieldName, value) =>
    test("saves new first name when submitted", async () => {
      expect.hasAssertions();
      renderRouter(<Signup />);

      await act(async () => {
        ReactTestUtils.Simulate.change(field(fieldName), {
          target: { value: value, name: fieldName },
        });
      });
      expect(field(fieldName).value).toEqual(value);
      await act(async () => {
        ReactTestUtils.Simulate.submit(form("signup form"));
      });
      expect(field(fieldName).value).toEqual("");
    });
  const saveFirstNameError = (fieldName, value) =>
    test("saves first name error occure", async () => {
      window.location = mockLocation;
      expect.hasAssertions();

      renderRouter(<Signup />);
      await act(async () => {
        ReactTestUtils.Simulate.change(field(fieldName), {
          target: { value: value, name: fieldName },
        });
      });
      await act(async () => {
        ReactTestUtils.Simulate.change(field("email"), {
          target: { value: "cykcykacz@gmail.com", name: "email" },
        });
      });
      expect(field(fieldName).value).toEqual(value);
      await act(async () => {
        ReactTestUtils.Simulate.submit(form("signup form"));
      });
      screen.getByText("Error on screen");
    });
  const saveEmailError = (fieldName, value) =>
    test("saves when email error occure", async () => {
      window.location = mockLocation;
      expect.hasAssertions();

      renderRouter(<Signup />);
      await act(async () => {
        ReactTestUtils.Simulate.change(field(fieldName), {
          target: { value: value, name: fieldName },
        });
      });
      await act(async () => {
        ReactTestUtils.Simulate.change(field("firstName"), {
          target: { value: "Szymon", name: "firstName" },
        });
      });
      expect(field(fieldName).value).toEqual(value);
      await act(async () => {
        ReactTestUtils.Simulate.submit(form("signup form"));
      });
      screen.getByText("Error on screen");
    });
  const savePasswordError = (fieldName, value) =>
    test("saves when passwod error occure", async () => {
      window.location = mockLocation;
      expect.hasAssertions();

      renderRouter(<Signup />);
      await act(async () => {
        ReactTestUtils.Simulate.change(field(fieldName), {
          target: { value: value, name: fieldName },
        });
      });
      await act(async () => {
        ReactTestUtils.Simulate.change(field("firstName"), {
          target: { value: "Szymon", name: "firstName" },
        });
      });
      await act(async () => {
        ReactTestUtils.Simulate.change(field("email"), {
          target: { value: "cykcykacz@gmail.com", name: "email" },
        });
      });
      expect(field(fieldName).value).toEqual(value);
      await act(async () => {
        ReactTestUtils.Simulate.submit(form("signup form"));
      });
      screen.getByText("Error on screen");
    });
  describe("First name field", () => {
    renderAsATextBox("firstName");
    includeTheExistingValue("firstName");
    rendersLabelField("First Name");
    saveFirstNameError("firstName", "");
  });
  describe('Email field', () => {
    rendersLabelField("Email");
    renderAsATextBox("email");
    includeTheExistingValue("email");
    saveEmailError("email", "cykcykaczgmail.com")
  });
  describe('Password', () => {
    rendersLabelField("Password");
    renderAsATextBox("password");
    includeTheExistingValue("password");
    savePasswordError("password", "12345")
  });
});
