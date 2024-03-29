import { render, screen, act } from "@testing-library/react";
import Layout from "../components/Layout/Layout";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "./utils/test-utils";
import Router from "../components/Router/Router";

describe("Layout", () => {
  test("render layout children", () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>my layout</p>
        </Layout>
      </MemoryRouter>
    );
    screen.getByText("my layout");
  });
  test("there is div with role main-container", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    screen.getByRole("main");
  });
  test("navigation div", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    screen.getByRole("navigation");
  });
  test('Navigation items.', async () => { 
    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <Router />
        </MemoryRouter>
      );
    })

    const roomsLink = screen.getAllByRole("link");
    expect(roomsLink.length).toBeGreaterThan(1);
   })
});
