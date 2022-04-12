import React from "react";
// import "../styles/learning.css";
import LearnOne from "../../assets/learning/learn-1.png";
// import LearnOne from "../../assets/learning/learn-1.png";
import LearnTwo from "../../assets/learning/learn-2.png";
import LearnThree from "../../assets/learning/learn-3.png";
import "./learning.css";

const Learning = () => {
  return (
    <div className="learning-platform">
      <div className="container">
        <h5 className="learn-heading lear">
          The most personalized-distant learning platform
        </h5>
        <div className="learn-banner">
          <div className="banner-item">
            <div className="banner-img-wrap">
              <img src={LearnOne} alt="" />
            </div>
            <p className="banner-body">
              Dana Learns anytime anywhere she likes on the smart device of her
              preference, it’s very convenient in her time-zone
            </p>
          </div>
          <div className="banner-item">
            <div className="banner-img-wrap">
              <img src={LearnTwo} alt="" />
            </div>
            <p className="banner-body">
              The ratings and comprehensive profile allows her to learn from the
              most qualified tutor in the world which also includes their
              priceless resources
            </p>
          </div>
          <div className="banner-item">
            <div className="banner-img-wrap">
              <img src={LearnThree} alt="" />
            </div>
            <p className="banner-body">
              She finds the sessions quite effective as the classes have been
              designed for a real-time seamless learning experience & her
              parents can see her progress on the application too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
