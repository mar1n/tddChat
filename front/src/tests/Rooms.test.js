import { render, screen, within } from "@testing-library/react";
import Rooms from "../components/Rooms/Rooms";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/test-utils";

describe("Rooms", () => {
  test("render rooms page", () => {
    renderWithProviders(<Rooms />);

    const welcomMessage = screen.getByText("Rooms page.");
    expect(welcomMessage).toBeInTheDocument();
    const createButton = screen.getByRole("button");
    expect(createButton).toBeInTheDocument();
  });
  test("list rooms", async () => {
    const initialTodos = {
      articles: [
        {
          id: 1,
          title: "post 1",
          body: "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
        },
        {
          id: 2,
          title: "post 2",
          body: "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
        },
      ],
    };
    const { getAllByRole } = renderWithProviders(<Rooms />);
    const user = userEvent.setup();

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();

    const createButton = screen.getByRole("button");
    await user.click(createButton);
    expect(getAllByRole("listitem").length).toBe(1);
  });
});
