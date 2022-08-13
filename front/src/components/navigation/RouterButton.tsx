import React, { ReactNode} from "react";
import { Link } from "react-router-dom";

interface routerButton {
  children: ReactNode,
  pathname: string,
  disabled?: string
}

const RouterButton = ({ children, pathname, disabled }: routerButton) => {
  let className = "button";
  if(disabled) {
    className = "disabled"
  }
  return <Link to={{pathname: pathname}} className={className}>{children}</Link>;
};

export default RouterButton;
