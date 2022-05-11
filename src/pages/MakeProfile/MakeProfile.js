import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import AboutMe from "./Sections/AboutMe/AboutMe";
import AboutMe from "./Sections/AboutMe/AboutMe";
import PersonalSection from "./Sections/PersonalSection/PersonalSection";
import "./Sections/PersonalSection/PersonalSection.css";
import Qualification from "./Sections/Qualification/Qualification";

const MakeProfile = () => {
  const [accordionStatus, setAccordionStatus] = useState(["personal_section"]);
  const [currentAccordion, setCurrentAccordion] = useState();
  const acc_status = useSelector((state) => state.acc_status);
  const open_next_accordion = useSelector((state) => state.open_next_accordion);
  const dispatch = useDispatch();

  useEffect(() => {
    let lastOpened = localStorage.getItem("current_accordion");

    !lastOpened &&
      localStorage.setItem("current_accordion", "personal_section");

    lastOpened = localStorage.getItem("current_accordion");

    lastOpened
      ? setCurrentAccordion(lastOpened)
      : setCurrentAccordion("personal_section");

    dispatch({ type: "UPDATE_ACCORDION_STATUS", payload: "personal_section" });
    dispatch({ type: "GET_PERSONAL_INFORMATION" });

    // !currentAccordion.includes(lastOpened) && setCurrentAccordion(lastOpened);
    setAccordionStatus(JSON.parse(localStorage.getItem("accordionStatus")));
  }, []);

  useEffect(() => {
    let local_accordionStatus_data = localStorage.getItem("accordionStatus");

    !local_accordionStatus_data?.includes(acc_status) &&
      localStorage.setItem(
        "accordionStatus",
        JSON.stringify(
          [...accordionStatus, ...acc_status].flat(2).filter((item, index) => {
            return accordionStatus.indexOf(item) !== index;
          })
        )
      );
    !accordionStatus.includes(...acc_status) && setAccordionStatus(acc_status);
  }, [acc_status]);

  useEffect(() => {
    open_next_accordion && setCurrentAccordion(open_next_accordion);
    open_next_accordion &&
      localStorage.setItem("current_accordion", open_next_accordion);
  }, [open_next_accordion]);

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
                  if (acc_status?.includes("personal_section")) {
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
                acc_status?.includes("about_section") && "change-background"
              }`}
              disabled={!acc_status?.includes("about_section")}
            >
              <Accordion.Header
                className="acc-header"
                onClick={(e) => {
                  e.stopPropagation();
                  if (acc_status?.includes("about_section")) {
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
              eventKey="qualifications and experience"
              className={`acc-item item-space  ${
                acc_status?.includes("qualifications and experience") &&
                "change-background"
              }`}
              disabled={!acc_status?.includes("qualifications and experience")}
            >
              <Accordion.Header
                className="acc-header"
                onClick={(e) => {
                  e.stopPropagation();
                  if (acc_status?.includes("qualifications and experience")) {
                    handleCurrentAccordion("qualifications and experience");
                  }
                }}
              >
                qualifications and experience
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                <Qualification />
              </Accordion.Body>
            </Accordion.Item>
            {/*--------------------------item 4 ---------- */}
            <Accordion.Item
              eventKey="TEACHING PREFERENCES"
              className={`acc-item item-space  ${
                acc_status?.includes("TEACHING PREFERENCES") &&
                "change-background"
              }`}
              disabled={!acc_status?.includes("TEACHING PREFERENCES")}
            >
              <Accordion.Header
                className="acc-header"
                onClick={(e) => {
                  e.stopPropagation();
                  if (acc_status?.includes("TEACHING PREFERENCES")) {
                    handleCurrentAccordion("TEACHING PREFERENCES");
                  }
                }}
              >
                TEACHING PREFERENCES
              </Accordion.Header>
              <Accordion.Body className="acc-body ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus facere hic velit, quisquam vitae repellat assumenda
                minus explicabo esse saepe cum aliquam, voluptatem porro,
                molestias iusto provident facilis adipisci. Voluptate nesciunt
                deserunt iusto, aut quidem tempore quis voluptatibus
                reprehenderit aliquid eos, alias harum tenetur corporis saepe
                modi facere! Et, accusamus!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MakeProfile;
