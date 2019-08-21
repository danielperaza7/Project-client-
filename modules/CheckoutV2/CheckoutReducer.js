// === Import Actions ===
import {
  SET_CART,
  SET_LOADING_CART,
  SET_CHECKOUT_STEP,
  SET_WISHLIST,
  SET_REDEEMABLE_PRODUCT_LIST,
  SET_RPRPLIST,
  SET_REDEEMED_POINTS_IN_CART,
  NEXT_CHECKOUT_STEP,
  SET_SHIP_EXIST_ID,
  SET_SHIP_NEW,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  SET_USE_AS_BILLING,
  SET_BILL_NEW,
  SET_BILL_EXIST_ID,
  SET_BILLING_ADDRESS,
  SET_ORDER_EMAIL,
  SET_BRAINTREE_TOKEN,
  SET_PAYMENT_METHOD,
  SET_BRAINTREE_SAVED_SELECTED,
  SET_BRAINTREE_CARD_INSTANCE,
  SET_PAYPAL_NONCE,
  SET_CREDIT_CARD_NONCE,
  SET_PAYMENT_SAVED_DETAIL,
  SET_CREDIT_CARD_DETAIL,
  SET_PAYPAL_DETAIL,
  SET_SAVE_SHIPPINGADDRESS,
  SET_SAVE_BILLINGADDRESS,
  SET_SUBSCRIBE_EMAIL,
  SET_BILLING_FORM_STATUS,
  SET_ORDER_SUCCESS_DATA,
  RESET_CHECKOUT_STATE,
  SET_SHIPPINGMETHOD_STATUS,
  RESET_CHECKOUT_PART_STATE,
  SET_SAVE_NEW_PAYMENT,
  RESET_PAYMENT,
  SET_REFER_SOURCE,
  SET_PAY_WITH_NEW,
  SET_ORDER_PHONE,
} from "./CheckoutActions";

// === Initiate State ===
const initialState = {
  loadingCart: true,
  checkoutStep: 0,

  orderEmail: null,
  orderPhone: null,

  shipNew: false,
  // shipNewAddressConfirmed: false, // address validatation, do we must need this state ?
  shipExistID: null,
  shippingAddress: null,

  useAsBilling: true,
  billNew: false,
  billExistId: null,
  billingAddress: null,

  paymentMethod: null, // 'braintree_saved', 'braintree_credit_card', 'braintree_paypal_account'
  paymentMethodDetailSaved: null,
  paymentMethodDetailCreditCard: null,
  paymentMethodDetailPaypal: null,
  braintreeCreditCardHostedFieldsInstance: null,
  tokenBraintreeSavedSelected: null,
  nonceBraintreeCreditCardFeteched: null,
  nonceBraintreePaypalAccountFeteched: null,
  saveNewPayment: true,
  braintreeClientToken: null,
  saveNewAddress: true,
  subscribeEmail: true,

  // rewardPointsToUse: 0,  // use priceCalcResult.value.reward_point_usage instead, keep consistency with backend
  // accountBalanceToUse: 0,  // use priceCalcResult.value.gift_card_usage instead, keep consistency with backend

  shippingMethod: null,
  billingFormStatus: false,

  orderSuccessData: null,
  shippingMethod_selected: false,
  payNew: false,

  // referType: null,
  // referID: '',
};

