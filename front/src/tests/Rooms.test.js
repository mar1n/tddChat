import { render, screen, within } from "@testing-library/react";
import Rooms from "../components/Rooms/Rooms";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/test-utils";

describe("Rooms", () => {
  test("Render rooms page.", () => {
    renderWithProviders(<Rooms />);

    const welcomMessage = screen.getByText("Rooms page.");
    expect(welcomMessage).toBeInTheDocument();
    const addRoomButton = screen.getByRole("switch");
    expect(addRoomButton).toBeInTheDocument();
  });
  test('Create room pop up.', async () => {
    renderWithProviders(<Rooms/>);

    const open = screen.getByRole("switch")
    const user = userEvent.setup();
    const createRoomPopUp = screen.queryByText("Create Room");
    expect(createRoomPopUp).not.toBeInTheDocument();

    await user.click(open);
    const createRoomPopUpAfterClick = screen.queryByText("Create Room");
    expect(createRoomPopUpAfterClick).toBeInTheDocument();
  });
  test("List rooms.", async () => {
    const { getAllByRole } = renderWithProviders(<Rooms />);
    const user = userEvent.setup();

    const open = screen.getByRole("switch")
    await user.click(open);

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();

    const createButton = screen.getByRole("button");
    await user.click(createButton);
    expect(getAllByRole("listitem").length).toBe(1);
  });
  test('Select Room.', async () => {
    const { getAllByRole } = renderWithProviders(<Rooms />);
    const user = userEvent.setup();

    const open = screen.getByRole("switch")
    await user.click(open);

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();

    const createButton = screen.getByRole("button");
    await user.click(createButton);
    expect(getAllByRole("listitem").length).toBe(1);
    expect()
  });
});
