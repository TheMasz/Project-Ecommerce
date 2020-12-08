import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ListProductScreen from "./screens/ListProductScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LinkCategory from "./components/LinkCategory";
import CategoryScreen from "./screens/CategoryScreen";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;
  const [isToggler, setToggler] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const btnToggler = (e) => {
    e.preventDefault();
    setToggler(!isToggler);
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
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  const getUnique = (items, value) => {
    return [...new Set(items.map((item)=>item[value]))]
  }
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
              <Link to="/">
                <img
                  src="/assets/icons/cart.svg"
                  alt="cart"
                  className="small_img"
                />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img
                  src="/assets/icons/user.svg"
                  alt="user"
                  className="small_img"
                />
              </Link>
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
              {getUnique(products, 'category').map((item, index)=>(
                <li>{item}</li>
              ))} 
          </>
        )}
        {/* <Link to="/products/all" className="text-title text-capitalize links-category">All</Link>
        <LinkCategory category="Shirts" />
        <LinkCategory category="Pants" />
        <LinkCategory category="Sneaker" />
        <LinkCategory category="Belt" /> */}
      </div>
      <main>
        <Route path="/products/category/:category" component={CategoryScreen} />
        <Route path="/products/:showList" component={ListProductScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/" component={HomeScreen} exact />
      </main>
    </BrowserRouter>
  );
}

export default App;
