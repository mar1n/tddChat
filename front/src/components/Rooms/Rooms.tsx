import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createRoomThunk,
  fetchRoomsThunk,
  addMessageThunk,
  rooms,
} from "../../store/reducers/roomsSlice";
import { fetchSeekUsers, seekuser } from "../../store/reducers/seekUsersSlice";

import type { AppThunkDispatch } from "../../store/store";
import { user } from "../../store/reducers/userSlice";
import Layout from "../Layout/Layout";
import "./room.css";

type seekUsers = {
  seekUsers: seekuser[];
};

const Rooms: FC = () => {
  const [title, setTitle] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedUsersList, setSelectedUsersList] = useState<
    { firstName: string }[]
  >([]);
  const dispatch = useDispatch<AppThunkDispatch>();
  const user = useSelector((state: user) => state.user.user);
  const errorRoom = useSelector((state: rooms) => state.rooms.error);
  const rooms = useSelector((state: rooms) => state.rooms.rooms);
  const seekUsers = useSelector((state: seekUsers) => state.seekUsers);
  useEffect(() => {
    dispatch(fetchRoomsThunk(user));
    dispatch(fetchSeekUsers());
  }, []);
  const createRoom = async () => {
    let users = [{ firstName: user }, ...selectedUsersList];
    let userslist = Object.keys(users)
      .map((key: any) => `${users[key].firstName}`)
      .join(",");

    dispatch(createRoomThunk({ title: title, usersList: userslist }));

    setOpenCreate(false);
    setTitle("");
    setSelectedRoom("");
  };
  const selectRoom = (title: string) => {
    setSelectedRoom(title);
  };
  const addMessage = (text: string) => {
    const room = rooms.find((room) => room.title === selectedRoom);
    dispatch(addMessageThunk({ text: text, firstName: user, room: room }));
  };
  const buttonDisabledValue = (title: string) => {
    if (title === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const selectUser = (name: string) => {
    selectedUsersList.some((value) => value.firstName === name)
      ? setSelectedUsersList([
          ...selectedUsersList.filter((value) => value.firstName !== name),
        ])
      : setSelectedUsersList([{ firstName: name }, ...selectedUsersList]);
  };

  return (
    <Layout>
      Rooms page. <div>Hello {user}, Welcome back.</div>
      <button
        role={"addRoom"}
        onClick={() => setOpenCreate(!openCreate)}
        disabled={openCreate}
      >
        Add room
      </button>
      <div role='rooms-list'>
        {rooms.length === 0
          ? "No Rooms"
          : rooms.map((value, index) => {
              return (
                <div
                  role={"listitem"}
                  key={index}
                  onClick={() => selectRoom(value.title)}
                  className={value.title === selectedRoom ? "selected" : ""}
                >
                  {value.title}
                </div>
              );
            })}
      </div>
      <div>
        {/* think about it can I avoid string react state */}
        {selectedRoom === "" ? (
          "Select Room"
        ) : (
          <div role={"message-screen"}>
            {rooms.map((value) => {
              if (value.title === selectedRoom && value && value.messages) {
                return value.messages.map((msg, index) => {
                  return (
                    <div key={index}>
                      <p role={"message-screen-user"}>{msg.firstName}:</p>
                      <p>{msg.text}</p>
                    </div>
                  );
                });
              }
            })}
            <div>
              <input
                type='text'
                name='addMessage'
                placeholder='addMessage'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                role={"button-addMessage"}
                onClick={() => addMessage(message)}
              >
                Add Message
              </button>
            </div>
          </div>
        )}
      </div>
      {openCreate && (
        <div role={"popUp"}>
          <input
            type='text'
            name='title'
            placeholder='title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              buttonDisabledValue(e.target.value);
            }}
          />
          <div role={"users"}>
            {seekUsers.map(({ firstName }) => (
              <p
                key={firstName}
                className={
                  selectedUsersList.some((user) => user.firstName === firstName)
                    ? "active"
                    : "selectUser"
                }
                onClick={() => selectUser(firstName)}
              >
                {firstName}
              </p>
            ))}
          </div>
          <button
            role={"createRoomButton"}
            onClick={createRoom}
            disabled={buttonDisabled}
          >
            Create Room
          </button>
          <span>{error}</span>
        </div>
      )}
      <span>{errorRoom}</span>
    </Layout>
  );
};

export default Rooms;
