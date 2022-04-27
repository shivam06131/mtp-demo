import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

const ContactSection = ({ formik, value, setValue }) => {
  return (
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
  );
};

export default ContactSection;
