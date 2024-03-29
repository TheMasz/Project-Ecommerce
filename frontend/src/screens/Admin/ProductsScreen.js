import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listCategories } from "../../actions/addProductActions";
import { detailsProduct, listProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import PaginationTable from "../../components/PaginationTable";
import { PRODUCT_DELETE_RESET } from "../../constants/addProductContants";

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingDetail,
    error: errorDetails,
    product: productDetail,
  } = productDetails;
  const categoriesList = useSelector((state) => state.categories);
  const {
    loading: CateogoryLoading,
    error: CategoryError,
    categories,
  } = categoriesList;

  const [isModal, setModal] = useState(false);
  const [category, setCategory] = useState('');
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

  useEffect(() => {
    dispatch(listProduct({   category: category ? category : ""}));
    dispatch(listCategories());
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [dispatch, successDelete, category]);
  const CfdeleteHandler = (productId) => {
    setModal(true);
    dispatch(detailsProduct(productId));
  };
  const deleteHandler = (productId) => {
    setModal(false);
    dispatch(deleteProduct(productId));
  };
  return (
    <div className="container">
      {loading || CateogoryLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-list-section">
          {successDelete ? (
            <MessageBox variant="success">Delete Succested</MessageBox>
          ) : errorDelete ? (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          ) : loadingDelete ? (
            <MessageBox variant="loading">Loading...</MessageBox>
          ) : (
            ""
          )}
          <div className="select-wrap_inner-large mt-4">
            <select
              className="input-wrap_select"
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
            >
              <option value="" selected disabled hidden>
                กรุณาเลือกหมวดหมู่
              </option>
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <table className="table-section">
            <thead className="table-section__header">
              <tr>
                <th>ID</th>
                <th>ชื่อ</th>
                <th>หมวดหมู่</th>
                <th>ราคา</th>
                <th>ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="table-section__body">
              {currentPosts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.price
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                    บาท
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete w-100"
                      onClick={() => CfdeleteHandler(product._id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationTable
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            paginate={paginate}
          />
           {products.length === 0 && (
            <div className="no-data">
              <i className="fa fa-2x fa-calendar-o"></i>
              <div className="order-list-section__content py-1">
                ไม่พบรายการสินค้า
              </div>
            </div>
          )}
        </div>
      )}
      {isModal ? (
        <div className="modal">
          <div className="modal__mask" style={{ zIndex: 1000008 }}>
            <div className="modal__container">
              <div className="modal__box">
                <div className="modal__content">
                  {loadingDetail ? (
                    <MessageBox variant="loading">Loading...</MessageBox>
                  ) : errorDetails ? (
                    <MessageBox variant="danger">{errorDetails}</MessageBox>
                  ) : (
                    <>
                      <div className="modal__header">
                        <div className="modal__header-inner">
                          <span className="text-overflow">ลบสินค้า</span>
                        </div>
                      </div>
                      <div className="modal__body">
                        <div className="modal__body-inner-top">
                          <span className="text-overflow">
                            คุณแน่ใจหรือไม่ว่าจะลบสินค้านี้?
                          </span>
                        </div>
                        <div className="modal__body-inner-bottom">
                          <img
                            src={`/uploads/products/${productDetail._id}/${productDetail.images[0]}`}
                            alt={productDetail.name}
                            className="modal__image"
                          />
                          <div className="modal__name">
                            <span className="">{productDetail.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="modal__footer">
                        <div className="modal__footer-buttons">
                          <button
                            type="button"
                            className="normal mx-1"
                            onClick={(e) => setModal(false)}
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="button"
                            className="primary"
                            onClick={(e) => deleteHandler(productDetail._id)}
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

    </div>
  );
}
