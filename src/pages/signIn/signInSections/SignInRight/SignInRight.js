import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studentImg from "../../assets/right-section/student.png";
import parentImg from "../../assets/right-section/parents.png";
import tutortImg from "../../assets/right-section/tutor.png";
import NameIcon from "../../assets/right-section/name-icon.png";
import MilIcon from "../../assets/right-section/mail-icon.png";
import MobileIcon from "../../assets/right-section/mobile-icon.png";
// import InputField from "../../InputField";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

// import "../../../layout/navbar/Navbar.css";
import "../../../../layout/navbar/Navbar.css";
import "./signInRight.css";

const SignInRight = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const sigin_message = useSelector((state) => state.sign_in_data);

  // useEffect(() => {
  //   login_token && navigate("/makeProfile");
  // }, []);

  const handleReCaptchaVerify = async (token) => {
    if (!token) {
      setRecaptchaValue(false);
    } else {
      setRecaptchaValue(true);
    }
  };

  const options = [
    { value: "facebook", label: "facebook" },
    { value: "instagram", label: "instagram" },
    { value: "other", label: "other" },
  ];

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "must not be more than 15 characters")
      .required("Enter your first name."),
    lastName: Yup.string()
      .max(15, "must not be more than 15 characters")
      .required("Enter your last name."),
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Enter a valid email."),
    phone: Yup.number().required("Enter your mobile number."),
    aboutUs: Yup.string().required(
      "Select from the dropdown list or type your own."
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      aboutUs: "",
    },
    //   email: "userone@gmail.com"
    // first_name: "user"
    // hear_from: "Facebook"
    // hear_from_other: ""
    // last_name: "one"
    // mobile: "916666666666"
    // referral_code: ""
    // role: "student"

    //     email: "useroneone@gmail.com"
    // first_name: "userone"
    // hear_from: "Facebook"
    // hear_from_other: ""
    // last_name: "userOneLast"
    // mobile: "914444444444"
    // referral_code: ""
    // role: "student"
    onSubmit: (values) => {
      dispatch({
        type: "POST_SIGN_IN_DATA",
        payload: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          mobile: values.phone,
          // type: null,
          hear_from: values.aboutUs,
          hear_from_other: "",
          referral_code: "",
          // is_recaptcha_verified: recaptchaValue,
          role: "tutor",
        },
      });
    },
    validationSchema: validate,
  });

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdUvWkfAAAAAHA0M35cQMZPrM7s_hKkZEQgqc3B">
      <div className="signIn-form-wrap">
        <div className="form-top">
          <a className="form-passive form-active" href="#">
            <img src={studentImg} alt="" />
            <p>student</p>
          </a>
          <a className="form-passive" href="#">
            <img src={parentImg} alt="" />
            <p>Parents</p>
          </a>
          <a className="form-passive" href="#">
            <img src={tutortImg} alt="" />
            <p>tutor</p>
          </a>
        </div>
        <div className="name-inputs">
          {/* --------input one ------------- */}
          <div>
            <div className="input-wrap top">
              <div className="signIn-input">
                <div className="input-select-group">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </div>
                <img src={NameIcon} alt="" />
              </div>
              {formik.touched.firstName && formik.errors.firstName ? (
                <span className="error">{formik.errors.firstName}</span>
              ) : null}
              {/*     {console.log("Formik", formik) } */}
            </div>
          </div>
          {/* --------input tw0 ------------- */}
          <div>
            <div className="input-wrap top">
              <div className="signIn-input">
                <div className="input-select-group">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </div>
                <img src={NameIcon} alt="" />
              </div>
              {formik.touched.lastName && formik.errors.lastName ? (
                <span className="error">{formik.errors.lastName}</span>
              ) : null}
              <div></div>
            </div>
          </div>
        </div>
        {/* --------input three ------------- */}
        <div>
          <div className="input-wrap">
            <div className="signIn-input">
              <div className="input-select-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <img src={MilIcon} alt="" />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <span className="error">{formik.errors.email}</span>
            ) : null}
          </div>
        </div>
        {/* --------input four ------------- */}
        <div>
          <div className="input-wrap">
            <div className="signIn-input">
              <PhoneInput
                placeholder="Enter phone number"
                id="phone"
                name="phone"
                // defaultCountry=
                value={value}
                // onChange={setValue}
                className="react-phone"
                onChange={(selectedOption) => {
                  // form.setFieldValue("phone", selectedOption);
                  formik.values.phone = selectedOption;
                  return setValue(selectedOption);
                }}
              />
              <img src={MobileIcon} alt="" />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <span className="error">{formik.errors.phone}</span>
            ) : null}
          </div>
        </div>
        {/* --------input five ------------- */}
        <div>
          <div className="input-wrap">
            <Select
              id="aboutUs"
              name="aboutUs"
              isClearable={true}
              placeholder="Where did you hear about us?"
              className="target2"
              options={options}
              onChange={(selectedOption) => {
                // form.setFieldValue("aboutUs", selectedOption.value);
                formik.values.aboutUs = selectedOption.value;
              }}
            />
            {formik.touched.aboutUs && formik.errors.aboutUs ? (
              <span className="error">{formik.errors.aboutUs}</span>
            ) : null}
          </div>
        </div>
        {/* --------signup button ------------- */}
        {sigin_message && <p>{sigin_message[0].data.status} </p>}
        {/* --------signup button ------------- */}
        <div className="input-wrap">
          <button
            href="#"
            type="submit"
            className="button-primary sign-up-btn"
            onClick={() => formik.handleSubmit()}
          >
            sign up
          </button>
        </div>
        {/* --------terms and condition ------------- */}
        <p className="terms">
          By clicking “Sign up” you are agreeing to 'My Tutor Point Ltd'
          <span> Terms & Conditions</span> and <span>Privacy Policy</span>.
        </p>
        {/*  
   <Recaptcha
   ref={(ref) => setRecaptcha(ref)}
   sitekey="6LdUvWkfAAAAAHA0M35cQMZPrM7s_hKkZEQgqc3B"
   onResolved={onResolved}
   />
  */}
        <GoogleReCaptcha onVerify={(token) => handleReCaptchaVerify(token)} />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default SignInRight;
