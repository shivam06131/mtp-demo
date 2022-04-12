import React from "react";
import "./Navbar.css";
import "../../index.css";
import logo from "../../pages/Homepage/assets/nav/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-wrapper">
      <div className="container nav-bar">
        <div className="nav-left">
          <a href="#" className="explore-heading">
            Explore
          </a>
        </div>
        <div className="icon">
          <img onClick={() => navigate("/")} src={logo} alt="" />
        </div>
        <div className="nav-right">
          <div className="nav-right-inner">
            <a href="#" className="dropdown">
              En / aed
            </a>
            <a href="#" onClick={() => navigate("/signIn")}>
              sign up
            </a>
          </div>
          <a
            className="button-primary"
            href="#"
            onClick={() => navigate("/login")}
          >
            log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
