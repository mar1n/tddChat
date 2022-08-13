import React from "react";
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { renderRouter, form, label, field } from "./myhelpers";

describe("Signup", () => {
  test("renders a form", () => {
    renderRouter(<Signup />);
    expect(form("signup form")).toBeInTheDocument();
  });
  test("renders the first name field as text box", () => {
    renderRouter(<Signup />);
    expect(field("firstName")).not.toBeNull();
    expect(field("firstName").tagName).toEqual("INPUT");
    expect(field("firstName").type).toEqual("text");
  });
  test("includes the existing value for the firstName", () => {
    renderRouter(<Signup firstName='Szymon' />);
    expect(field("firstName").value).toEqual("Szymon");
  });
  test("renders a label for the first name field", () => {
    renderRouter(<Signup />);
    expect(label("First Name").tagName).toEqual("LABEL");
    expect(label("First Name")).toBeInTheDocument();
  });
  test("save existing first name when submitted", async () => {
    expect.hasAssertions();
    renderRouter(
      <Signup
        firstName='Szymon'
        onSubmit={({ firstName }) => expect(firstName).toEqual("Szymon")}
      />
    );
    await ReactTestUtils.Simulate.submit(form("signup form"));
  });
  test("saves new first name when submitted", async () => {
    expect.hasAssertions();
    renderRouter(
      <Signup
        firstName='Szymon'
        onSubmit={({ firstName }) => expect(firstName).toEqual("Jamie")}
      />
    );

    await act(async () => {
      ReactTestUtils.Simulate.change(field("firstName"), {
        target: { value: "Jamie" },
      });
    });
    await act(async () => {
      ReactTestUtils.Simulate.submit(form("signup form"));
    });
  });
});
