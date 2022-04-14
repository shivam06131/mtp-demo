import React, { useState, useEffect } from "react";
import "./styles.css";
import "../../../signIn/signInSections/SignInRight/signInRight.css";
import mailIcon from "../../assets/right/mail.png";
import lockIcon from "../../assets/right/lock.png";
import "../../../../layout/navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const LoginRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);

  //!calls
  const errorMessage = useSelector((state) => state.login_error_data);
  const loginSuccess = useSelector((state) => state.login_data);
  let localData = localStorage.getItem("user_log_in_data");

  console.log("loginSuccess", loginSuccess);

  //!onComponentUpdate
  useEffect(() => {
    JSON.parse(localData);
    formik.values.email = localData ? JSON.parse(localData).email : "";
    formik.values.password = localData ? JSON.parse(localData).password : "";
    localData && setRemember(true);
  }, [localData]);

  //!error validation
  if (errorMessage) {
    var [message] = errorMessage;
  }

  //!yup validation
  const validate = Yup.object({
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Enter a valid email."),
    password: Yup.string().required("Enter your password."),
  });

  //!formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      let login_data = {
        ...values,
        browser: "Chrome",
        device: "Windows",
        device_name: "10",
        device_type: "desktop",
        remember,
      };
      dispatch({ type: "POST_LOG_IN_DATA", payload: login_data });
    },
    validationSchema: validate,
  });

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
                id="email"
                name="email"
                placeholder="Email Address"
                autoComplete="new-password"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <img src={mailIcon} alt="" />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <span className="error">{formik.errors.email}</span>
          ) : null}
        </div>
        {/*------------ input two --------------------- */}
        <div className="input-wrap top">
          <div className="signIn-input">
            <div className="input-select-group">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <img src={lockIcon} alt="" />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}
        </div>
        <div className="login-forget-pass">
          <div className="remember-pass">
            <input
              onChange={() => setRemember((prev) => !prev)}
              type="checkbox"
              id="checkbox"
              name=""
              checked={remember}
              value=""
            />
            <label htmlFor="checkbox">Remember Me</label>
          </div>
          <a href="#">forget password</a>
        </div>
        {message && <p className="error">{message}</p>}
        {/*------------ button --------------------- */}
        <div className="input-wrap ">
          <button
            href="#"
            onClick={() => formik.handleSubmit()}
            className="button-primary top sign-up-btn"
          >
            Log In
          </button>
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
