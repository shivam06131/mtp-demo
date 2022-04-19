import "./PersonalSection.css";
import "../../../login/logInSections/loginRightSection/styles.css";

import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-date-picker";
import CalenderIcon from "../../assets/personalSection/calendar.png";
import infoIcon from "../../assets/personalSection/info_icon.png";
import Avatar from "react-avatar-edit";
import profilePic from "../../assets/personalSection/Profile pic.png";
import profilePicPrev from "../../assets/personalSection/Profile Photo preview - empty preview.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import prevOne from "../../assets/Identification/img-prev-1.png";
import prevTwo from "../../assets/Identification/img-prev-2.png";
import prevThree from "../../assets/Identification/img-prev-3.png";
import prevFour from "../../assets/Identification/img-prev-4.png";

import PhoneInput from "react-phone-number-input";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const PersonalSection = () => {
  const [dateValue, setDateValue] = useState();
  const [preview, setPreview] = useState(profilePicPrev);
  const [src, setSrc] = useState("");
  const [value, setValue] = useState();
  const [remember, setRemember] = useState();
  const [genderValue, setGenderValue] = useState();
  const [sameAsAbove, setSameAsAbove] = useState();

  let login_data = localStorage.getItem("log_in_data");
  login_data = JSON.parse(login_data);

  useEffect(() => {
    setValue(login_data.user_profile.mobile);
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: login_data ? login_data.first_name : "",
      last_name: login_data ? login_data.last_name : "",
      dob: "",
      gender: "",
      email: login_data ? login_data.email : "",
      id_number: "",
      profile_photo: "",
      identification_photo: "",
      house: "",
      city: "",
      postal: "",
      street: "",
      country: "",
      mobile_number: login_data ? login_data.user_profile.mobile : "",
      billing_house: "",
      billing_city: "",
      billing_postal: "",
      billing_time_zone: "",
      billing_street: "",
      billing_country: "",
      billing_mobile_number: "",
      billing_currency: "",
    },
    onSubmit: (values) => {
      console.log("submitted values make profile", values);
    },
  });

  //adding same as above data
  useEffect(() => {
    if (sameAsAbove) {
      formik.setFieldValue("billing_house", formik.values.house);
      formik.setFieldValue("billing_city", formik.values.city);
      formik.setFieldValue("billing_postal", formik.values.postal);
      formik.setFieldValue("billing_street", formik.values.street);
      formik.setFieldValue("billing_country", formik.values.country);
      formik.setFieldValue(
        "billing_mobile_number",
        formik.values.mobile_number
      );
    }
  }, [formik.values, sameAsAbove]);

  //removing same as above data
  useEffect(() => {
    if (sameAsAbove === false) {
      formik.setFieldValue("billing_house", "");
      formik.setFieldValue("billing_city", "");
      formik.setFieldValue("billing_postal", "");
      formik.setFieldValue("billing_street", "");
      formik.setFieldValue("billing_country", "");
      formik.setFieldValue(
        "billing_mobile_number",
        formik.values.billing_mobile_number
      );
    }
  }, [sameAsAbove]);

  //! function defination
  const handleDateChange = (val) => {
    setDateValue(val);
    formik.values.dob = val;
  };

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formik.values.identification_photo = reader.result;
      };
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    // console.log(files.map((f) => f.meta));
  };

  const handleChange = (e) => {
    setGenderValue(e.target.value);
    formik.values.gender = e.target.value;
  };

  const handleImageCrop = (prev) => {
    setPreview(prev);
    formik.values.profile_photo = prev;
  };

  console.log("formik", formik);
  return (
    <div className="personal-sec-wrap">
      <div className="container">
        <Accordion className="acc" defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="acc-item">
            <Accordion.Header className="acc-header">
              Personal Information
            </Accordion.Header>
            <Accordion.Body className="acc-body ">
              {/*---------------personal section -------------  */}
              <div className="personal-wrap underline">
                <Row className="custom-row">
                  <Col className="custom-gutter">
                    <h6 className="heading">Personal Details</h6>
                    {/* ------------left side ------------------- */}
                    {/* ------------box one ------------------- */}
                    <div className="input-wrapper box-one p-0">
                      <div className="input-field  small-field">
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label className="input-label">
                              First Name*
                            </Form.Label>
                            <Form.Control
                              className="input-att"
                              type="text"
                              id="first_name"
                              name="first_name"
                              onChange={formik.handleChange}
                              value={formik.values.first_name}
                              disabled
                            />
                          </Form.Group>
                        </Form>
                      </div>
                      <div className="input-field  small-field">
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label className="input-label">
                              Last Name*
                            </Form.Label>
                            <Form.Control
                              className="input-att"
                              type="text"
                              id="last_name"
                              name="last_name"
                              onChange={formik.handleChange}
                              value={formik.values.last_name}
                              disabled
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                    {/* ------------box 2 ------------------- */}
                    <div className="input-wrapper box-one">
                      <div className="input-field  small-field">
                        <label htmlFor="dob" className="input-label">
                          Date of Birth*
                        </label>
                        <DatePicker
                          onChange={handleDateChange}
                          value={dateValue}
                          dayPlaceholder="DD"
                          monthPlaceholder="MM"
                          yearPlaceholder="YYYY"
                          format="dd/MM/yyyy"
                          id="dob"
                          name="dob"
                          calendarIcon={<CalenderIconComponent />}
                        />
                      </div>
                      <div className="input-field  small-field">
                        <label htmlFor="dob" className="input-label">
                          Gender*
                        </label>
                        <Form.Group controlId="gender">
                          <div className="radio-button-wrap">
                            <div className="radio-button">
                              <Form.Check
                                id="male"
                                type="radio"
                                label="male"
                                value="male"
                                className="male-checkbox"
                                onChange={handleChange}
                                checked={genderValue === "male"}
                              />
                            </div>
                            <div className="radio-button2">
                              <Form.Check
                                id="female"
                                type="radio"
                                label="female"
                                value="female"
                                className="female-checkbox"
                                onChange={handleChange}
                                checked={genderValue === "female"}
                              />
                            </div>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    {/* ------------ full width input ------------------- */}
                    <div className="input-field input-wrapper">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Email*
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            disabled
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/* ------------ full width input ------------------- */}
                    <div className="input-field input-wrapper">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            ID Number*
                          </Form.Label>
                          <OverlayTrigger
                            placement="auto"
                            delay={{ show: 50, hide: 50 }}
                            overlay={renderTooltip}
                          >
                            <img src={infoIcon} alt="" />
                          </OverlayTrigger>
                          <Form.Control
                            className="input-att"
                            type="text"
                            name="id_number"
                            onChange={formik.handleChange}
                            value={formik.values.id_number}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </Col>
                  <Col className="custom-gutter">
                    {/* ------------right side ------------------- */}
                    <div className="right-box">
                      <div className="label-span-wrap">
                        <label htmlFor="firstName" className="input-label">
                          Profile Photo*
                        </label>
                        <OverlayTrigger
                          placement="auto"
                          delay={{ show: 50, hide: 50 }}
                          overlay={renderTooltip}
                          // show
                        >
                          <img src={infoIcon} alt="" />
                        </OverlayTrigger>
                      </div>
                      <div className="avatar-wrap">
                        <Avatar
                          className="input-avatar"
                          width={227}
                          height={208}
                          onCrop={(prev) => handleImageCrop(prev)}
                          // onCrop={(prev) => setPreview(prev)}
                          onClose={() => setPreview(profilePicPrev)}
                          borderStyle={{
                            borderRadius: "0px",
                            border: "1px dashed #999999",
                            background: "#f9f8f7",
                          }}
                          label="Choose a file"
                          labelStyle={{
                            fontSize: "15px",
                            lineHeight: "20px",
                            color: "#999999",
                            textAlign: "center",
                            position: "absolute",
                            // top: "50%",
                            left: "30%",
                          }}
                          src={src}
                        />
                        <img
                          className="crop-img "
                          src={preview}
                          alt="Preview"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              {/*---------------Identification section -------------  */}
              <div className="identification underline">
                <Row className="custom-row">
                  <Col className="column-one custom-gutter">
                    <div className="label-span-wrap">
                      <label htmlFor="firstName">Identification*</label>
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 50, hide: 50 }}
                        overlay={renderTooltip}
                      >
                        <img src={infoIcon} alt="" />
                      </OverlayTrigger>
                    </div>
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmit}
                      // submitButtonContent=''
                      multiple={false}
                      maxSizeBytes="3145728"
                      accept="image/*,audio/*,video/*"
                      inputWithFilesContent="Add File"
                      inputContent={
                        <p className="drag-info">
                          Drag & drop identification file here to upload <br />
                          or <br /> <span>Choose a file</span> to upload
                        </p>
                      }
                    />
                  </Col>
                  <Col className="custom-gutter">
                    <Row className="identification-row-gap custom-row">
                      <Col className="col-gap custom-gutter">
                        <img src={prevOne} alt="" />

                        <img src={prevTwo} className="img-gap" alt="" />
                      </Col>
                    </Row>
                    <Row className="custom-row">
                      <Col className="col-gap custom-gutter">
                        <img src={prevThree} alt="" />

                        <img src={prevFour} className="img-gap" alt="" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              {/*---------------Contact Details section -------------  */}
              <div className="contact underline">
                <div className="label-span-wrap">
                  <label htmlFor="firstName">Contact Details</label>
                </div>
                <Row className="custom-row row">
                  <Col className="custom-gutter">
                    {/*---------------input 1 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            House / Apartment Number
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="house"
                            value={formik.values.house}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 2 -------------  */}
                    <div className="input-field contact-input-gap">
                      <Form>
                        <Form.Group className="form-group ">
                          <Form.Label className="input-label">
                            City / Town
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 3 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Postal / Zip Code / PO Box
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="postal"
                            value={formik.values.postal}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*--------------- -------------  */}
                  </Col>
                  <Col className="col-gaps custom-gutter">
                    {/*---------------input 4  -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Street / Road Name
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="street"
                            value={formik.values.street}
                            onChange={(e) =>
                              formik.setFieldValue("street", e.target.value)
                            }
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 5 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Country*
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 6 -------------  */}
                    <div className="input-field contact-input-gap">
                      <label className="input-label" htmlFor="pohone">
                        Mobile Number
                      </label>
                      <div
                        // className="custom-phone"
                        className={`custom-phone ${
                          login_data && "disabled-phone"
                        }`}
                        // style={{ backgroundColor: login_data && "#d6d6d6" }}
                      >
                        <PhoneInput
                          placeholder="Enter phone number"
                          id="phone"
                          name="phone"
                          // defaultCountry=
                          value={value}
                          // onChange={setValue}
                          className="react-phone"
                          disabled={login_data && true}
                          onChange={(selectedOption) => {
                            // form.setFieldValue("phone", selectedOption);
                            // formik.values.phone = selectedOption;
                            formik.values.mobile_number = selectedOption;
                            return setValue(selectedOption);
                          }}
                        />
                      </div>
                    </div>
                    {/*--------------- -------------  */}
                  </Col>
                </Row>
              </div>
              {/*---------------address section -------------  */}
              <div className="address">
                <div className="label-span-wrap">
                  <label htmlFor="firstName">Billing Address</label>
                  <div className="remember-pass rem-pass-address">
                    <input
                      onChange={() => setSameAsAbove((prev) => !prev)}
                      type="checkbox"
                      id="checkbox"
                      name=""
                      checked={remember}
                      value=""
                    />
                    <label className="checkbox-label" htmlFor="checkbox">
                      *Same as above
                    </label>
                  </div>
                </div>
                {/*   -----------------row --------------------*/}
                <Row className="custom-row row">
                  <Col className="custom-gutter">
                    {/*---------------input 1 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            House / Apartment Number
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_house"
                            value={formik.values.billing_house}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 2 -------------  */}
                    <div className="input-field contact-input-gap">
                      <Form>
                        <Form.Group className="form-group ">
                          <Form.Label className="input-label">
                            City / Town
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_city"
                            value={formik.values.billing_city}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 3 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Postal / Zip Code / PO Box
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_postal"
                            value={formik.values.billing_postal}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 4 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Set your Time Zone*
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_time_zone"
                            value={formik.values.billing_time_zone}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*--------------- -------------  */}
                  </Col>

                  <Col className="col-gaps custom-gutter">
                    {/*---------------input 5  -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Street / Road Name
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_street"
                            value={formik.values.billing_street}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 6 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Country*
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_country"
                            value={formik.values.billing_country}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 7 -------------  */}
                    <div className="input-field contact-input-gap">
                      <label className="input-label" htmlFor="pohone">
                        Mobile Number
                      </label>
                      <div
                        className={`custom-phone ${
                          login_data && "disabled-phone"
                        }`}
                      >
                        <PhoneInput
                          placeholder="Enter phone number"
                          id="phone"
                          name="phone"
                          value={value}
                          className="react-phone"
                          disabled={login_data && true}
                          onChange={(selectedOption) => {
                            formik.values.billing_mobile_number =
                              selectedOption;
                            return setValue(selectedOption);
                          }}
                        />
                      </div>
                    </div>
                    {/*---------------input 8 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Your currency to receive payments is set as*
                          </Form.Label>
                          <Form.Control
                            className="input-att"
                            type="text"
                            id="billing_currency"
                            value={formik.values.billing_currency}
                            onChange={formik.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 7 -------------  */}
                    {/*--------------- -------------  */}
                  </Col>
                </Row>
                <p className="contact-input-gap info">
                  *These fields cannot be changed once profile is set-up. If you
                  need to change these details, please contact us at
                  <span>useraccounts@mytutorpoint.com</span> or{" "}
                  <span> click here</span>
                </p>
                <div className="add-button-wrap">
                  <button
                    className="button-primary custom-property"
                    onClick={() => formik.handleSubmit()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

const renderTooltip = (props) => (
  <Tooltip className="overlay-style" id="button-tooltip" {...props}>
    <h6>Note:</h6>
    <p>maximum 3 mb</p>
    <p>smile and look at the camera</p>
    <p>Your photo is centered and upright</p>
    <p>maximum 3 mb</p>
  </Tooltip>
);

const CalenderIconComponent = () => {
  return <img src={CalenderIcon} alt="" />;
};

export default PersonalSection;
