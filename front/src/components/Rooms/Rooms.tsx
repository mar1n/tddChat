import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRoomThunk, roomsState } from "../../store/reducers/roomsSlice";
import type { AppThunkDispatch } from "../../store/store";

type state = {
  rooms: roomsState[];
};
const Rooms = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch<AppThunkDispatch>();
  const rooms = useSelector((state: state) => state.rooms);
  const createRoom = () => {
    dispatch(createRoomThunk());
  };
  return (
    <>
      Rooms page. <button role={"switch"} onClick={() => setOpenCreate(!openCreate)}>Add room</button>
      <div role='rooms-list'>
        {rooms.length === 0 ? 'No Rooms' : rooms.map((value, index) => {
          return (
            <div role={"listitem"} key={index}>
              {value.title}
            </div>
          );
        })}
      </div>
      <div role={"message-screen"}></div>
      {openCreate && (
        <div role={"popUp"}>
          <button role={"button"} onClick={createRoom}>
            Create Room
          </button>
        </div>
      )}
    </>
  );
};

export default Rooms;
