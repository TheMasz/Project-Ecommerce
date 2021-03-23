import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  detailsOrder,
  listOrderAdmin,
  paidOrder,
} from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import PaginationTable from "../../components/PaginationTable";
import { ORDER_ISPAID_RESET } from "../../constants/orderConstants";

export default function OrdersScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { loading: LoadingOrders, error: errorOders, orders } = orderAdminList;
  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    order: DetailsOrder,
    loading: DetailsOrderLoading,
    error: DetailsOrderError,
  } = orderDetails;
  const isPaid = useSelector((state) => state.orderIsPaid);
  const {
    loading: loadingIsPaid,
    error: errorIsPaid,
    success: successIsPaid,
  } = isPaid;

  const [picker, setPicker] = useState(false);
  const [pickerPrev, setPickerPrev] = useState("");
  const [pickerNext, setPickerNext] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  let currentPosts;
  if (!LoadingOrders) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(
      listOrderAdmin({
        pickerPrev: pickerPrev ? pickerPrev : "",
        pickerNext: pickerNext ? pickerNext : "",
      })
    );
    if (successIsPaid) {
      dispatch({ type: ORDER_ISPAID_RESET });
    }
  }, [dispatch, successIsPaid, pickerPrev, pickerNext]);
  const CfPaidHandler = (orderId) => {
    setModal(true);
    dispatch(detailsOrder(orderId));
  };
  const isPaidHandler = (orderId) => {
    dispatch(paidOrder(orderId));
    setModal(false);
  };
  const reloadHandler = () => {
    history.go(0);
  };
  const pickerHandler = () => {
    setPicker(!picker);
  };
  const pickerPrevHandler = (e) => {
    setPickerPrev(e);
  };
  const pickerNextHandler = (e) => {
    setPickerNext(e);
  };

  return (
    <div className="container">
      {LoadingOrders ? (
        <LoadingBox />
      ) : errorOders ? (
        <MessageBox variant="danger">{errorOders}</MessageBox>
      ) : (
        <div className="table-list-section">
          <div className="row mt-4">
            <div className="title">คำสั่งซื้อ</div>
            <button type="button" onClick={reloadHandler}>
              <i class="fa fa-refresh"></i>
            </button>
          </div>
          <div className="date-picker" onClick={pickerHandler}>
            <div className="date-picker__input">
              <div className="date-selector__prefix">
                <i className="fa fa-calendar"></i>
              </div>
              <div className="date-selector__inner">
                {pickerPrev ? pickerPrev : "ตั้งแต่ "}-
                {pickerNext ? pickerNext : " ถึง"}
              </div>
              <div className="date-selector__suffix">
                <i className={`fa fa-chevron-${picker ? "left" : "right"}`}></i>
              </div>
            </div>
          </div>
          {pickerPrev > pickerNext && (
            <MessageBox variant="danger">กรุณาระบุวันที่ให้ถูกต้อง</MessageBox>
          )}

          <table className="table-section">
            <thead className="table-section__header">
              <tr>
              <th>Order ID</th>
                <th>สินค้าทั้งหมด</th>
                <th>วันเวลาที่สั่งซื้อ</th>
                <th>ราคารวม</th>
                <th>การชำระเงิน</th>
                <th>หลักฐานการชำระเงิน</th>
                <th>สถานะ</th>
                <th>ดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="table-section__body">
              {currentPosts.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.orderItems.map((item) => (
                      <div key={item.seller}>
                        <div>{item.seller}</div>
                        <ul>
                          {item.products.map((result) => (
                            <li>
                              {result.name} x {result.qty}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </td>
                  <td>{order.createdAt}</td>
                  <td>{(order.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} บาท</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <div
                      className={`isPaid-status ${
                        order.paymentResult ? "alert-success" : "alert-danger"
                      }`}
                    >
                      <p>{order.paymentResult ? "มี" : "ไม่มี"}</p>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`isPaid-status ${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                    >
                      <p>
                        {order.isPaid ? "ชำระเงินเรียบร้อย" : "ยังไม่ชำระเงิน"}
                      </p>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="primary"
                      onClick={() => CfPaidHandler(order._id)}
                      disabled={!order.paymentResult}
                    >
                      จัดการ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
         
          </table>
          <PaginationTable
              postsPerPage={postsPerPage}
              totalPosts={orders.length}
              paginate={paginate}
            />
          {orders.length === 0 && (
            <div className="no-data">
              <i className="fa fa-2x fa-calendar-o"></i>
              <div className="order-list-section__content py-1">
                ไม่พบคำสั่งซื้อ
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
                  {DetailsOrderLoading ? (
                    <MessageBox variant="loading">Loading...</MessageBox>
                  ) : DetailsOrderError ? (
                    <MessageBox variant="danger">
                      {DetailsOrderError}
                    </MessageBox>
                  ) : (
                    <>
                      <div className="modal__header">
                        <div className="modal__header-inner">
                          <span className="text-overflow">ชำระเงิน</span>
                        </div>
                      </div>
                      <div className="modal__body">
                        <div className="modal__body-inner-top">
                          <span className="text-overflow">
                            คุณแน่ใจหรือไม่ว่าจะยืนยันการชำระเงินออเดอร์นี้ ?
                          </span>
                        </div>
                        <div className="modal__body-inner-bottom">
                          <img
                            src={`/uploads/pays/${DetailsOrder.paymentImg.name}`}
                            alt={DetailsOrder._id}
                            className="modal__image"
                          />
                          <div className="modal__name ">
                            <span>ID: {DetailsOrder._id}</span>
                            <span>
                              เวลาที่โอน:{" "}
                              {DetailsOrder.paymentResult.update_time}
                            </span>
                            <span>
                              เลขสี่ตัวท้าย:{" "}
                              {DetailsOrder.paymentResult.fourCode}
                            </span>
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
                            onClick={(e) => isPaidHandler(DetailsOrder._id)}
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
      {picker ? (
        <div className="daterange-picker-panel">
          <div className="daterange-picker-panel__body">
            <div className="daterange-picker-panel__body-left">
              <input
                type="date"
                onChange={(e) => pickerPrevHandler(e.target.value)}
              />
            </div>
            <span> --- </span>
            <div className="daterange-picker-panel__body-right">
              <input
                type="date"
                onChange={(e) => pickerNextHandler(e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
