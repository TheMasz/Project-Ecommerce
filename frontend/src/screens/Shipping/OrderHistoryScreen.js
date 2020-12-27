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
          onClick={e=>props.history.push(`/order/${order._id}`)}
          key={index}
        >
          {order.orderItems.map((item) => (
            <div className="order-content__item__product row py-1">
              <div className="row">
                <div className="order-content__item__image">
                  <div
                    className="image__content"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </div>
                <div className="order-content__item__detail-content">
                  <div className="order-content__item__name">{item.name}</div>
                  <div className="order-content__item__quantity">
                    x{item.qty}
                  </div>
                </div>
              </div>
              <div className="order-content__item__price">${item.price}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
