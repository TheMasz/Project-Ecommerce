import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MineProduct, deleteProduct } from "../../../actions/addProductActions";
import { detailsProduct } from "../../../actions/productActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";

import Sidebar from "../../../components/Sidebar";
import { PRODUCT_DELETE_RESET } from "../../../constants/addProductContants";

export default function MyProductsScreen() {
  const dispatch = useDispatch();
  const mineProductList = useSelector((state) => state.mineProduct);
  const { loading, error, products } = mineProductList;
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
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    dispatch(MineProduct());
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [dispatch, successDelete]);
  const CfdeleteHandler = (productId) => {
    setModal(true);
    dispatch(detailsProduct(productId));
  };
  const deleteHandler = (productId) =>{
    setModal(false);
    dispatch(deleteProduct(productId));
  }
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="app-container ">
      <Sidebar />
      <div className="page-container">
        <div className="container ">
          {successDelete ? (
            <MessageBox variant="success">Delete Succested</MessageBox>
          ) : errorDelete ? (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          ) : loadingDelete ? (
            <MessageBox variant="loading">Loading...</MessageBox>
          ) : (
            ""
          )}
          <div className="product-list-mian bg-white mt-4 p-3">
            <div className="row p-3">
              <div className="col-2 ">สินค้า {products.length} รายการ</div>
              <div className="col-2 "></div>
            </div>
            <div className="product-grid-container">
              <div className="product-items row flex-start">
                {products.map((product) => (
                  <div key={product._id} className="card m-01">
                    <Link to={`/products/product/${product._id}`}>
                      <div className="card_img">
                        <img
                          src={`/uploads/products/${product._id}/${product.images[0]}`}
                          alt={product.name}
                        />
                      </div>
                    </Link>
                    <div className="card_body">
                      <Link to={`/products/product/${product._id}`}>
                        <div className="text-overflow product-name p-1">
                          {product.name}
                        </div>
                      </Link>
                      <div className="product-info row px-1 ">
                        <div className="price  text-overflow">
                          {product.price} บาท
                        </div>
                        <div className="text-overflow">
                          คลัง {product.countInStock}
                        </div>
                      </div>
                      <div className="product-actions row space-evenly pt-1">
                        <Link to={`/portal/product/${product._id}/edit`}>
                          <i className="fa fa-pencil"></i>
                        </Link>
                        <div>
                          <button
                            type="button"
                            onClick={() => CfdeleteHandler(product._id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                          <button type="button" className="primary" onClick={e=>deleteHandler(productDetail._id)}>
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
