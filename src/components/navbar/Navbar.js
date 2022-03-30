import React from "react";
import "./Navbar.css";
import "../../index.css";
import logo from "../../assets/nav/logo.svg";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="container nav">
        <div className="nav-left">
          <p className="explore-heading">Explore</p>
        </div>
        <div className="icon">
          <img src={logo} alt="" srcset="" />
        </div>
        <div className="nav-right">
          <div className="nav-right-inner">
            <p className="dropdown">En / aed</p>
            <p>sign up</p>
          </div>
          <a href="#">log in</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
