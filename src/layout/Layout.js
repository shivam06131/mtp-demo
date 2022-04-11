import React from "react";
import Homepage from "../pages/Homepage/Homepage";
import Footer from "./Footer/Footer";
import Navbar from "./navbar/Navbar";
import SignIn from "../pages/signIn/SignIn";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
