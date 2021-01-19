import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productShowListReducer,
  productDetailsReducer,
  productListReducer,
  productCategoryReducer,
} from "./reducers/productReducers";
import { userSigninReducer, userSignupReducer } from "./reducers/userReducers";
import { categoriesReducer, mineProductReducer, productCreateReducer, productUpdateReducer } from "./reducers/addProductReducers";
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from "./reducers/orderReducers";
import {uploadReducer} from './reducers/uploadReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : {},
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productShowList: productShowListReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  categories: categoriesReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  orderPay: orderPayReducer,
  upload: uploadReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  mineProduct: mineProductReducer,

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
