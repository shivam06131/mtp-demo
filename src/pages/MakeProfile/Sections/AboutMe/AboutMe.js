import React from "react";
import { Accordion } from "react-bootstrap";
import "./aboutMe.css";
import "../PersonalSection/PersonalSection.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import infoIcon from "../../assets/personalSection/info_icon.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import VideoIcon from "../../assets/aboutMe/face.png";

const AboutMe = () => {
  return (
    <div>
      <h6 className="heading">Tag Line</h6>
      <div className="about-upperSection underline">
        <Row className="custom-row full-row">
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
                    id="tag_line"
                    name="tag_line"
                    // onChange={formik.handleChange}
                    // value={formik.values.first_name}
                  />
                </Form.Group>
              </Form>
            </div>
            <p className="about-sub-requirements space-top">
              Maximum 50 characters.
            </p>
            <p className="about-sub-requirements">
              Your tagline should be a catchy summary promoting yourself.
            </p>
          </Col>
          {/* ------------- second input-------------- */}
          <Col className="custom-gutter">
            <div className="input-field input-wrapper">
              {/* --------------------- select input -------------*/}
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">Select</Form.Label>
                  <Form.Control
                    className="input-att form-control"
                    type="text"
                    id="first_name"
                    name="first_name"
                    // onChange={formik.handleChange}
                    // value={formik.values.first_name}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      {/*-------------------------- tagline-section ---------------------  */}
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
              <Form>
                <Form.Group className="form-group">
                  <Form.Control
                    className="input-att form-control"
                    type="textarea"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      {/*-------------------------- video-biography -section ---------------------  */}
      <div className="video-graphy">
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
        <Row className="custom-row row">
          <Col className="custom-gutter">
            <label htmlFor="#" className="input-field  contact-input-gap">
              Choose a video file to upload.
            </label>
            <div className="bio-low-wrap">
              <button className="button-primary custom-property">
                upload video
              </button>
              <div className="video-img-wrap">
                <img src={VideoIcon} alt="" />
              </div>
              <p className="video-description">Horizontal Video Only</p>
            </div>
          </Col>
          <Col className="custom-gutter">
            <div className="input-field  contact-input-gap">
              <Form>
                <Form.Group className="form-group">
                  <Form.Label className="input-label">
                    Paste a link to your video
                  </Form.Label>
                  <Form.Control className="input-att" type="text" id="house" />
                  <Form.Label className="input-label paste-vid-label-spacing">
                    Learn how to upload videos to YouTube or Vimeo
                  </Form.Label>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
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
