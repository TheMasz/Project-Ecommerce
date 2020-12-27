import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function PaymentScreen(props) {
  const [payment, setPayment] = useState("โอน/ชำระเงินผ่านธนาคาร");
  const [shippingPrice, setShippingPrice] = useState(40);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({payment, shippingPrice}));
    props.history.push("/placeorder");
  };
  return (
    <div className="container">
      <div className="bg-white p-3 mt-4">
        <CheckoutSteps step1 step2 step3 />
        <form onSubmit={submitHandler}>
          <p className="text-bold py-1">เลือกวิธีชำระเงิน:</p>
          <div className="row flex-start">
            <input
              type="radio"
              id="bank"
              value="โอน/ชำระเงินผ่านธนาคาร"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPayment(e.target.value)}
            />
            <p className="py-2 pl-2 text-sub-signin-form">
              โอน/ชำระเงินผ่านธนาคาร
            </p>
          </div>
          <div className="row flex-start">
            <input
              type="radio"
              id="delivery"
              value="ชำระเงินปลายทาง"
              name="paymentMethod"
              required
              onChange={(e) => setPayment(e.target.value)}
            />
            <p className="py-2 pl-2 text-sub-signin-form">ชำระเงินปลายทาง</p>
          </div>
          <div className="py-1">
            <p className="text-bold">เลือกขนส่ง:</p>
            <select
              className="selector my-2"
              onChange={(e) => setShippingPrice(e.target.value)} 
            >
              <option value={30}  defaultChecked>Express</option>
              <option value={40}>Kerry</option>
            </select>
          </div>
          <button className="primary block mt-4" type="submit">
            ต่อไป
          </button>
        </form>
      </div>
    </div>
  );
}
