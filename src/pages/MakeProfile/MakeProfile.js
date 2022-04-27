import { Accordion } from "react-bootstrap";
// import AboutMe from "./Sections/AboutMe/AboutMe";
import AboutMe from "./Sections/AboutMe/AboutMe";
import PersonalSection from "./Sections/PersonalSection/PersonalSection";
import "./Sections/PersonalSection/PersonalSection.css";

const MakeProfile = () => {
  return (
    <div>
      <div className="personal-sec-wrap">
        <div className="container">
          <Accordion className="acc" defaultActiveKey="0">
            {/*--------------------------item 1 ---------- */}
            <Accordion.Item eventKey="0" className="acc-item">
              <Accordion.Header className="acc-header">
                Personal Information
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                <PersonalSection />
              </Accordion.Body>
            </Accordion.Item>
            {/*--------------------------item 2 ---------- */}
            <Accordion.Item eventKey="1" className="acc-item item-space">
              <Accordion.Header className="acc-header">
                About Me
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                <AboutMe />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MakeProfile;
