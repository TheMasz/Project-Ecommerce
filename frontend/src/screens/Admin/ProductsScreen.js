import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../actions/addProductActions";
import { detailsProduct, listProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
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
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    dispatch(listProduct({}));
    if (successDelete) {
        dispatch({ type: PRODUCT_DELETE_RESET });
      }
  }, [dispatch,successDelete]);
 const CfdeleteHandler = (productId) => {
    setModal(true);
    dispatch(detailsProduct(productId));
  };
  const deleteHandler = (productId) =>{
    setModal(false);
    dispatch(deleteProduct(productId));
  }
  return (
    <div className="container">
      {loading ? (
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
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price} บาท</td>
                  <td>
                    <button type="button" className="primary" onClick={()=>CfdeleteHandler(product._id)}>
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
