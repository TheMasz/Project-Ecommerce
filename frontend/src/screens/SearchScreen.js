import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import PaginationTable from "../components/PaginationTable";
import Product from "../components/Product";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    sortBy = "",

  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [dropdown, setDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  let currentPosts;
  if (!loading) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const dropdownHandler = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };
  const lastestHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ sortBy: "ctime" }));
  };
  const concernedHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ sortBy: "relevancy" }));
  };
  const minHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ sortBy: "lowest" }));
  };
  const maxHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ sortBy: "highest" }));
  };

  useEffect(() => {
    dispatch(
      listProduct({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        sortBy,

      })
    );
  }, [dispatch, name, sortBy, category, ]);
  const getFilterUrl = (filter) => {
    const filterName = filter.name || name;
    const filterCategory = filter.category || category;
    const filterSortBy = filter.sortBy || sortBy;

    return `/search/category/${filterCategory}/name/${filterName}/sortBy/${filterSortBy}`;
  };

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <div className="sort-bar">
            <span className="sort-bar__label">เรียงโดย</span>
            <div className="sort-by-options">
              <div
                className={`sort-by-options__option`}
                onClick={concernedHandler}
              >
                เกี่ยวข้อง
              </div>
              <div
                className={`sort-by-options__option `}
                onClick={lastestHandler}
              >
                ล่าสุด
              </div>
              <div className="select-with-status" onClick={dropdownHandler}>
                <span className="select-with-status__placeholder">ราคา</span>
                <span>
                  <i className="fa fa-caret-down"></i>
                </span>
                <div
                  className="select-with-status__dropdown"
                  style={dropdown ? { visibility: "unset" } : null}
                >
                  <div
                    className="select-with-status__dropdown-item--with-tick"
                    onClick={minHandler}
                  >
                    ราคา: จากน้อยไปมาก
                  </div>
                  <div
                    className="select-with-status__dropdown-item--with-tick"
                    onClick={maxHandler}
                  >
                    ราคา: จากมากไปน้อย
                  </div>
                </div>
              </div>
            </div>
            <div className="mini-page-controller"></div>
          </div>
          <div className="row py-3  flex-start wrapper-products">
            {currentPosts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <PaginationTable
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            paginate={paginate}
          />
          {currentPosts.length === 0 && (
            <div className="no-data">
              <i className="fa fa-2x fa-search"></i>
              <div className="order-list-section__content py-1">
                ไม่พบสินค้า
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
