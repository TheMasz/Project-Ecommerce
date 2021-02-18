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
      const sellProduct = state.cartItemsGroup.find(
        (x) => x.seller === item.seller
      );
      if (!sellProduct) {
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
        const sellProductsList = state.cartItems.filter(
          (x) => x.seller === item.seller
        );
        const arr = [];
        arr.push(...sellProductsList, item);

        if (existItem) {
          const product = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
          const products = product.filter((x) => x.seller === item.seller);
          return {
            ...state,
            error: "",
            cartItems: product,
            cartItemsGroup: state.cartItemsGroup.map((x) =>
              x.seller === item.seller
                ? { seller: item.seller, products: products }
                : x
            ),
          };
        } else {
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
      }

    case CART_REMOVE_ITEM:
      const sellCartList = state.cartItems.filter(
        (x) => x.product !== action.payload.productId
      );
      console.log("sellCartList", sellCartList);
      const sellProductsListDl = sellCartList.filter(
        (x) => x.seller === action.payload.sellerId
      );
      const arr = [];
      arr.push(...sellProductsListDl, sellCartList);
      console.log("sellProductsListDl", sellProductsListDl);
      return {
        ...state,
        error: "",
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.productId
        ),
        cartItemsGroup: state.cartItemsGroup.map((x) =>
          x.seller === action.payload.sellerId
            ? { seller: action.payload.sellerId, products: sellProductsListDl }
            : x
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state, error: "", cartItems: [], cartItemsGroup: [] };
    default:
      return state;
  }
};
