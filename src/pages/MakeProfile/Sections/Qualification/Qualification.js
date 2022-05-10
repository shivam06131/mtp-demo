import React, { useEffect, useState } from "react";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import DatePicker from "react-date-picker";
import infoIcon from "../../assets/personalSection/info_icon.png";
import "./Qualification.css";
import "../PersonalSection/PersonalSection.css";
import Select from "react-select";

import CalenderIcon from "../../assets/personalSection/calendar.png";
import Dropzone from "react-dropzone-uploader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const Qualification = () => {
  const [dateValue, setDateValue] = useState();
  const [qualificationInfo, setQualificationInfo] = useState();
  const dispatch = useDispatch();

  console.log("qualificationInfo", qualificationInfo);

  useEffect(() => {
    dispatch({ type: "GET_QUALIFICATION" });
  }, []);

  //! getting and setting the about me data to the state
  const about_me_data = useSelector((state) => state.about_me_data);
  useEffect(() => {
    about_me_data && setQualificationInfo(about_me_data.data.about_me);
  }, [about_me_data]);

  const handleDateChange = (val) => {
    setDateValue(val);
    val = String(val);
    formik.setFieldValue("dob", val);
  };

  const options = [
    { value: "phD", label: "phD" },
    { value: "Doctorate", label: "Doctorate" },
    { value: "A Level", label: "A Level" },
  ];

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formik.setFieldValue("image", reader.result);
      };
    }
  };

  const validate = Yup.object({
    college: Yup.string().required("Enter your University or College."),
    select: Yup.string().required("Select your qualification."),
    image: Yup.string().required(
      "Upload the certificate for your qualification."
    ),
  });

  const formik = useFormik({
    initialValues: {
      college: "",
      select: "",
      dob: "",
      studying: false,
      image: "",
    },
    validationSchema: validate,

    onSubmit: (values) => {
      console.log("clicked");
      let count = 1;
      let countValue;
      for (let x of options) {
        if (x.value === values.select) {
          countValue = count;
        }
        count++;
      }

      let payload_object = {
        deleted_user_experiences: [],
        deleted_user_qualifications: [],
        teaching_experience: "",
        user_experiences: [
          {
            id: null,
            start_date: null,
            end_date: null,
            organization: "",
            position: "",
          },
        ],
        user_qualifications: [
          {
            id: null,
            certified: false,
            college: values.college,
            graduated_date: values.dob,
            currently_studing: values.studying,
            file: values.image,
            qualification_id: countValue,
          },
        ],
      };
      dispatch({ type: "UPDATE_QUALIFICATION", payload: payload_object });
      //   console.log("payload_object", payload_object);
    },
  });

  return (
    <div className="qualification-wrap">
      <div className="bio-head-wrap">
        <h6 className="heading">Qualifications and Certifications</h6>
        <OverlayTrigger
          placement="auto"
          delay={{ show: 50, hide: 50 }}
          overlay={renderTooltip}
        >
          <img className="bio-head-img" src={infoIcon} alt="" />
        </OverlayTrigger>
      </div>
      <Row className="custom-row">
        <Col className="custom-gutter">
          {/* -------------------- college ------------------------ */}
          <div className="input-field input-wrapper">
            <Form>
              <Form.Group className="form-group">
                <Form.Label className="input-label">
                  University / College
                </Form.Label>
                <Form.Control
                  className="input-att form-control"
                  type="text"
                  id="college"
                  name="college"
                  value={formik.values.college}
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {formik.touched.college && formik.errors.college ? (
              <span className="error make-profile-er">
                {formik.errors.college}
              </span>
            ) : null}
          </div>
          {/* --------------------- select input -------------*/}
          <div className="input-field input-wrapper">
            <Form>
              <Form.Group className="form-group">
                <Form.Label className="input-label">Select</Form.Label>
                <Select
                  id="select"
                  name="select"
                  isClearable
                  className="select-new target2"
                  options={options}
                  onChange={(selectedOption) => {
                    formik.setFieldValue("select", selectedOption?.value);
                  }}
                  placeholder={
                    formik.values.select ? formik.values.select : "Select..."
                  }
                />
              </Form.Group>
            </Form>
            {formik.touched.select && formik.errors.select ? (
              <span className="error make-profile-er">
                {formik.errors.select}
              </span>
            ) : null}
          </div>
          {/* --------------------------- DOB and slider------------------------------------------ */}
          <div className="input-wrapper box-one">
            <div className="input-field  small-field date-field">
              <label htmlFor="dob" className="input-label">
                Date of Birth*
              </label>
              <DatePicker
                onChange={handleDateChange}
                value={dateValue}
                maxDate={new Date()}
                dayPlaceholder="DD"
                disabled={formik.values.studying}
                monthPlaceholder="MM"
                yearPlaceholder="YYYY"
                format="dd/MM/yyyy"
                id="dob"
                name="dob"
                calendarIcon={<CalenderIconComponent />}
              />
              {/* {formik.touched.dob && formik.errors.dob ? (
                  <span className="error make-profile-er">
                    {formik.errors.dob}
                  </span>
                ) : null} */}
            </div>
            <div className="input-field  small-field align-content">
              <Form>
                <Form.Check
                  className="custom-switch input-label"
                  type="switch"
                  label="Currently Studying"
                  id="studying"
                  name="studying"
                  value={formik.values.studying}
                  onChange={formik.handleChange}
                />
              </Form>
            </div>
          </div>
        </Col>
        {/* ----------------------------------dropzone--------------------------  */}
        <Col className="custom-gutter column-one top-spacing">
          <Dropzone
            onChangeStatus={handleChangeStatus}
            multiple={true}
            maxSizeBytes="3145728"
            // disabled={formik?.values?.house ? true : false}
            accept="image/*,audio/*,video/*"
            inputWithFilesContent="Add File"
            inputContent={
              <p className="drag-info">
                Drag & drop identification file here to upload <br />
                or <br /> <span>Choose a file</span> to upload
              </p>
            }
          />
          {formik.touched.image && formik.errors.image ? (
            <span className="error make-profile-er">{formik.errors.image}</span>
          ) : null}
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

export default Qualification;
