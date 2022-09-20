import React, { ReactNode} from "react";
import { Link } from "react-router-dom";

interface routerButton {
  children: ReactNode,
  path: string,
  className: string,
  disabled?: string
}

const RouterButton = ({ children, path, className }: routerButton) => {

  return <Link to={{pathname: path}} className={className}>{children}</Link>;
};

export default RouterButton;
