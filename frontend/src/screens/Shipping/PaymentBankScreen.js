import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder, payOrder } from "../../actions/orderActions";
import { upload } from "../../actions/uploadActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function PaymentBankScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const [fourCode, setFourCode] = useState("");
  const [date, setDate] = useState();
  const [img, setImg] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    const img_name = img.name;
    const paymentResult = { fourCode, date, img_name };
    // dispatch(payOrder( order, paymentResult ));
    dispatch(upload(img))
 
  };
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
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
              name="image"
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
