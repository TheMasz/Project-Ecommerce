import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Pagination from "../components/Pagination";
import Product from "../components/Product";

export default function SearchScreen(props) {
  const { name = "all", sortBy = "" } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [dropdown, setDropdown] = useState(false);
  const dropdownHandler = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };
  const lastestHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ sortBy: "ctime" }));
    console.log('ctime');
  };
  const concernedHandler = (e) => {
     e.preventDefault(); 
    props.history.push(getFilterUrl({ sortBy: "relevancy" }));
    console.log('relevancy');
  };
  useEffect(() => {
    dispatch(listProduct({ name: name !== "all" ? name : "", sortBy }));
  }, [dispatch, name, sortBy]);
  const getFilterUrl = (filter) => {
    const filterName = filter.name || name;
    const filterSortBy = filter.sortBy || sortBy;

    return `/search/name/${filterName}/sortBy/${filterSortBy}`;
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
                  <div className="select-with-status__dropdown-item--with-tick">
                    ราคา: จากน้อยไปมาก
                  </div>
                  <div className="select-with-status__dropdown-item--with-tick">
                    ราคา: จากมากไปน้อย
                  </div>
                </div>
              </div>
            </div>
            <div className="mini-page-controller"></div>
          </div>
          <div className="row py-3  flex-start">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
