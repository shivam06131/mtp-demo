import React from "react";
import footer2_image from "../../assets/footer-2/social network.png";
// import footer2_image from "../../assets/footer-2/social network.png";
import "./footer-2.css";

const FooterTwo = () => {
  return (
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
            <img src={footer2_image} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
