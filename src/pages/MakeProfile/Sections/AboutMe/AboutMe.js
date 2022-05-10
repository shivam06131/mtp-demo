import React, { useEffect, useState } from "react";
import "./aboutMe.css";
import "../PersonalSection/PersonalSection.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import infoIcon from "../../assets/personalSection/info_icon.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import VideoIcon from "../../assets/aboutMe/face.png";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone-uploader";
import chainImage from "../../assets/aboutMe/chain.png";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const AboutMe = () => {
  const [taglineCount, setTaglineCount] = useState(50);
  const [textFieldCount, setTextFieldCount] = useState(700);
  const [selectValue, setSelectValue] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //! getting and setting the about me data to the state
  const about_me_data = useSelector((state) => state.about_me_data);
  useEffect(() => {
    about_me_data && setAboutMe(about_me_data.data.about_me);
  }, [about_me_data]);

  //! populating the input fields when data arrives
  useEffect(() => {
    aboutMe.own_tagline &&
      formik.setFieldValue(
        "tagline",
        aboutMe.own_tagline === null ? "" : aboutMe.own_tagline
      );
    aboutMe.tagline &&
      formik.setFieldValue(
        "select",
        aboutMe.tagline === null ? "" : aboutMe.tagline
      ) &&
      setSelectValue(aboutMe.tagline);
    aboutMe.biography && formik.setFieldValue("biography", aboutMe.biography);

    let biography_len = 250 - aboutMe?.biography?.split(" ").length;
    let tagline_len = 50 - aboutMe?.own_tagline?.split(" ").length;

    tagline_len &&
      formik.setFieldValue("tagline_count", tagline_len) &&
      setTaglineCount(tagline_len);

    aboutMe.video_biography &&
      formik.setFieldValue("video_biography", aboutMe.video_biography);
    biography_len &&
      formik.setFieldValue("biography_count", biography_len) &&
      setTextFieldCount(biography_len);
    aboutMe.video_biography_url &&
      formik.setFieldValue(
        "video_link",
        aboutMe.video_biography_url === null ? "" : aboutMe.video_biography_url
      );
  }, [aboutMe]);

  useEffect(() => {
    dispatch({ type: "GET_ABOUT_ME" });
  }, []);

  //! react select options
  const options = [
    { value: "facebook", label: "facebook" },
    { value: "instagram", label: "instagram" },
    { value: "other", label: "other" },
    { value: "Reliable Tutor", label: "Reliable Tutor" },
  ];

  //! yup validation
  const schema = Yup.object().shape(
    {
      tagline: Yup.string().when("select", {
        is: (select) => !select || select?.length === 0,
        then: Yup.string().required(
          "Choose a tagline from the dropdown list or type your own."
        ),
      }),
      select: Yup.string().when("tagline", {
        is: (tagline) => !tagline || tagline?.length === 0,
        then: Yup.string().required(
          "Choose a tagline from the dropdown list or type your own."
        ),
      }),
      biography: Yup.string().required("Enter your biography."),
      video_link: Yup.string()
        .matches(
          /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
          "Please enter valid link"
        )
        .required("link is required"),
    },
    ["tagline", "select"]
  );

  //! formik object
  const formik = useFormik({
    initialValues: {
      tagline: "",
      select: "",
      biography: "",
      video_biography: "",
      video_link: "",
      tagline_count: 50,
      biography_count: aboutMe
        ? 250 - aboutMe?.biography?.split(" ").length
        : 250,
    },
    onSubmit: (values) => {
      let payload_object = {
        biography: values.biography,
        cover_photo:
          "https://augmentivs3file,.s3.eu-west-2.amazonaws.com/static/cover-photo-2.jpg",
        own_tagline: values.tagline === "" ? null : values.tagline,
        tagline: values.select === "" ? null : values.select,
        video_biography: values.video_biography,
        video_biography_url:
          values.video_link === "" ? null : values.video_link,
      };
      dispatch({ type: "UPDATE_ABOUT_ME", payload: payload_object });
    },
    validationSchema: schema,
  });

  console.log("Formik", formik);

  //! loading state
  const loading_data = useSelector((state) => state.about_me_loader);
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
      <h6 className="heading">Tag Line</h6>
      <div className="about-upperSection underline">
        {/* ------------------------------------------------row one -------------------------------- */}
        <Row className="custom-row full-row row-relative">
          {/* ------------- first input-------------- */}
          <Col className="custom-gutter">
            <div className="input-field input-wrapper">
              {/* --------------------- tag line input -------------*/}
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">
                    Type your tagline
                  </Form.Label>
                  <Form.Control
                    className="input-att form-control"
                    type="text"
                    id="tagline"
                    name="tagline"
                    disabled={formik.values.select ? true : false}
                    onChange={(e) => {
                      formik.setFieldValue("tagline", e.target.value);
                      let word = e.target.value;
                      let char_count = word.split(" ");
                      setTaglineCount(50 - char_count.length);
                      // formik.handleChange;
                    }}
                    value={formik.values.tagline}
                  />
                </Form.Group>
              </Form>
            </div>
            <p className="about-sub-requirements space-top">
              Maximum {taglineCount} characters.
            </p>
            <p className="about-sub-requirements">
              Your tagline should be a catchy summary promoting yourself.
            </p>
            {formik.touched.tagline &&
            formik.errors.tagline &&
            formik.touched.select &&
            formik.errors.select ? (
              <span className="error make-profile-er">
                {formik.errors.tagline}
              </span>
            ) : null}
          </Col>
          <p className="about-middle">or</p>
          {/* ------------- second input-------------- */}
          <Col className="custom-gutter">
            <div className="input-field input-wrapper">
              {/* --------------------- select input -------------*/}
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">Select</Form.Label>
                  <Select
                    id="aboutUs"
                    name="aboutUs"
                    isClearable
                    className="select-new target2"
                    isDisabled={
                      formik.values.tagline?.length > 0 ? true : false
                    }
                    // defaultValue="default"
                    // value={formik.values.select}
                    options={options}
                    // menuIsOpen={true}
                    onChange={(selectedOption) => {
                      setSelectValue(selectedOption?.value);

                      formik.setFieldValue("select", selectedOption?.value);
                    }}
                    placeholder={
                      formik.values.select ? formik.values.select : "Select..."
                    }
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      {/* ------------------------------------------------row twp -------------------------------- */}
      <div className="tagline-section underline">
        <div className="bio-head-wrap">
          <h6 className="heading">Biography</h6>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 50, hide: 50 }}
            overlay={renderTooltip}
          >
            <img className="bio-head-img" src={infoIcon} alt="" />
          </OverlayTrigger>
        </div>
        <Row className="custom-row row">
          <Col className="custom-gutter">
            <div className="input-field input-wrapper full-row">
              {/* --------------------- text area input -------------*/}
              <Form className="remaining-text-wrap">
                <Form.Group className="form-group">
                  <Form.Control
                    id="aboutUs"
                    name="aboutUs"
                    className="txt-area input-att form-control "
                    type="textarea"
                    as="textarea"
                    rows={3}
                    value={formik.values.biography}
                    onChange={(e) => {
                      let word = e.target.value;
                      let char_count = word.split(" ");
                      char_count.length < 250 &&
                        formik.setFieldValue("biography", e.target.value);
                      setTextFieldCount(250 - char_count.length);
                    }}
                  />
                  <p className="remaining-text">
                    {textFieldCount} characters remaining
                  </p>
                </Form.Group>
              </Form>
            </div>
            {formik.touched.biography && formik.errors.biography ? (
              <span className="error make-profile-er">
                {formik.errors.biography}
              </span>
            ) : null}
          </Col>
        </Row>
      </div>
      {/* ------------------------------------------------row three -------------------------------- */}
      {/*-------------------------- video-biography -section ---------------------  */}
      <div className="video-grapy">
        <div className="bio-head-wrap">
          <h6 className="heading">Video Biography</h6>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 50, hide: 50 }}
            overlay={renderTooltip}
          >
            <img className="bio-head-img" src={infoIcon} alt="" />
          </OverlayTrigger>
        </div>
        <Row className="custom-row row row-relative">
          {/* -------------video biography -----------------------  */}
          <Col className="custom-gutter">
            <label htmlFor="#" className="input-field  contact-input-gap">
              Choose a video file to upload.
            </label>
            <div className="bio-low-wrap">
              <label
                htmlFor="files"
                className={
                  `button-primary custom-property ` +
                  (formik.values.video_link?.length > 0 ? "button-hover" : "")
                }
                // className="button-primary custom-property"
                style={{
                  backgroundColor:
                    formik.values.video_link?.length > 0 ? "#d3d3d3" : "",
                }}
              >
                upload video
              </label>
              {!formik.values.video_link?.length > 0 && (
                <input
                  id="files"
                  type="file"
                  className="hidden-input"
                  value={formik.values.video_biography}
                  onChange={(e) => {
                    formik.setFieldValue("video_biography", e.target.value);
                  }}
                />
              )}
              {/*     <div>
                <Dropzone
                  PreviewComponent={null}
                  // SubmitButtonComponent={null}
                  onChangeStatus={handleChangeStatus}
                  multiple={true}
                  // InputComponent={null}
                  maxSizeBytes="3145728"
                  accept="image/*,audio/*,video/*"
                  inputWithFilesContent="Add File"
                  inputContent={<p className="drag-info">Upload Video</p>}
                />
              </div>*/}
              <div className="video-img-wrap">
                <img src={VideoIcon} alt="" />
              </div>
              <p className="video-description">Horizontal Video Only</p>
            </div>
            <p className="about-sub-requirements space-top">
              Maximum {taglineCount} characters.
            </p>
            {formik.touched.video_link && formik.errors.video_link ? (
              <span className="error make-profile-er">
                {formik.errors.video_link}
              </span>
            ) : null}
          </Col>
          {/* -------------video link -----------------------  */}
          <p className="about-middle">or</p>
          <Col className="custom-gutter">
            <div className="input-field  contact-input-gap">
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">
                    Paste a link to your video
                  </Form.Label>

                  {/* <img src={chainImage} alt="" />
                  <Form.Control className="input-att" type="text" id="house" /> */}
                  <div
                    className="custom-input-wrap"
                    style={{
                      backgroundColor:
                        formik.values.video_biography?.length > 0
                          ? "#d3d3d3"
                          : "",
                    }}
                  >
                    <img src={chainImage} alt="" />
                    <input
                      className="custom-input"
                      type="text"
                      name=""
                      id=""
                      value={formik.values.video_link}
                      disabled={
                        formik.values.video_biography?.length > 0 ? true : false
                      }
                      onChange={(e) => {
                        formik.setFieldValue("video_link", e.target.value);
                      }}
                    />
                  </div>
                  <Form.Label className="input-label paste-vid-label-spacing">
                    Learn how to upload videos to YouTube or Vimeo
                  </Form.Label>
                </Form.Group>
              </Form>
              {/* <InputGroup isDisabled={true} className="mb-3">
                <InputGroup.Text id="basic-addon1" className="form-group">
                  <img src={chainImage} alt="" srcset="" />
                </InputGroup.Text>
                <FormControl
                  aria-describedby="basic-addon1"
                  value={formik.values.video_link}
                  onChange={(e) => {
                    formik.setFieldValue("video_link", e.target.value);
                  }}
                />
              </InputGroup> */}
            </div>
          </Col>
        </Row>
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

export default AboutMe;
