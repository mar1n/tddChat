import React from "react";
import Signin from "../components/Signin/Signin";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { createContainer } from "./myhelpers";
import { MemoryRouter } from "react-router-dom";
import Router from "../components/Router/Router";

describe("Signin", () => {
  let renderRouter, form, field, label, submit, changeAndWait, withEvent;

  beforeEach(() => {
    ({ renderRouter, form, field, label, submit, changeAndWait, withEvent } =
      createContainer());
  });

  test("render a form", () => {
    renderRouter(<Signin />);
    expect(form("signin form")).toBeInTheDocument();
  });
  test("render submit button", () => {
    renderRouter(<Signin />);
    const submitButton = screen.getByRole("submit");
    expect(submitButton).not.toBeDisabled();
  });
  const rendersLabelField = (name) =>
    test("renders a label for the field", () => {
      renderRouter(<Signin />);
      expect(label(name).tagName).toEqual("LABEL");
      expect(label(name)).toBeInTheDocument();
    });
  const renderAsATextBox = (name) =>
    test("renders the field as text box", () => {
      renderRouter(<Signin />);
      expect(field(name)).not.toBeNull();
      expect(field(name).tagName).toEqual("INPUT");
      expect(field(name).type).toEqual("text");
    });
  const includeTheExistingValue = (fieldName, value) =>
    test("includes the existing value", async () => {
      renderRouter(<Signin />);
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
});
