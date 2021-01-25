import React from "react";


export default function Title(props) {
  return (
    <div className="text-center pt-3">
      <h1 className="text-bold text-title py-1">{props.title}</h1>
    </div>
  );
}
