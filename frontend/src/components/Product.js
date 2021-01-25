import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

export default function Product(props) {
  const dispatch = useDispatch();
  const [click, setClick] = useState("");
  const { product } = props;
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, 1));
    setClick("click");
  };
  return (
    <div key={product._id} className="card m-05">
      <Link to={`/products/product/${product._id}`}>
        <div className="card_img">
          <img src={`/uploads/products/${product._id}/${product.images[0]}`} alt={product.name}/>
 
        </div>
      </Link>
      <div className="card_body">
        <Link to={`/products/product/${product._id}`}>
          <div className="text-overflow product-name p-1">{product.name}</div>
        </Link>
        <div className="line"></div>
        <div className="row p-2">
          <p className="price">{product.price} ฿</p>
          <button
            type="button"
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`${click === "click" ? "AddToCart" : ""}`}
          >
            <img
              src="/assets/icons/cart-add.svg"
              alt="Add To Cart"
              className="small_img"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
