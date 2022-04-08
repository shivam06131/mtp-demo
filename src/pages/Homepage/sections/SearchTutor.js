import React from "react";
import tutorImage from "../.../../../../assets/tutor/Group 1522.png";
import search from "../.../../../../assets/scroll/search/search icon.png";
import location from "../.../../../../assets/scroll/search/location icon.png";
import web from "../.../../../../assets/scroll/search/web icon.png";
import arrowRight from "../.../../../../assets/scroll/search/arrow.png";

const SearchTutor = ({ display, displaySearchTwo }) => {
  return (
    <div className="tutor">
      <div className="container tutor-wrap" id="tutor-search">
        <div className="tutor-left">
          <h4>Search your next tutor</h4>
          <p>
            Connecting learners with tutors and educational resources around the
            world. My Tutor Point hosts the best tutors in the world and
            connects them to the students who require a high standard learning
            experience for a reasonable price.
          </p>
        </div>
        <div className="tutor-right">
          <img src={tutorImage} alt="" />
        </div>
      </div>
      {/*   ---------- search tutor ------------*/}

      <div className="container">
        <div
          className="search search-tutor search-stick-bottom"
          style={{
            borderRadius: display ? "0px" : "0px 35px 35px 0px",
            opacity: (display || displaySearchTwo) && "1",
            visibility: (display || displaySearchTwo) && "visible",
            position: displaySearchTwo && "static",
            height: display ? "85px" : "70px",
            transition: "all 200ms",
          }}
          // id="search"
        >
          <div className="container search-center container-tutor ">
            <div
              className="search-form-wrap"
              style={{
                minWidth: displaySearchTwo ? "94%" : "60%",
                transitionProperty: "width flex ",
                transition: "all 400ms",
              }}
            >
              <div className="search-sub">
                <img src={search} alt="" />
                <input
                  type="text"
                  className="search-input sub"
                  placeholder="Choose a subject"
                />
              </div>
              <div className="search-sub">
                <img src={location} alt="" />
                <input
                  type="text"
                  className="search-input location"
                  placeholder="Enter your location or address"
                />
              </div>
              <img src={web} alt="" className="web-icon" />
            </div>
            <img src={arrowRight} alt="" className="arrow-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTutor;
