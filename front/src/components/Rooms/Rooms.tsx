import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createRoomThunk,
  fetchRoomsThunk,
  addMessageThunk,
  roomsState,
} from "../../store/reducers/roomsSlice";
import { fetchSeekUsers, seekuser } from "../../store/reducers/seekUsersSlice";

import type { AppThunkDispatch } from "../../store/store";
import { userState, user } from "../../store/reducers/userSlice";
type state = {
  rooms: roomsState[];
};

type another = {
  seekUsers: seekuser[];
};

const Rooms = () => {
  const [title, setTitle] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedUsersList, setSelectedUsersList] = useState<
    { name: string }[]
  >([]);
  const dispatch = useDispatch<AppThunkDispatch>();
  const user = useSelector((state: user) => state.user.user);
  const rooms = useSelector((state: state) => state.rooms);
  const seekUsers = useSelector((state: another) => state.seekUsers);
  useEffect(() => {
    dispatch(fetchRoomsThunk(user));
    dispatch(fetchSeekUsers());
  }, []);
  const createRoom = () => {
    let users = [{ name: user }, ...selectedUsersList];
    let userslist = Object.keys(users)
      .map((key: any) => `name=${users[key].name}`)
      .join("&");
      console.log("userList", userslist);
    dispatch(createRoomThunk({ title: title, user: user }));
    setOpenCreate(false);
    setTitle("");
  };
  const selectRoom = (title: string) => {
    setSelectedRoom(title);
  };
  const addMessage = (text: string) => {
    dispatch(
      addMessageThunk({ text: text, name: user, roomTitle: selectedRoom })
    );
  };
  const buttonDisabledValue = (title: string) => {
    if (title === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  const selectUser = (name: string) => {
    selectedUsersList.some((value) => value.name === name)
      ? setSelectedUsersList([
          ...selectedUsersList.filter((value) => value.name !== name),
        ])
      : setSelectedUsersList([{ name: name }, ...selectedUsersList]);
  };
  return (
    <>
      Rooms page.{" "}
      <button role={"addRoom"} onClick={() => setOpenCreate(!openCreate)} disabled={openCreate}>
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
                      <p role={"message-screen-user"}>{msg.name}</p>
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
            {seekUsers.map(({ name }) => (
              <p
                key={name}
                className={
                  selectedUsersList.some((user) => user.name === name)
                    ? "active"
                    : "selectUser"
                }
                onClick={() => selectUser(name)}
              >
                {name}
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
    </>
  );
};

export default Rooms;
