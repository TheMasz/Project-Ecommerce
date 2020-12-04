import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(()=>{
    dispatch(detailsProduct(productId))
  },[dispatch, productId])

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
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
              <h1>{product.name}</h1>
              <h1 className="price py-1">${product.price}</h1>
              <p className="text-description">{product.description}</p>
              <div>
                <p className="text-bold text-title py-1">Side:</p>
                <select className="selector my-2">
                  <option>Select your Size</option>
                </select>
              </div>
              <button type="button" className="primary block">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
