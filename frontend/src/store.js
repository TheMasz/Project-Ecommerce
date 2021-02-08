import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
  productCategoryListReducer,
  productSellerListReducer,
} from "./reducers/productReducers";
import {
  userInfoReducer,
  userListReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  categoriesReducer,
  mineProductReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
} from "./reducers/addProductReducers";
import {
  orderAdminListReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderIsPaidReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSellListReducer,
} from "./reducers/orderReducers";
import { uploadReducer } from "./reducers/uploadReducers";
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
      cartItemsGroup: localStorage.getItem("cartItemsGroup")
      ? JSON.parse(localStorage.getItem("cartItemsGroup"))
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
  productCategoryList: productCategoryListReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userUpdate: userUpdateReducer,
  userInfo: userInfoReducer,
  userList:userListReducer,
  categories: categoriesReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  orderSellerList: orderSellListReducer,
  orderAdminList: orderAdminListReducer,
  orderPay: orderPayReducer,
  orderIsPaid: orderIsPaidReducer,
  upload: uploadReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productSeller: productSellerListReducer,
  mineProduct: mineProductReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
