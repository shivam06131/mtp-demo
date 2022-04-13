import React from "react";
import "./styles.css";
import "../../../signIn/signInSections/SignInRight/signInRight.css";
import mailIcon from "../../assets/right/mail.png";
import lockIcon from "../../assets/right/lock.png";
import "../../../../layout/navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const LoginRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = Yup.object({
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Enter a valid email."),
    password: Yup.string().required("Enter your password."),
  });
  // browser: "Chrome"
  // device: "Windows"
  // device_name: "10"
  // device_type: "desktop"
  // email: "email@eamil.com"
  // password: "password"
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Values", values);
      let login_data = {
        ...values,
        browser: "Chrome",
        device: "Windows",
        device_name: "10",
        device_type: "desktop",
      };
      dispatch({ type: "POST_LOG_IN_DATA", payload: login_data });
    },
    validationSchema: validate,
  });

  console.log("Formik", formik);

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
          <a href="#">forget password</a>
        </div>
        {/*   <p className="error">user not found!</p>*/}
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
