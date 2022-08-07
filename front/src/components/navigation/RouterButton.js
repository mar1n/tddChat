import { Link } from "react-router-dom";

const RouterButton = ({ children, pathname, disabled }) => {
  let className = "button";
  if(disabled) {
    className = "disabled"
  }
  return <Link to={{pathname: pathname}} className={className}>{children}</Link>;
};

export default RouterButton;
