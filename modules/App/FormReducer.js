/**
 * Created by warrenchen on 4/11/17.
 */
// define constant
import { reducer as formReducer } from "redux-form";
import { SET_ACCOUNT_INFORMATION_TAB } from "../Customer/CustomerActions";
import {
  SET_SHIPPING_ADDRESS_FORM,
  SET_BILLING_ADDRESS_FORM,
  SET_SIGNUP_FORM,
} from "../Checkout/CheckoutActions";
import { SET_ADDRESS_FORM_LOCAL } from "./FormActions";


const reducers = formReducer.plugin({
  Address_Form: (state, action) => {
    switch (action.type) {
      case SET_ADDRESS_FORM_LOCAL:
        return {
          ...state,
          values: action.payload,
        };
      default:
        return state;
    }
  },
  AddressFormV2: (state, action) => {
    switch (action.type) {
      case SET_ADDRESS_FORM_LOCAL:
        return {
          ...state,
          values: action.payload,
        };
      default:
        return state;
    }
  },
  AccountInfo: (state, action) => {
    switch (action.type) {
      case SET_ACCOUNT_INFORMATION_TAB:
        return {
          ...state,
          values: action.payload,
        };
      default:
        return state;
    }
  },
  ShippingAddressForm: (state, action) => {
    switch (action.type) {
      case SET_SHIPPING_ADDRESS_FORM:
        return {
          ...state,
          values: action.payload,
        };
      default:
        return state;
    }
  },
  BillingAddressForm: (state, action) => {
    switch (action.type) {
      case SET_BILLING_ADDRESS_FORM:
        return {
          ...state,
          values: action.payload,
        };
      default:
        return state;
    }
  },
  YourInformationForm: (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  SignupForm: (state, action) => {
    switch (action.type) {
      case SET_SIGNUP_FORM:
        console.log("payload", action.payload);
        return {
          ...state,
          values: action.payload,
        };
      default:
        return state;
    }
  },
});

export default reducers;
