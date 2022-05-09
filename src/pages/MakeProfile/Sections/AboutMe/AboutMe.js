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
import { useDispatch } from "react-redux";

const AboutMe = () => {
  const [taglineCount, setTaglineCount] = useState(50);
  const [textFieldCount, setTextFieldCount] = useState(700);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_ABOUT_ME" });
  }, []);

  const options = [
    { value: "facebook", label: "facebook" },
    { value: "instagram", label: "instagram" },
    { value: "other", label: "other" },
    { value: "Reliable Tutor", label: "Reliable Tutor" },
  ];

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
    },
    ["tagline", "select"]
  );

  const formik = useFormik({
    initialValues: {
      tagline: "",
      select: "",
      biography: "",
      video_biography: "",
      video_link: "",
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
      // console.log("payload_object", payload_object);
    },
    validationSchema: schema,
  });

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
                      setTaglineCount(50 - word.length);
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
                    placeholder="Select..."
                    className="select-new target2"
                    isDisabled={
                      formik.values.tagline?.length > 0 ? true : false
                    }
                    options={options}
                    // menuIsOpen={true}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("select", selectedOption?.value);
                    }}
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
                      word.length < 700 &&
                        formik.setFieldValue("biography", e.target.value);
                      setTextFieldCount(700 - word.length);
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
                        formik.values.video_biography.length > 0
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
                        formik.values.video_biography.length > 0 ? true : false
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
