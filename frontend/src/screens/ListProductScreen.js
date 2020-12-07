import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showListProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function ListProductScreen(props) {
  const dispatch = useDispatch();
  const showList = props.match.params.showList;
  const ProductShowList = useSelector((state) => state.productShowList);
  const { loading, error, products } = ProductShowList;
  useEffect(() => {
    dispatch(showListProduct(showList));
  }, [dispatch, showList]);

  return (
    <div className="container">
      {loading ? (
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
      )}
    </div>
  );
}
