import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ListProductScreen from "./screens/ListProductScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LinkCategory from "./components/LinkCategory";
import CategoryScreen from "./screens/CategoryScreen";
import { useDispatch, useSelector } from "react-redux";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import SignupScreen from "./screens/SignupScreen";
import CategoriesScreen from "./screens/AddProducts/CategoriesScreen";
import AddressScreen from "./screens/Shipping/AddressScreen";
import PaymentScreen from "./screens/Shipping/PaymentScreen";
import PlaceOrderScreen from "./screens/Shipping/PlaceOrderScreen";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;
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
    if (offset >= 100) {
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
      <header className={`${isSticky ? "sticky" : ""}`}>
        <div className="nav-main row">
          <div className="row">
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
              <Link to="/">
                <img
                  src="/assets/icons/magnifying-glass.svg"
                  alt="search"
                  className="small_img"
                />
              </Link>
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
                    <Link
                      to="/portal/product/categories"
                      className="text-sub-form"
                    >
                      Seller
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

      <div className={`category_container ${isToggler ? "active" : ""} `}>
        <h1 className="text-capitalize text-title py-3 text-underline">
          category
        </h1>
        {loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1>error</h1>
        ) : (
          <>
            {getUnique(products, "category").map((item, index) => (
              <LinkCategory key={index} category={item} />
            ))}
          </>
        )}
      </div>
      <main>
      <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/shipping" component={AddressScreen} />
        <Route path="/portal/product/categories" component={CategoriesScreen} />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/products/category/:category" component={CategoryScreen} />
        <Route
          path="/products/showList/:showList"
          component={ListProductScreen}
        />
        <Route path="/products/product/:id" component={ProductScreen} />
        <Route path="/" component={HomeScreen} exact />
      </main>
    </BrowserRouter>
  );
}

export default App;
