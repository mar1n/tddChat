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
});
