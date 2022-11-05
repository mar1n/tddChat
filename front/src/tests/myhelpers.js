import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";

export const createContainer = () => {
  const renderRouter = (component) => {
    return render(
      <>
        <MemoryRouter>{component}</MemoryRouter>
      </>
    );
  };
  const simulateEventAndWait = (eventName) => async (element, eventData) =>
    await act(async () =>
      ReactTestUtils.Simulate[eventName](element, eventData)
    );

  const form = (role) =>
    screen.getByRole("form", { name: new RegExp(role, "i") });
  const label = (text) => screen.getByText(text);
  const field = (placeholder) => screen.getByPlaceholderText(placeholder);
  const withEvent = (name, value) => ({
    target: { name, value },
  });

  return {
    renderRouter,
    form,
    label,
    field,
    clickAndWait: simulateEventAndWait("click"),
    changeAndWait: simulateEventAndWait("change"),
    submit: simulateEventAndWait("submit"),
    withEvent,
  };
};