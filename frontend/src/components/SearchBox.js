import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="searchbar">
        <div className="searchbar-main">
          <input
            type="text"
            id="search"
            name="search"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
