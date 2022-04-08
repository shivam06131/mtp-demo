import React from "react";
import Homepage from "../pages/Homepage/Homepage";
import Footer from "./Footer/Footer";
import Navbar from "./navbar/Navbar";
import SignIn from "../pages/signIn/SignIn";

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/*<Homepage /> */}
      <SignIn />
      <Footer />
    </div>
  );
};

export default Layout;
