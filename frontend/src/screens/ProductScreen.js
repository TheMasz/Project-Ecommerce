import React from "react";
import data from "../data";

export default function ProductScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-2 text-center">
          <img src={product.image} alt={product.name} className="medium" />
          <div className="row space-evenly py-3">
            <div className="box-small"></div>
            <div className="box-small"></div>
            <div className="box-small"></div>
            <div className="box-small"></div>
          </div>
        </div>
        <div className="col-2 center">
          <div className="p-2">
            <h1>Nike Sneaker</h1>
            <h1 className="price py-1">${product.price}</h1>
            <p className="text-description">{product.description}</p>
            <div>
              <p className="text-bold text-title py-1">Side:</p>
              <select className="selector my-2">
                <option>Select your Size</option>
              </select>
            </div>
            <button type="button" className="primary block">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
