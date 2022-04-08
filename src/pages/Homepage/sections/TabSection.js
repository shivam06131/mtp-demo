import React from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import tabImgOne from "../.../../../../assets/tabs/one.png";
import tabImgTwo from "../.../../../../assets/tabs/two.png";
import tabImgThree from "../.../../../../assets/tabs/three.png";
import tabImgFour from "../.../../../../assets/tabs/four.png";
import tab_one from "../.../../../../assets/tabs/tab-one.png";

import { Fade } from "react-bootstrap";

const TabSection = () => {
  return (
    <div className="tabs">
      <div className="container">
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          transition={Fade}
        >
          <Row>
            <Col sm={6}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="nav-item">
                  <Nav.Link eventKey="first" className="tab-toggler">
                    <div className="tab-img-wrap">
                      <div className="tab-logo">
                        <img src={tabImgOne} alt="" />
                      </div>
                      <div className="tab-details">
                        <h6>HD Quality</h6>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis tristique lorem nulla.
                        </p>
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Nav.Link eventKey="second" className="tab-toggler">
                    <div className="tab-img-wrap">
                      <div className="tab-logo">
                        <img src={tabImgTwo} alt="" />
                      </div>
                      <div className="tab-details">
                        <h6>Professional Tutors</h6>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis tristique lorem nulla.
                        </p>
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Nav.Link eventKey="third" className="tab-toggler">
                    <div className="tab-img-wrap">
                      <div className="tab-logo">
                        <img src={tabImgThree} alt="" />
                      </div>
                      <div className="tab-details">
                        <h6>Learn anytime, anywhere</h6>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis tristique lorem nulla.
                        </p>
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Nav.Link eventKey="four" className="tab-toggler">
                    <div className="tab-img-wrap">
                      <div className="tab-logo">
                        <img src={tabImgFour} alt="" />
                      </div>
                      <div className="tab-details">
                        <h6>Responsive</h6>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis tristique lorem nulla.
                        </p>
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={6} className="tab-col-Two">
              <Tab.Content>
                <Tab.Pane eventKey="first" className="tab-result">
                  <img src={tab_one} alt="" className="tab-img" />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tab-result">
                  <img src={tab_one} alt="" className="tab-img" />
                </Tab.Pane>
                <Tab.Pane eventKey="third" className="tab-result">
                  <img src={tab_one} alt="" className="tab-img" />
                </Tab.Pane>
                <Tab.Pane eventKey="four" className="tab-result">
                  <img src={tab_one} alt="" className="tab-img" />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export default TabSection;
