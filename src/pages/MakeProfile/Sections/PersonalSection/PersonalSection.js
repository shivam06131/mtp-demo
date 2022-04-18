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

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import prevOne from "../../assets/Identification/img-prev-1.png";
import prevTwo from "../../assets/Identification/img-prev-2.png";
import prevThree from "../../assets/Identification/img-prev-3.png";
import prevFour from "../../assets/Identification/img-prev-4.png";

import PhoneInput from "react-phone-number-input";

const PersonalSection = () => {
  const [dateValue, setDateValue] = useState();
  const [preview, setPreview] = useState(profilePicPrev);
  const [src, setSrc] = useState("");
  const [value, setValue] = useState();

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    console.log(files.map((f) => f.meta));
  };

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
                  <Col>
                    <h6 className="heading">Personal Details</h6>
                    {/* ------------left side ------------------- */}

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
                  </Col>
                  <Col>
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
                  <Col className="column-one">
                    <div className="label-span-wrap">
                      <label htmlFor="firstName">Identification*</label>
                      <img src={infoIcon} alt="" />
                    </div>
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmit}
                      accept="image/*,audio/*,video/*"
                      inputContent={
                        <p className="drag-info">
                          Drag & drop identification file here to upload <br />
                          or <br /> <span>Choose a file</span> to upload
                        </p>
                      }
                    />
                  </Col>
                  <Col>
                    <Row className="identification-row-gap">
                      <Col className="col-gap ">
                        <img src={prevOne} alt="" srcset="" />

                        <img
                          src={prevTwo}
                          className="img-gap"
                          alt=""
                          srcset=""
                        />
                      </Col>
                    </Row>
                    <Row className="custom-row">
                      <Col className="col-gap">
                        <img src={prevThree} alt="" srcset="" />

                        <img
                          src={prevFour}
                          className="img-gap"
                          alt=""
                          srcset=""
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              {/*---------------Contact Details section -------------  */}
              <div className="contact">
                <div className="label-span-wrap">
                  <label htmlFor="firstName">Contact Details</label>
                </div>
                <Row class="row">
                  <Col>
                    {/*---------------input 1 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            City / Town
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 2 -------------  */}
                    <div className="input-field contact-input-gap">
                      <Form>
                        <Form.Group className="form-group ">
                          <Form.Label className="input-label">
                            Postal / Zip Code / PO Box
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 3 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            House / Apartment Number
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*--------------- -------------  */}
                  </Col>
                  <Col className="col-gaps">
                    {/*---------------input 1 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Street / Road Name
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 2 -------------  */}
                    <div className="input-field  contact-input-gap">
                      <Form>
                        <Form.Group className="form-group">
                          <Form.Label className="input-label">
                            Country*
                          </Form.Label>
                          <Form.Control className="input-att" type="text" />
                        </Form.Group>
                      </Form>
                    </div>
                    {/*---------------input 3 -------------  */}
                    <div className="input-field contact-input-gap">
                      <label className="input-label" htmlFor="pohone">
                        Mobile Number
                      </label>
                      <div className="custom-phone">
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
                            // formik.values.phone = selectedOption;
                            return setValue(selectedOption);
                          }}
                        />
                      </div>
                    </div>
                    {/*--------------- -------------  */}
                  </Col>
                </Row>
              </div>
              {/*---------------Contact Details section -------------  */}
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
