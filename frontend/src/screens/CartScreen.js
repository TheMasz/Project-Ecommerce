import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container py-5">
      {cartItems.length === 0 ? (
        <MessageBox>
          Cart is empty. <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <>
          <div className="cart-page bg-white">
            <div className="cart-page-header">
              <div className="row py-1">
                <h1>Shopping Cart</h1>
                <p>{`In your bag ${cartItems.length} items`}</p>
              </div>
            </div>
            <div className="cart-page-section">
              <ul>
                {cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="cart-page-section__item row space-evenly py-3">
                      <div
                        className="cart-page-section__image image__content"
                        style={{ background: `url('/uploads/products/${item.product}/${item.image}')` }}
                      ></div>
                      <div className="cart-page-section__description">
                        <p>{item.category}</p>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="cart-page-section__qty ">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="cart-page-section__price">
                        {item.price}
                      </div>
                      <div className="cart-page-section__actions">
                        <button
                          type="button"
                          onClick={()=>removeFromCartHandler(item.product)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="cart-page-checkout mt-4 p-3 bg-white">
            <div className="cart-page-checkout__section row">
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                สั่งสินค้า
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
