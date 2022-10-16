import React, { useEffect } from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchRoomsThunk } from "../../store/reducers/roomsSlice";
import type { AppDispatch } from "../../store/store";
import type {} from "redux-thunk/extend-redux";
interface users {
  name: string;
}
interface messages {
  text: string;
  name: string;
}
interface roomsState {
  title: string;
  users: Array<users>;
  messages: Array<messages>;
}

type stateRoom = {
  rooms: roomsState[];
};
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rooms: readonly roomsState[] = useSelector(
    (state: stateRoom) => state.rooms,
    shallowEqual
  );
  useEffect(() => {
    const anonymous = async () => {
      await dispatch(fetchRoomsThunk());
    };
    anonymous();
  }, []);
  return (
    <Layout>
      {rooms.map((value, index) => {
        return <p key={index}>{value.title}</p>;
      })}
      <h1>Hello React</h1>
      <div>You are at home</div>
    </Layout>
  );
};

export default App;
