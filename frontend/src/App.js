import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isToggler, setToggler] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const btnToggler = (e) => {
    e.preventDefault();
    setToggler(!isToggler);
  };
  const btnDropdonw = (e) => {
    e.preventDefault();
    setDropdown(!isDropdown);
  };
  const handleScroll = (e) => {
    e.preventDefault();
    const offset = window.scrollY;
    if (offset >= 50) {
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
        <div className="nav-main row">
          <div className={`row ${isToggler ? "left-active" : ""}`}>
            <button className="btn_toggler" onClick={btnToggler}>
              <img
                src="/assets/icons/menu1.svg"
                className="small_img"
                alt="list"
              />
            </button>
            <Link to="/" className="text-title text-bold">
              Logo
            </Link>
          </div>
          <ul className="links row">
            <li>
              <SearchBox/>
             
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
                  <Link to="#" className="text-sub-form">
                    {userInfo.name} <i className="fa fa-caret-down p-1"></i>
                  </Link>
                  <ul
                    className={`${
                      isDropdown
                        ? "dropdown-content-active"
                        : "dropdown-content"
                    }`}
                  >
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

      <div className={`category_container ${isToggler ? "active" : ""} `}></div>
      <main>

      {/* <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route> */}
          <Route path="/product/pageNumber/:pageNumber" component={ProductsListScreen} />
        <Route path="/order/:id/pay" component={PaymentBankScreen} exact />
        <Route path="/orderhistory" component={OrderHistoryScreen} />
        <Route path="/order/:id" component={OrderScreen} exact />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/payments" component={PaymentScreen} />
        <Route path="/shipping" component={AddressScreen} />
        <Route path="/seller" component={SellerScreen} />
        <Route
          path="/portal/product/categories"
          component={CategoriesScreen}
          exact
        />
        <Route path="/portal/product/new" component={NewProduct} exact />
        <Route path="/portal/product/:id/edit" component={EditProduct}  exact/>
        <Route path="/portal/product/list" component={MyProductsScreen} exact />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/cart/:id?" component={CartScreen} exact />
        <Route path="/products/category/:category" component={CategoryScreen} />
        <Route path="/products/product/:id" component={ProductScreen} exact/>
        <Route path="/" component={HomeScreen} exact />
      </main>
    </BrowserRouter>
  );
}

export default App;
