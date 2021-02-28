 import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.totalPrice = cart.itemsPrice + ~~cart.paymentMethod.shippingPrice;
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItemsGroup }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div className="container">
      <div className="order-page-section bg-white p-3 mt-4">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="order-page-section__address p-3 my-2">
          ที่อยู่ในการจัดส่ง
          <p>
            <strong>{cart.shippingAddress.fullName}</strong> {"  "}
            {cart.shippingAddress.address} {cart.shippingAddress.country}
            {"  "}
            {cart.shippingAddress.postalCode} {"  "} {cart.shippingAddress.tel}
          </p>
        </div>
        <div className="order-page-section__order p-3 my-2">
          สั่งซื้อสินค้าแล้ว
          <ul>
            {cart.cartItemsGroup.map((item) => (
              <div key={item.seller}>
                <div className="cart-page-section__header">{item.seller}</div>
                <div className="cart-page-section__body">
                  {item.products.map((result) => (
                    <li key={result.product}>
                      <div className="cart-page-section__item row space-evenly py-3">
                        <div
                          className="cart-page-section__image image__content"
                          style={{
                            background: `url('/uploads/products/${result.product}/${result.image}')`,
                          }}
                        ></div>
                        <div className="cart-page-section__description">
                          <p>{result.category}</p>
                          <Link to={`/product/${result.product}`}>
                            {result.name}
                          </Link>
                        </div>

                        <div className="cart-page-section__price">
                          {(result.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} x {result.qty} = {' '}
                          {(result.price * result.qty).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} THB
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="order-page-section__payment p-3 my-2">
          <div className="row order-page-section__payment__header">
            <p>วิธีชำระเงิน</p>
            <p>{cart.paymentMethod.payment}</p>
          </div>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="d-flex flex-end ">
            <div className="py-2">
              <p className="py-1">
                ราคารวมสินค้า:{" "}
                {cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} บาท
              </p>
              <p className="py-1">
                ค่าจัดส่ง: {cart.paymentMethod.shippingPrice}
              </p>
              <p className="py-1">ราคารวมทั้งหมด: {(cart.totalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} บาท</p>
              <button
                className="primary block py-1"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                ยืนยันสั่งสินค้า
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
