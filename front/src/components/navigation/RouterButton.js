import { Link } from "react-router-dom";

const RouterButton = ({ children, pathname }) => {
  return <Link to={{pathname: pathname}}>{children}</Link>;
};

export default RouterButton;
