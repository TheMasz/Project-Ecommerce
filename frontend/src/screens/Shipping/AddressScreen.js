import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function AddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullName, address, postalCode, country }));
    props.history.push("/payments");
  };
  return (
    <div className="container">
      <div className="bg-white p-3 mt-4">
        <CheckoutSteps step1 step2 />
        <form onSubmit={submitHandler}>
          <div>
            <h1>Shipping Address</h1>
          </div>
          <div>
            <p className="py-2 text-sub-form">Full Name</p>
            <input
              type="text"
              className="input_form"
              id="fullName"
              value={fullName}
              placeholder="โปรดระบุชื่อ-สกุล"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <p className="py-2 text-sub-form">Address</p>
            <input
              type="text"
              className="input_form"
              id="address"
              value={address}
              placeholder="โปรดระบุที่อยู่"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <p className="py-2 text-sub-form">Postal Code</p>
            <input
              type="text"
              className="input_form"
              id="postalCode"
              value={postalCode}
              placeholder="โปรดระบุรหัสไปรษณีย์"
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <p className="py-2 text-sub-form">Country</p>
            <input
              type="text"
              className="input_form"
              id="Country"
              value={country}
              placeholder="โปรดระบุประเทศ"
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button className="primary block mt-4" type="submit">
            ต่อไป
          </button>
        </form>
      </div>
    </div>
  );
}
