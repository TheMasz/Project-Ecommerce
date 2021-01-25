import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import Title from "../components/Title";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProduct } from "../actions/productActions";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

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
    <>
      <Carousel />
      <div className="container">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Title title="ALL" />
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
    </>
  );
}
