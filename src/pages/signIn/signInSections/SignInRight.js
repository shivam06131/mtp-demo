import React from "react";
import studentImg from "../assets/right-section/student.png";
import parentImg from "../assets/right-section/parents.png";
import tutortImg from "../assets/right-section/tutor.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const SigninRight = () => {
  return (
    <div className="signIn-form-wrap">
      <div className="form-top">
        <a className="form-passive" href="#">
          <img src={studentImg} alt="" srcset="" />
          <p>student</p>
        </a>
        <a className="form-passive" href="#">
          <img src={parentImg} alt="" srcset="" />
          <p>Parents</p>
        </a>
        <a className="form-passive" href="#">
          <img src={tutortImg} alt="" srcset="" />
          <p>tutor</p>
        </a>
      </div>
      {/* <Row>
        <Col className="form-input-wrap">
          <input type="text" placeholder="First Name" />
        </Col>
        <Col className="form-input-wrap input-end">
          <input type="text" placeholder="Last Name" />
        </Col>
      </Row>
      <Col className="form-input-wrap ">
        <input type="email" className="w-full" placeholder="Email Address" />
      </Col>
      <Col className="form-input-wrap ">
        <input type="number" className="w-full" placeholder="Mobile Number" />
      </Col>
      <Col className="form-input-wrap ">
        <input
          type="text"
          className="w-full"
          placeholder="Where did you hear about us?"
        />
  </Col> */}
      <div className="form-wrap">
        <Form>
          <Row className="mb-3 top">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                className="form-controls"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="input-end"
            >
              <Form.Control
                className="form-controls"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SigninRight;
