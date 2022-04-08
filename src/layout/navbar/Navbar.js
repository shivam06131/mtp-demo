import React from "react";
import "./Navbar.css";
import "../../index.css";
import logo from "../../assets/nav/logo.svg";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="container nav-bar">
        <div className="nav-left">
          <a href="#" className="explore-heading">
            Explore
          </a>
        </div>
        <div className="icon">
          <img src={logo} alt="" />
        </div>
        <div className="nav-right">
          <div className="nav-right-inner">
            <a href="#" className="dropdown">
              En / aed
            </a>
            <a href="#">sign up</a>
          </div>
          <a className="button-primary" href="#">
            log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
