import { render, screen, within } from "@testing-library/react";
import Rooms from "../components/Rooms/Rooms";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/test-utils";
import { createContainer } from "./myhelpers";

describe("Rooms", () => {
  let field, changeAndWait, withEvent;
  beforeEach(() => {
    ({ field, changeAndWait, withEvent } = createContainer());
  });
  test("Render rooms page.", () => {
    renderWithProviders(<Rooms />);

    const welcomMessage = screen.getByText("Rooms page.");
    expect(welcomMessage).toBeInTheDocument();
    const addRoomButton = screen.getByRole("switch");
    expect(addRoomButton).toBeInTheDocument();
  });
  test("Create room pop up.", async () => {
    renderWithProviders(<Rooms />);

    const open = screen.getByRole("switch");
    const user = userEvent.setup();
    const createRoomPopUp = screen.queryByText("Create Room");
    expect(createRoomPopUp).not.toBeInTheDocument();
    const inputPopUp = screen.queryByPlaceholderText("title");
    expect(inputPopUp).not.toBeInTheDocument();

    await user.click(open);
    const createRoomPopUpAfterClick = screen.queryByText("Create Room");
    expect(createRoomPopUpAfterClick).toBeInTheDocument();
    const inputPopUpAfterClick = field("title");
    expect(inputPopUpAfterClick).toBeInTheDocument();
  });
  test("List rooms.", async () => {
    const { getAllByRole } = renderWithProviders(<Rooms />);
    const user = userEvent.setup();

    const open = screen.getByRole("switch");
    await user.click(open);

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();

    const createButton = screen.getByRole("button");
    await user.click(createButton);
    expect(getAllByRole("listitem").length).toBe(1);
  });
  test("Select Room.", async () => {
    const { getAllByRole } = renderWithProviders(<Rooms />);
    const user = userEvent.setup();

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();
    const open = screen.getByRole("switch");
    await user.click(open);

    expect(field("title")).not.toBeNull();
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    expect(field("title").value).toEqual("Robin adventure");

    const createButton = screen.getByRole("button");
    await user.click(createButton);
    expect(screen.getByText(/Robin adventure/i));
    expect(getAllByRole("listitem").length).toBe(1);
    await user.click(screen.getByText(/Robin adventure/i));
    expect(screen.getByText(/Robin adventure/i)).toHaveClass("selected");
  });
  test("Add messages.", async () => {
    const initialsRooms = [
      {
        title: "Robin Hood Room",
        users: [{ name: "Szymon" }],
        messages: [{ text: "Robin is from forest.", name: "Szymon" }],
      },
    ];
    renderWithProviders(<Rooms />, {
      preloadedState: {
        rooms: initialsRooms,
      },
    });

    const user = userEvent.setup();
    expect(screen.queryByText("No Rooms")).not.toBeInTheDocument();
    expect(screen.queryByText("Select Room")).toBeInTheDocument();
    await user.click(screen.getByText(/Robin Hood Room/i));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin Hood Room/i)).toHaveClass("selected");
    expect(screen.getByText(/Robin is from forest./i)).toBeInTheDocument();
    expect(field("addMessage")).not.toBeNull();
    expect(screen.getByRole("button-addMessage")).toBeInTheDocument();
    await changeAndWait(field("addMessage"), withEvent("addMessage", "Robin jump over the river and he met Big John."))
    expect(field("addMessage").value).toEqual("Robin jump over the river and he met Big John.")
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByText("Robin jump over the river and he met Big John."))

  });
});
