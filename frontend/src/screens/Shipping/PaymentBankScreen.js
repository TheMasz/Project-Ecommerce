import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  payOrder } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";

export default function PaymentBankScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const { success } = useSelector((state) => state.orderPay);
  const [fourCode, setFourCode] = useState("");
  const [date, setDate] = useState();
  const [img, setImg] = useState();

  // if (order.paymentImg) {
  //   props.history.push(`/order/${orderId}`);
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("fourCode", fourCode);
    data.append("date", date);
    data.append("orderId", orderId);
    dispatch(payOrder(order, data));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${orderId}`);
      dispatch({ type: ORDER_PAY_RESET });
    }
  }, [dispatch, orderId, props.history, success]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      {order.paymentImg ? props.history.push(`/order/${orderId}`) : ""}

      <div className="payment-form-section mt-4">
        <form onSubmit={submitHandler}>
          <div className="text-center">
            <h2 className="text-title-form">ธนาคารกรุงไทย</h2>
            <h2 className="text-title-form py-1">502 201 7568</h2>
            <h2 className="text-sub-form">ชื่อบัญชี: น้องมาส กำจัด</h2>
          </div>
          <div>
            <p className="py-2 pr-2 text-sub-form">วันเวลาที่โอน:</p>
            <input
              type="datetime-local"
              className="input_form"
              name="update_time"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="py-2 pr-2 text-sub-form">เลข 4 ตัวท้าย:</p>
            <input
              type="text"
              className="input_form"
              placeholder="เลขสี่ตัวท้ายของบัญชีที่ทำการโอน"
              name="fourCode"
              onChange={(e) => setFourCode(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="py-2 pr-2 text-sub-form">รูปหลักฐานการโอน:</p>
            <input
              type="file"
              className="input_form"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="block primary my-2">
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}
