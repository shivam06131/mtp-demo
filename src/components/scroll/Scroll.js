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

import "../styles/tabs.css";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
// import Sonnet from "react-bootstrap/Sonnet";
import tabImgOne from "../../assets/tabs/one.png";
import tabImgTwo from "../../assets/tabs/two.png";
import tabImgThree from "../../assets/tabs/three.png";
import tabImgFour from "../../assets/tabs/four.png";
import tab_one from "../../assets/tabs/tab-one.png";

import Rating from "react-rating";
import { Fade } from "react-bootstrap";

import "../styles/tutor.css";
import tutorImage from "../../assets/tutor/Group 1522.png";

import "../styles/footer.css";

import "../styles/footer-2.css";
import footer2_image from "../../assets/footer-2/social network.png";

import StartImg from "../../assets/video/star.png";
import StartImg2 from "../../assets/video/Path 983.png";

import bannerVideo from "../../assets/banner/home_banner_video.mp4";

const Scroll = () => {
  const [display, setDisplay] = useState();
  const [displaySearchTwo, setDisplaySearchTwo] = useState(false);
  const dispatch = useDispatch();

  const video = useSelector((state) => state);
  // const video2 = useSelector((state) => state.firstVideo);

  let videoData;
  if (Array.isArray(video)) {
    [videoData] = video;
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
  console.log(display);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (
        scrollTop + document.documentElement.clientHeight - 100 >
        document.getElementById("tutor-search").offsetTop
      ) {
        setDisplaySearchTwo(true);
        setDisplay(false);
      } else {
        setDisplaySearchTwo(false);
        // setDisplay(true);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  //video
  useEffect(() => {
    dispatch({ type: "GET_VIDEO" });
    // dispatch({ type: "GET_VIDEO_ONE" });
  }, []);

  return (
    <div>
      <div>
        {/*   ----------navbar ------------*/}
        <div className="nav-wrapper">
          <div className="container nav">
            <div className="nav-left">
              <a className="explore-heading">Explore</a>
            </div>
            <div className="icon">
              <img src={logo} alt="" />
            </div>
            <div className="nav-right">
              <div className="nav-right-inner">
                <a href="#" className="dropdown">
                  En / aed
                </a>
                <a href="#">sign up</a>
              </div>
              <a className="button-primary" href="#">
                log in
              </a>
            </div>
          </div>
        </div>
        {/*   ----------banner ------------*/}
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
            width: "100%",
            opacity: display ? "1" : "0",
          }}
        >
          <div className="container search-center">
            <div
              className="search-form-wrap"
              style={{
                minWidth: displaySearchTwo ? "100%" : "60%",
                transition: "500ms",
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
              <div className="video-details">
                <div className="container inner-container">
                  <div className="video-data-container">
                    <Rating
                      emptySymbol={<img src={StartImg} className="star-icon" />}
                      fullSymbol={<img src={StartImg2} className="star-icon" />}
                    />
                    <h6>Meet Miss McGrath</h6>
                    <p className="video-body">
                      Teaches Physics for Ordinary & Advanced Level Cambridge
                      International Examinations
                    </p>
                    <p>learn more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*   ---------- tabs ------------*/}
        <div className="tabs">
          <div className="container">
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey="first"
              transition={Fade}
            >
              <Row>
                <Col sm={6}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item className="nav-item">
                      <Nav.Link eventKey="first" className="tab-toggler">
                        <div className="tab-img-wrap">
                          <div className="tab-logo">
                            <img src={tabImgOne} alt="" />
                          </div>
                          <div className="tab-details">
                            <h6>HD Quality</h6>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Duis tristique lorem nulla.
                            </p>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                      <Nav.Link eventKey="second" className="tab-toggler">
                        <div className="tab-img-wrap">
                          <div className="tab-logo">
                            <img src={tabImgTwo} alt="" />
                          </div>
                          <div className="tab-details">
                            <h6>Professional Tutors</h6>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Duis tristique lorem nulla.
                            </p>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                      <Nav.Link eventKey="third" className="tab-toggler">
                        <div className="tab-img-wrap">
                          <div className="tab-logo">
                            <img src={tabImgThree} alt="" />
                          </div>
                          <div className="tab-details">
                            <h6>Learn anytime, anywhere</h6>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Duis tristique lorem nulla.
                            </p>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                      <Nav.Link eventKey="four" className="tab-toggler">
                        <div className="tab-img-wrap">
                          <div className="tab-logo">
                            <img src={tabImgFour} alt="" />
                          </div>
                          <div className="tab-details">
                            <h6>Responsive</h6>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Duis tristique lorem nulla.
                            </p>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={6} className="tab-col-Two">
                  <Tab.Content>
                    <Tab.Pane eventKey="first" className="tab-result">
                      <img src={tab_one} alt="" className="tab-img" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className="tab-result">
                      <img src={tab_one} alt="" className="tab-img" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third" className="tab-result">
                      <img src={tab_one} alt="" className="tab-img" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="four" className="tab-result">
                      <img src={tab_one} alt="" className="tab-img" />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
        {/*   ---------- tutor  ------------*/}
        <div className="tutor">
          <div className="container tutor-wrap">
            <div className="tutor-left">
              <h4>Search your next tutor</h4>
              <p>
                Connecting learners with tutors and educational resources around
                the world. My Tutor Point hosts the best tutors in the world and
                connects them to the students who require a high standard
                learning experience for a reasonable price.
              </p>
            </div>
            <div className="tutor-right">
              <img src={tutorImage} alt="" srcset="" />
            </div>
          </div>
          {/*   ---------- search tutor ------------*/}

          <div className="container" id="tutor-search">
            <div
              className="search search-tutor"
              style={{ borderRadius: display ? "0px" : "0px 35px 35px 0px" }}
              id="search"
            >
              <div className="container search-center container-tutor ">
                <div
                  className="search-form-wrap"
                  style={{
                    minWidth: display ? "60%" : "94%",
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

        {/*   ---------- footer ------------*/}
        <footer className="footer">
          <div className="container footer-wrap">
            <div className="footer-item">
              <h6>Company</h6>
              <a href="#">About My Tutor Point</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
              <a href="#">Help</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="footer-item">
              <h6>Student</h6>
              <a href="#">Parent Account</a>
              <a href="#">Teacher's Directory</a>
              <a href="#">Subject Directory</a>
            </div>
            <div className="footer-item">
              <h6 href="#">Tutor</h6>
              <a href="#">Become a Teacher</a>
              <a href="#">Teacher's Handbook</a>
              <a href="#">Directory</a>
            </div>
            <div className="footer-item">
              <h6>Institutes</h6>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
            </div>
            <div className="footer-item">
              <h6>Communities</h6>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
              <a href="#">lorem Ipsum</a>
            </div>
            <div className="footer-item">
              <h6>Subscribe</h6>
              <input
                type="text"
                className="search-input sub"
                placeholder="Email"
              />
              <div className="btn-holder">
                <a className="button-primary login-btn" href="#">
                  log in
                </a>
              </div>
            </div>
          </div>
        </footer>
        {/*   ---------- footer 2  ------------*/}
        <footer className="footer-2">
          <div className="container footer-2-wrap">
            <a href="#">© My Tutor Point Ltd, 2020</a>
            <div className="footer2-inner-wrap footer2-inner-wrap-one">
              <a href="#">Terms & Conditions </a>
              <a href="#">Privacy </a>
              <a href="#">Legal </a>
              <a href="#">Sitemap </a>
            </div>
            <div>
              <a href="#" className="footer2-inner-wrap">
                <img src={footer2_image} alt="" srcset="" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Scroll;
