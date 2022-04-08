import React from "react";
import "../../index.css";
import SignInLeft from "./signInSections/SignInLeft";
import SignInRight from "./signInSections/SignInRight";
import "./signInStyles/signInLeft.css";
import "./signInStyles/signInRight.css";

const SignIn = () => {
  return (
    <div className="container">
      <div className="signIn-wrapper">
        <SignInLeft />
        <SignInRight />
      </div>
    </div>
  );
};

export default SignIn;
