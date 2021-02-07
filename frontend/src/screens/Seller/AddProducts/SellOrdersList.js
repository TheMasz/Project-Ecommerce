import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderSeller } from "../../../actions/orderActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";

export default function SellOrdersList() {
  const orderSellerList = useSelector((state) => state.orderSellerList);
  const { loading, error, orders } = orderSellerList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderSeller());
  }, [dispatch]);
  console.log(orders);
  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product-list-mian bg-white mt-4 p-3">
          <div className="order-panel-header">
            <div className="title">คำสั่งซื้อ</div>
          </div>
          <div className="order-list-pannel">
            <div className="order-list-section">
              {orders.map((result) =>
                result.item ? (
                  <table className="table-section">
                    <thead className="table-section__header">
                      <tr>
                        <th>สินค้าทั้งหมด</th>
                        <th>ที่อยู่</th>
                        <th>สถานะ</th>
                        <th>ดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody className="table-section__body">
                      <tr>
                        <td>
                          {result.item.products.map((item) => (
                            <p>
                              {item.name} x{item.qty}
                            </p>
                          ))}
                        </td>
                        <td>
                          <p>
                            {result.fullName} {result.address}{" "}
                            {result.postalCode} {result.country}
                          </p>
                        </td>
                        <td>
                          <div
                            className={`isPaid-status ${
                              result.isPaid ? "alert-success" : "alert-danger"
                            }`}
                          >
                            <p>
                              {result.isPaid
                                ? "ชำระเงินเรียบร้อย"
                                : "ยังไม่ชำระเงิน"}
                            </p>
                          </div>
                        </td>
                        <td>
                          <button type="button" className="primary">
                            จัดส่ง
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <>
                    <table className="table-section">
                      <thead className="table-section__header">
                        <tr>
                          <th>สินค้าทั้งหมด</th>
                          <th>ที่อยู่</th>
                          <th>สถานะ</th>
                          <th>ดำเนินการ</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="no-data">
                      <i className="fa fa-2x fa-calendar-o"></i>
                      <div className="order-list-section__content py-1">
                        ไม่พบคำสั่งซื้อ
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
