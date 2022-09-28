import React, { ReactNode } from "react";
import { isAuth } from "../utils/helper";
import { Navigate } from "react-router-dom";

interface Private {
  children: ReactNode;
}
const Private = ({ children }: Private) => {
  if (!isAuth()) {
    console.log("user is not log in");
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default Private;
