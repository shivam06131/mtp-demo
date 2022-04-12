import React from "react";
// import "./Banner.css";
// import "../../index.css";

import light from "../../assets/banner/light.svg";
import live from "../../assets/banner/live tag.svg";
import bannerVideo from "../../assets/banner/home_banner_video.mp4";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="banner-wrap"></div>
        <div className="banner-icons">
          <img src={light} alt="" className="status-img" />
          <img src={live} alt="" className="status-img live-img" />
        </div>
        <video
          src={bannerVideo}
          style={{ width: "100%" }}
          preload="auto"
          autoPlay
          loop
          muted
        ></video>
        <div className="banner-bottom">
          <div className="left-banner">
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
  );
};

export default Banner;
