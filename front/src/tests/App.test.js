import { screen, act } from "@testing-library/react";
import App from "../components/App/App";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "./utils/test-utils";

describe("App", () => {
  test("renders learn react link", async () => {
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });
    const element = screen.getByText(/Hello React/i);
    expect(element).toBeInTheDocument();
  });
});
