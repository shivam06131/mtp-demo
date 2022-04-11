import React, { useState } from "react";
import studentImg from "../assets/right-section/student.png";
import parentImg from "../assets/right-section/parents.png";
import tutortImg from "../assets/right-section/tutor.png";
import NameIcon from "../assets/right-section/name-icon.png";
import MilIcon from "../assets/right-section/mail-icon.png";
import MobileIcon from "../assets/right-section/mobile-icon.png";
import InputField from "./InputField";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";

import "../../../layout/navbar/Navbar.css";

const SignInRight = () => {
  const [value, setValue] = useState("");
  const options = [
    { value: "facebook", label: "facebook" },
    { value: "instagram", label: "instagram" },
    { value: "other", label: "other" },
  ];
  return (
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
        <div className="input-wrap top">
          <div className="signIn-input">
            <div className="input-select-group">
              <input
                type="text"
                placeholder="First Name"
                autoComplete="new-password"
              />
            </div>
            <img src={NameIcon} alt="" />
          </div>
        </div>
        {/* --------input tw0 ------------- */}
        <div className="input-wrap top">
          <div className="signIn-input">
            <div className="input-select-group">
              <input
                type="text"
                placeholder="Last Name"
                autoComplete="new-password"
              />
            </div>
            <img src={NameIcon} alt="" />
          </div>
        </div>
      </div>

      {/* --------input three ------------- */}
      <div className="input-wrap">
        <div className="signIn-input">
          <div className="input-select-group">
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="new-password"
            />
          </div>
          <img src={MilIcon} alt="" />
        </div>
      </div>
      {/* --------input four ------------- */}
      <div className="input-wrap">
        {/* <InputField
          dropdown={true}
          placeholder={"Mobile Number"}
          icon={MobileIcon}
          type={"number"}
        />*/}
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          className="react-phone signIn-input"
        />
      </div>
      {/* --------input five ------------- */}
      <div className="input-wrap">
        <Select
          placeholder="Where did you hear about us?"
          className="target2"
          options={options}
          isClearable={true}
          // menuIsOpen={true}
        />
      </div>
      {/* --------signup button ------------- */}
      <div className="input-wrap">
        <a href="#" className="button-primary sign-up-btn">
          sign up
        </a>
      </div>
      {/* --------terms and condition ------------- */}
      <p className="terms">
        By clicking “Sign up” you are agreeing to 'My Tutor Point Ltd'
        <span> Terms & Conditions</span> and <span>Privacy Policy</span>.
      </p>
    </div>
  );
};

export default SignInRight;
