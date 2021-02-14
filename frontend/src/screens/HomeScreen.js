import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import Title from "../components/Title";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProduct } from "../actions/productActions";
import { Link } from "react-router-dom";
import { listCategories } from "../actions/addProductActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const categoriesList = useSelector((state) => state.categories);
  const {
    loading: CateogoryLoading,
    error: CategoryError,
    categories,
  } = categoriesList;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  useEffect(() => {
    dispatch(listProduct({}));
    dispatch(listCategories());
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
        {loading || CateogoryLoading ? (
          <LoadingBox />
        ) : error || CategoryError ? (
          <MessageBox variant="danger">{error || CategoryError}</MessageBox>
        ) : (
          <>
            <div className="section-category-list">
              <div className="category-section__header">
                <div className="category-section__header__title">หมวดหมู่</div>
              </div>
              <div className="category-section__content">
                <div className="image-carousel">
                  <div className="image-carousel__item-list-wrapper">
                    <ul className="image-carousel__item-list">
                      {categories.map((category) => (
                        <li key={category._id} className="image-carousel__item">
                          <Link to={`/search/category/${category.name}`}>
                            <div className="item__inner">
                              <div className="item__inner-img">
                                <div
                                  className="item__inner-img_inner"
                                  style={{
                                    background: `url('/assets/categories/${category.icon}')`,
                                  }}
                                ></div>
                              </div>
                              <div className="item__inner-title">
                                <div className="item__inner-title-text">
                                  {category.name}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Title title="ALL" />

            <div className="row py-3 flex-start wrapper-products">
              {currentPosts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>

            <div className="wrapper-btn">
              <Link to="/product/pageNumber/2" className="btn_seeMore">
                ดูเพิ่มเติม
              </Link>
            </div>
          </>
        )}
      </div>
    
    </>
  );
}
