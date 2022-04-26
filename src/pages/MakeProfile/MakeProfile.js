import { Accordion } from "react-bootstrap";
// import AboutMe from "./Sections/AboutMe/AboutMe";
import AboutMe from "./Sections/AboutMe/AboutMe";
import PersonalSection from "./Sections/PersonalSection/PersonalSection";
import "./Sections/PersonalSection/PersonalSection.css";

import GridLoader from "react-spinners/GridLoader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MakeProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: "GET_PERSONAL_INFORMATION" });
  }, []);

  const override = {
    // color: "#c6521e",
  };

  const loading_data = useSelector((state) => state.personal_data_loader);

  useEffect(() => {
    !loading_data && setLoading(false);
  }, [loading_data]);

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
        }}
      >
        <GridLoader css={override} color={"#c6521e"} size={50} />;
      </div>
    );
  }

  return (
    <div>
      {!loading && (
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
      )}
    </div>
  );
};

export default MakeProfile;
