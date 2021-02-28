import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsOrder,
  listOrderAdmin,
  paidOrder,
} from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { ORDER_ISPAID_RESET } from "../../constants/orderConstants";

export default function OrdersScreen() {
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

  useEffect(() => {
    dispatch(listOrderAdmin());
    if (successIsPaid) {
      dispatch({ type: ORDER_ISPAID_RESET });
    }
  }, [dispatch, successIsPaid]);
  const CfPaidHandler = (orderId) => {
    setModal(true);
    dispatch(detailsOrder(orderId));
  };
  const isPaidHandler = (orderId) => {
    dispatch(paidOrder(orderId));
    setModal(false);
  };
  return (
    <div className="container">
      {LoadingOrders ? (
        <LoadingBox />
      ) : errorOders ? (
        <MessageBox variant="danger">{errorOders}</MessageBox>
      ) : (
        <div className="table-list-section">
          <table className="table-section">
            <thead className="table-section__header">
              <tr>
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
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {order.orderItems.map((item) => (
                      <div key={item.seller}>
                        <div>{item.seller}</div>
                        <ul>
                          {item.products.map((result) => (
                            <li>{result.name} x {result.qty}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice} บาท</td>
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
    </div>
  );
}
