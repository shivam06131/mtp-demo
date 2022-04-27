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
import { getGeo } from "geoplugin";
import TimezoneSelect from "react-timezone-select";
import * as Yup from "yup";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import prevOne from "../../assets/Identification/img-prev-1.png";
import prevTwo from "../../assets/Identification/img-prev-2.png";
import prevThree from "../../assets/Identification/img-prev-3.png";
import prevFour from "../../assets/Identification/img-prev-4.png";

import PhoneInput from "react-phone-number-input";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";

const PersonalSection = () => {
  const [dateValue, setDateValue] = useState();
  const [preview, setPreview] = useState(profilePicPrev);
  const [src, setSrc] = useState("");
  const [value, setValue] = useState();
  const [billingMobile, setBillingMobile] = useState();
  const [genderValue, setGenderValue] = useState("");
  const [sameAsAbove, setSameAsAbove] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [formData, setFormData] = useState();
  const [ip, setIp] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.teacher_personal_data);

  useEffect(() => {
    async function fun() {
      userData && (await setFormData(userData[0]?.data?.personal_information));
    }
    fun();
  }, [userData]);

  //!filling the form values
  useEffect(() => {
    console.log("setFormData", formData);
    if (formData) {
      formData?.dob && setDateValue(new Date(formData.dob));
      formData?.gender && setGenderValue(formData.gender);
      formData?.gender && formik.setFieldValue("gender", formData.gender);
      formData?.id_number &&
        formik.setFieldValue("id_number", formData.id_number);
      formData.photo && formik.setFieldValue("profile_photo", formData.photo);
      formData.photo && setPreview(formData.photo);

      formData.house_no && formik.setFieldValue("house", formData.house_no);
      // formData.city && formik.setFieldValue("city", formData.city);
      formData.postal && formik.setFieldValue("postal", formData.postal);
      formData.street && formik.setFieldValue("street", formData.street);
      formData.identification_photo &&
        formik.setFieldValue("identification_photo", formData.identification);
      formData.same_address &&
        setSameAsAbove(formData.same_address) &&
        formik.setFieldValue("same_address", formData.same_address) &&
        formik.setFieldValue("billing_house", formData.billing_house_no) &&
        formik.setFieldVale("billing_postal", formData.billing_postal) &&
        formik.setFieldValue("billing_street", formData.billing_street) &&
        formik.setFieldValue(
          "billing_mobile_number",
          formData.billing_mobile
        ) &&
        setBillingMobile(formData.billing_mobile);
    }
  }, [formData]);

  // console.log("formData", formData);

  //!localStorage
  let login_data = localStorage.getItem("log_in_data");
  login_data = JSON.parse(login_data);
  const login_token = localStorage.getItem("login_token");

  //! yup validation
  const validate = Yup.object({
    first_name: Yup.string().required("Enter your First Name"),
    last_name: Yup.string().required("Enter your Last Name"),
    dob: Yup.string().required("Enter your Date of Birth").nullable(),
    gender: Yup.string().required("Enter your Gender"),
    email: Yup.string()
      .required("Enter a valid email.")
      .email("Enter a valid email."),
    id_number: Yup.number(" Enter a valid Id Number.").required(
      "Enter a valid Id Number."
    ),
    profile_photo: Yup.string().required("Choose a profile photo."),
    identification_photo: Yup.string().required(
      "Identification Photo is Required"
    ),
    house: Yup.string().required("Enter house number."),
    city: Yup.string().required("Enter Valid City Name."),
    postal: Yup.number().required("Enter postal or zip code or PO Box."),
    street: Yup.string().required("Enter street or road name."),
    country: Yup.string().required("Enter valid Country name."),
    mobile_number: Yup.string().required("Enter a valid mobile number."),
    billing_house:
      !sameAsAbove && Yup.string().required("Enter Billing house number."),
    billing_city: Yup.string().required("Enter Valid Billing City Name."),
    billing_postal:
      !sameAsAbove &&
      Yup.number().required("Enter Billing postal or zip code or PO Box."),
    billing_time_zone: Yup.string().required(
      "Enter Billing postal valid time-zone."
    ),
    billing_street:
      !sameAsAbove &&
      Yup.string().required("Enter Billing street or road name."),
    billing_country: Yup.string().required("Enter Billing valid Country name."),
    billing_mobile_number:
      !sameAsAbove &&
      Yup.string().required("Enter a valid Billing mobile number."),
    billing_currency: Yup.string().required("Enter a valid currency."),
  });

  useEffect(() => {
    !login_token && navigate("/");
    dispatch({ type: "GET_PERSONAL_INFORMATION" });
    // dispatch({ type: "PERSONAL_INFO_LOADER", payload: true });
  }, []);

  //! setting up fields with geo location input
  useEffect(() => {
    setValue(login_data.user_profile.mobile);
    // setValue("+" + login_data.user_profile.mobile);
    //! Get geolocation of a user's browser.
    getGeo()
      .then((response) => {
        formik.setFieldValue("country", response.countryName);
        formik.setFieldValue("city", response.city);
        formik.setFieldValue("billing_country", response.countryName);
        formik.setFieldValue("billing_city", response.city);
        formik.setFieldValue("billing_currency", response.currencyCode);
        formik.setFieldValue("billing_time_zone", response.timezone);
        setSelectedTimezone(response.timezone);
        setIp(response.request);
      })
      .catch((error) => console.log("getGeo error ", error));
  }, []);

  //! formik object
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
      same_address: "",
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
    validationSchema: validate,

    //! formik onsubmit
    onSubmit: (values) => {
      let make_profile_detail = {
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        email: values.email,
        dob: dateValue,
        id_number: String(values.id_number),
        photo: values.profile_photo,
        identification: values.identification_photo,
        identification_2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA",

        house_no: values.house,
        street: values.street,
        city: values.city,
        country: values.country,
        postal: String(values.postal),
        mobile: values.mobile_number,
        same_address: sameAsAbove,
        billing_house_no: sameAsAbove ? value.house : values.billing_house,
        billing_street: sameAsAbove ? value.street : values.billing_street,
        billing_city: sameAsAbove ? value.city : values.billing_city,
        billing_country: sameAsAbove ? value.country : values.billing_country,
        billing_postal: sameAsAbove
          ? value.postal
          : String(values.billing_postal),
        billing_mobile: sameAsAbove
          ? value.mobile
          : values.billing_mobile_number,
        timezone: values.billing_time_zone,
        currency: values.billing_currency,
        ip,
      };
      console.log("val", make_profile_detail);
      dispatch({ type: "MAKE_PROFILE", make_profile_detail });
    },
  });

  //! removing same as above data
  useEffect(() => {
    if (sameAsAbove === false) {
      formik.setFieldValue("billing_house", "");
      // formik.setFieldValue("billing_city", "");
      formik.setFieldValue("billing_postal", "");
      formik.setFieldValue("billing_street", "");
      // formik.setFieldValue("billing_country", "");
      formik.setFieldValue(
        "billing_mobile_number",
        formik.values.billing_mobile_number
      );
      setBillingMobile("");
    }
  }, [sameAsAbove]);

  //! function defination
  const handleDateChange = (val) => {
    setDateValue(val);
    val = String(val);
    formik.setFieldValue("dob", val);
  };

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log("status", status);
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formik.setFieldValue("identification_photo", reader.result);
        console.log("reader.result ", reader.result);
      };
    }
    if (status === "removed") {
      formik.setFieldValue("identification_photo", "");
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    // console.log(files.map((f) => f.meta));
  };

  const handleGenderChange = (e) => {
    setGenderValue(e.target.value);
    // formik.values.gender = e.target.value;
    formik.setFieldValue("gender", e.target.value);
  };

  const handleImageCrop = (prev) => {
    setPreview(prev);
    formik.setFieldValue("profile_photo", prev);
  };

  const handleImageClose = () => {
    setPreview(profilePicPrev);
    formik.setFieldValue("profile_photo", "");
  };

  //! loading state
  const loading_data = useSelector((state) => state.personal_info_loader);
  useEffect(() => {
    loading_data === false && setLoading(false);
  }, [loading_data]);

  //! rendering loader
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#f4efe6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GridLoader color={"#c6521e"} size={50} />;
      </div>
    );
  }

  return (
    <div>
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
                    <Form.Label className="input-label">First Name*</Form.Label>
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
                    <Form.Label className="input-label">Last Name*</Form.Label>
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
                {formik.touched.dob && formik.errors.dob ? (
                  <span className="error make-profile-er">
                    {formik.errors.dob}
                  </span>
                ) : null}
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
                        onChange={handleGenderChange}
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
                        onChange={handleGenderChange}
                        checked={genderValue === "female"}
                      />
                    </div>
                  </div>
                </Form.Group>
                {formik.touched.gender && formik.errors.gender ? (
                  <span className="error make-profile-er">
                    {formik.errors.gender}
                  </span>
                ) : null}
              </div>
            </div>
            {/* ------------ full width input ------------------- */}
            <div className="input-field input-wrapper">
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">Email*</Form.Label>
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
                  <Form.Label className="input-label">ID Number*</Form.Label>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 50, hide: 50 }}
                    overlay={renderTooltip}
                  >
                    <img src={infoIcon} alt="" />
                  </OverlayTrigger>
                  <Form.Control
                    className="input-att"
                    type="number"
                    name="id_number"
                    onChange={formik.handleChange}
                    value={formik.values.id_number}
                  />
                </Form.Group>
              </Form>
              {formik.touched.id_number && formik.errors.id_number ? (
                <span className="error make-profile-er">
                  {formik.errors.id_number}
                </span>
              ) : null}
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
                  onClose={() => handleImageClose()}
                  // onClose={() => setPreview(profilePicPrev)}
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
                <img className="crop-img " src={preview} alt="Preview" />
              </div>
              {formik.touched.profile_photo && formik.errors.profile_photo ? (
                <span className="error make-profile-er">
                  {formik.errors.profile_photo}
                </span>
              ) : null}
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
              multiple={true}
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
            {formik.touched.identification_photo &&
            formik.errors.identification_photo ? (
              <span className="error make-profile-er">
                {formik.errors.identification_photo}
              </span>
            ) : null}
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
              {formik.touched.house && formik.errors.house ? (
                <span className="error make-profile-er">
                  {formik.errors.house}
                </span>
              ) : null}
            </div>
            {/*---------------input 2 -------------  */}
            <div className="input-field contact-input-gap">
              <Form>
                <Form.Group className="form-group ">
                  <Form.Label className="input-label">City / Town</Form.Label>
                  <Form.Control
                    className="input-att"
                    type="text"
                    id="city"
                    disabled
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {formik.touched.city && formik.errors.city ? (
                <span className="error make-profile-er">
                  {formik.errors.city}
                </span>
              ) : null}
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
                    type="number"
                    id="postal"
                    value={formik.values.postal}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {formik.touched.postal && formik.errors.postal ? (
                <span className="error make-profile-er">
                  {formik.errors.postal}
                </span>
              ) : null}
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
              {formik.touched.street && formik.errors.street ? (
                <span className="error make-profile-er">
                  {formik.errors.street}
                </span>
              ) : null}
            </div>
            {/*---------------input 5 -------------  */}
            <div className="input-field  contact-input-gap">
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">Country*</Form.Label>
                  <Form.Control
                    className="input-att"
                    type="text"
                    id="country"
                    disabled
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {formik.touched.country && formik.errors.country ? (
                <span className="error make-profile-er">
                  {formik.errors.country}
                </span>
              ) : null}
            </div>
            {/*---------------input 6 -------------  */}
            <div className="input-field contact-input-gap">
              <label className="input-label" htmlFor="phone">
                Mobile Number
              </label>
              <div className="custom-phone">
                <PhoneInput
                  placeholder="Enter phone number"
                  id="phone"
                  name="phone"
                  value={value}
                  className="react-phone"
                  onChange={(selectedOption) => {
                    formik.values.mobile_number = selectedOption;
                    return setValue(selectedOption);
                  }}
                />
              </div>
              {formik.touched.mobile_number && formik.errors.mobile_number ? (
                <span className="error make-profile-er">
                  {formik.errors.mobile_number}
                </span>
              ) : null}
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
              // checked={remember}
              // value={sameAsAbove}
              // value="sameAsAbove"
              checked={sameAsAbove}
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
                    value={
                      sameAsAbove
                        ? formik.values.house
                        : formik.values.billing_house
                    }
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {sameAsAbove ? (
                formik.touched.house && formik.errors.house
              ) : formik.touched.billing_house &&
                formik.errors.billing_house ? (
                <span className="error make-profile-er">
                  {sameAsAbove
                    ? formik.errors.house
                    : formik.errors.billing_house}
                </span>
              ) : null}
            </div>
            {/*---------------input 2 -------------  */}
            <div className="input-field contact-input-gap">
              <Form>
                <Form.Group className="form-group ">
                  <Form.Label className="input-label">City / Town</Form.Label>
                  <Form.Control
                    className="input-att"
                    type="text"
                    id="billing_city"
                    value={formik.values.billing_city}
                    disabled
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {formik.touched.billing_city && formik.errors.billing_city ? (
                <span className="error make-profile-er">
                  {formik.errors.billing_city}
                </span>
              ) : null}
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
                    type="number"
                    id="billing_postal"
                    value={
                      sameAsAbove
                        ? formik.values.postal
                        : formik.values.billing_postal
                    }
                    // value={formik.values.billing_postal}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {sameAsAbove ? (
                formik.touched.postal && formik.errors.postal
              ) : formik.touched.billing_postal &&
                formik.errors.billing_postal ? (
                <span className="error make-profile-er">
                  {sameAsAbove
                    ? formik.errors.postal
                    : formik.errors.billing_postal}
                </span>
              ) : null}
            </div>
            {/*---------------input 4 -------------  */}
            <div className="input-field  contact-input-gap">
              <label htmlFor="timezone" className="input-label">
                Set your Time Zone*
              </label>
              <TimezoneSelect
                // menuIsOpen={true}
                className="timezone-select"
                value={selectedTimezone}
                onChange={setSelectedTimezone}
              />
            </div>
            {formik.touched.billing_time_zone &&
            formik.errors.billing_time_zone ? (
              <span className="error make-profile-er">
                {formik.errors.billing_time_zone}
              </span>
            ) : null}
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
                    // value={formik.values.billing_street}
                    value={
                      sameAsAbove
                        ? formik.values.street
                        : formik.values.billing_street
                    }
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {sameAsAbove ? (
                formik.touched.street && formik.errors.street
              ) : formik.touched.billing_street &&
                formik.errors.billing_street ? (
                <span className="error make-profile-er">
                  {sameAsAbove
                    ? formik.errors.street
                    : formik.errors.billing_street}
                </span>
              ) : null}
            </div>
            {/*---------------input 6 -------------  */}
            <div className="input-field  contact-input-gap">
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">Country*</Form.Label>
                  <Form.Control
                    className="input-att"
                    type="text"
                    id="billing_country"
                    value={formik.values.billing_country}
                    disabled
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {formik.touched.billing_country &&
              formik.errors.billing_country ? (
                <span className="error make-profile-er">
                  {formik.errors.billing_country}
                </span>
              ) : null}
            </div>
            {/*---------------input 7 -------------  */}
            <div className="input-field contact-input-gap">
              <label className="input-label" htmlFor="phone">
                Mobile Number
              </label>
              <div className="custom-phone">
                <PhoneInput
                  placeholder="Enter phone number"
                  id="phone"
                  name="phone"
                  // value={billingMobile}
                  value={
                    sameAsAbove
                      ? formik.values.mobile_number
                      : formik.values.billingMobile
                  }
                  className="react-phone"
                  onChange={(selectedOption) => {
                    formik.setFieldValue(
                      "billing_mobile_number",
                      selectedOption
                    );
                    if (sameAsAbove) {
                      return setBillingMobile(formik.values.mobile_number);
                    } else {
                      return setBillingMobile(selectedOption);
                    }
                  }}
                />
              </div>
              {formik.touched.billing_mobile_number &&
              formik.errors.billing_mobile_number ? (
                <span className="error make-profile-er">
                  {sameAsAbove
                    ? formik.errors.mobile_number
                    : formik.errors.billing_mobile_number}
                </span>
              ) : null}
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
                    disabled
                    value={formik.values.billing_currency}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Form>
              {formik.touched.billing_currency &&
              formik.errors.billing_currency ? (
                <span className="error make-profile-er">
                  {formik.errors.billing_currency}
                </span>
              ) : null}
            </div>
            {/*----------------------------  */}
          </Col>
        </Row>
        <p className="contact-input-gap info">
          *These fields cannot be changed once profile is set-up. If you need to
          change these details, please contact us at
          <span>useraccounts@mytutorpoint.com</span> or <span> click here</span>
        </p>
        <div className="add-button-wrap">
          <button
            className="button-primary custom-property"
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Continue
          </button>
        </div>
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
