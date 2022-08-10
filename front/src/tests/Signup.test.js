import React from "react";
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReactTestUtils from 'react-dom/test-utils';

describe("Signup", () => {
  test("renders a form", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const form = screen.getByRole("form", { name: /signup form/i });
    expect(form).toBeInTheDocument();
  });
  test("renders the first name field as text box", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const field = screen.getByPlaceholderText("firstName");
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual("INPUT");
    expect(field.type).toEqual("text");
  });
  test('includes the existing value for the firstName', () => { 
    render(
        <MemoryRouter>
          <Signup firstName="Szymon" />
        </MemoryRouter>
      );
      const field = screen.getByPlaceholderText("firstName");
      expect(field.value).toEqual("Szymon")
   })
   test('renders a label for the first name field', () => {
    render(<MemoryRouter><Signup /></MemoryRouter>);
    const label = screen.getByText("First Name");
    expect(label.tagName).toEqual("LABEL");
    expect(label).toBeInTheDocument();
   });
   test('save existing first name when submitted', async () => {
        expect.hasAssertions();
        render(<MemoryRouter><Signup firstName="Szymon" onSubmit={({firstName}) => expect(firstName).toEqual('Szymon')} /></MemoryRouter>);
        const form = screen.getByRole("form", {name: /signup form/i})
        await ReactTestUtils.Simulate.submit(form);
   });
});
