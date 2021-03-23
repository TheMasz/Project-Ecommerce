import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerDetailsOrder } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function BillScreen(props) {
  const orderId = props.match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderSellerDetails);
  const {
    order: DetailsOrder,
    loading: DetailsOrderLoading,
    error: DetailsOrderError,
  } = orderDetails;
  useEffect(() => {
    dispatch(sellerDetailsOrder(orderId));
  }, [dispatch, orderId]);
  
  var date = new Date();

  return DetailsOrderLoading ? (
    <LoadingBox />
  ) : DetailsOrderError ? (
    <MessageBox variant="danger">{DetailsOrderError}</MessageBox>
  ) : (
    <div className="container col center align-center">
      <div className="bill-section">
        <div className="col-1 bill-section_address">
          <div className="bill-section_header">TO (ADDRESSEE)</div>
          <p>
            Name: <span>{DetailsOrder.fullName}</span>
          </p>
          <p>
            Phone: <span>{DetailsOrder.tel}</span>
          </p>
          <p>
            Address:{" "}
            <span>
              {DetailsOrder.address} {DetailsOrder.postalCode}{" "}
              {DetailsOrder.country}
            </span>
          </p>
        </div>
        <div className="col-1 bill-section_products">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {DetailsOrder.item.products.map((product) => (
                    <p>{product.name}</p>
                  ))}
                </td>
                <td>
                  {DetailsOrder.item.products.map((product) => (
                    <p>x{product.qty}</p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-1 bill-section_footer ">
          <div className="bill-section_body">
            <div className="col-2 bill-section_body-left">
              <p>
                ORDER NO. <span>{orderId}</span>
              </p>
              <p>
                PICKUP DATE <span>{date.getDay()}/{date.getMonth()}/{date.getUTCFullYear()}</span>
              </p>
            </div>
            <div className="col-1 bill-section_body-right">
              <div className="bill-section_header">PAYMENT</div>
              {DetailsOrder.paymentMethod === "โอน/ชำระเงินผ่านธนาคาร" ? (
                <h4>ไม่ต้องเก็บเงิน</h4>
              ) : (
                <h4>เก็บเงินปลายทาง</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
