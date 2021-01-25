import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function CategoryScreen(props) {
  // const dispatch = useDispatch();
  // const category = props.match.params.category;
  // const productCategory = useSelector((state)=> state.productCategory)
  // const { loading, error, products } = productCategory;

  // useEffect(() => {
  //   dispatch(categoryProduct(category));
  // }, [dispatch, category]);
  return (
    <div className="container">
      {/* {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row py-3 space-evenly">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )} */}
    </div>
  );
}
