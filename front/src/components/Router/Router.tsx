import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../Errors/NotFound";
import App from "../App/App";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";
import Activation from "../Activation/Activation";
import Rooms from "../Rooms/Rooms";
import Private from "./Private";
import Admin from "../Private/Admin";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/activation/:id' element={<Activation />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route
          path='/private'
          element={
            <Private>
              <Admin />
            </Private>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Main;
