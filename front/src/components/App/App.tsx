import React from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import { userState } from "../../store/reducers/userSlice";
type state = {
  user: userState
}

const App = () => {
  const user = useSelector((state: state) => state.user.user);
  return (
    <Layout>
      <h1>Hello React</h1>
      <h2>Hello {user}</h2>
      <div>You are at home</div>
    </Layout>
  );
};

export default App;
