import React from "react";
import "./Banner.css";
import "../../index.css";
import light from "../../assets/banner/light.svg";
import live from "../../assets/banner/live tag.svg";
import imgOne from "../../assets/banner/imgOne.svg";
import imgTwo from "../../assets/banner/imgTwo.svg";

const Banner = () => {
  return (
    <div>
      <div className="banner">
        <div className="container">
          <div className="nav">
            <div className="left-banner">
              <img src={light} alt="" className="status-img" />
              <img src={imgOne} alt="" />
              <ul>
                <li>
                  <p>Dubai</p>
                  <p>3:30 PM</p>
                </li>
                <li>
                  <p>London</p>
                  <p>3:30 PM</p>
                </li>
                <li>
                  <p>Lahore</p>
                  <p>3:30 PM</p>
                </li>
              </ul>
            </div>
            <div className="right-banner">
              <img src={live} alt="" className="status-img" />
              <img src={imgTwo} alt="" />
              <ul>
                <li>
                  <p>Dubai</p>
                  <p>3:30 PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
