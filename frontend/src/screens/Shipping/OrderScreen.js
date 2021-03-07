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
        <div className="order-page-section__status p-3 my-2">
          {order.orderItems.map((item)=>(
            <li key={item.seller}> 
              <h3>ร้าน : {item.seller}</h3>
              {item.isDelivered? (
                  <div className="col">
                  <div className="inline-flex">
                    <p className="text-bold">สถานะการจัดส่ง: </p>
                    <p className=" ml-1">จัดส่งเรียบร้อย</p>
                  </div>
                  <div className="inline-flex">
                    <p className="text-bold">วันเวลาการจัดส่ง: </p>
                    <p className=" ml-1">{item.deliveredAt}</p>
                  </div>
                  <div className="inline-flex">
                    <p className="text-bold">หมายเลขพัสดุ: </p>
                    <p className=" ml-1">{item.deliveredNumber}</p>
                  </div>
                </div>
              ):(
                <div className="inline-flex">
              <p className="text-bold">สถานะการจัดส่ง: </p>
              <p className=" ml-1">ยังไม่จัดส่ง</p>
            </div>
              )}
            </li>
          ))}
        
        </div>
        <div className="order-page-section__address p-3 my-2">
          ที่อยู่ในการจัดส่ง
          <p>
            <strong>{order.shippingAddress.fullName}</strong> {"  "}
            {order.shippingAddress.address} {order.shippingAddress.country}
            {"  "}
            {order.shippingAddress.postalCode} {"  "}{" "}
            {order.shippingAddress.tel}
          </p>
        </div>
        <div className="order-page-section__order p-3 my-2">
          สั่งซื้อสินค้าแล้ว
          <ul>
            {order.orderItems.map((item) => (
              <ul>
                <div key={item._id}>
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
                            <Link to={`/products/product/${result.product}`}>
                              {result.name}
                            </Link>
                          </div>

                          <div className="cart-page-section__price">
                            ${result.price} x {result.qty} = $
                            {(result.price * result.qty)
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                </div>
              </ul>
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
              <p className="py-1">ค่าจัดส่ง: {order.shippingPrice}</p>
              <p className="py-1">
                ราคารวมสินค้า:{" "}
                {order.totalPrice
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>
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
