import { render, screen, within } from "@testing-library/react";
import Rooms from "../components/Rooms/Rooms";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/test-utils";
import * as mswTestUtils from "./utils/mswTestUtils";
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
      renderWithProviders(<Rooms />);
    });
    expect(screen.getByText("Rooms page.")).toBeInTheDocument();
    expect(screen.getByRole("addRoom")).toBeInTheDocument();
  });
  test("Create room pop up.", async () => {
    await act(async () => {
      renderWithProviders(<Rooms />);
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
    const addSpy = jest.spyOn(mswTestUtils, "mswRoomParam");
    addSpy.mockReturnValue(0);
    await act(async () => {
      renderWithProviders(<Rooms />);
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
    //console.log("listitem", screen.getAllByRole("listitem"))
    expect(screen.getAllByRole("listitem").length).toBe(1);
  });
  test('Create button disabled when create room form is open.', async () => {
    await act(async () => {
      renderWithProviders(<Rooms />, {
        preloadedState: {
          user: "Robin"
        }
      })
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    expect(screen.getByRole("addRoom")).toBeDisabled();
  });
  test("Clear value in title input.", async () => {
    await act(async () => {
      renderWithProviders(<Rooms />, {
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
  test('Close create user interface.', async () => {
    await act(async () => {
      renderWithProviders(<Rooms />, {
        preloadedState: {
          user: "Robin"
        }
      })
    });

    const user = userEvent.setup();
    const open = screen.getByRole("addRoom");

    await user.click(open);

    expect(screen.getByRole("popUp")).toBeInTheDocument()
    expect(field("title")).toBeInTheDocument();
    expect(screen.getByRole("users")).toBeInTheDocument();
    expect(screen.queryByText("Sheriff of Nottingham")).toBeInTheDocument();
    expect(screen.queryByText("John, King of England")).toBeInTheDocument();
    const createButton = screen.getByRole("createRoomButton");
    expect(createButton).toBeInTheDocument();

    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    await user.click(createButton);

    expect(() => screen.getByRole("popUp")).toThrow('Unable to find an accessible element with the role "popUp"');
    expect(() => screen.getByRole("input", { name: "title" })).toThrow('Unable to find an accessible element with the role "input"');
    expect(() => screen.getByRole("users")).toThrow('Unable to find an accessible element with the role "users"');
    expect(screen.queryByText("Sheriff of Nottingham")).not.toBeInTheDocument();
    expect(screen.queryByText("John, King of England")).not.toBeInTheDocument();
    expect(createButton).not.toBeInTheDocument();

  });
  test("Create room with users.", async () => {
    const addSpy = jest.spyOn(mswTestUtils, "mswRoomParam");
    addSpy.mockReturnValue(-2);

    server.use(
      rest.post("http://localhost:5000/room/new", async (req, res, ctx) => {
        const { text, name, roomTitle } = await req.json();
        //MOngoDb we will find some roome by title
        const room = {
          title: "Robin adventure",
          users: [{ name: "Szymon" }, { name: "Sheriff of Nottingham" }],
          messages: [{ text: "Robin is from Sherwood.", name: "Robin" }],
        };

        room.messages.push({ text, name });
        return res(
          ctx.json({
            message: "Message has been added.",
            room: room,
          })
        );
      })
    );

    await act(async () => {
      renderWithProviders(<Rooms />, {
        preloadedState: {
          user: {
            user: "Sheriff of Nottingham"
          }
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

    await user.click(screen.getByText(/Robin adventure/i));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin adventure/i)).toHaveClass("selected");
    expect(screen.getByRole("button-addMessage")).toBeInTheDocument();
    await changeAndWait(
      field("addMessage"),
      withEvent(
        "addMessage",
        "Robin stole gold and he will give it this to poor people."
      )
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Robin stole gold and he will give it this to poor people."
      )
    ).toBeInTheDocument();
    const containName = screen.getAllByRole(/message-screen-user/i);
    expect(containName.map((value) => value.textContent)).toEqual(
      expect.arrayContaining(["Sheriff of Nottingham"])
    );
  });
  test("Select Room.", async () => {
    await act(async () => {
      renderWithProviders(<Rooms />);
    });
    const user = userEvent.setup();

    const list = screen.getByRole("rooms-list");
    expect(list).toBeInTheDocument();
    const noRooms = screen.queryByText("No Rooms");
    expect(noRooms).toBeInTheDocument();
    const open = screen.getByRole("addRoom");
    await user.click(open);
    // expect(screen.getAllByRole("listitem").length).toBe(0);
    // expect(screen.getByText(/Robin book/i));

    expect(field("title")).not.toBeNull();
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    expect(field("title").value).toEqual("Robin adventure");

    const createButton = screen.getByRole("createRoomButton");
    await user.click(createButton);
    expect(screen.getByText(/Robin adventure/i));
    expect(screen.getAllByRole("listitem").length).toBe(1);
    await user.click(screen.getByText(/Robin adventure/i));
    expect(screen.getByText(/Robin adventure/i)).toHaveClass("selected");
  });
  test("Add messages.", async () => {
    const addSpy = jest.spyOn(mswTestUtils, "mswRoomParam");
    addSpy.mockReturnValue(-2);
    await act(async () => {
      renderWithProviders(<Rooms />);
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
    await changeAndWait(
      field("addMessage"),
      withEvent("addMessage", "Robin jump over the river and he met Big John.")
    );
    expect(field("addMessage").value).toEqual(
      "Robin jump over the river and he met Big John."
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByText("Robin jump over the river and he met Big John."));
  });
  test.skip("Add multiple messages in one room.", () => {});
  test("Add message in select room and then in a different room.", async () => {
    const addSpy = jest.spyOn(mswTestUtils, "mswRoomParam");
    addSpy.mockReturnValue(-2);
    // const initialsRooms = [
    //   {
    //     title: "Robin Hood Room",
    //     users: [{ name: "Szymon" }],
    //     messages: [{ text: "Robin is from forest.", name: "Szymon" }],
    //   },
    // ];

    await act(async () => {
      renderWithProviders(<Rooms />);
    });

    const user = userEvent.setup();
    expect(screen.queryByText("No Rooms")).not.toBeInTheDocument();
    //console.log("aaaaaa", screen.getByRole("listitem"));
    expect(screen.queryByText("Select Room")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
    await user.click(screen.getByRole("listitem"));
    expect(screen.getByRole("message-screen")).toBeInTheDocument();
    expect(screen.getByText(/Robin Hood Room/i)).toHaveClass("selected");
    expect(screen.getByText(/Robin is from forest./i)).toBeInTheDocument();
    expect(field("addMessage")).not.toBeNull();
    await changeAndWait(
      field("addMessage"),
      withEvent("addMessage", "Robin jump over the river and he met Big John.")
    );
    expect(field("addMessage").value).toEqual(
      "Robin jump over the river and he met Big John."
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByText("Robin jump over the river and he met Big John."));
    await changeAndWait(
      field("addMessage"),
      withEvent("addMessage", "Robin has poison arrow in his bow.")
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByText("Robin has poison arrow in his bow."));
    expect(screen.getByRole("addRoom"));
    await user.click(screen.getByRole("addRoom"));
    expect(screen.getByRole("createRoomButton"));
    await changeAndWait(field("title"), withEvent("title", "Robin adventure"));
    await user.click(screen.getByRole("createRoomButton"));
    await user.click(screen.getByText(/Robin adventure/i));
    await changeAndWait(
      field("addMessage"),
      withEvent("addMessage", "Robin meet lady Marian.")
    );
    await user.click(screen.getByRole("button-addMessage"));
    expect(screen.getByText("Robin meet lady Marian."));
  });
});
