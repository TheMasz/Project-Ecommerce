import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deliveredOrder,
  detailsOrder,
  listOrderSeller,
} from "../../../actions/orderActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import PaginationTable from "../../../components/PaginationTable";
import { ORDER_DELIVERED_RESET } from "../../../constants/orderConstants";

export default function SellOrdersList() {
  const history = useHistory();
  const orderSellerList = useSelector((state) => state.orderSellerList);
  const { loading, error, orders } = orderSellerList;
  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    order: orderDetail,
    loading: loadingDetail,
    error: errorDetail,
  } = orderDetails;
  const orderUpdate = useSelector((state) => state.orderDelivered);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate;
  const dispatch = useDispatch();
  const [picker, setPicker] = useState(false);
  const [pickerPrev, setPickerPrev] = useState("");
  const [pickerNext, setPickerNext] = useState("");
  const [isModal, setModal] = useState(false);
  const [deliveryNumber, setDeliveryNumber] = useState("");
  const [date, setDate] = useState("");

const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  let currentPosts;
  if (!loading) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(
      listOrderSeller({
        pickerPrev: pickerPrev ? pickerPrev : "",
        pickerNext: pickerNext ? pickerNext : "",
      })
    );
    if (orderDetail) {
      setDeliveryNumber(orderDetail.deliveredId);
      setDate(orderDetail.deliveredAt);
    }
    if (successUpdate) {
      dispatch({ type: ORDER_DELIVERED_RESET });
    }
  }, [dispatch, pickerPrev, pickerNext, orderDetail, successUpdate]);
  const billHandler = (id) => {
    console.log("id :", id);
    window.open(`/bill/${id}`, "_blank");
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
  const cfDelivery = (orderId) => {
    setModal(true);
    dispatch(detailsOrder(orderId));
  };
  const delivered = (orderId) => {
    const data = new FormData();
    data.append("deliveryNumber", deliveryNumber);
    data.append("date", date);
    dispatch(deliveredOrder(orderId, data));
    setModal(false);
  };
  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product-list-mian bg-white mt-4 p-3">
          <div className="order-panel-header">
            <div className="row">
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
                  <i
                    className={`fa fa-chevron-${picker ? "left" : "right"}`}
                  ></i>
                </div>
              </div>
            </div>
            {pickerPrev > pickerNext && (
              <MessageBox variant="danger">
                กรุณาระบุวันที่ให้ถูกต้อง
              </MessageBox>
            )}
          </div>
          <div className="order-list-pannel">
            <div className="table-list-section">
              <table className="table-section">
                <thead className="table-section__header">
                  <tr>
                    <th>Order ID</th>
                    <th>สินค้าทั้งหมด</th>
                    <th>วันเวลาที่สั่งซื้อ</th>
                    <th>ที่อยู่</th>
                    <th>สถานะ</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="table-section__body">
                  {currentPosts.map((result) => (
                    <tr key={result.orderId}>
                      <td>{result.orderId}</td>
                      <td>
                        {result.item.products.map((item) => (
                          <p>
                            {item.name} x{item.qty}
                          </p>
                        ))}
                      </td>
                      <td>{result.createdAt}</td>
                      <td>
                        <p>
                          {result.fullName} {result.address} {result.postalCode}{" "}
                          {result.country}, Tel : {result.tel}
                        </p>
                      </td>
                      <td>
                        <div
                          className={`isPaid-status ${
                            result.isPaid ? "alert-success" : "alert-danger"
                          }`}
                        >
                          <p>
                            {result.isPaid
                              ? "ชำระเงินเรียบร้อย"
                              : "ยังไม่ชำระเงิน"}
                          </p>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="primary"
                          onClick={() => cfDelivery(result.orderId)}
                        >
                          จัดส่ง
                        </button>
                        <button
                          type="button"
                          className="primary"
                          onClick={() => billHandler(result.orderId)}
                        >
                          ปริ้นบิล
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
          </div>
        </div>
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
      {isModal ? (
        <div className="modal">
          {loadingDetail || loadingUpdate ? (
            <MessageBox variant="loading">Loading...</MessageBox>
          ) : errorDetail || errorUpdate ? (
            <MessageBox variant="error">{errorDetail || errorUpdate}</MessageBox>
          ) : (
            <div className="modal__mask" style={{ zIndex: 1000008 }}>
              <div className="modal__container">
                <div className="modal__box">
                  <div className="modal__content">
                    <>
                      <div className="modal__header">
                        <div className="modal__header-inner">
                          <span className="text-overflow">ชำระเงิน</span>
                        </div>
                      </div>
                      <div className="modal__body">
                        {orderDetail.isDelivered && (
                          <div className="success">จัดส่งเรียบร้อย</div>
                        )}
                        <div className="modal__body-inner-top">
                          <span className="text-overflow">
                            คุณแน่ใจหรือไม่ว่าจะยืนยันการจัดส่งออเดอร์นี้ ?
                          </span>
                        </div>
                        <div className="modal__body-inner-bottom">
                          <input
                            type="text"
                            placeholder="หมายเลขวัสดุ"
                            onChange={(e) => setDeliveryNumber(e.target.value)}
                            value={orderDetail.deliveredNumber}
                            required
                          />
                          <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={orderDetail.date}
                            required
                          />
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
                            onClick={() => delivered(orderDetail._id)}
                            disabled={orderDetail.isDelivered}
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
