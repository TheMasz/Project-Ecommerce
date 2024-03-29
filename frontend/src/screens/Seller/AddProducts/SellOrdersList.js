import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deliveredOrder,
  listOrderSeller,
  sellerDetailsOrder,
} from "../../../actions/orderActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import PaginationTable from "../../../components/PaginationTable";
import { ORDER_DELIVERED_RESET } from "../../../constants/orderConstants";

export default function SellOrdersList() {
  const history = useHistory();
  const orderSellerList = useSelector((state) => state.orderSellerList);
  const { loading, error, orders } = orderSellerList;
  const orderDetails = useSelector((state) => state.orderSellerDetails);
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
    if (!loadingDetail) {
      setDeliveryNumber(orderDetail.item.deliveredNumber);
      setDate(orderDetail.item.deliveredAt);
    }
    if (successUpdate) {
      dispatch({ type: ORDER_DELIVERED_RESET });
    }
  }, [
    dispatch,
    pickerPrev,
    pickerNext,
    orderDetail,
    loadingDetail,
    successUpdate,
  ]);
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
    dispatch(sellerDetailsOrder(orderId));
  };
  const delivered = (orderId) => {
    const data = new FormData();
    data.append("deliveredNumber", deliveryNumber);
    data.append("date", date);
    dispatch(deliveredOrder(orderId, data));
    setModal(false);
  };
  const cancleDelivered = () => {
    setModal(false);
    setDeliveryNumber("");
    setDate("");
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
                <i className="fa fa-refresh"></i>
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
                    <th>การจัดส่ง</th>
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
                        <div
                          className={`isDelivered-status ${
                            result.item.isDelivered
                              ? "alert-success"
                              : "alert-danger"
                          }`}
                        >
                          {result.item.isDelivered
                            ? "จัดส่งเรียบร้อย"
                            : "ยังไม่จัดส่ง"}
                        </div>
                      </td>
                      <td>
                        <div className="buttons">
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
                        </div>
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
            <MessageBox variant="danger">
              {errorDetail || errorUpdate}
            </MessageBox>
          ) : (
            <div className="modal__mask" style={{ zIndex: 1000008 }}>
              <div className="modal__container">
                <div className="modal__box">
                  <div className="modal__content">
                    <form onSubmit={(e) => delivered(orderDetail.orderId)}>
                      <div className="modal__header">
                        <div className="modal__header-inner">
                          <span className="text-overflow">ชำระเงิน</span>
                        </div>
                      </div>
                      <div className="modal__body">
                        {orderDetail.item.isDelivered ? (
                          <div className="success">จัดส่งเรียบร้อย</div>
                        ) : (
                          <div className="error">ยังไม่จัดส่ง</div>
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
                              onChange={(e) =>
                                setDeliveryNumber(e.target.value)
                              }
                              value={deliveryNumber}
                              required
                            />
                            <input
                              type="datetime-local"
                              onChange={(e) => setDate(e.target.value)}
                              value={date}
                              required
                            />
                 
                        </div>
                      </div>
                      <div className="modal__footer">
                        <div className="modal__footer-buttons">
                          <button
                            type="button"
                            className="normal mx-1"
                            onClick={cancleDelivered}
                          >
                            ยกเลิก
                          </button>
                          <button
                            type="submit"
                            className="primary"
                            disabled={orderDetail.item.isDelivered}
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </form>
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
