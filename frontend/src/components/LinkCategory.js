import React from "react";
import { Link } from "react-router-dom";

export default function LinkCategory(props) {
  return (
    <div className="py-1 link_category text-center">
      <Link
        to={`/products/category/${props.category}`}
        className="text-title text-capitalize"
      >
        {props.category}
      </Link>
    </div>
  );
}
