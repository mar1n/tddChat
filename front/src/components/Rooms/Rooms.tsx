import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRoomThunk, roomsState } from "../../store/reducers/roomsSlice";

type state = {
  rooms: roomsState[]
}
const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state: state) => state.rooms);
  const createRoom = () => {
    dispatch(createRoomThunk());
  }
  return (
    <>
      Rooms page. <div role='rooms-list'>{rooms.map((value, index) => {
        return <div role={"listitem"} key={index}>{value.title}</div>
      })}</div>
      <button role={"button"} onClick={createRoom}>Create Room</button>
    </>
  );
};

export default Rooms;
