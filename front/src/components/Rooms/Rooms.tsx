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
import { userState } from "../../store/reducers/userSlice";
type state = {
  rooms: roomsState[];
};

type another = {
  seekUsers: seekuser[];
}

const Rooms = () => {
  const [title, setTitle] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const dispatch = useDispatch<AppThunkDispatch>();
  const user = useSelector((state: userState) => state.user);
  const rooms = useSelector((state: state) => state.rooms);
  const seekUsers = useSelector((state: another) => state.seekUsers)
  useEffect(() => {
    console.log("useEffect", user);
    dispatch(fetchRoomsThunk(user));
    dispatch(fetchSeekUsers());
  }, []);
  const createRoom = () => {
    dispatch(createRoomThunk(title));
  };
  const selectRoom = (title: string) => {
    setSelectedRoom(title);
  };
  const addMessage = (text: string) => {
    dispatch(
      addMessageThunk({ text: text, name: user, roomTitle: selectedRoom })
    );
  };
  const buttonDisabledValue = () => {
    if (!title.trim.length && title === "") {
      setButtonDisabled(false);
    }
  };
  console.log("rooms seekUsers", seekUsers);
  return (
    <>
      Rooms page.{" "}
      <button role={"switch"} onClick={() => setOpenCreate(!openCreate)}>
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
        {selectedRoom === "" ? (
          "Select Room"
        ) : (
          <div role={"message-screen"}>
            {rooms.map((value) => {
              if (value.title === selectedRoom && value && value.messages) {
                return value.messages.map((msg, index) => {
                  return (
                    <div key={index}>
                      <span>{msg.name}</span>
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
            onChange={(e) => (setTitle(e.target.value), buttonDisabledValue())}
          />
          <div role={"users"}>
            {
              seekUsers.map(({name}) => (
                <p className="selectUser">
                  {name}
                </p>
              ))
            }
          </div>
          <button
            role={"button"}
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
