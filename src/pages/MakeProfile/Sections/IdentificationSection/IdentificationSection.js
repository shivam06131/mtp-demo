import React, { useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import infoIcon from "../../assets/personalSection/info_icon.png";

import prevOne from "../../assets/Identification/img-prev-1.png";
import prevTwo from "../../assets/Identification/img-prev-2.png";
import prevThree from "../../assets/Identification/img-prev-3.png";
import prevFour from "../../assets/Identification/img-prev-4.png";
import Dropzone from "react-dropzone-uploader";

import CloseIcon from "../../assets/Identification/close.png";

const IdentificationSection = ({ formik, image, setImg }) => {
  const [identificationImage, setIdentificationImage] = useState([]);

  const getUploadParams = ({ meta }) => {
    // console.log("getUploadParams meta", meta);
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    // !image.includes(meta.name) && setImg([...image, meta.name]);
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setIdentificationImage([...identificationImage, reader.result]);

        formik.setFieldValue("identification_arr", [
          ...formik.values.identification_arr,
          reader.result,
        ]);
        // setImg([...image, reader.result]);

        formik.setFieldValue(
          "identification",
          formik.values.identification_arr[0]
        );
        formik.setFieldValue(
          "identification_2",
          formik.values.identification_arr[1]
        );
      };
    }

    if (status === "removed") {
      formik.setFieldValue("identification_photo", "");
    }
  };

  return (
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
            multiple={true}
            maxSizeBytes="3145728"
            classNames="dropzoneDisabled"
            accept="image/*,audio/*,video/*"
            inputWithFilesContent="Add File"
            inputContent={
              <p className="drag-info">
                Drag & drop identification file here to upload <br />
                or <br /> <span>Choose a file</span> to upload
              </p>
            }
          />
          {formik.touched.identification && formik.errors.identification ? (
            <span className="error make-profile-er">
              {formik.errors.identification}
            </span>
          ) : null}
          {image?.length !== 0 &&
            image?.map((item, index) => {
              let arr = item.split("profile/");
              return (
                <div key={item.arr}>
                  <span className="error make-profile-er">{arr[2]}</span>{" "}
                  <img
                    onClick={() =>
                      setImg(image.filter((item, ind) => ind !== index))
                    }
                    src={CloseIcon}
                    alt=""
                    className="close-img"
                  />
                  <br></br>
                </div>
              );
            })}
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

export default IdentificationSection;
