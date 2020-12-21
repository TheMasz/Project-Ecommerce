import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("โอน/ชำระเงินผ่านธนาคาร");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;
  if(!shippingAddress.address){
    props.history.push('/shipping')
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div className="container">
      <div className="bg-white p-3 mt-4">
        <CheckoutSteps step1 step2 step3 />
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="radio"
              id="bank"
              value="โอน/ชำระเงินผ่านธนาคาร"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <p className="py-2 text-sub-signin-form">โอน/ชำระเงินผ่านธนาคาร</p>
          </div>
          <div>
            <input
              type="radio"
              id="delivery"
              value="ชำระเงินปลายทาง"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <p className="py-2 text-sub-signin-form">ชำระเงินปลายทาง</p>
          </div>
          <button className="primary block mt-4" type="submit">
            ต่อไป
          </button>
        </form>
      </div>
    </div>
  );
}