// === Reducer ===
const CheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        priceCalcResult: action.payload.priceCalcResult,
        loadingCart: false,
      };
    case SET_LOADING_CART:
      return {
        ...state,
        loadingCart: action.payload,
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case SET_REDEEMABLE_PRODUCT_LIST:
      return {
        ...state,
        redeemableProductList: action.payload,
      };
    case SET_RPRPLIST:
      return {
        ...state,
        rprplist: action.payload,
      };

    case SET_REDEEMED_POINTS_IN_CART:
      return {
        ...state,
        redeemedPointsInCart: action.payload,
      };
    case SET_CHECKOUT_STEP:
      return {
        ...state,
        checkoutStep: action.payload,
      };
    case NEXT_CHECKOUT_STEP:
      return {
        ...state,
        checkoutStep: state.checkoutStep + 1,
      };
    case SET_SHIP_EXIST_ID:
      return {
        ...state,
        shipExistID: action.payload,
        shipNew: false,
      };
    case SET_SHIP_NEW:
      return {
        ...state,
        shipNew: action.payload,
      };
    case SET_PAY_WITH_NEW:
      return {
        ...state,
        payNew: action.payload,
      };
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SET_USE_AS_BILLING:
      return {
        ...state,
        useAsBilling: true,
        billNew: false,
      };
    case SET_BILL_EXIST_ID:
      return {
        ...state,
        billExistID: action.payload || state.billExistID,
        billNew: false,
        useAsBilling: false,
      };
    case SET_BILL_NEW:
      return {
        ...state,
        billNew: true,
        useAsBilling: false,
      };
    case SET_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.payload,
      };
    case SET_ORDER_EMAIL:
      return {
        ...state,
        orderEmail: action.payload,
      };
    case SET_ORDER_PHONE:
      return {
        ...state,
        orderPhone: action.payload,
      };
    case SET_SHIPPING_METHOD:
      return {
        ...state,
        shippingMethod: action.payload,
      };
    case SET_BRAINTREE_TOKEN:
      return {
        ...state,
        braintreeClientToken: action.payload,
      };
    case SET_PAYMENT_METHOD:
      if (action.payload !== "braintree_saved") {
        return {
          ...state,
          paymentMethod: action.payload,
          tokenBraintreeSavedSelected: null,
        };
      }
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case SET_BRAINTREE_SAVED_SELECTED:
      return {
        ...state,
        tokenBraintreeSavedSelected: action.payload,
        paymentMethod: "braintree_saved",
      };
    case SET_BRAINTREE_CARD_INSTANCE:
      return {
        ...state,
        braintreeCreditCardHostedFieldsInstance: action.payload,
      };
    case SET_PAYPAL_NONCE:
      return {
        ...state,
        nonceBraintreePaypalAccountFeteched: action.payload,
      };
    case SET_CREDIT_CARD_NONCE:
      return {
        ...state,
        nonceBraintreeCreditCardFeteched: action.payload,
      };
    case SET_PAYMENT_SAVED_DETAIL:
      return {
        ...state,
        paymentMethodDetailSaved: action.payload,
      };
    case SET_CREDIT_CARD_DETAIL:
      return {
        ...state,
        paymentMethodDetailCreditCard: action.payload,
      };
    case SET_PAYPAL_DETAIL:
      return {
        ...state,
        paymentMethodDetailPaypal: action.payload,
      };
    case SET_SAVE_NEW_PAYMENT:
      return {
        ...state,
        saveNewPayment: action.payload,
      };
    case SET_SAVE_SHIPPINGADDRESS:
      return {
        ...state,
        saveNewShippingAddress: action.payload,
      };
    case SET_SUBSCRIBE_EMAIL:
      return {
        ...state,
        subscribeEmail: action.payload,
      };
    case SET_SAVE_BILLINGADDRESS:
      return {
        ...state,
        saveNewBillingAddress: action.payload,
      };
    case SET_BILLING_FORM_STATUS:
      return {
        ...state,
        billingFormStatus: action.payload,
      };
    // case SET_APPLIED_COUPON:
    //   let newCouponList = state.coupon_list?state.coupon_list.map(coupon => {return coupon}):[];
    //   newCouponList.push(action.payload);
    //   return {
    //       ...state,
    //       coupon_list: newCouponList,
    //   };
    case SET_ORDER_SUCCESS_DATA:
      return {
        ...state,
        orderSuccessData: action.payload,
      };
    case SET_SHIPPINGMETHOD_STATUS:
      return {
        ...state,
        shippingMethod_selected: action.payload,
      };
    case RESET_CHECKOUT_STATE:
      return {
        ...initialState,
        loadingCart: false,
      };
    case RESET_CHECKOUT_PART_STATE:
      return {
        ...initialState,
        saveNewAddress: state.saveNewAddress,
        billingAddress: state.billingAddress,
        shippingAddress: state.shippingAddress,
        loadingCart: false,
        rprplist: state.rprplist,
      };
    case RESET_PAYMENT:
      return {
        ...state,
        tokenBraintreeSavedSelected: null,
        nonceBraintreeCreditCardFeteched: null,
        nonceBraintreePaypalAccountFeteched: null,
        checkoutStep: 2,
      };
    case SET_REFER_SOURCE:
      return {
        ...state,
        referID: action.payload.referID,
        referType: action.payload.referType,
      };
    default:
      return state;
  }
};

// === Export Getters ===
export const getLoadingCart = state => state.checkout.loadingCart;

export const getPriceCalcResult = state => state.checkout.priceCalcResult;

