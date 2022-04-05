import outline from "../../assets/video/star.png";

const SVGIcon = (props) => {
  <svg className={props.className} pointerEvents="none">
    <use xlinkHref={props.href} />
  </svg>;
};
// <Rating
//   emptySymbol={<SVGIcon href={outline} className="icon" />}
//   fullSymbol={<SVGIcon href="#icon-star-full" className="icon" />}
// />;

export default SVGIcon;
