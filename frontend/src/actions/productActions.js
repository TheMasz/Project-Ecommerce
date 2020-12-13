import Axios from "axios";
import {
  PRODUCT_SHOWLIST_REQUEST,
  PRODUCT_SHOWLIST_SUCCESS,
  PRODUCT_SHOWLIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
} from "../constants/productConstants";

export const listProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/products/");
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

export const showListProduct = (showList) => async (dispatch) => {
  dispatch({ type: PRODUCT_SHOWLIST_REQUEST, payload: showList });
  try {
    const { data } = await Axios.get(`/api/products/showList/${showList}`);
    dispatch({ type: PRODUCT_SHOWLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SHOWLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const categoryProduct = (category) => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_REQUEST, payload: category });
  try {
    const { data } = await Axios.get(`/api/products/category/${category}`);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
