import {
  POST_CART_ADDRESS,
  SET_CART,
  SET_ACCOUNT_EXIST,
  SET_SHIPPING_ADDRESS,
  SET_BILLING_ADDRESS,
  SET_SHOW_HEADER,
  SET_NEW_BILLING_ADDRESS,
  SET_EMPTY_CART,
  SET_CAN_CHECKOUT,
  SET_GUEST_EMAIL,
  GET_ORDER_INFO,
  RECORD_CHECKOUTSTEP,
  SET_WISHLIST,
} from "./CheckoutActions";

const initialState = {
  // empty_cart: false,
  can_checkout: false,
};

const CheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      const data = action.payload;
      console.log("reducer set cart", data);
      return {
        ...state,
        product_list: data.product_list,
        priceCalcResult: data.priceCalcResult,
        // customer: data.customer,
        // total_segments: data.total_segments,
        // coupon_used: data.coupon_used,
        // billing_address: data.billing_address,
        // shipping_address: data.shipping_address,
        // shipping_methods: data.shipping_methods,
        // payment_methods: data.payment_methods,
        // wish_list: data.wish_list
      };
    case SET_ACCOUNT_EXIST:
      console.log("SET_ACCOUNT_EXIST");
      return {
        ...state,
        guest_account_exist: action.payload,
      };
    case SET_GUEST_EMAIL:
      return {
        ...state,
        guest_email: action.payload,
      };
    case SET_SHIPPING_ADDRESS:
      console.log("reducer received SET_SHIPPING_ADDRESS");
      return {
        ...state,
        shipping_address: action.payload,
      };
    case SET_BILLING_ADDRESS:
      console.log("reducer received SET_BILLING_ADDRESS");
      return {
        ...state,
        billing_address: action.payload,
      };
    case SET_EMPTY_CART: // This reducer is used to control whether we show the empty cart
      console.log("now show the empty cart");
      return {
        ...state,
        empty_cart: action.payload,
      };
    case SET_CAN_CHECKOUT:
      console.log("unlock the checkout button");
      return {
        ...state,
        can_checkout: action.payload,
      };

    case GET_ORDER_INFO:
      console.log("unlock the checkout button");
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export const getProductList = state => state.checkout.product_list;

export const getCustomer = state => state.checkout.customer;

export const getTotalSegments = state => ((state.checkout.priceCalcResult && state.checkout.priceCalcResult.value) ? state.checkout.priceCalcResult.value : null);
// export const getTotalSegments = state => state.checkout.priceCalcResult;

export const getCouponUsed = state => state.checkout.coupon_used;

export const getBillingAddress = state => state.checkout.billing_address;

export const getNewBillingAddress = state => state.checkout.new_billing_address;

export const getShippingAddress = state => state.checkout.shipping_address;

export const getPaymentMethods = state => state.checkout.payment_methods;

export const getGuestAccountExist = state => state.checkout.guest_account_exist;

export const getGuestEmail = state => state.checkout.guest_email;

// export const getEmptyCart = state => state.checkout.empty_cart;

export const getCanCheckout = state => state.checkout.can_checkout;

export const getUserInfo = state => state.checkout.userInfo;

export default CheckoutReducer;
