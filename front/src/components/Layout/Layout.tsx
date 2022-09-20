import React, { ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import RouterButton from "../navigation/RouterButton";
import { useLocation } from "react-router";
interface layout {
  children: ReactNode;
}
const Layout = ({ children }: layout) => {
  const { pathname } = useLocation();
  const isActive = (path: string) => {
    let className = "button";
    if (pathname === path) {
      return (className = "active");
    } else {
      return className;
    }
  };
  return (
    <>
      <Navigation>
        <RouterButton path={"/"} className={isActive("/")}>
          Home
        </RouterButton>
        <RouterButton path={"/signup"} className={isActive("/signup")}>
          Signup
        </RouterButton>
        <RouterButton path={"/signin"} className={isActive("/signin")}>
          Signin
        </RouterButton>
      </Navigation>
      <main>{children}</main>
    </>
  );
};

export default Layout;
