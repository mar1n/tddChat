import React from "react";
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { renderRouter, form, label, field } from "./myhelpers";

describe("Signup", () => {
  const rendersForm = (name) =>
    test("renders a form", () => {
      renderRouter(<Signup />);
      expect(form(name)).toBeInTheDocument();
    });
  const renderAsATextBox = (name) =>
    test("renders the field as text box", () => {
      renderRouter(<Signup />);
      expect(field(name)).not.toBeNull();
      expect(field(name).tagName).toEqual("INPUT");
      expect(field(name).type).toEqual("text");
    });
  const includeTheExistingValue = (name) =>
    test("includes the existing value", () => {
      renderRouter(<Signup firstName='Szymon' />);
      expect(field(name).value).toEqual("Szymon");
    });
  const rendersLabelField = (name) =>
    test("renders a label for the field", () => {
      renderRouter(<Signup />);
      expect(label(name).tagName).toEqual("LABEL");
      expect(label(name)).toBeInTheDocument();
    });
  const saveExistingValue = (fieldName, value) =>
    test("save existing value when submitted", async () => {
      expect.hasAssertions();
      renderRouter(
        <Signup
          {...{ [fieldName]: value }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );
      await ReactTestUtils.Simulate.submit(form("signup form"));
    });
  const saveNewValue = (fieldName, value) =>
  test("saves new first name when submitted", async () => {
    expect.hasAssertions();
    renderRouter(
      <Signup
        {...{ [fieldName]: "Szymon"}}
        onSubmit={props => expect(props[fieldName]).toEqual(value)}
      />
    );

    await act(async () => {
      ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value: value },
      });
    });
    await act(async () => {
      ReactTestUtils.Simulate.submit(form("signup form"));
    });
  });
  describe("First name field", () => {
    renderAsATextBox("firstName");
    includeTheExistingValue("firstName");
    rendersLabelField("First");
    saveExistingValue("firstName", "Szymon")
    saveNewValue("firstName", "NewValue")
  });
});
