import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrderAdmin } from "../../actions/orderActions";
import { listProduct } from "../../actions/productActions";
import { userList } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";

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
        <div className="mt-4 dashboard-page-section">
          <div className="dashboard-page-section__top row">
            <div className="box-content blue">
              <div className="row box-content__body">
                <div className="box-content_left">
                  <div className="text-large">{products.length}</div>
                  <div className="text-overflow">Total Products</div>
                </div>
                <div className="box-content__right">
                <i className="fa fa-2x fa-cube"></i>
                </div>
              </div>
            </div>
            <div className="box-content red">
              <div className="row box-content__body">
                <div className="box-content_left">
                  <div className="text-large">{orders.length}</div>
                  <div className="text-overflow">Total Orders</div>
                </div>
                <div className="box-content__right">
                  <i className="fa fa-2x fa-shopping-cart"></i>
                </div>
              </div>
            </div>
            <div className="box-content orange">
              <div className="row box-content__body">
                <div className="box-content_left">
                  <div className="text-large">{users.length}</div>
                  <div className="text-overflow">Total Users</div>
                </div>
                <div className="box-content__right">
                <i className="fa fa-2x fa-user-o"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-page-section__bottom row">
            <div className="dashboard-page-section__left bg-white">
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="PieChart"
                loader={
                  <MessageBox variant="loading">Loading Chart</MessageBox>
                }
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
            <div className="dashboard-page-section__right bg-white">ปฎิทิน</div>
          </div>
        </div>
      )}
    </div>
  );
}
