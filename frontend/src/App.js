import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="nav-main row">
          <div>
            <Link to="/" className="text-title text-bold">Logo</Link>
          </div>
          <ul className="links row">
            <li>
              <Link to="/">
                <img src="/assets/icons/magnifying-glass.svg" alt="search" className="small_img" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="/assets/icons/cart.svg" alt="cart" className="small_img" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="/assets/icons/user.svg" alt="user" className="small_img" />
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <Route path="/product/:id" component={ProductScreen}/>
        <Route path="/" component={HomeScreen} exact />
      </main>
    </BrowserRouter>
  );
}

export default App;
