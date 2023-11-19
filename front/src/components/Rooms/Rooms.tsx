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
import Button from "../Button/button";
import Input from "../Input/input";
import "./room.css";

type seekUsers = {
  seekUsers: seekuser[];
};

const Rooms: FC = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedUsersList, setSelectedUsersList] = useState<
    { firstName: string }[]
  >([]);
  const [values, setValues] = useState<{
    message: string;
    title: string;
  }>({message: "", title: ""});
  const dispatch = useDispatch<AppThunkDispatch>();
  const user = useSelector((state: user) => state.user.user);
  const errorRoom = useSelector((state: rooms) => state.rooms.error);
  const rooms = useSelector((state: rooms) => state.rooms.rooms);
  const seekUsers = useSelector((state: seekUsers) => state.seekUsers);
  useEffect(() => {
    dispatch(fetchRoomsThunk(user));
    dispatch(fetchSeekUsers());
  }, []);

  const {message, title } = values;
  const createRoom = async () => {
    let users = [{ firstName: user }, ...selectedUsersList];
    let userslist = Object.keys(users)
      .map((key: any) => `${users[key].firstName}`)
      .join(",");

    dispatch(createRoomThunk({ title: title, usersList: userslist }));

    setOpenCreate(false);
    setValues({...values, title: ""});
    setSelectedRoom("");
  };
  const selectRoom = (title: string) => {
    setSelectedRoom(title);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title") {
      if (e.target.value === "") {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }
  const addMessage = () => {
    const room = rooms.find((room) => room.title === selectedRoom);
    dispatch(addMessageThunk({ text: message, firstName: user, room: room }));
  };
  const selectUser = (name: string) => {
    selectedUsersList.some((value) => value.firstName === name)
      ? setSelectedUsersList([
          ...selectedUsersList.filter((value) => value.firstName !== name),
        ])
      : setSelectedUsersList([{ firstName: name }, ...selectedUsersList]);
  };

  const openCreateCallback = () => {
    setOpenCreate(!openCreate);
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
              <Input className="messageRoom" name="message" placeholder="message" value={message} onChange={handleChange} />
              <Button
                label='Add Message'
                role='button-addMessage'
                type='button'
                className='addMessage'
                onClick={addMessage}
              />
            </div>
          </div>
        )}
      </div>
      {openCreate && (
        <div role={"popUp"}>
          <Input className="titleRoom" name="title" placeholder="title" value={title} onChange={handleChange} />
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
          <Button
            label='Create Room'
            role='createRoomButton'
            type='button'
            className='createRoom'
            onClick={createRoom}
            disabled={buttonDisabled}
          />
          <span>{error}</span>
        </div>
      )}
      <span>{errorRoom}</span>
    </Layout>
  );
};

export default Rooms;
