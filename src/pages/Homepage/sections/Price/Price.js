import React from "react";
import priceIcon from "../../assets/price/price-icon.png";
import "./price.css";

const Price = ({ scrollRef }) => {
  return (
    <div className="price" id="price" ref={scrollRef}>
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
  );
};

export default Price;
