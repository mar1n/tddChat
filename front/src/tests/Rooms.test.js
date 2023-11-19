import { screen } from "@testing-library/react";
import Rooms from "../components/Rooms/Rooms";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import { createContainer } from "./myhelpers";
import { act } from "react-dom/test-utils";
import { rest } from "msw";
import { server } from "../mocks/server";

describe("Rooms", () => {
  let field, changeAndWait, withEvent;
  beforeEach(() => {
    ({ field, changeAndWait, withEvent } = createContainer());
  });
  test("Render rooms page.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>);
    });
    expect(screen.getByText("Rooms page.")).toBeInTheDocument();
    expect(screen.getByRole("addRoom")).toBeInTheDocument();
  });
  test("Create room pop up.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>);
    });

    const open = screen.getByRole("addRoom");
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

    expect(screen.queryByText("Sheriff of Nottingham")).toBeInTheDocument();
    expect(screen.queryByText("John, King of England")).toBeInTheDocument();
  });
  test("List rooms.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>);
    });

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();

    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();
    const open = screen.getByRole("addRoom");
    const user = userEvent.setup();
    await user.click(open);

    const createButton = screen.getByRole("createRoomButton");
    expect(createButton).toBeDisabled();
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    expect(createButton).not.toBeDisabled();
    await user.click(createButton);

    expect(await screen.findByText("Robin adventure")).toBeInTheDocument();
  });
  test("Create button disabled when create room form is open.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>, {
        preloadedState: {
          user: "Robin",
        },
      });
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    expect(screen.getByRole("addRoom")).toBeDisabled();
  });
  test("Add room button disabled when title input is empty", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>, {
        preloadedState: {
          user: "Robin",
        },
      });
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    expect(screen.getByRole("createRoomButton")).toBeDisabled();
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    expect(screen.getByRole("createRoomButton")).toBeEnabled();
    await changeAndWait(field("title"), withEvent("title", ""));
    expect(screen.getByRole("createRoomButton")).toBeDisabled();
  });
  test("Clear value in title input.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>, {
        preloadedState: {
          user: "Szymon",
        },
      });
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    const createButton = screen.getByRole("createRoomButton");
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    await user.click(createButton);

    await user.click(open);
    expect(field("title").value).toBe("");
  });
  test("Close create user interface.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>, {
        preloadedState: {
          user: {
            user: "Robin",
          },
        },
      });
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    expect(screen.getByRole("popUp")).toBeInTheDocument();
    expect(field("title")).toBeInTheDocument();
    expect(screen.getByRole("users")).toBeInTheDocument();
    expect(screen.queryByText("Sheriff of Nottingham")).toBeInTheDocument();
    expect(screen.queryByText("John, King of England")).toBeInTheDocument();
    const createButton = screen.getByRole("createRoomButton");
    expect(createButton).toBeInTheDocument();

    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    await user.click(createButton);

    await expect(screen.findByRole("popUp")).rejects.toThrow();
    await expect(
      screen.findByRole("input", { name: "title" })
    ).rejects.toThrow();
    await expect(screen.findByRole("users")).rejects.toThrow();

    expect(screen.queryByText("Sheriff of Nottingham")).not.toBeInTheDocument();
    expect(screen.queryByText("John, King of England")).not.toBeInTheDocument();
    expect(createButton).not.toBeInTheDocument();
  });
  test("Create room with users.", async () => {
    server.use(
      rest.post("http://localhost:5000/room/new", async (req, res, ctx) => {
        const { text, firstName, roomTitle } = await req.json();
        //MOngoDb we will find some roome by title
        const room = {
          title: "Robin adventure",
          users: [
            { firstName: "Szymon" },
            { firstName: "Sheriff of Nottingham" },
          ],
          messages: [{ text: "Robin is from Sherwood.", firstName: "Robin" }],
        };

        room.messages.push({ text, firstName });
        return res(
          ctx.json({
            message: "Message has been added.",
            room: room,
          })
        );
      })
    );

    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>, {
        preloadedState: {
          user: {
            user: "Sheriff of Nottingham",
          },
        },
      });
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    const createButton = screen.getByRole("createRoomButton");
    expect(createButton).toBeDisabled();

    const userOneAfterClick = screen.queryByText("Sheriff of Nottingham");
    const userTwoAfterClick = screen.queryByText("John, King of England");
    expect(userOneAfterClick).toBeInTheDocument();
    expect(userTwoAfterClick).toBeInTheDocument();

    expect(screen.queryByText("Sheriff of Nottingham")).not.toHaveClass(
      "active"
    );

    await user.click(screen.queryByText("Sheriff of Nottingham"));
    await user.click(screen.queryByText("John, King of England"));

    expect(screen.queryByText("Sheriff of Nottingham")).toHaveClass("active");

    await user.click(screen.queryByText("Sheriff of Nottingham"));

    expect(screen.queryByText("Sheriff of Nottingham")).toHaveClass(
      "selectUser"
    );

    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    await user.click(createButton);

    await user.click(await screen.findByText("Robin adventure"));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin adventure/i)).toHaveClass("selected");
    expect(screen.getByRole("button-addMessage")).toBeInTheDocument();
    await changeAndWait(
      field("message"),
      withEvent(
        "message",
        "Robin stole gold and he will give it this to poor people."
      )
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Robin stole gold and he will give it this to poor people."
      )
    ).toBeInTheDocument();

    const containName = await screen.findAllByRole(/message-screen-user/i);
    expect(containName.map((value) => value.textContent)).toEqual(
      expect.arrayContaining(["Sheriff of Nottingham:"])
    );
  });
  test("Select Room.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>);
    });
    const user = userEvent.setup();

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();
    const open = screen.getByRole("addRoom");
    await user.click(open);

    expect(field("title")).not.toBeNull();
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    expect(field("title").value).toEqual("Robin adventure");

    const createButton = screen.getByRole("createRoomButton");
    await user.click(createButton);
    expect(await screen.findByText("Robin adventure")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(1);
    await user.click(screen.getByText(/Robin adventure/i));
    expect(screen.getByText(/Robin adventure/i)).toHaveClass("selected");
  });
  test("Add messages.", async () => {
    await act(async () => {
      renderWithProviders(
        <MemoryRouter><Rooms /></MemoryRouter>
      );
    });

    const user = userEvent.setup();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();
    const open = screen.getByRole("addRoom");
    await user.click(open);
    expect(field("title")).not.toBeNull();
    await changeAndWait(field("title"), withEvent("title", "Robin Hood Room"));
    expect(field("title").value).toEqual("Robin Hood Room");

    const createButton = screen.getByRole("createRoomButton");
    await user.click(createButton);
    expect(await screen.findByText("Robin Hood Room")).toBeInTheDocument();
    expect(screen.queryByText("Select Room")).toBeInTheDocument();

    await user.click(await screen.findByText("Robin Hood Room"));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin Hood Room/i)).toHaveClass("selected");
    expect(screen.getByRole("button-addMessage")).toBeInTheDocument();
    await changeAndWait(
      field("message"),
      withEvent("message", "Robin is from forest.")
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(
      await screen.findByText("Robin is from forest.")
    ).toBeInTheDocument();

    expect(screen.queryByText("No Rooms")).not.toBeInTheDocument();
    await user.click(screen.getByText(/Robin Hood Room/i));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin Hood Room/i)).toHaveClass("selected");
    expect(screen.getByText(/Robin is from forest./i)).toBeInTheDocument();
    expect(field("message")).not.toBeNull();
    expect(screen.getByRole("button-addMessage")).toBeInTheDocument();
    await changeAndWait(
      field("message"),
      withEvent("message", "Robin jump over the river and he met Big John.")
    );
    expect(field("message").value).toEqual(
      "Robin jump over the river and he met Big John."
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(
      await screen.findByText("Robin jump over the river and he met Big John.")
    ).toBeInTheDocument();
  });
  test.skip("Add multiple messages in one room.", () => {});
  test("Add message in select room and then in a different room.", async () => {
    await act(async () => {
      renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>);
    });

    const user = userEvent.setup();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();
    const open = screen.getByRole("addRoom");
    await user.click(open);
    expect(field("title")).not.toBeNull();
    await changeAndWait(field("title"), withEvent("title", "Robin Hood Room"));
    expect(field("title").value).toEqual("Robin Hood Room");

    const createButton = screen.getByRole("createRoomButton");
    await user.click(createButton);
    expect(await screen.findByText("Robin Hood Room")).toBeInTheDocument();
    expect(screen.queryByText("Select Room")).toBeInTheDocument();

    await user.click(await screen.findByText("Robin Hood Room"));

    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin Hood Room/i)).toHaveClass("selected");
    expect(field("message")).not.toBeNull();
    await changeAndWait(
      field("message"),
      withEvent("message", "Robin jump over the river and he met Big John.")
    );
    expect(field("message").value).toEqual(
      "Robin jump over the river and he met Big John."
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(
      await screen.findByText("Robin jump over the river and he met Big John.")
    ).toBeInTheDocument();
    await changeAndWait(
      field("message"),
      withEvent("message", "Robin has poison arrow in his bow.")
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(await screen.findByText("Robin has poison arrow in his bow."));
    expect(screen.getByRole("addRoom"));
    await user.click(screen.getByRole("addRoom"));
    expect(screen.getByRole("createRoomButton"));
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    await user.click(screen.getByRole("createRoomButton"));
    await user.click(await screen.findByText("Robin adventure"));
    await changeAndWait(
      field("message"),
      withEvent("message", "Robin meet lady Marian.")
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(await screen.findByText("Robin meet lady Marian."));
  });
  describe('Errors', () => {
    test('Create room, Room title exist.', async () => {
      await act(async () => {
        renderWithProviders(<MemoryRouter><Rooms /></MemoryRouter>);
      });

      const user = userEvent.setup();
      const open = screen.getByRole("addRoom");
      await user.click(open);
      await changeAndWait(field("title"), withEvent("title", "duplicateTitle"));
      expect(field("title").value).toEqual("duplicateTitle");
      const createButton = screen.getByRole("createRoomButton");
      await user.click(createButton);

      expect(await screen.findByText("This room title exists!")).toBeInTheDocument();
    });
  });
});
