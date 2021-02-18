import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { userInfo } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { CART_EMPTY } from "../constants/cartContansts";

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, cartItemsGroup } = cart;
  const infoUser = useSelector((state) => state.userInfo);
  const { loading: sellerLoading, user } = infoUser;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty, cartItems, user]);
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  const removeFromCartHandler = (id, seller) => {
    dispatch(removeFromCart(id, seller));
    if (cartItems.length === 1) {
      dispatch({ type: CART_EMPTY });
      localStorage.setItem("cartItemsGroup", JSON.stringify([]));
    }
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
                {cartItemsGroup.map((item) => (
                  <div key={item.seller}>
                    <div className="cart-page-section__header">
                      {item.products[0] ? item.seller : ""}
                    </div>
                    <div className="cart-page-section__body">
                      {item.products.map((result) => (
                        <li key={result.product}>
                          <div className="cart-page-section__item py-3">
                            <div
                              className="cart-page-section__image image__content"
                              style={{
                                background: `url('/uploads/products/${result.product}/${result.image}')`,
                              }}
                            ></div>
                            <div className="cart-page-section__description">
                              <p>{item.category}</p>
                              <Link to={`/product/${result.product}`}>
                                {result.name}
                              </Link>
                            </div>
                            <div className="cart-page-section__qty ">
                              <select
                                className="input-wrap_select"
                                value={result.qty}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart(
                                      result.product,
                                      Number(e.target.value)
                                    )
                                  )
                                }
                              >
                                {[...Array(result.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <div className="cart-page-section__price">
                              {(result.price * result.qty)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                              บาท
                            </div>
                            <div className="cart-page-section__actions">
                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCartHandler(
                                    result.product,
                                    item.seller
                                  )
                                }
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="cart-page-checkout mt-4 p-3 bg-white">
            <div className="cart-page-checkout__section row">
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                {cartItems
                  .reduce((a, c) => a + c.price * c.qty, 0)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                THB
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