export const getProductList = (state) => {
  // console.log('getProductList called');
  const res = [];
  if (state.checkout.priceCalcResult && state.checkout.priceCalcResult.value) {
    const val = state.checkout.priceCalcResult.value;
    if (val.sub_products && val.sub_products.length > 0) {
      for (let i = 0; i < val.products.length; i++) {
        const curProduct = val.products[i];
        // console.log('curProduct', curProduct);
        if (curProduct.sub_products && curProduct.sub_products.length > 0) {
          let min = Number.MAX_SAFE_INTEGER;
          for (let j = 0; j < curProduct.sub_products.length; j++) {
            for (let k = 0; k < val.sub_products.length; k++) {
              if (val.sub_products[k].sku === curProduct.sub_products[j]) {
                // console.log('sub_products', val.sub_products[k]);
                min = Math.min(min, val.sub_products[k].stock.qty);
              }
            }
          }
          if (min > 0) {
            curProduct.stock.in_stock = true;
            curProduct.stock.qty = min;
          }
          res.push(curProduct);
        } else {
          res.push(curProduct);
        }
      }
    } else {
      for (let i = 0; i < val.products.length; i++) {
        const curProduct = val.products[i];
        res.push(curProduct);
      }
    }
  }
  return res;
  // return state.checkout.priceCalcResult && state.checkout.priceCalcResult.value && state.checkout.priceCalcResult.value.products;
};

export const getWishListInfo = state => state.checkout.wishlist;

export const getRedeemableProductInfo = state => state.checkout.redeemableProductList;

// rprplist is redeemed reward products in carts, not redeemable products list
export const getRPRPListInfo = state => state.checkout.rprplist;

export const getRedeemedPointsInCart = state => state.checkout.redeemedPointsInCart;

export const getCartIsEmpty = state => !(
  state.checkout.priceCalcResult
    && state.checkout.priceCalcResult.value
    && state.checkout.priceCalcResult.value.products
    && Array.isArray(state.checkout.priceCalcResult.value.products)
    && state.checkout.priceCalcResult.value.products.length > 0
); // FERV2

export const getCheckoutStep = state => state.checkout.checkoutStep;

export const getShipNew = state => state.checkout.shipNew;

export const getShipExistID = state => state.checkout.shipExistID;

export const getUseAsBilling = state => state.checkout.useAsBilling;

export const getBillNew = state => state.checkout.billNew;

export const getBillExistID = state => state.checkout.billExistID;

export const getOrderEmail = state => state.checkout.orderEmail;

// payment getters:
export const getBraintreeToken = state => state.checkout.braintreeClientToken;
export const getPaymentMethod = state => state.checkout.paymentMethod;
export const getTokenBraintreeSavedSelected = state => state.checkout.tokenBraintreeSavedSelected;
export const getBraintreeCardInstance = state => state.checkout.braintreeCreditCardHostedFieldsInstance;
export const getNonceBraintreeCreditCard = state => state.checkout.nonceBraintreeCreditCardFeteched;
export const getNonceBraintreePaypal = state => state.checkout.nonceBraintreePaypalAccountFeteched;
export const getPaymentMethodDetailSaved = state => state.checkout.paymentMethodDetailSaved;
export const getPaymentMethodDetailCreditCard = state => state.checkout.paymentMethodDetailCreditCard;
export const getPaymentMethodDetailPaypal = state => state.checkout.paymentMethodDetailPaypal;
export const getSaveNewPayment = state => state.checkout.saveNewPayment;

export const getRewardPointsToUse = state => (state.checkout.priceCalcResult
    && state.checkout.priceCalcResult.value
    && state.checkout.priceCalcResult.value.reward_point_usage)
  || 0;

export const getAccountBalanceToUse = state => (state.checkout.priceCalcResult
    && state.checkout.priceCalcResult.value
    && state.checkout.priceCalcResult.value.gift_card_usage)
  || 0;

export const getCurrentShippingMethod = state => state.checkout.shippingMethod;

export const getCurrentShippingAddress = state => state.checkout.shippingAddress;

export const getCurrentBillingAddress = state => state.checkout.billingAddress;

export const getSaveNewShippingAddress = state => state.checkout.saveNewShippingAddress;

export const getSaveNewBillingAddress = state => state.checkout.saveNewBillingAddress;

export const getSubscribeEmail = state => state.checkout.subscribeEmail;

export const getbillingFormStatus = state => state.checkout.billingFormStatus;

export const getOrderSuccessData = state => state.checkout.orderSuccessData;

export const getShippingMethodSelected = state => state.checkout.shippingMethod_selected;

export const getSaveNewAddress = state => state.checkout.saveNewAddress;

export const getReferID = state => (state.checkout.referID ? state.checkout.referID : "");

export const getReferType = state => state.checkout.referType;

export const getPayNew = state => state.checkout.payNew;

export const getOrderPhone = state => state.checkout.orderPhone;

export default CheckoutReducer;
