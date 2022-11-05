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
  const [selectedClass, setSelectedClass] = useState(NaN);
  const dispatch = useDispatch<AppThunkDispatch>();
  const rooms = useSelector((state: state) => state.rooms);
  const createRoom = () => {
    dispatch(createRoomThunk(title));
  };
  const selectRoom = (index: number) => {
    setSelectedClass(index)
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
                <div role={"listitem"} key={index} onClick={() => selectRoom(index)} className={index === selectedClass ? "selected" : ""}>
                  {value.title}
                </div>
              );
            })}
      </div>
      <div role={"message-screen"}></div>
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
