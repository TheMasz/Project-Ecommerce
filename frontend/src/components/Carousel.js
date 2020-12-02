import React, { useState } from "react";

export default function Carousel() {
  const pics = [
    {
      name: "pic 1",
      url: "/assets/images/carousel.png",
    },
    {
      name: "pic 2",
      url: "/assets/images/carousel2.png",
    },
    {
      name: "pic 3",
      url: "/assets/images/carousel3.png",
    },
  ];
  const [x, setX] = useState(0);
  const Prev = () => {
    setX(x + 100);
    x === 0 ? setX(-100 * (pics.length - 1)) : setX(x + 100);
  };
  const Next = () => {
    setX(x - 100);
    x === -100 * (pics.length - 1) ? setX(0) : setX(x - 100);
  };
  return (
    <section className="carousel">
      <div className="carousel_item">
        {pics.map((pic, index) => (
          <img
            key={index}
            src={pic.url}
            className="slide_img"
            alt={pic.name}
            style={{ transform: `translate(${x}%)` }}
          />
        ))}
        <div className="left row center">
          <button className="prev" onClick={Prev}>
            <img src="/assets/icons/prev.png" alt="prev" />
          </button>
        </div>
        <div className="right row center">
          <button className="next" onClick={Next}>
            <img src="/assets/icons/next.png" alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
