import { render, screen } from "@testing-library/react";
import Layout from "../layout";
import { MemoryRouter } from "react-router-dom";
describe("Layout", () => {
  test("render layout children", () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>my layout</p>
        </Layout>
      </MemoryRouter>
    );
    const childrenElment = screen.getByText("my layout");
    expect(childrenElment).toBeInTheDocument();
  });
  test("there is div with role main-container", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
  });
  test("navigation div", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const container = screen.getByRole("navigation");
    expect(container).toBeInTheDocument();
  });
});
