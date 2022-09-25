import React, { ReactNode} from "react";
import { Link } from "react-router-dom";

interface routerButton {
  children: ReactNode,
  path: string,
  className: string,
  onClick?: () => void,
  disabled?: string
}

const RouterButton = ({ children, path, className, onClick }: routerButton) => {

  return <Link to={{pathname: path}} onClick={onClick} className={className}>{children}</Link>;
};

export default RouterButton;
