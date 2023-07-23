import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Admin from "../components/Private/Admin";
import { renderWithProviders } from "./utils/test-utils";
import Router from "../components/Router/Router";
import cookie from "js-cookie";
import { act } from "react-dom/test-utils";

describe("Private pages.", () => {
  test("Render admin page.", () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    screen.getByText("Admin Page");
  });
  describe("Not log in user.", () => {
    test("Admin page.", async () => {
      await act(async () => {
        renderWithProviders(
          <MemoryRouter initialEntries={["/private"]}>
            <Router />
          </MemoryRouter>
        );
      });

      expect(() => screen.getByText("Admin Page")).toThrow(
        "Unable to find an element"
      );
    });
    test("Rooms page.", async () => {
      await act(async () => {
        renderWithProviders(
          <MemoryRouter initialEntries={["/rooms"]}>
            <Router />
          </MemoryRouter>
        );
      });
      expect(() => screen.getByText("Rooms page.")).toThrow(
        "Unable to find an element"
      );
    });
  });
  describe("Log in user.", () => {
    beforeEach(() => {
      jest.spyOn(cookie, "get").mockImplementation(() => {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjExMjMsImlhdCI6MTY2Mzk2NTg4MiwiZXhwIjoxNjY0NTcwNjgyfQ.H0hKZMENmc7UTQF55gzlodyC9yvukGb1rkD_Fck-uos";
      });
      jest
        .spyOn(window.localStorage.__proto__, "getItem")
        .mockImplementation(() => {
          return '{"_id":1223,"name":"Szymon","email":"szym0nd4widowicz@gmail.com","role":"admin"}';
        });
    });
    test("Admin page.", async () => {
      await act(async () => {
        renderWithProviders(
          <MemoryRouter initialEntries={["/private"]}>
            <Router />
          </MemoryRouter>
        );
      });

      const welcomeText = screen.getByText("Admin Page");
      expect(welcomeText).toBeInTheDocument();
    });
    test("Rooms page.", async () => {
      await act(async () => {
        renderWithProviders(
          <MemoryRouter initialEntries={["/rooms"]}>
            <Router />
          </MemoryRouter>
        );
      });

      const welcomeText = screen.getByText("Rooms page.");
      expect(welcomeText).toBeInTheDocument();
    });
  });
});
