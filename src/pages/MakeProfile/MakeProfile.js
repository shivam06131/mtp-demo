import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
// import AboutMe from "./Sections/AboutMe/AboutMe";
import AboutMe from "./Sections/AboutMe/AboutMe";
import PersonalSection from "./Sections/PersonalSection/PersonalSection";
import "./Sections/PersonalSection/PersonalSection.css";

const MakeProfile = () => {
  const [accordionStatus, setAccordionStatus] = useState(["personal_section"]);
  const [currentAccordion, setCurrentAccordion] = useState("personal_section");
  const acc_status = useSelector((state) => state.acc_status);
  const open_next_accordion = useSelector((state) => state.open_next_accordion);
  // const [lastOpened, setLastOpened] = useState();

  useEffect(() => {
    let lastOpened = localStorage.getItem("current_accordion");
    console.log("lastOpened === undefined", lastOpened);
    !lastOpened &&
      localStorage.setItem("current_accordion", "personal_section");

    lastOpened = localStorage.getItem("current_accordion");
    setCurrentAccordion(lastOpened);
  }, []);

  useEffect(() => {
    acc_status &&
      !accordionStatus.includes(acc_status) &&
      setAccordionStatus([...accordionStatus, acc_status].flat(2));
  }, [acc_status]);

  useEffect(() => {
    open_next_accordion && setCurrentAccordion(open_next_accordion);
    open_next_accordion &&
      localStorage.setItem("current_accordion", open_next_accordion);
  }, [open_next_accordion]);

  // console.log("accordionStatus", accordionStatus);
  // console.log("open_next_accordion", open_next_accordion);

  const handleCurrentAccordion = (current) => {
    setCurrentAccordion((prev) => (prev !== current ? current : ""));
    localStorage.setItem("current_accordion", current);
  };

  return (
    <div>
      <div className="personal-sec-wrap">
        <div className="container">
          <Accordion
            className="acc"
            // defaultActiveKey="personal_section"
            activeKey={currentAccordion}
          >
            {/*--------------------------item 1 ---------- */}
            <Accordion.Item
              eventKey="personal_section"
              className="acc-item active-acc"
            >
              <Accordion.Header
                className="acc-header"
                onClick={(e) => {
                  if (accordionStatus.includes("personal_section")) {
                    handleCurrentAccordion("personal_section");
                  }
                }}
              >
                Personal Information
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                <PersonalSection />
              </Accordion.Body>
            </Accordion.Item>
            {/*--------------------------item 2 ---------- */}
            <Accordion.Item
              eventKey="about_section"
              className={`acc-item item-space  ${
                accordionStatus.includes("about_section") && "change-background"
              }`}
              disabled={!accordionStatus.includes("about_section")}
            >
              <Accordion.Header
                className="acc-header"
                onClick={(e) => {
                  console.log("clicked");
                  e.stopPropagation();
                  if (accordionStatus.includes("about_section")) {
                    handleCurrentAccordion("about_section");
                  }
                }}
              >
                About Me
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                <AboutMe />
              </Accordion.Body>
            </Accordion.Item>
            {/*--------------------------item 3 ---------- */}
            <Accordion.Item
              eventKey="third_section"
              className={`acc-item item-space  ${
                accordionStatus.includes("third_section") && "change-background"
              }`}
              disabled={!accordionStatus.includes("third_section")}
            >
              <Accordion.Header
                className="acc-header"
                onClick={(e) => {
                  console.log("clicked");
                  e.stopPropagation();
                  if (accordionStatus.includes("third_section")) {
                    setCurrentAccordion((prev) =>
                      prev !== "third_section" ? "third_section" : ""
                    );
                  }
                }}
              >
                Third Section
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorum placeat praesentium aliquam cum ea rem eum in quisquam,
                repellendus, nisi dolorem odio? Ipsum laboriosam magnam commodi
                cupiditate libero id numquam deserunt, facilis iusto impedit
                temporibus. Provident voluptate officiis voluptas tempore, unde
                corporis laboriosam ipsum rem quasi. Facere ex voluptatum
                maiores!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MakeProfile;
