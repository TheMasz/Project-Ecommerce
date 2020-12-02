import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const {product} = props;
  return (
   
        <div key={product._id} className="card my-2">
          <Link to={`/product/${product._id}`}>
            <div className="card_img">
              <img src={product.image} alt={product.name} />
            </div>
          </Link>
          <div className="card_body">
            <Link to={`/product/${product._id}`}>
              <h1 className="text-center text-title py-1">{product.name}</h1>
            </Link>
            <div className="line"></div>
            <div className="row p-2">
              <p className="price">${product.price}</p>
              <Link to="/">
                <img
                  src="/assets/icons/cart-add.svg"
                  alt="Add To Cart"
                  className="small_img"
                />
              </Link>
            </div>
          </div>
        </div>
   
  );
}
