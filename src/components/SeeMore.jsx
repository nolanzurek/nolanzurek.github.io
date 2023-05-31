import React from "react";
import "./seeMore.css";
import { Link } from "react-router-dom";

function SeeMore(props) {
  return (
    <Link to={props.link} className="seeMoreLink">
      <div className="seeMoreDiv">
        <i className="material-icons">link</i>
        <p className="seeMoreText">{`See More${props.extraText ? " " : ""}${
          props.extraText ? props.extraText : ""
        }`}</p>
      </div>
    </Link>
  );
}

export default SeeMore;
