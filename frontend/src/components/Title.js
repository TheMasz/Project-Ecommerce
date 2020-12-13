import React from "react";
import {Link} from "react-router-dom";

export default function Title(props) {
  return (
    <div className="text-center pt-3">
      <h1 className="text-bold text-title py-1">{props.title}</h1>
      <Link to={`/products/showList/${props.showList}`} className="text-blue">See All</Link>
    </div>
  );
}
