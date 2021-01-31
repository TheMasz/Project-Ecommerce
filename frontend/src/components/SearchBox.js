import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="query"
          id="query"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button  type="submit">
          <img
            src="/assets/icons/magnifying-glass.svg"
            alt="search"
            className="small_img"
          />
        </button>
      </div>
    </form>

  );
}
