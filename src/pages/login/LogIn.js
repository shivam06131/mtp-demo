import React from "react";
import LoginLeft from "./logInSections/loginLeftSection/LoginLeft";
import LoginRight from "./logInSections/loginRightSection/LoginRight";

const Login = () => {
  return (
    <div className="container">
      <div style={{ display: "flex", paddingBottom: "100px" }}>
        <LoginLeft />
        <LoginRight />
      </div>
    </div>
  );
};

export default Login;
