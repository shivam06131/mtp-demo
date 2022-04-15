import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DatePicker from "react-date-picker";
import "./PersonalSection.css";
import CalenderIcon from "../../assets/personalSection/calendar.png";
import infoIcon from "../../assets/personalSection/info_icon.png";
import Avatar from "react-avatar-edit";
import profilePic from "../../assets/personalSection/Profile pic.png";
import profilePicPrev from "../../assets/personalSection/Profile Photo preview - empty preview.png";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PersonalSection = () => {
  const [dateValue, setDateValue] = useState();
  const [preview, setPreview] = useState(profilePicPrev);
  const [src, setSrc] = useState("");

  return (
    <div className="personal-sec-wrap">
      <div className="container">
        <Accordion className="acc" defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="acc-item">
            <Accordion.Header className="acc-header">
              Personal Information
            </Accordion.Header>
            <Accordion.Body className="acc-body">
              {/*---------------personal section -------------  */}
              <h6 className="heading">Personal Details</h6>
              <div className="personal-section">
                {/* ------------left side ------------------- */}
                <div className="left">
                  {/* ------------box one ------------------- */}
                  <div className="input-wrap box-one p-0">
                    <div className="input-field  small-field">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            First Name*
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                    <div className="input-field  small-field">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Last Name*
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                  {/* ------------box 2 ------------------- */}
                  <div className="input-wrap box-one">
                    <div className="input-field  small-field">
                      <label for="huey" className="input-label">
                        Gender*
                      </label>
                      <DatePicker
                        onChange={setDateValue}
                        value={dateValue}
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYYY"
                        format="dd/MM/yyyy"
                        calendarIcon={<CalenderIconComponent />}
                      />
                    </div>
                    <div className="input-field radio-input  small-field">
                      <label className="input-label">Gender*</label>
                      <input
                        type="radio"
                        id="gender"
                        name="gender"
                        value="huey"
                        checked
                      />
                    </div>
                  </div>
                  {/* ------------ full width input ------------------- */}
                  <div className="input-field input-wrap">
                    <Form>
                      <Form.Group className="form-group">
                        <Form.Label className="input-label">
                          ID Number*
                        </Form.Label>
                        <img src={infoIcon} alt="" />
                        <Form.Control className="input-att" type="text" />
                      </Form.Group>
                    </Form>
                  </div>
                </div>
                {/* ------------right side ------------------- */}
                <div className="right-box">
                  <div className="label-span-wrap">
                    <label htmlFor="firstName">Profile Photo*</label>
                    <img src={infoIcon} alt="" />
                  </div>
                  <div className="avatar-wrap">
                    <Avatar
                      className="input-avatar"
                      width={227}
                      height={208}
                      onCrop={(prev) => setPreview(prev)}
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
                    <img className="crop-img " src={preview} alt="Preview" />
                  </div>
                </div>
              </div>
              {/*---------------Identification section -------------  */}
              <div className="identification">
                <Row>
                  <Col>
                    <div className="label-span-wrap">
                      <label htmlFor="firstName">Identification*</label>
                      <img src={infoIcon} alt="" />
                    </div>
                  </Col>
                  <Col>2 of 1</Col>
                </Row>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

const CalenderIconComponent = () => {
  return <img src={CalenderIcon} alt="" />;
};
const ProfileIconComponent = () => {
  return <img src={profilePic} alt="" />;
};

export default PersonalSection;
