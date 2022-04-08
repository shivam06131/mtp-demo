import React from "react";
import arrow from "../.../../../../assets/scroll/arrow.svg";

const ScrollSection = ({ scrollRef }) => {
  const handleArrowScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="scroll">
      <div className="container center">
        <h5>Scroll Quietly...</h5>
        <p>
          Emily, Dana, and Bilal are having an <span>algebra</span> class with
          the tutor
        </p>
        <img
          className="scroll-arrow"
          src={arrow}
          alt=""
          onClick={handleArrowScroll}
        />
      </div>
    </div>
  );
};

export default ScrollSection;
