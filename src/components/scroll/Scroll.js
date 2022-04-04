import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import "../scroll/scroll.css";
import "../banner/Banner.css";
import arrow from "../../assets/scroll/arrow.svg";
import search from "../../assets/scroll/search/search icon.png";
import location from "../../assets/scroll/search/location icon.png";
import web from "../../assets/scroll/search/web icon.png";
import arrowRight from "../../assets/scroll/search/arrow.png";

import light from "../../assets/banner/light.svg";
import live from "../../assets/banner/live tag.svg";
import imgOne from "../../assets/banner/imgOne.svg";
import imgTwo from "../../assets/banner/imgTwo.svg";

import logo from "../../assets/nav/logo.svg";
import "../navbar/Navbar.css";

import "../styles/price.css";
import priceIcon from "../../assets/price/price-icon.png";

import "../styles/learning.css";
import LearnOne from "../../assets/learning/learn-1.png";
import LearnTwo from "../../assets/learning/learn-2.png";
import LearnThree from "../../assets/learning/learn-3.png";

import "../styles/feature-tutor.css";

import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
// import Sonnet from "react-bootstrap/Sonnet";

const Scroll = () => {
  const [display, setDisplay] = useState();
  const dispatch = useDispatch();

  const video = useSelector((state) => state);
  let videoData;
  if (Array.isArray(video)) {
    [videoData] = video;
    console.log("videoData", videoData);
  }
  //scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (
        scrollTop + document.documentElement.clientHeight - 200 >
        document.getElementById("search").offsetTop
      ) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  //video
  useEffect(() => {
    dispatch({ type: "GET_VIDEO" });
  }, []);

  return (
    <div>
      <div>
        {/*   ----------navbar ------------*/}
        <div className="nav-wrapper">
          <div className="container nav">
            <div className="nav-left">
              <p className="explore-heading">Explore</p>
            </div>
            <div className="icon">
              <img src={logo} alt="" />
            </div>
            <div className="nav-right">
              <div className="nav-right-inner">
                <p className="dropdown">En / aed</p>
                <p>sign up</p>
              </div>
              <a href="#">log in</a>
            </div>
          </div>
        </div>
        {/*   ----------banner ------------*/}
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
        {/*   ----------scroll ------------*/}
        <div>
          <div className="scroll">
            <div className="container center">
              <h5>Scroll Quietly...</h5>
              <p>
                Emily, Dana, and Bilal are having an <span>algebra</span> class
                with the tutor
              </p>
              <img className="scroll-arrow" src={arrow} alt="" />
            </div>
          </div>
          <div className="search" id="search">
            <div className="container search-center">
              <div className="search-form-wrap">
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
        {/*   ----------search ------------*/}
        <div
          className="search search2"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            // right: "17px",
            width: "100%",
            opacity: display ? "1" : "0",
            // minHeight: display && "70px!important",
            transition: "200ms",
          }}
        >
          <div className="container search-center">
            <div className="search-form-wrap form-wrap-2">
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
        {/*   ----------price ------------*/}
        <div className="price">
          <div className="container">
            <div className="price-data-holder">
              <div className="price-icon">
                <img src={priceIcon} alt="" />
              </div>
              <div className="price-content">
                <h6>
                  My Tutor Point hosts the best tutors in the World and connects
                  them to the students who require a high standard learning
                  experience for a reasonable price.
                </h6>
                <p>learn more</p>
              </div>
            </div>
          </div>
        </div>
        {/*   ---------- Learning Platform ------------*/}
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
                  Dana Learns anytime anywhere she likes on the smart device of
                  her preference, it’s very convenient in her time-zone
                </p>
              </div>
              <div className="banner-item">
                <div className="banner-img-wrap">
                  <img src={LearnTwo} alt="" />
                </div>
                <p className="banner-body">
                  The ratings and comprehensive profile allows her to learn from
                  the most qualified tutor in the world which also includes
                  their priceless resources
                </p>
              </div>
              <div className="banner-item">
                <div className="banner-img-wrap">
                  <img src={LearnThree} alt="" />
                </div>
                <p className="banner-body">
                  She finds the sessions quite effective as the classes have
                  been designed for a real-time seamless learning experience &
                  her parents can see her progress on the application too.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*   ----------Featured Tutor  ------------*/}
        {videoData && (
          <div className="feature-tutor">
            <div className="feature-video">
              <video
                className="video"
                autoPlay
                muted
                src={videoData && videoData.tutor_of_the_week_video}
                preload="auto"
                loop
                // controls
              ></video>
              {/*<div className="video-detail">afdas</div> */}
              {/* <div className="container feature-banner-container">
                <div className="feature-banner ">
                  <h6>Our Featured Tutor of the Month</h6>
                </div>
              </div>*/}
            </div>
          </div>
        )}

        {/*   ---------- tabs ------------*/}

        {/*   ----------  ------------*/}
      </div>
    </div>
  );
};

export default Scroll;
