import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => (
  <>
    <nav>
      <Link to='/'>Home</Link>
    </nav>
    <main>{children}</main>
  </>
);

export default Layout;
