import { p } from "msw/lib/glossary-297d38ba";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRoomThunk, roomsState } from "../../store/reducers/roomsSlice";
import type { AppThunkDispatch } from "../../store/store";

type state = {
  rooms: roomsState[];
};
const Rooms = () => {
  const [title, setTitle] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const dispatch = useDispatch<AppThunkDispatch>();
  const rooms = useSelector((state: state) => state.rooms);
  const createRoom = () => {
    dispatch(createRoomThunk(title));
  };
  const selectRoom = (title: string) => {
    setSelectedRoom(title);
  };
  const addMessage = (text: string) => {
    dispatch(addMessageThunk(text));
  }
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
              <input type='text' name='addMessage' placeholder='addMessage' value={message} onChange={(e) => setMessage(e.target.value)} />
              <button role={"button-addMessage"} onClick={() => addMessage(message)}>Add Message</button>
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <button role={"button"} onClick={createRoom}>
            Create Room
          </button>
          <span>{error}</span>
        </div>
      )}
    </>
  );
};

export default Rooms;
