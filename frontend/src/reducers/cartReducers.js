import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartContansts";

export const cartReducer = (
  state = { cartItems: [], cartItemsGroup: [] },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      const test1 = state.cartItemsGroup.find((x) => x.seller === item.seller);
      if (!test1) {
        /* ไม่มี*/
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          cartItemsGroup: [
            ...state.cartItemsGroup,
            { seller: item.seller, products: [item] },
          ],
        };
      } else {
        /* มี*/
        const test = state.cartItems.filter((x) => x.seller === item.seller);

        const arr = [];
        arr.push(...test, item);
  

        return {
          ...state,
          cartItems: [...state.cartItems, item],
          cartItemsGroup: state.cartItemsGroup.map((x) =>
            x.seller === item.seller
              ? { seller: item.seller, products: arr }
              : x
          ),
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: "",
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.productId
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state, error: "", cartItems: [] };
    default:
      return state;
  }
};
