import React from "react";
import {Route, Routes} from 'react-router-dom'
import NotFound from "../Errors/NotFound";
import App from "../App/App";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup"  element={<Signup />} />
        <Route path="/signin"  element={<Signin />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default Main;
