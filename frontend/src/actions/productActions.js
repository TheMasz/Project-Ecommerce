import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SELLER_LIST_REQUEST,
  PRODUCT_SELLER_LIST_SUCCESS,
  PRODUCT_SELLER_LIST_FAIL,
} from "../constants/productConstants";

export const listProduct = ({
  name = "",
  sortBy = "",
  category = "",

}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      `/api/products?category=${category}&name=${name}&sortBy=${sortBy}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/product/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sellerProduct = (sellerId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_SELLER_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/shop/seller/${sellerId}`);
    dispatch({ type: PRODUCT_SELLER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SELLER_LIST_FAIL, payload: error.message });
  }
};
