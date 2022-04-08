// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "../../index.css";
// import "../scroll/scroll.css";
// import "../banner/Banner.css";

// import "../styles/price.css";

// import "../styles/feature-tutor.css";

// import "../styles/tabs.css";

// import "../styles/tutor.css";

// import "../styles/footer.css";

// import "../styles/footer-2.css";

// import ScrollSection from "../scrollSection/ScrollSection";
// import SearchOne from "../searchOne/SearchOne";
// import Price from "../price/Price";
// import Learning from "../LearningPlatform/Learning";
// import TutorVideo from "../TutorVido/TutorVideo";
// import TabSection from "../TabSection/TabSection";
// import SearchTutor from "../SearchTutor/SearchTutor";

// const Scroll = () => {
//   const [display, setDisplay] = useState();
//   const [displaySearchTwo, setDisplaySearchTwo] = useState(false);
//   const dispatch = useDispatch();
//   const scrollRef = useRef(null);

//   const video = useSelector((state) => state);
//   // const video2 = useSelector((state) => state.firstVideo);

//   let videoData;
//   if (Array.isArray(video)) {
//     [videoData] = video;
//   }
//   useEffect(() => {
//     //client height = window height
//     //scrollTop = total height scrolled
//     //offsetTop = div's top from start of page
//     window.addEventListener("scroll", () => {
//       const scrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;
//       if (document.getElementById("search")) {
//         if (
//           scrollTop >
//             document.getElementById("search").offsetTop -
//               document.documentElement.clientHeight +
//               77 &&
//           scrollTop < document.getElementById("tutor-search").offsetTop
//         ) {
//           setDisplay(true);
//         } else {
//           setDisplay(false);
//         }
//       }
//     });
//     return () => {
//       window.removeEventListener("scroll", () => {});
//     };
//   }, []);

//   console.log("two", displaySearchTwo);
//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       const scrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;
//       if (scrollTop > document.getElementById("tutor-search").offsetTop) {
//         setDisplaySearchTwo(true);
//       } else {
//         setDisplaySearchTwo(false);
//       }
//     });
//     return () => {
//       window.removeEventListener("scroll", () => {});
//     };
//   }, []);

//   //video
//   useEffect(() => {
//     dispatch({ type: "GET_VIDEO" });
//     // dispatch({ type: "GET_VIDEO_ONE" });
//   }, [dispatch]);

//   return (
//     <div>
//       <ScrollSection scrollRef={scrollRef} />
//       <SearchOne />
//       <Price scrollRef={scrollRef} />
//       <Learning />
//       {videoData && <TutorVideo videoData={videoData} />}
//       <TabSection />
//       <SearchTutor display={display} displaySearchTwo={displaySearchTwo} />
//     </div>
//   );
// };

// export default Scroll;
