import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { listOrderAdmin } from "../../actions/orderActions";
import { listProduct } from "../../actions/productActions";
import { userList } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function DashboardScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { loading: LoadingOrders, error: errorOders, orders } = orderAdminList;
  const listUser = useSelector((state) => state.userList);
  const { loading: LoadingUSer, error: errorUser, users } = listUser;
  useEffect(() => {
    dispatch(listProduct({}));
    dispatch(listOrderAdmin());
    dispatch(userList());
  }, [dispatch]);
  return (
    <div className="container">
      {loading || LoadingOrders || LoadingUSer ? (
        <LoadingBox />
      ) : error || errorOders || errorUser ? (
        <MessageBox variant="danger">
          {error || errorOders || errorUser}
        </MessageBox>
      ) : (
        <div className="bg-white mt-4 dashboard-page-section">
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Task", "Hours per Day"],
              ["Products", products.length],
              ["Users", users.length],
              ["Orders", orders.length],
            ]}
            options={{
              title: "รายละเอียด",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </div>
      )}
    </div>
  );
}
