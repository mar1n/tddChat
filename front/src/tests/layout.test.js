import { render, screen } from "@testing-library/react";
import Layout from "../layout";

describe("Layout", () => {
  test("render layout children", () => {
    render(
      <Layout>
        <p>my layout</p>
      </Layout>
    );
    const childrenElment = screen.getByText("my layout");
    expect(childrenElment).toBeInTheDocument();
  });
  test("there is div with role main-container", () => {
    render(<Layout />);
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
  });
  test("navigation div", () => {
    render(<Layout />);
    const container = screen.getByRole("navigation");
    expect(container).toBeInTheDocument();
  });
});
