import React, { ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import RouterButton from "../navigation/RouterButton";
import { useLocation } from "react-router";
import { isAuth, signout } from "../utils/helper";
import { useNavigate } from "react-router-dom";
interface layout {
  children: ReactNode;
}
const Layout = ({ children }: layout) => {
  const history = useNavigate();
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
        {!isAuth() && (
          <>
            <RouterButton path={"/signup"} className={isActive("/signup")}>
              Signup
            </RouterButton>
            <RouterButton path={"/signin"} className={isActive("/signin")}>
              Signin
            </RouterButton>
          </>
        )}
        {isAuth() && (
          <>
            <RouterButton
              onClick={() => signout(() => history("/"))}
              path={"/"}
              className={"signOut"}
            >
              Signout
            </RouterButton>
            <RouterButton path={"/rooms"} className={isActive("/rooms")}>
              Rooms
            </RouterButton>
          </>
        )}
      </Navigation>
      <main>{children}</main>
    </>
  );
};

export default Layout;
