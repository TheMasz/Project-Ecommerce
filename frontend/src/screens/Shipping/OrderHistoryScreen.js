import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      {orders.map((order, index) => (
        <div
          className="order-page-section__order p-3 my-2 bg-white text-sub-form pointer"
          onClick={(e) => props.history.push(`/order/${order._id}`)}
          key={order._id}
        >
          {order.orderItems.slice(0, 1).map((item) => (
            <div className="order-content__item__product row py-1">
              <div className="row">
                <div className="order-content__item__image">
                  <div
                    className="image__content"
                    style={{
                      background: `url('/uploads/products/${item.products[0].product}/${item.products[0].image}')`,
                    }}
                  ></div>
                </div>
                <div className="order-content__item__detail-content">
                  <div className="order-content__item__name mx-1">
                    {item.products[0].name}
                  </div>
                </div>
              </div>
              <div className="order-content__item__price">
                {order.totalPrice
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                บาท
              </div>
            </div>
          ))}
        </div>
      ))}
      {orders.length === 0 && (
        <div className="no-data">
          <i className="fa fa-2x fa-calendar-o"></i>
          <div className="order-list-section__content py-1">
            ไม่พบคำสั่งซื้อ
          </div>
        </div>
      )}
    </div>
  );
}
