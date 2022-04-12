import React, { useState } from "react";
import studentImg from "../../assets/right-section/student.png";
import parentImg from "../../assets/right-section/parents.png";
import tutortImg from "../../assets/right-section/tutor.png";
import NameIcon from "../../assets/right-section/name-icon.png";
import MilIcon from "../../assets/right-section/mail-icon.png";
import MobileIcon from "../../assets/right-section/mobile-icon.png";
// import InputField from "../../InputField";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

// import "../../../layout/navbar/Navbar.css";
import "../../../../layout/navbar/Navbar.css";
import "./signInRight.css";

const SignInRight = () => {
  const [value, setValue] = useState("");
  const options = [
    { value: "facebook", label: "facebook" },
    { value: "instagram", label: "instagram" },
    { value: "other", label: "other" },
  ];

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "must not be more than 15 characters")
      .required("required"),
    lastName: Yup.string()
      .max(15, "must not be more than 15 characters")
      .required("required"),
    email: Yup.string().email("type valid email").required("required"),
    phone: Yup.number().required("required"),
    aboutUs: Yup.string().required("required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aboutUs: "",
      }}
      validationSchema={validate}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formik) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("formik.values", formik.values);
            formik.handleSubmit();
          }}
          className="signIn-form-wrap"
        >
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
              <Field name="firstName">
                {({ field, form, meta }) => (
                  <div className="input-wrap top">
                    <div className="signIn-input">
                      <div className="input-select-group">
                        <input
                          type="text"
                          placeholder="First Name"
                          autoComplete="new-password"
                          {...field}
                        />
                      </div>
                      <img src={NameIcon} alt="" />
                    </div>
                    <p className="error">
                      <ErrorMessage name={field.name} />
                    </p>
                  </div>
                )}
              </Field>
            </div>
            {/* --------input tw0 ------------- */}
            <div>
              <Field name="lastName">
                {({ field, form, meta }) => (
                  <div className="input-wrap top">
                    <div className="signIn-input">
                      <div className="input-select-group">
                        <input
                          type="text"
                          placeholder="Last Name"
                          autoComplete="new-password"
                          {...field}
                        />
                      </div>
                      <img src={NameIcon} alt="" />
                    </div>
                    <p className="error">
                      <ErrorMessage name={field.name} />
                    </p>
                  </div>
                )}
              </Field>
            </div>
          </div>
          {/* --------input three ------------- */}
          <div>
            <Field name="email">
              {({ field, form, meta }) => (
                <div className="input-wrap">
                  <div className="signIn-input">
                    <div className="input-select-group">
                      <Field name="email">
                        {({ field, form, meta }) => (
                          <input
                            type="email"
                            placeholder="Email Address"
                            autoComplete="new-password"
                            {...field}
                          />
                        )}
                      </Field>
                    </div>
                    <img src={MilIcon} alt="" />
                  </div>
                  <p className="error">
                    <ErrorMessage name={field.name} />
                  </p>
                </div>
              )}
            </Field>
          </div>
          {/* --------input four ------------- */}
          <div>
            <Field name="phone">
              {({ field, form, meta }) => (
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
                    // onChange={setValue}
                    className="react-phone signIn-input"
                    onChange={(selectedOption) => {
                      form.setFieldValue("phone", selectedOption);
                      console.log("form ", form, field);
                      return setValue(selectedOption);
                    }}
                  />
                  <p className="error">
                    <ErrorMessage name={field.name} />
                  </p>
                </div>
              )}
            </Field>
          </div>
          {/* --------input five ------------- */}
          <div>
            <Field name="aboutUs">
              {({ field, form, meta }) => (
                <div className="input-wrap">
                  <Select
                    placeholder="Where did you hear about us?"
                    className="target2"
                    options={options}
                    isClearable={true}
                    onChange={(selectedOption) => {
                      form.setFieldValue("aboutUs", selectedOption.value);
                    }}
                    // menuIsOpen={true}
                  />
                  <p className="error">
                    <ErrorMessage name={field.name} />
                  </p>
                </div>
              )}
            </Field>
          </div>
          {/* --------signup button ------------- */}
          <div className="input-wrap">
            <button
              href="#"
              type="submit"
              className="button-primary sign-up-btn"
              // onSubmit={() => handleSubmit()}
              // onClick={formik.handleSubmit}
            >
              sign up
            </button>
          </div>
          {/* --------terms and condition ------------- */}
          <p className="terms">
            By clicking “Sign up” you are agreeing to 'My Tutor Point Ltd'
            <span> Terms & Conditions</span> and <span>Privacy Policy</span>.
          </p>
        </form>
      )}
    </Formik>
  );
};

export default SignInRight;
