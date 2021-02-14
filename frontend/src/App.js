import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { useDispatch, useSelector } from "react-redux";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import SignupScreen from "./screens/SignupScreen";
import AddressScreen from "./screens/Shipping/AddressScreen";
import PaymentScreen from "./screens/Shipping/PaymentScreen";
import PlaceOrderScreen from "./screens/Shipping/PlaceOrderScreen";

import OrderHistoryScreen from "./screens/Shipping/OrderHistoryScreen";
import OrderScreen from "./screens/Shipping/OrderScreen";
import PaymentBankScreen from "./screens/Shipping/PaymentBankScreen";

import SellerScreen from "./screens/Seller/SellerScreen";

import NewProduct from "./screens/Seller/AddProducts/NewProduct";
import CategoryScreen from "./screens/CategoryScreen";
import CategoriesScreen from "./screens/Seller/AddProducts/CategoriesScreen";
import MyProductsScreen from "./screens/Seller/AddProducts/MyProductsScreen";
import EditProduct from "./screens/Seller/AddProducts/EditProduct";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import SellerShopScreen from "./screens/SellerShopScreen";
import EditUserScreen from "./screens/EditUserScreen";
import SellOrdersList from "./screens/Seller/AddProducts/SellOrdersList";
import AdminRoute from "./components/AdminRoute";
import DashboardScreen from "./screens/Admin/DashboardScreen";
import ProductsScreen from "./screens/Admin/ProductsScreen";
import UsersScreen from "./screens/Admin/UsersScreen";
import OrdersScreen from "./screens/Admin/OrdersScreen";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [isDropdown, setDropdown] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const btnDropdonw = (e) => {
    e.preventDefault();
    setDropdown(!isDropdown);
  };
  const handleScroll = (e) => {
    e.preventDefault();
    const offset = window.scrollY;
    if (offset >= 300) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  const signoutHandler = (e) => {
    dispatch(signout());
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  const getUnique = (items, value) => {
    return [...new Set(items.map((item) => item[value]))];
  };
  return (
    <BrowserRouter>
      <header className={`${isSticky ? "sticky" : ""} `}>
        <div className="nav-main row no-wrap">
          <div className="row no-wrap">
            <Link to="/" className="text-title text-bold">
              Logo
            </Link>
          </div>
          <ul className="links row no-wrap">
            <li>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </li>
            <li>
              <Link to="/cart">
                <img
                  src="/assets/icons/cart.svg"
                  alt="cart"
                  className="small_img"
                />
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            </li>
            <li>
              {userInfo ? (
                <div className="dropdown" onClick={btnDropdonw}>
                  <div className="row avatar-with-name">
                    <div
                      className="avatar"
                      style={
                        userInfo.avatar
                          ? {
                              background: `url('/uploads/users/${userInfo.avatar}')`,
                            }
                          : { background: "url('/assets/icons/user.svg')" }
                      }
                    ></div>
                    <Link to="#" className="text-sub-form">
                      {userInfo.name} <i className="fa fa-caret-down p-1"></i>
                    </Link>
                  </div>
                  <ul
                    className={`${
                      isDropdown
                        ? "dropdown-content-active"
                        : "dropdown-content"
                    }`}
                  >
                    {userInfo.isAdmin && (
                      <Link to="/dashboard" className="text-sub-form">
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to={`/profile/${userInfo._id}`}
                      className="text-sub-form"
                    >
                      Account
                    </Link>
                    <Link to="/seller" className="text-sub-form">
                      Seller
                    </Link>
                    <Link to="/orderhistory" className="text-sub-form">
                      Orders
                    </Link>
                    <Link
                      to="#signout"
                      className="text-sub-form"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">
                  <img
                    src="/assets/icons/user.svg"
                    alt="user"
                    className="small_img"
                  />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </header>

      <main>
        <AdminRoute
          path="/dashboard/products"
          component={ProductsScreen}
          exact
        />
        <AdminRoute path="/dashboard/orders" component={OrdersScreen} exact />
        <AdminRoute path="/dashboard/users" component={UsersScreen} exact />
        <AdminRoute path="/dashboard" component={DashboardScreen} exact />
        <Route
          path="/search/name/:name?"
          component={SearchScreen}
          exact
      />
       <Route
          path="/search/category/:category?"
          component={SearchScreen}
          exact
      />
      <Route
          path="/search/category/:category/name/:name/sortBy/:sortBy"
          component={SearchScreen}
          exact
      />
     
        <Route path="/profile/:id" component={EditUserScreen} exact />
        <Route path="/shop/seller/:id" component={SellerShopScreen} exact />
        <Route
          path="/product/pageNumber/:pageNumber"
          component={ProductsListScreen}
        />
        <Route path="/order/:id/pay" component={PaymentBankScreen} exact />
        <Route path="/orderhistory" component={OrderHistoryScreen} exact />
        <Route path="/order/:id" component={OrderScreen} exact />
        <Route path="/placeorder" component={PlaceOrderScreen} exact />
        <Route path="/payments" component={PaymentScreen} exact />
        <Route path="/shipping" component={AddressScreen} exact />
        <Route path="/seller" component={SellerScreen} exact />
        <Route
          path="/portal/product/categories"
          component={CategoriesScreen}
          exact
        />
        <Route path="/portal/product/new" component={NewProduct} exact />
        <Route path="/portal/sell/orders" component={SellOrdersList} exact />
        <Route path="/portal/product/:id/edit" component={EditProduct} exact />
        <Route path="/portal/product/list" component={MyProductsScreen} exact />
        <Route path="/signup" component={SignupScreen} exact />
        <Route path="/signin" component={SigninScreen} exact />
        <Route path="/cart/:id?" component={CartScreen} exact />
        <Route path="/products/category/:category" component={CategoryScreen} />
        <Route path="/products/product/:id" component={ProductScreen} exact />
        <Route path="/" component={HomeScreen} exact />
      </main>
                <Footer/>
    </BrowserRouter>
  );
}

export default App;
