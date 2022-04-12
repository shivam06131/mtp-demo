import React from "react";
import "./footer.css";

const FooterOne = () => {
  return (
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
          <input type="text" className="search-input sub" placeholder="Email" />
          <div className="btn-holder">
            <a className="button-primary login-btn" href="#">
              log in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
