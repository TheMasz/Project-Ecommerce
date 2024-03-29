

const {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SELLER_LIST_REQUEST,
  PRODUCT_SELLER_LIST_SUCCESS,
  PRODUCT_SELLER_LIST_FAIL,
} = require("../constants/productConstants");

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSellerListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SELLER_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_SELLER_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_SELLER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

