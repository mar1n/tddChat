import React from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";

type state = {
  user: string
}

const App = () => {
  const user = useSelector((state: state) => state.user);
  return (
    <Layout>
      <h1>Hello React</h1>
      <h2>Hello {user}</h2>
      <div>You are at home</div>
    </Layout>
  );
};

export default App;
