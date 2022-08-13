import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export const renderRouter = (component) => {
  return render(
    <>
      <MemoryRouter>{component}</MemoryRouter>
    </>
  );
};
export const form = (role) =>
  screen.getByRole("form", { name: new RegExp(role, "i") });
export const label = (text) => screen.getByText(text);
export const field = (placeholder) => screen.getByPlaceholderText(placeholder);
