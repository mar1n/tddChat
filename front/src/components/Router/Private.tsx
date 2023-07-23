import React, { ReactNode } from "react";
import { isAuth } from "../utils/helper";
import { Navigate } from "react-router-dom";

interface Private {
  children: ReactNode;
}
const Private = ({ children }: Private) => {
  if (!isAuth()) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default Private;
