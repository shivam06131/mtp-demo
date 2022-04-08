import React from "react";
import StartImg from "../.../../../../assets/video/star.png";
import StartImg2 from "../.../../../../assets/video/Path 986.png";
import Rating from "react-rating";

const TutorVideo = ({ videoData }) => {
  return (
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
  );
};

export default TutorVideo;
