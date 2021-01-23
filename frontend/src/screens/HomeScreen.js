import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import Title from "../components/Title";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProduct } from "../actions/productActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <>
      <Carousel />
      <div className="container">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {/* <Title title="Hot Sell" showList="HotSell" />
            <div className="row py-3 space-evenly">
              {products
                .filter((product) => product.showList === "HotSell")
                .slice(0, 3)
                .map((hotProduct) => (
                  <Product key={hotProduct._id} product={hotProduct} />
                ))}
            </div> */}
            <Title title="ALL" />
            <div className="row py-3  flex-start">
              {products.map((newProduct) => (
                <Product key={newProduct._id} product={newProduct} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
