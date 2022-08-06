import React from "react";
import Navigation from "../navigation/Navigation";
import RouterButton from "../navigation/RouterButton";

const Layout = ({ children }) => (
  <>
    <Navigation>
      <RouterButton pathname={"/"}>Home</RouterButton>
    </Navigation>
    <main>{children}</main>
  </>
);

export default Layout;
