import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerProduct } from "../actions/productActions";
import { userInfo } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import PaginationTable from "../components/PaginationTable";
import Product from "../components/Product";

export default function SellerShopScreen(props) {
  const sellerId = props.match.params.id;
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.userInfo);
  const { loading, error, user } = infoUser;
  const sellerProducts = useSelector((state) => state.productSeller);
  const {
    loading: sellerLoading,
    error: sellerError,
    products,
  } = sellerProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  let currentPosts;
  if (!sellerLoading) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(userInfo(sellerId));
    dispatch(sellerProduct(sellerId));
  }, [dispatch, sellerId]);
  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="page-product__shop row bg-white mt-4">
            <div className="col-2 page-product__shop-left">
              <div className="row flex-start ">
                <div
                  className="shop-avatar"
                  style={
                    user.avatar
                      ? {
                          background: `url('/uploads/users/${user.avatar}')`,
                        }
                      : { background: "url('/assets/icons/shop.jpg')" }
                  }
                ></div>
                <div className="shop-info">{user.name}</div>
              </div>
            </div>
            <div className="col-2 page-product__shop-right">
              <div className="text-overflow px-1">
                เข้าร่วมเมื่อ{" "}
                {dayjs(user.createdAt).locale("th").format("DD MMMM YYYY")}
              </div>
            </div>
          </div>

          {sellerLoading ? (
            <MessageBox>Loading...</MessageBox>
          ) : sellerError ? (
            <MessageBox variant="danger">{sellerError}</MessageBox>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </div>
  );
}
