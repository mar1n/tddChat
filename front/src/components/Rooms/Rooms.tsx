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
import RoomsList from "./RoomsList";
import MessageScreen from "./MessageScreen";
import CreateRoom from "./CreateRoom";
import Button from "../Button/button";
import "./room.css";

type seekUsers = {
  seekUsers: seekuser[];
};

const Rooms: FC = () => {
  const [values, setValues] = useState<{
    message: string;
    title: string;
    openCreate: boolean;
    buttonDisabled: boolean;
    selectedRoom: string;
    selectedUsersList: { firstName: string }[];
  }>({
    message: "",
    title: "",
    openCreate: false,
    buttonDisabled: true,
    selectedRoom: "",
    selectedUsersList: [],
  });
  const dispatch = useDispatch<AppThunkDispatch>();
  const user = useSelector((state: user) => state.user.user);
  const errorRoom = useSelector((state: rooms) => state.rooms.error);
  const rooms = useSelector((state: rooms) => state.rooms.rooms);
  const seekUsers = useSelector((state: seekUsers) => state.seekUsers);
  useEffect(() => {
    dispatch(fetchRoomsThunk(user));
    dispatch(fetchSeekUsers());
  }, []);

  const {
    message,
    title,
    openCreate,
    buttonDisabled,
    selectedRoom,
    selectedUsersList,
  } = values;
  const createRoom = async () => {
    let users = [{ firstName: user }, ...selectedUsersList];
    let userslist = Object.keys(users)
      .map((key: any) => `${users[key].firstName}`)
      .join(",");

    dispatch(createRoomThunk({ title: title, usersList: userslist }));

    setValues({ ...values, title: "", openCreate: false, selectedRoom: "" });
  };
  const selectRoom = (title: string) => {
    setValues({ ...values, selectedRoom: title });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      if (e.target.value === "") {
        setValues({ ...values, buttonDisabled: true });
      } else {
        setValues({ ...values, buttonDisabled: false });
      }
    }
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  const addMessage = () => {
    const room = rooms.find((room) => room.title === selectedRoom);
    dispatch(addMessageThunk({ text: message, firstName: user, room: room }));
  };
  const selectUser = (name: string) => {
    selectedUsersList.some((value) => value.firstName === name)
      ? setValues({
          ...values,
          selectedUsersList: [
            ...selectedUsersList.filter((value) => value.firstName !== name),
          ],
        })
      : setValues({
          ...values,
          selectedUsersList: [{ firstName: name }, ...selectedUsersList],
        });
  };

  const openCreateCallback = () => {
    setValues({ ...values, openCreate: !values.openCreate });
  };

  return (
    <Layout>
      Rooms page. <div>Hello {user}, Welcome back.</div>
      <Button
        label='Add room'
        className='addRoom'
        role='addRoom'
        type='button'
        onClick={openCreateCallback}
        disabled={openCreate}
      />
      <RoomsList
        rooms={rooms}
        selectRoom={selectRoom}
        selectedRoom={selectedRoom}
      />
      <div>
        {/* think about it can I avoid string react state */}
        {selectedRoom === "" ? (
          "Select Room"
        ) : (
          <MessageScreen
            rooms={rooms}
            selectedRoom={selectedRoom}
            addMessage={addMessage}
            message={message}
            handleChange={handleChange}
          />
        )}
      </div>
      {openCreate && (
        <CreateRoom
          seekUsers={seekUsers}
          selectedUsersList={selectedUsersList}
          selectUser={selectUser}
          title={title}
          handleChange={handleChange}
          createRoom={createRoom}
          buttonDisabled={buttonDisabled}
        />
      )}
      <span>{errorRoom}</span>
    </Layout>
  );
};

export default Rooms;
