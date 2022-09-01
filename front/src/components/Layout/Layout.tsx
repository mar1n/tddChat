import React, { ReactNode} from "react";
import Navigation from "../navigation/Navigation";
import RouterButton from "../navigation/RouterButton";

interface layout {
  children: ReactNode
}
const Layout = ({ children }: layout) => (
  <>
    <Navigation>
      <RouterButton pathname={"/"}>Home</RouterButton>
      <RouterButton pathname={"/signup"}>Signup</RouterButton>
      <RouterButton pathname={"/signin"}>Signin</RouterButton>
    </Navigation>
    <main>{children}</main>
  </>
);

export default Layout;
