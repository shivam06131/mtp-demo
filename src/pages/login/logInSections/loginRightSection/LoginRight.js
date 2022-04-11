import React from "react";
import "./styles.css";
import "../../../signIn/signInStyles/signInRight.css";
import mailIcon from "../../assets/right/mail.png";
import lockIcon from "../../assets/right/lock.png";
import "../../../../layout/navbar/Navbar.css";
import { useNavigate } from "react-router-dom";

const LoginRight = () => {
  const navigate = useNavigate();
  return (
    <div className="login-right-wrap">
      <div className="login-in-wrap">
        <h1>welcome back</h1>
        <p className="sun-heading">
          It’s normal to miss My Tutor Point, we appreciate that feeling
        </p>
        {/*------------ input one --------------------- */}
        <div className="input-wrap top">
          <div className="signIn-input">
            <div className="input-select-group">
              <input
                type="text"
                placeholder="Email Address"
                autoComplete="new-password"
              />
            </div>
            <img src={mailIcon} alt="" />
          </div>
        </div>
        {/*------------ input two --------------------- */}
        <div className="input-wrap top">
          <div className="signIn-input">
            <div className="input-select-group">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
            </div>
            <img src={lockIcon} alt="" />
          </div>
        </div>
        {/*------------ button --------------------- */}
        <div className="input-wrap ">
          <a href="#" className="button-primary top">
            Log In
          </a>
        </div>
        {/*------------ terms --------------------- */}
        <p className="terms">
          Not registered yet?{" "}
          <span onClick={() => navigate("/signIn")}>Sign up now!</span>
        </p>
      </div>
    </div>
  );
};

export default LoginRight;
