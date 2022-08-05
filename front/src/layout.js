import React from "react";

const Layout = ({ children }) => (
  <>
    <nav role='navigation'></nav>
    <main role='main'>{children}</main>
  </>
);

export default Layout;
