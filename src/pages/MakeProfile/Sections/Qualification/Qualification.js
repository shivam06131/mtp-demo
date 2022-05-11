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
import { ClipLoader } from "react-spinners";

const Qualification = () => {
  const [dateValue, setDateValue] = useState();
  const [qualificationInfo, setQualificationInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const dispatch = useDispatch();

  //! when component mounts
  useEffect(() => {
    dispatch({ type: "GET_QUALIFICATION" });
    dispatch({ type: "GET_QUALIFICATION_OPTIONS" });
  }, []);

  //! populating the input fields
  // useEffect(() => {
  //   console.log("qualificationInfo", qualificationInfo);
  //   qualificationInfo &&
  //     qualificationInfo?.college &&
  //     formik.setFieldValue("college", qualificationInfo.college);
  //   qualificationInfo?.currently_studing &&
  //     formik.setFieldValue("studying", qualificationInfo.currently_studing);
  //   qualificationInfo?.file &&
  //     formik.setFieldValue("image", qualificationInfo.file);
  //   // qualificationInfo.id && formik.setFieldValue("id", qualificationInfo.id);
  //   qualificationInfo?.qualification_id &&
  //     formik.setFieldValue(
  //       "select",
  //       dropdownOptions[qualificationInfo?.qualification_id - 1]?.value
  //     ) &&
  //     formik.setFieldValue("select_id", qualificationInfo.qualification_id);
  // }, [qualificationInfo, dropdownOptions]);

  //! getting and setting the qualification_info data to the state
  const qualification_info = useSelector((state) => state.qualification_info);

  useEffect(() => {
    qualification_info?.data?.user_qualifications?.length > 0 &&
      setQualificationInfo(qualification_info?.data?.user_qualifications[0]);
  }, [qualification_info]);

  //! getting and setting the qualification_options data to the state
  const qualification_options = useSelector(
    (state) => state.qualification_options
  );

  useEffect(() => {
    let drpOpt = [];
    qualification_options &&
      qualification_options?.data?.qualifications &&
      qualification_options?.data?.qualifications.map((item) =>
        drpOpt.push({
          value: item.en_name,
          label: item.en_name,
          ...item,
        })
      );
    setDropdownOptions(drpOpt);
  }, [qualification_options]);

  //! loading state
  const qualification_loader = useSelector(
    (state) => state.qualification_loader
  );
  useEffect(() => {
    qualification_loader === false && setLoading(false);
  }, [qualification_loader]);

  //! setting up the dropzone value
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formik.setFieldValue("image", reader.result);
      };
    }
  };

  //! yup form validation
  const validate = Yup.object({
    college: Yup.string().required("Enter your University or College."),
    select: Yup.string().required("Select your qualification."),
    image: Yup.string().required(
      "Upload the certificate for your qualification."
    ),
  });
  const formInitialValues = {
    college: qualificationInfo ? qualificationInfo.college : "",
    select: qualificationInfo
      ? dropdownOptions[qualificationInfo?.qualification_id - 1]?.value
      : "",
    dob: "",
    studying: qualificationInfo ? qualificationInfo.currently_studing : false,
    image: qualificationInfo ? qualificationInfo.file : "",
    select_id: qualificationInfo ? qualificationInfo.qualification_id : "",
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,

    //! validation formik with yup
    validationSchema: validate,

    //! handling formik submit
    onSubmit: (values) => {
      console.log("submitting", values);
      let editFormVariables = {
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
            id: qualificationInfo?.id ? qualificationInfo.id : null,
            certified: false,
            college: values.college,
            graduated_date: values.dob === "" ? null : values.dob,
            currently_studing: values.studying,
            file: values.image,
            qualification_id: values.select_id,
          },
        ],
      };
      dispatch({ type: "UPDATE_QUALIFICATION", payload: editFormVariables });
    },
  });
  console.log("formik", formik);

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

  //! date change handler
  const handleDateChange = (val) => {
    setDateValue(val);
    val = String(val);
    formik.setFieldValue("dob", val);
  };

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
                  options={dropdownOptions}
                  onChange={(selectedOption) => {
                    // console.log("selectedOption", selectedOption);
                    formik.setFieldValue("select", selectedOption?.value);
                    formik.setFieldValue("select_id", selectedOption?.id);
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
                cd
              />
            </div>
            <div className="input-field  small-field align-content">
              <Form>
                <Form.Check
                  className="custom-switch input-label"
                  type="switch"
                  label="Currently Studying"
                  id="studying"
                  name="studying"
                  checked={formik.values.studying}
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
            disabled={formik?.values?.studying ? true : false}
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
