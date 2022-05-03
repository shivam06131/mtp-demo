import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import TimezoneSelect from "react-timezone-select";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";

const AddressSection = ({
  setSameAsAbove,
  sameAsAbove,
  formik,
  setBillingMobile,
  setSelectedTimezone,
  selectedTimezone,
}) => {
  const teacher_data_updated = useSelector(
    (state) => state.teacher_data_updated
  );
  return (
    <div className="address">
      <div className="label-span-wrap">
        <label htmlFor="firstName">Billing Address</label>
        <div className="remember-pass rem-pass-address">
          <input
            onChange={() => setSameAsAbove((prev) => !prev)}
            type="checkbox"
            id="checkbox"
            name=""
            checked={sameAsAbove}
          />
          <label className="checkbox-label" htmlFor="checkbox">
            *Same as above
          </label>
        </div>
      </div>
      {/*   -----------------row --------------------*/}
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
                  id="billing_house"
                  value={
                    sameAsAbove
                      ? formik.values.house
                      : formik.values.billing_house
                  }
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {sameAsAbove ? (
              formik.touched.house && formik.errors.house
            ) : formik.touched.billing_house && formik.errors.billing_house ? (
              <span className="error make-profile-er">
                {sameAsAbove
                  ? formik.errors.house
                  : formik.errors.billing_house}
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
                  id="billing_city"
                  value={formik.values.billing_city}
                  disabled
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {formik.touched.billing_city && formik.errors.billing_city ? (
              <span className="error make-profile-er">
                {formik.errors.billing_city}
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
                  id="billing_postal"
                  value={
                    sameAsAbove
                      ? formik.values.postal
                      : formik.values.billing_postal
                  }
                  // value={formik.values.billing_postal}
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {sameAsAbove ? (
              formik.touched.postal && formik.errors.postal
            ) : formik.touched.billing_postal &&
              formik.errors.billing_postal ? (
              <span className="error make-profile-er">
                {sameAsAbove
                  ? formik.errors.postal
                  : formik.errors.billing_postal}
              </span>
            ) : null}
          </div>
          {/*---------------input 4 -------------  */}
          <div className="input-field  contact-input-gap">
            <label htmlFor="timezone" className="input-label">
              Set your Time Zone*
            </label>
            <TimezoneSelect
              // menuIsOpen={true}
              className="timezone-select"
              value={selectedTimezone}
              onChange={setSelectedTimezone}
            />
          </div>
          {formik.touched.billing_time_zone &&
          formik.errors.billing_time_zone ? (
            <span className="error make-profile-er">
              {formik.errors.billing_time_zone}
            </span>
          ) : null}
          {/*--------------- -------------  */}
        </Col>

        <Col className="col-gaps custom-gutter">
          {/*---------------input 5  -------------  */}
          <div className="input-field  contact-input-gap">
            <Form>
              <Form.Group className="form-group">
                <Form.Label className="input-label">
                  Street / Road Name
                </Form.Label>
                <Form.Control
                  className="input-att"
                  type="text"
                  id="billing_street"
                  // value={formik.values.billing_street}
                  value={
                    sameAsAbove
                      ? formik.values.street
                      : formik.values.billing_street
                  }
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {sameAsAbove ? (
              formik.touched.street && formik.errors.street
            ) : formik.touched.billing_street &&
              formik.errors.billing_street ? (
              <span className="error make-profile-er">
                {sameAsAbove
                  ? formik.errors.street
                  : formik.errors.billing_street}
              </span>
            ) : null}
          </div>
          {/*---------------input 6 -------------  */}
          <div className="input-field  contact-input-gap">
            <Form>
              <Form.Group className="form-group">
                <Form.Label className="input-label">Country*</Form.Label>
                <Form.Control
                  className="input-att"
                  type="text"
                  id="billing_country"
                  value={formik.values.billing_country}
                  disabled
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {formik.touched.billing_country && formik.errors.billing_country ? (
              <span className="error make-profile-er">
                {formik.errors.billing_country}
              </span>
            ) : null}
          </div>
          {/*---------------input 7 -------------  */}
          <div className="input-field contact-input-gap">
            <label className="input-label" htmlFor="phone">
              Mobile Number
            </label>
            <div className="custom-phone">
              <PhoneInput
                placeholder="Enter phone number"
                id="phone"
                name="phone"
                // value={billingMobile}
                value={
                  sameAsAbove
                    ? formik.values.mobile_number
                    : formik.values.billing_mobile_number
                }
                className="react-phone"
                onChange={(selectedOption) => {
                  formik.setFieldValue("billing_mobile_number", selectedOption);
                  if (sameAsAbove) {
                    return setBillingMobile(formik.values.mobile_number);
                  } else {
                    return setBillingMobile(selectedOption);
                  }
                }}
              />
            </div>
            {formik.touched.billing_mobile_number &&
            formik.errors.billing_mobile_number ? (
              <span className="error make-profile-er">
                {sameAsAbove
                  ? formik.errors.mobile_number
                  : formik.errors.billing_mobile_number}
              </span>
            ) : null}
          </div>
          {/*---------------input 8 -------------  */}
          <div className="input-field  contact-input-gap">
            <Form>
              <Form.Group className="form-group">
                <Form.Label className="input-label">
                  Your currency to receive payments is set as*
                </Form.Label>
                <Form.Control
                  className="input-att"
                  type="text"
                  id="billing_currency"
                  disabled
                  value={formik.values.billing_currency}
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Form>
            {formik.touched.billing_currency &&
            formik.errors.billing_currency ? (
              <span className="error make-profile-er">
                {formik.errors.billing_currency}
              </span>
            ) : null}
          </div>
          {/*----------------------------  */}
        </Col>
      </Row>
      <p className="contact-input-gap info">
        *These fields cannot be changed once profile is set-up. If you need to
        change these details, please contact us at
        <span>useraccounts@mytutorpoint.com</span> or <span> click here</span>
      </p>
      <div className="add-button-wrap">
        <button
          className="button-primary custom-property"
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Continue
        </button>
      </div>
      {teacher_data_updated && (
        <p
          style={{
            backgroundColor: "lightGreen",
            width: "30%",
            padding: "5px 15px",
            borderRadius: "5px",
          }}
        >
          data was updated successfully
        </p>
      )}
    </div>
  );
};

export default AddressSection;
