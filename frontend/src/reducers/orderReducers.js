import {
  ORDER_ADMIN_LIST_FAIL,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_ISPAID_FAIL,
  ORDER_ISPAID_REQUEST,
  ORDER_ISPAID_RESET,
  ORDER_ISPAID_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_SELL_DETAIL_FAIL,
  ORDER_SELL_DETAIL_REQUEST,
  ORDER_SELL_DETAIL_SUCCESS,
  ORDER_SELL_LIST_FAIL,
  ORDER_SELL_LIST_REQUEST,
  ORDER_SELL_LIST_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderSellListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_SELL_LIST_REQUEST:
      return { loading: true };
    case ORDER_SELL_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_SELL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderSellDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_SELL_DETAIL_REQUEST:
      return { loading: true };
    case ORDER_SELL_DETAIL_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_SELL_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderAdminListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ADMIN_LIST_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: false };
    case ORDER_PAY_SUCCESS:
      return { loading: false,  success: true, };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderIsPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ISPAID_REQUEST:
      return { loading: false };
    case ORDER_ISPAID_SUCCESS:
      return { loading: false,  success: true, };
    case ORDER_ISPAID_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ISPAID_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: false };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false,  success: true, };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};