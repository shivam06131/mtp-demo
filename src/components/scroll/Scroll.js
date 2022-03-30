import React, { useEffect, useState } from "react";
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

const Scroll = () => {
  const [display, setDisplay] = useState();

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
        {/*   ---------- ------------*/}
      </div>
    </div>
  );
};

export default Scroll;
