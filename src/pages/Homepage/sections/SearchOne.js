import React from "react";
import search from "../.../../../../assets/scroll/search/search icon.png";
import location from "../.../../../../assets/scroll/search/location icon.png";
import web from "../.../../../../assets/scroll/search/web icon.png";
import arrowRight from "../.../../../../assets/scroll/search/arrow.png";

const SearchOne = () => {
  return (
    <div className="search">
      <div className="container search-center">
        <div className="search-form-wrap">
          <div className="search-sub" id="search">
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
  );
};

export default SearchOne;
