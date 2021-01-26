import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import { sellerInfo } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const infoSeller = useSelector((state) => state.sellerInfo);
  const { loading: sellerLoading, seller, error: errorSeller } = infoSeller;
  const [image, setImage] = useState(0);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const handleClick = (i) => {
    setImage(i);
  };

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row py-5" key={productId}>
            <div className="col-2 ">
              <div className="d-flex center align-center w-100">
                <div className="product-image__large ">
                  <div
                    className="product-image__large-inner"
                    style={
                      product.images
                        ? {
                            background: `url('/uploads/products/${productId}/${product.images[image]}')`,
                          }
                        : null
                    }
                    alt={product.name}
                  ></div>
                </div>
              </div>

              <div className="row space-evenly py-3">
                {product.images
                  ? product.images.map((image, index) => {
                      return (
                        <div className="product-image__small" key={index}>
                          <div
                            className="product-image__small-inner"
                            style={
                              product.images
                                ? {
                                    background: `url('/uploads/products/${productId}/${image}')`,
                                  }
                                : null
                            }
                            alt={index}
                            onClick={() => handleClick(index)}
                          ></div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="col-2 center">
              <div className="p-2">
                <h1>{product.name}</h1>
                <h1 className="price py-1">{product.price} ฿</h1>
                <p className="text-description">{product.description}</p>
                <div>
                  <p className="text-bold text-title py-1">Status:</p>
                  {product.countInStock > 0 ? (
                    <span className="success">In Stock</span>
                  ) : (
                    <span className="error">Unavaliable</span>
                  )}
                </div>
                {product.countInStock > 0 && (
                  <select
                    className="selector my-2"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={addToCartHandler}
                  type="button"
                  disabled={product.countInStock === 0}
                  className="primary block"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="page-product__shop row bg-white">
            {sellerLoading ? (
              <MessageBox variant="loading">Loading...</MessageBox>
            ) : errorSeller ? (
              <MessageBox variant="danger">{errorSeller}</MessageBox>
            ) : (
              <div className="col-2 page-product__shop-left">
                <div className="row flex-start">
                  <div className="shop-avatar">
                    <img src="/assets/icons/menu1.svg" />
                  </div>
                  <div>
                    <div className="shop-info"></div>
                    <Link to="" className="btn_shop">
                      ดูร้านค้า
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="col-2 page-product__shop-right"></div>
          </div>
        </>
      )}
    </div>
  );
}
