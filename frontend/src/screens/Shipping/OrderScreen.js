import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId, props.history]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      <div className="order-page-section bg-white p-3 mt-4">
        <div className="order-page-section__status p-3 my-2"></div>
        <div className="order-page-section__address p-3 my-2">
          ที่อยู่ในการจัดส่ง
          <p>
            <strong>{order.shippingAddress.fullName}</strong> {"  "}
            {order.shippingAddress.address} {order.shippingAddress.country}
            {"  "}
            {order.shippingAddress.postalCode}
          </p>
        </div>
        <div className="order-page-section__order p-3 my-2">
          สั่งซื้อสินค้าแล้ว
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.product}>
                <div className="cart-page-section__item row space-evenly py-3">
                  <div
                    className="cart-page-section__image image__content"
                    style={{
                      background: `url('/uploads/products/${item.product}/${item.image}')`,
                    }}
                  ></div>
                  <div className="cart-page-section__description">
                    <p>{item.category}</p>
                    <Link to={`/products/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </div>

                  <div className="cart-page-section__price">
                    ${item.price} x {item.qty} = ${item.price * item.qty}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-page-section__payment p-3 my-2">
          <div className="row order-page-section__payment__header">
            <p>วิธีชำระเงิน</p>
            <p>{order.paymentMethod}</p>
          </div>
          <div className="d-flex flex-end ">
            <div className="py-2">
              <p className="py-1">
                ราคารวมสินค้า:{" "}
                {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </p>
              <p className="py-1">ค่าจัดส่ง: {order.shippingPrice}</p>
              <p className="py-1">ราคารวมสินค้า: {order.totalPrice}</p>
            </div>
          </div>
        </div>
        {order.paymentMethod === "โอน/ชำระเงินผ่านธนาคาร" && (
          <div>
            <button
              className="block primary "
              onClick={(e) => props.history.push(`/order/${order._id}/pay`)}
              disabled={order.paymentImg}
            >
              {order.paymentImg ? "ชำระเรียบร้อย" : "หลักฐานการชำระเงิน"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
