/**
 * Created by warrenchen on 4/14/17.
 */
// import cases
import _ from "lodash";
import {
  SET_REVIEW_DATA,
  SET_REVIEW_ITEMS,
  SET_SHIP_TO_NEW,
  SET_ORDER_HISTORY,
  SET_ADDRESS_BOOK,
  SET_REWARD_POINTS,
  SET_GIFTCARD_BALANCE,
  SET_EDIT_FORM,
  SET_UPDATED_FORM,
  SET_NEW_FORM,
  SET_ADD_NEW,
  SET_DELETE_ADDRESS,
  SET_PAYMENT_METHOD,
  SET_DELETE_PAYMENTMETHOD,
  SET_DESCRIPTION,
  SET_RETURN_ORDER_ID,
  SET_RETURN_FROM_ADDRESS,
  SET_REFUND_ESTIMATE,
  SET_GUEST_ORDER
} from "./CustomerActions";
import { logout } from "../Authentication/AuthActions";

const initialState = {
  orderHistory: null,
  refund_cash_amount: -1,
  refund_account_balance_amount: -1,
  refund_rewardpoint_amount: -1,
  refundEstimate: null,
  guestOrder: null,
  shipNew: false,
  reviewItems: null,
  reviewData: null,
  orderHistoryLoading: true
};

export default (state = initialState, action) => {
  const address = state.addressBook;
  const edit_obj = _.find(address, addr => addr._id === action.id);

  switch (action.type) {
    case SET_ORDER_HISTORY:
      // console.log("order history received", action.payload);
      // console.log(action.payload);
      return {
        ...state,
        orderHistory: action.payload,
        orderHistoryLoading: false
      };

    case SET_REVIEW_ITEMS:
      // console.log("review items received", action.payload);
      return {
        ...state,
        reviewItems: action.payload
      };

    case SET_REVIEW_DATA:
      // console.log("review data received", action.payload);
      return {
        ...state,
        reviewData: action.payload
      };

    case SET_PAYMENT_METHOD:
      // console.log("set payment method");
      return {
        ...state,
        paymentMethod: action.payload
      };
    case SET_DELETE_PAYMENTMETHOD:
      // console.log("delete payment method received");
      return {
        ...state,
        paymentMethod: action.payload
      };
    case SET_ADDRESS_BOOK:
      // console.log("set address req received");
      return {
        ...state,
        addressBook: action.payload
      };
    case SET_ADD_NEW: {
      // console.log("data flow into reducer after addnew");
      return {
        ...state,
        addressBook: action.payload
      };
    }
    case SET_EDIT_FORM:
      console.log(edit_obj);
      return {
        ...state,
        editAddress: edit_obj
      };
    case SET_NEW_FORM:
      // console.log("set new form");
      // console.log(action.payload);
      return {
        ...state,
        editAddress: action.payload
      };

    case SET_UPDATED_FORM:
      return {
        ...state,
        addressBook: action.payload
      };

    case SET_DELETE_ADDRESS:
      // console.log("data flow into reducer after delete")
      return {
        ...state,
        addressBook: action.payload
      };

    case SET_GIFTCARD_BALANCE:
      return {
        ...state,
        giftCardBalance: action.payload
      };

    case SET_REWARD_POINTS:
      return {
        ...state,
        rewardPoints: action.payload
      };

    case logout:
      return null;

    case SET_DESCRIPTION:
      return {
        ...state,
        SubscriptionInfo: action.payload
      };
    case SET_RETURN_ORDER_ID:
      return {
        ...state,
        returnOrderID: action.payload
      };
    case SET_RETURN_FROM_ADDRESS:
      // console.log('SET_RETURN_FROM_ADDRESS received in reducer')
      return {
        ...state,
        returnFromAddress: action.payload
      };
    case SET_REFUND_ESTIMATE:
      return {
        ...state,
        refundEstimate: action.payload
      };
    case SET_GUEST_ORDER:
      return {
        ...state,
        guestOrder: action.payload
      };

    case SET_SHIP_TO_NEW:
      return {
        ...state,
        shipNew: action.payload
      };
    default:
      return state;
  }
};

export const getOrderHistory = state => state.customer.orderHistory;
export const getOrderHistoryLoading = state => state.customer.orderHistoryLoading;
export const getReviewItems = state => state.customer.reviewItems;
export const getReviewData = state => state.customer.reviewData;
// export const getAddressBook = state => state.customer.addressBook;
export const getPaymentMethod = state => state.customer.paymentMethod;
export const getGiftCardBalance = state => state.customer.giftCardBalance;
// export const getRewardPoints = state => state.customer.rewardPoints;
export const getSubscriptionInfo = state => state.customer.SubscriptionInfo;
export const getReturnFromAddress = state => state.customer.returnFromAddress;
export const getRefundEstimate = state => state.customer.refundEstimate;
export const getGuestOrder = state => state.customer.guestOrder;
export const getShipNew = state => state.customer.shipNew;
// export const getReturnOrder = state => state.customer.OrderHistory.find((o) => o.order_number === state.customer.returnOrderID);
