import React, {ReactNode} from "react";
interface navigation {
  children: ReactNode
}
const Navigation = ({ children }: navigation) => {
  return <nav>{children}</nav>;
};

export default Navigation;
