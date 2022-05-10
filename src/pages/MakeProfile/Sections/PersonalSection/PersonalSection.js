import "./PersonalSection.css";
import "../../../login/logInSections/loginRightSection/styles.css";

import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import CalenderIcon from "../../assets/personalSection/calendar.png";
import infoIcon from "../../assets/personalSection/info_icon.png";
import Avatar from "react-avatar-edit";
import profilePicPrev from "../../assets/personalSection/Profile Photo preview - empty preview.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import { getGeo } from "geoplugin";
import * as Yup from "yup";

import "react-dropzone-uploader/dist/styles.css";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import IdentificationSection from "../IdentificationSection/IdentificationSection";
import ContactSection from "../ContactSection/ContactSection";
import AddressSection from "../AddressSection/AddressSection";

const PersonalSection = () => {
  const [dateValue, setDateValue] = useState();
  const [preview, setPreview] = useState(profilePicPrev);
  const [src, setSrc] = useState("");
  const [value, setValue] = useState();
  const [ip, setIp] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState({});

  const [billingMobile, setBillingMobile] = useState();
  const [genderValue, setGenderValue] = useState("");
  const [sameAsAbove, setSameAsAbove] = useState("");
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);
  const [image, setImg] = useState([]);

  //! imported function
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
    if (formData) {
      formData?.dob &&
        formik.setFieldValue("dob", String(formData.dob)) &&
        setDateValue(new Date(formData.dob));
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
      formData.identification &&
        formik.setFieldValue("identification", formData.identification) &&
        formik.setFieldValue("identification_2", formData.identification_2) &&
        formik.setFieldValue("identification_arr", [
          formData.identification,
          formData.identification_2,
        ]);
      !image.includes(formData.identification || formData.identification_2) &&
        setImg([...image, formData.identification, formData.identification_2]);
      formData.same_address && setSameAsAbove(formData.same_address);

      //if same as above is false
      formData.billing_house_no &&
        formik.setFieldValue("billing_house", formData.billing_house_no);
      formData.billing_postal &&
        formik.setFieldValue("billing_postal", formData.billing_postal);
      formData.billing_street &&
        formik.setFieldValue("billing_street", formData.billing_street);
      formData.billing_mobile &&
        formik.setFieldValue(
          "billing_mobile_number",
          formData.billing_mobile
        ) &&
        setBillingMobile(formData.billing_mobile);
    }
  }, [formData]);

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
    identification: Yup.string().required("Identification Photo is Required"),
    // identification_2: Yup.string().required("Identification Photo is Required"),
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
      identification_arr: [],
      identification_photo: "",
      identification: "",
      identification_2: "",
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
        identification: formik.values.identification_arr[0],
        identification_2: formik.values.identification_arr[1],
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
          opacity: "0.7",
        }}
      >
        <ClipLoader color={"#c6521e"} size={50} />
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

      <IdentificationSection formik={formik} image={image} setImg={setImg} />

      <ContactSection formik={formik} value={value} setValue={setValue} />

      <AddressSection
        setSameAsAbove={setSameAsAbove}
        sameAsAbove={sameAsAbove}
        formik={formik}
        setBillingMobile={setBillingMobile}
        setSelectedTimezone={setSelectedTimezone}
        selectedTimezone={selectedTimezone}
      />
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
