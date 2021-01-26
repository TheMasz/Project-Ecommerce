import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Pagination from "../components/Pagination";
import Product from "../components/Product";

export default function ProductsListScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [currentPage, setCurrentPage] = useState(2);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  let currentPosts;
  if (!loading) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  }
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row py-3  flex-start">
            {currentPosts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}
