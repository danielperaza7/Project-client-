/*
  checkout page
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid, Row, Col, Panel, Button, Radio, ButtonToolbar, DropdownButton, MenuItem, Modal
} from "react-bootstrap";
import _ from "lodash";
import Helmet from "react-helmet";
import { Cookies } from "react-cookie";
import history from "../../../../history";


import styles from "./CheckoutPage.css";
import cartStyles from "../CartPage/CartPage.css";
import totalSegmentsStyles from "../../components/totalSegments/TotalSegments.css";

import ShippingAddressForm from "../../components/shippingAddressForm/shippingAddressForm";
import YourInfomationForm from "../../components/yourInformationForm/yourInformationForm";
import TotalSegments from "../../components/totalSegments/totalSegments";
import ShipAddressSelector from "../../components/addressSelector/shipAddressSelector";
import BillAddressSelector from "../../components/addressSelector/billAddressSelector";
import Braintree from "../../components/braintree/braintree";
import BillingAddressForm from "../../components/billingAddressForm/billingAddressForm";
import ConfirmedBillingAddressCard from "../../components/confirmedBillingAddressCard/confirmedBillingAddressCard";
import SavingItemComponents from "../../components/totalSegments/SavingItemComponents";
import ShippingMethodsDropdown from "../../components/totalSegments/ShippingMethodsDropdown";
import CouponInput from "../../components/couponInput/CouponInput";
import Radiobox from "../../../../components/FieldFormControlRadiobox";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";
import LiveChatTrigger from "../../../../components/LiveChatTrigger";


// import action
import {
  postCartAddress, setCurrentAddresses, setBillingAddress, postOrder, fetchGiftCardValue, fetchCart
} from "../../CheckoutActions";
import {
  constructOrderSuccessData, PushDL_OrderSuccess, onCheckoutOption, constructCheckoutData, onCheckout
} from "../../../Analytics/components/GA";
import { PushDL_FB_ADD_Payment } from "../../../Analytics/components/FB";
import { addError } from "../../../App/AppActions";

// import getter
import {
  getProductList, getCustomer, getTotalSegments, getCouponUsed, getBillingAddress, getShippingAddress, getShippingMethods, getPaymentMethods, getGuestAccountExist, getNewBillingAddress, getGuestEmail
} from "../../CheckoutReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { getRewardPointsToValueRate, getCurrency, getProductNum } from "../../../App/AppReducer";
import CustomModal from "../../../../components/Modal/CustomModal";
// import { getGuestEmail } from '../../../app/FormReducer';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentStep: 0,
      finalStep: 3,

      shipNew: null, // true or false
      billNew: true, // true , bill new, false bill exist
      shipExistId: null,
      billExistId: null,
      useAsBilling: true, // equivalent to billNew this state should be updated by cart response ....if no shipping address, set it true as defaul
      billDifConfirmed: false,
      saveNewShippingAddress: true,
      saveNewBillingAddress: true,
      hasExistBillingForm: false,


      payment_method: null, // braintree_saved, braintree_credit_card, braintree_paypal_account
      payment_method_detail_saved: null,
      payment_method_detail_credit_card: null,
      payment_method_detail_paypal: null,
      braintreeCreditCardHostedFieldsInstance: null,
      token_braintree_saved_selected: null,
      nonce_braintree_credit_card_feteched: null,
      nonce_braintree_paypal_account_feteched: null,
      save_new_payment: true,

      use_reward_points: false,
      reward_points_to_use: 0,
      editRewardPoints: false,

      use_gift_card: false,
      gift_card_code: "",
      gift_card_avail_amount: 0,
      gift_card_use_amount: 0,
      editGiftCardCode: true,
      editGiftCardAmount: true,
      giftCardErrorMsg: "",

      currentShippingMethod: null,

      placeOrderErrorMessage: null,
      placingOrder: false,
      showPlaceOrderResponseErrorMessage: false,
      placeOrderResponseErrorMessage: "",
      qtyCheckErrorMessage: "",

      paymentMethod_err_msg: "",
    });
    this.tryNextStep = this.tryNextStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.handleShipOptionChange = this.handleShipOptionChange.bind(this);
    this.handleBillOptionChange = this.handleBillOptionChange.bind(this);
    this.onShipAddressSelect = this.onShipAddressSelect.bind(this);
    this.onShipMethodSelect = this.onShipMethodSelect.bind(this);
    this.onBillAddressSelect = this.onBillAddressSelect.bind(this);
    this.handleShipToExistAddress = this.handleShipToExistAddress.bind(this);
    this.handleBillToExistAddress = this.handleBillToExistAddress.bind(this);
    this.handleUseAsBillingChange = this.handleUseAsBillingChange.bind(this);
    this.onSelectAsBilling = this.onSelectAsBilling.bind(this);
    this.setPaymentConfigs = this.setPaymentConfigs.bind(this);
    this.setBillDifStatus = this.setBillDifStatus.bind(this);
    this.setBraintreeCreditCardHostedFieldsInstance = this.setBraintreeCreditCardHostedFieldsInstance.bind(this);
    this.getCurrentShippingAddress = this.getCurrentShippingAddress.bind(this);
    this.getCurrentBillingAddress = this.getCurrentBillingAddress.bind(this);
    this.getFinalTotalPrice = this.getFinalTotalPrice.bind(this);
    this.handleBraintreeCreditCardTokenResponse = this.handleBraintreeCreditCardTokenResponse.bind(this);
    this.handleBraintreePaypalOnAuthorize = this.handleBraintreePaypalOnAuthorize.bind(this);
    this.handleBraintreePaypalOnCancel = this.handleBraintreePaypalOnCancel.bind(this);
    this.handleBraintreePaypalOnError = this.handleBraintreePaypalOnError.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handlePlaceOrderResponse = this.handlePlaceOrderResponse.bind(this);
    this.onToggleSaveNewPayment = this.onToggleSaveNewPayment.bind(this);
    this.toggleUseRewardPoints = this.toggleUseRewardPoints.bind(this);
    this.toggleEditRewardPoints = this.toggleEditRewardPoints.bind(this);
    this.toggleUseGiftCard = this.toggleUseGiftCard.bind(this);
    this.toggleEditGiftCardCode = this.toggleEditGiftCardCode.bind(this);
    this.toggleEditGiftCardAmount = this.toggleEditGiftCardAmount.bind(this);
    this.onRewardPointChange = this.onRewardPointChange.bind(this);
    this.onGiftCardCodeChange = this.onGiftCardCodeChange.bind(this);
    this.onGiftCardAmountChange = this.onGiftCardAmountChange.bind(this);
    this.handleGiftCardApply = this.handleGiftCardApply.bind(this);
    this.handleGiftCardApplyResponse = this.handleGiftCardApplyResponse.bind(this);
    this.toggleSaveShippingAddress = this.toggleSaveShippingAddress.bind(this);
    this.toggleSaveBillingAddress = this.toggleSaveBillingAddress.bind(this);
    this.removeGiftCardCode = this.removeGiftCardCode.bind(this);
    this.handleSavedMethodSelect = this.handleSavedMethodSelect.bind(this);
    this.handlePaymentMethodSelect = this.handlePaymentMethodSelect.bind(this);
    this.closePlaceOrderFailedMessage = this.closePlaceOrderFailedMessage.bind(this);
    this.resetRewardPointsAndGiftCard = this.resetRewardPointsAndGiftCard.bind(this);
  }

  componentWillMount() {
    if (this.props.product_list && this.props.product_list.items && this.props.product_list.items.length > 0) {
      if (this.props.authenticated) {
        const checkoutOption = { actionField: { step: 1, option: "initialization" } };
        onCheckoutOption(checkoutOption);
        this.props.dispatch(fetchCart(1, "sign-in"));
      } else {
        const cookie = new Cookies();
        const token = cookie.get("x-auth");
        console.log("this is cookie token", token);
        if (token) this.props.dispatch(fetchCart(1, "initialization"));
        else {
          onCheckout(constructCheckoutData(1, "initialization", this.props.product_list));
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // skip step 0 for logged in customer
    if (this.state.currentStep === 0
      && nextProps.customer
      && nextProps.authenticated) {
      this.setState({
        currentStep: 1,
      });
    }

    // set shipExistId default to default one, if no default, set to first
    if (this.state.shipExistId === null && nextProps.customer && nextProps.customer.addresses) {
      if (nextProps.customer.addresses.length > 0) {
        let defaultAddress = _.find(nextProps.customer.addresses, { id: parseInt(nextProps.customer.default_shipping) });
        if (defaultAddress === undefined) defaultAddress = nextProps.customer.addresses[0];
        this.setState({
          shipExistId: defaultAddress.id,
          shipNew: false,
          currentStep: 2 // has address to use -> skip step 1 and go to step 2: payment information
        });
        onCheckoutOption({ actionField: { step: 3, option: "old_address" } });
      }
    }

    // set billExistId default to default one, if no default, set to first
    if (this.state.billExistId === null && nextProps.customer && nextProps.customer.addresses) {
      if (nextProps.customer.addresses.length > 0) {
        let defaultAddress = _.find(nextProps.customer.addresses, { id: parseInt(nextProps.customer.default_billing) });
        if (defaultAddress === undefined) {
          defaultAddress = nextProps.customer.addresses[0];
          this.setState({
            billExistId: defaultAddress.id,
            billNew: false
          });
        } else { // has default billing address, NOT check "same as shipping"
          this.setState({
            billExistId: defaultAddress.id,
            useAsBilling: false,
            billNew: false
          });
        }
      }
    }

    // initialize shipNew
    if (this.state.shipNew === null) {
      const shipNewNext = !(nextProps.customer && nextProps.authenticated && nextProps.customer && nextProps.customer.addresses.length > 0);
      this.setState({
        shipNew: shipNewNext
      });
    }

    // initialize default seleceted method
    if (this.state.payment_method === null || (!this.props.customer.payments && nextProps.customer.payments)) {
      this.setDefaultSelectedPaymentMethod(nextProps);
    }

    // initialize default shipping method
    if (this.state.currentShippingMethod === null && nextProps.shipping_methods && nextProps.shipping_methods.options && nextProps.shipping_methods.options.length > 0) {
      console.log("initialize selected shipping method");
      this.setState({
        currentShippingMethod: nextProps.shipping_methods.options[0]
      });
    }
    if (!_.isEqual(nextProps.shipping_methods, this.props.shipping_methods)) {
      // shipping methods list updated, set first one as selected
      if (nextProps.shipping_methods.options && nextProps.shipping_methods.options.length > 0) {
        this.setState({
          currentShippingMethod: nextProps.shipping_methods.options[0]
        });
      } else {
        console.log("ERROR: no shipping methods received");
      }
    }

    // validate qty
    if (!this.validateItemsQty(nextProps)) {
      this.setState({
        qtyCheckErrorMessage: "One or more items are out of stock or in low stock"
      });
    } else {
      this.setState({
        qtyCheckErrorMessage: ""
      });
    }
  }

  // Shipping and Billing address --------- START
  setBillDifStatus(status) {
    const state = {
      billDifConfirmed: status
    };
    if (status) {
      state.hasExistBillingForm = true;
    }
    this.setState(state);
  }

  getCurrentShippingAddress() {
    return this.state.shipNew ? this.props.shipping_address : this.getSelectedShippingAddress();
  }

  getCurrentBillingAddress() {
    return this.state.useAsBilling ? this.getCurrentShippingAddress() : (this.state.billNew ? this.props.billing_address : this.getSelectedBillingAddress());
  }

  getSelectedShippingAddress() {
    // get shipping address from customer address book
    if (this.props.customer && this.props.customer.addresses && this.state.shipExistId) {
      const address = _.find(this.props.customer.addresses, { id: +this.state.shipExistId });
      const shippingAddress = {
        firstname: address.firstname,
        lastname: address.lastname,
        street: address.street,
        country_id: address.country_id,
        postcode: address.postcode,
        region: address.region,
        city: address.city,
        telephone: address.telephone,
        // email : address.email,
        save_in_address_book: 0 // existing address, no need to save
      };
      return shippingAddress;
    } return null;
  }

  getSelectedBillingAddress() {
    if (this.props.customer && this.props.customer.addresses && this.state.billExistId) {
      // get shipping address from customer address book
      const address = _.find(this.props.customer.addresses, { id: +this.state.billExistId });
      const billingAddress = {
        firstname: address.firstname,
        lastname: address.lastname,
        street: address.street,
        country_id: address.country_id,
        postcode: address.postcode,
        region: address.region,
        city: address.city,
        telephone: address.telephone,
        // email : address.email,
        save_in_address_book: 0 // existing address, no need to save
      };
      return billingAddress;
    }
    return null;
  }

  toggleSaveShippingAddress() {
    this.setState({
      saveNewShippingAddress: !this.state.saveNewShippingAddress
    });
  }

  toggleSaveBillingAddress() {
    this.setState({
      saveNewBillingAddress: !this.state.saveNewBillingAddress
    });
  }

  handleShipOptionChange(event) {
    this.setState({
      shipNew: event.target.value === "new"
    });
  }

  handleBillOptionChange(value) {
    this.setState({
      billNew: value
    });
  }

  handleShipToExistAddress() {
    // should still post existing address so that get new available shipping methods
    // instead of sending addresses here ( cuz we don't have billing adddress )
    // we do this in continue step in payment, in that step we can get bot shipping and billing addresses

    // Well, in order to update shipping methods and tax after this action, so still send addresses
    // save addresses to server
    this.props.dispatch(postCartAddress(this.getCurrentShippingAddress(), null, this.tryNextStep()));
  }

  handleBillToExistAddress() {
    // server side shippingAddress and billingAddress in cart are for saving user new temp adderss
    console.log("Bill to exist address called");
    this.setState({
      billDifConfirmed: true
    });
  }

  handleUseAsBillingChange(event) {
    const choice = (event.target.value === "yes");
    this.setState({
      useAsBilling: choice
    });
    if (!choice) {
      this.trySetBillExist();
    }
  }

  trySetBillExist() {
    const showShipExist = this.props.customer && this.props.authenticated && this.props.customer.addresses && this.props.customer.addresses.length > 0;
    if (showShipExist) {
      this.setState({
        billNew: false
      });
    }
  }

  onSelectAsBilling(event) {
    this.setState({
      useAsBilling: event.target.checked
    });
    if (!event.target.checked) {
      this.trySetBillExist();
    }
  }

  onShipAddressSelect(event) {
    console.log("onAddressSelect called");
    this.setState({
      shipExistId: event.target.value
    });
  }

  onBillAddressSelect(event) {
    console.log("onBillAddressSelect called");
    this.setState({
      billExistId: event.target.value
    });
  }
  // Shipping and Billing address --------- END

  // Payment ----------- START
  setPaymentConfigs(key, value) {
    console.log("setPaymentConfigs called");
    switch (key) {
      case "payment_method":
        this.setState({
          payment_method: value
        });
        return;
      case "token_braintree_saved_selected":
        this.setState({
          token_braintree_saved_selected: value
        });
        return;
      case "nonce_braintree_credit_card_feteched":
        this.setState({
          nonce_braintree_credit_card_feteched: value
        });
        return;
      case "nonce":
        this.setState({
          nonce: value
        });
        return;
      case "save_new_payment":
        this.setState({
          save_new_payment: value
        });

      default:
    }
  }

  setDefaultSelectedPaymentMethod(nextProps) {
    // 1. if customer logged in and have saved address ??? saved payments?
    if (nextProps.customer && nextProps.authenticated && nextProps.customer.payments && !(_.isEmpty(nextProps.customer.payments)) && nextProps.customer.payments !== null) { // in checkout we have a validation
      let defaultSavedPayment = null;
      for (const key in nextProps.customer.payments) {
        if (defaultSavedPayment === null && nextProps.customer.payments[key].length > 0) { defaultSavedPayment = nextProps.customer.payments[key][0]; }
        const findPayment = _.find(nextProps.customer.payments[key], { is_default: true });
        if (findPayment) { defaultSavedPayment = findPayment; }
      }
      this.setState({
        payment_method: "braintree_saved",
        payment_method_detail_saved: defaultSavedPayment,
        token_braintree_saved_selected: defaultSavedPayment.token,
        currentStep: 3 // has payment methods to use, and has billing address (saved or same as shipping)
      });
      onCheckoutOption({ actionField: { step: 4, option: "braintree_saved" } });
    } else {
    // if no saved address, if payments method has braintree_credit_card set it as default, else use the first one
      if (_.findIndex(nextProps.payment_methods, { code: "braintree_credit_card" }) > -1) {
        this.setState({
          payment_method: "braintree_credit_card",
        });
      } else if (nextProps.payment_methods && nextProps.payment_methods[0]) { // dangerous to get payement_menthod_detail
        this.setState({
          payment_method: nextProps.payment_methods[0].code
        });
      }
    }
  }

  setBraintreeCreditCardHostedFieldsInstance(instance) {
    console.log("setBraintreeCreditCardHostedFieldsInstance called");
    this.setState({
      braintreeCreditCardHostedFieldsInstance: instance
    });
  }

  handlePaymentMethodSelect(event) {
    // should update payment_method_detail
    switch (event.target.value) {
      case "braintree_saved":
        this.setState({
          save_new_payment: false
        });
        break;
      case "braintree_credit_card":
        this.setState({
          payment_method_detail_credit_card: null,
          save_new_payment: true
        });
        break;
      case "braintree_paypal_account":
        this.setState({
          payment_method_detail_paypal: null,
          save_new_payment: true
        });
        break;
      default: break;
    }


    this.setPaymentConfigs("payment_method", event.target.value);
    // remove nonce_braintree_credit_card_feteched, because typed in part will be rerendered... use has to input again
    if (event.target.value === "braintree_credit_card") {
      this.setPaymentConfigs("nonce_braintree_credit_card_feteched", null);
    }
  }

  handleBraintreeCreditCardTokenResponse(tokenizeErr, payload) {
    if (tokenizeErr) {
      let err_msg = "";
      switch (tokenizeErr.code) {
        case "HOSTED_FIELDS_FIELDS_EMPTY":
          console.error("All fields are empty! Please fill out the form.");
          err_msg = "Please fill out all required fields.";
          break;
        case "HOSTED_FIELDS_FIELDS_INVALID":
          console.error("Some fields are invalid:", tokenizeErr.details.invalidFieldKeys);
          err_msg = "Some fields are invalid. Please check if card number, CVV, or expiration date has entered correctly and all required fields are filled. For further assistance, please contact our customer service.";
          break;
        case "HOSTED_FIELDS_FAILED_TOKENIZATION":
          console.error("Tokenization failed server side. Is the card valid?");
          err_msg = "Card authorization is failed. Please check if the card is valid or contact our customer service for further assistance.";
          break;
        case "HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE":
          // will only get here if you generate a client token with a customer ID
          // with the fail on duplicate payment method option. See:
          // https://developers.braintreepayments.com/reference/request/client-token/generate/#options.fail_on_duplicate_payment_method
          console.error("This payment method already exists in your vault.");
          err_msg = "This payment method already exists in your vault.";
          break;
        case "HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED":
          // will only get here if you generate a client token with a customer ID
          // with the verify card option or if you have credit card verification
          // turned on in your Braintree Gateway. See
          // https://developers.braintreepayments.com/reference/request/client-token/generate/#options.verify_card
          console.error("CVV did not pass verification");
          err_msg = "CVV did not pass verification.";
          break;
        case "HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR":
          console.error("Network error occurred when tokenizing.");
          break;
        default:
          console.error("Something bad happened!", tokenizeErr);
          err_msg = "Something bad happened! Please try it again!";
      }
      this.setState({ paymentMethod_err_msg: err_msg });
    } else {
      // Got nonce
      console.log("Got nonce ");// +payload.nonce)
      // console.log(payload)
      const save = new Promise(
        () => {
          this.setState({
            nonce_braintree_credit_card_feteched: payload.nonce,
            payment_method_detail_credit_card: payload
          });
        }
      )
        .then(
          this.tryNextStep()
        );
    }
  }

  handleBraintreePaypalOnAuthorize(payload) {
    console.log(`nonce_braintree_paypal_account_feteched : ${payload.nonce}`);
    this.setState({
      nonce_braintree_paypal_account_feteched: payload.nonce,
      payment_method_detail_paypal: payload
    });
  }

  handleBraintreePaypalOnCancel(data) {
    console.log("checkout.js payment cancelled", JSON.stringify(data, 0, 2));
  }

  handleBraintreePaypalOnError(err) {
    console.error("checkout.js error", err);
  }

  handlePaymentContinue() {
    console.log("handlePaymentContinue called");
    this.props.dispatch(postCartAddress(this.getCurrentShippingAddress(), this.getCurrentBillingAddress()), null);
    switch (this.state.payment_method) { // braintree_saved, braintree_credit_card, braintree_paypal_account
      case "braintree_saved":
        if (this.state.token_braintree_saved_selected !== null) {
          this.tryNextStep();
        }
        return;
      case "braintree_credit_card":
        this.state.braintreeCreditCardHostedFieldsInstance.tokenize(this.handleBraintreeCreditCardTokenResponse);
        return;
      case "braintree_paypal_account":
        if (this.state.nonce_braintree_paypal_account_feteched !== null) {
          this.tryNextStep();
        }

      default:
    }
  }

  handleSavedMethodSelect(event) {
    this.setPaymentConfigs("token_braintree_saved_selected", event.target.value);
    // update mounted
    if (this.state.payment_method !== "braintree_saved") {
      this.setPaymentConfigs("payment_method", "braintree_saved");
    }
    // update payment_method_detail
    let currentPayment = null;
    for (const key in this.props.customer.payments) {
      const findPayment = _.find(this.props.customer.payments[key], { token: event.target.value });
      if (findPayment) { currentPayment = findPayment; }
    }
    this.setState({
      payment_method_detail_saved: currentPayment
    });
  }

  onToggleSaveNewPayment() {
    this.setState({
      save_new_payment: !this.state.save_new_payment
    });
  }

  toggleUseRewardPoints() {
    this.setState({
      use_reward_points: !this.state.use_reward_points,
      reward_points_to_use: (this.state.use_reward_points === false ? this.getDefaultRewardPointUseAmount() : 0)
    });
  }

  toggleEditRewardPoints(event) {
    if (event) { event.preventDefault(); }
    this.setState({
      editRewardPoints: !this.state.editRewardPoints
    });
  }

  onRewardPointChange(event) {
    const max1 = (this.props.customer && this.props.customer.reward_points) ? this.props.customer.reward_points : 0; // should consider deductible amount
    const max2 = Math.round(this.getTotalDeductible() * 100 - (this.state.use_gift_card ? 1 : 0) * this.state.gift_card_use_amount * 100) / 100 * this.props.reward_points_to_value_rate;
    const max = (max1 > max2 ? max2 : max1);
    const min = 0;
    let newValue = this.getIntFromString(event.target.value);
    console.log(newValue);
    newValue = (newValue < min ? min : newValue);
    newValue = (newValue > max ? max : newValue);
    if (this.state.use_reward_points) {
      this.setState({
        reward_points_to_use: newValue
      });
    }
  }

  toggleUseGiftCard() {
    this.setState({
      use_gift_card: !this.state.use_gift_card
    });
  }

  toggleEditGiftCardCode() {
    if (this.state.editGiftCardCode === false) {
      this.setState({
        editGiftCardCode: !this.state.editGiftCardCode,
        gift_card_use_amount: 0,
      });
    } else {
      this.setState({
        editGiftCardCode: !this.state.editGiftCardCode
      });
    }
  }

  removeGiftCardCode() {
    this.setState({
      gift_card_code: "",
      editGiftCardCode: true,
      editGiftCardAmount: true,
      use_gift_card: false
    });
  }

  toggleEditGiftCardAmount(event) {
    if (event) { event.preventDefault(); }
    this.setState({
      editGiftCardAmount: !this.state.editGiftCardAmount
    });
  }

  onGiftCardCodeChange(event) {
    if (this.state.use_gift_card) {
      this.setState({
        gift_card_code: event.target.value
      });
    }
  }

  onGiftCardAmountChange(event) {
    if (this.state.use_gift_card) {
      const max = Math.round(this.getTotalDeductible() * 100 - (this.state.use_reward_points ? 1 : 0) * this.state.reward_points_to_use / this.props.reward_points_to_value_rate * 100) / 100;
      const min = 0;
      let newAmount = this.getFloatFromString(event.target.value); // historic bug note: return an array of string, now it's fixed, but be cautious about this !!
      newAmount = newAmount > max ? max : newAmount;
      newAmount = newAmount < min ? min : newAmount;
      this.setState({
        gift_card_use_amount: newAmount
      });
    }
  }

  handleGiftCardApply(event) {
    if (event) { event.preventDefault(); }
    console.log("handleGiftCardApply called");
    if (this.state.gift_card_code && this.state.gift_card_code !== "") {
      this.props.dispatch(fetchGiftCardValue(this.state.gift_card_code, this.handleGiftCardApplyResponse));
    } else {
      // please enter gift card code
    }
  }

  handleGiftCardApplyResponse(response) {
    if (response.code === "0000") {
      console.log("CardApplySuccess, will set state");// ,response.data)
      this.setState({
        gift_card_avail_amount: response.data,
        gift_card_use_amount: this.getDefaultGiftCardUseAmount(response.data),
        editGiftCardCode: false
      });
    } else {
      console.log("CardApplyError");
      this.setState({
        giftCardErrorMsg: response.msg
      });
      this.props.dispatch(addError({ code: response.code, msg: response.msg }));
    }
  }

  getDefaultGiftCardUseAmount(avail_amount) {
    const max = Math.round(this.getTotalDeductible() * 100 - this.state.reward_points_to_use / this.props.reward_points_to_value_rate * 100) / 100;
    return avail_amount > max ? max : avail_amount;
  }

  getDefaultRewardPointUseAmount() {
    console.log("getDefaultRewardPointUseAmount called");
    const max1 = (this.props.customer && this.props.customer.reward_points) ? this.props.customer.reward_points : 0; // should consider deductible amount
    const max2 = Math.round(Math.round(this.getTotalDeductible() * 100 - (this.state.use_gift_card ? this.state.gift_card_use_amount : 0) * 100) / 100 * this.props.reward_points_to_value_rate);
    const max = (max1 > max2 ? max2 : max1);
    console.log(max);
    return max;
  }

  resetRewardPointsAndGiftCard() {
    this.setState({
      use_reward_points: false,
      reward_points_to_use: 0,
      editRewardPoints: false,

      use_gift_card: false,
      gift_card_code: "",
      gift_card_avail_amount: 0,
      gift_card_use_amount: 0,
      editGiftCardCode: true,
      editGiftCardAmount: true,
      giftCardErrorMsg: ""
    });
  }
  // Payment ----------- END

  // Place Order -------- START
  validateItemsQty() {
    const { product_list } = this.props;
    let res = true;
    if (product_list && product_list.items && product_list.items.length > 0) {
      product_list.items.map((item) => {
        if (!item.stock.in_stock || item.stock.qty < item.qty) {
          res = false;
        }
      });
      return res;
    }
    return res; // prevent show error msg in initialization
  }

  handlePlaceOrder() {
    console.log("handle place order called");
    const optionForGA = this.state.currentShippingMethod;
    const checkoutOption = { actionField: { step: 5, option: optionForGA.method_title } };
    onCheckoutOption(checkoutOption);
    const request = {};
    // frontend validation
    // 1. shipping addresses
    const shippingAddress = this.getCurrentShippingAddress();
    console.log(shippingAddress);
    if (!shippingAddress
          || !shippingAddress.region
          || !shippingAddress.region.region_code
          || !shippingAddress.country_id
          || !shippingAddress.street
          || shippingAddress.street.length < 1
          || !shippingAddress.city
          || (!shippingAddress.firstname && !shippingAddress.lastname)) {
      this.setState({
        placeOrderErrorMessage: "Please complete shipping address section"
      });
      return;
    }
    // 2. billing addresses
    // we don't really validate billing address
    if (this.state.useAsBilling === false && this.state.billNew === null) {
      this.setState({
        placeOrderErrorMessage: "Please complete billing address section"
      });
      return;
    }
    // 3. shipping method
    if (!this.state.currentShippingMethod || !this.state.currentShippingMethod.carrier_code || !this.state.currentShippingMethod.method_code || this.state.currentShippingMethod.amount === null) {
      this.setState({
        placeOrderErrorMessage: "Please select one shipping method"
      });
      return;
    }

    // 4. payment method payment token or nonce
    let valid = false;
    switch (this.state.payment_method) {
      case "braintree_saved":
        const token = this.state.token_braintree_saved_selected;
        if (token !== null) {
          request.token = token;
          // request.nonce = null;
          valid = true;
        }
        break;
      case "braintree_credit_card":
        const cc_nounce = this.state.nonce_braintree_credit_card_feteched;
        if (cc_nounce !== null) {
          request.nonce = cc_nounce;
          // request.token = null;
          valid = true;
        }
        break;
      case "braintree_paypal_account":
        const pa_nounce = this.state.nonce_braintree_paypal_account_feteched;
        if (pa_nounce !== null) {
          request.nonce = pa_nounce;
          // request.totken = null;
          valid = true;
        }
        break;
      case null: break;
      default: break;
    }
    if (!valid) {
      this.setState({
        placeOrderErrorMessage: "no payment information"
      });
      return;
    }
    // 6. reward Points
    if (this.state.use_reward_points) {
      if (!this.props.authenticated) {
        this.setState({
          placeOrderErrorMessage: "To use reward points you need to log in"
        });
        return;
      } if (this.state.reward_points_to_use !== 0) {
        if (!this.props.customer || !this.props.customer.reward_points || this.state.reward_points_to_use > this.props.customer.reward_points) {
          this.setState({
            placeOrderErrorMessage: "You don't have enough reward points"
          });
          return;
        }
        if (!this.props.authenticated || this.state.reward_points_to_use === 0 || !this.props.reward_points_to_value_rate) {
          this.setState({
            placeOrderErrorMessage: "We cannot accept reward points right now, please try later or contact customer service"
          });
          console.log("We cannot accept reward points:");
          console.log(this.props.authenticated, this.state.reward_points_to_use, this.props.reward_points_to_value_rate);
          console.log(this.props.authenticated && this.state.reward_points_to_use != 0 && this.props.reward_points_to_value_rate);
          return;
        }
      }
    }

    // 7. gift card
    if (this.state.gift_card_code === null && this.state.gift_card_use_amount !== 0) {
      this.setState({
        placeOrderErrorMessage: "Please enter gift card code to apply gift value"
      });
      return;
    }
    if (this.state.gift_card_use_amount > this.state.gift_card_avail_amount) {
      this.setState({
        placeOrderErrorMessage: "You don't have enough gift card balance"
      });
      return;
    }
    // 8. grand_total
    const final_total = this.getFinalTotalPrice();
    if (final_total < 0 || final_total == null) {
      this.setState({
        placeOrderErrorMessage: "Grand total price should not be less then 0 or empty"
      });
      return;
    }
    // if valid reset message
    this.setState({
      placeOrderErrorMessage: ""
    });
    // contruct request object
    request.shipping_method = {
      method_code: this.state.currentShippingMethod.method_code,
      carrier_code: this.state.currentShippingMethod.carrier_code
    };
    request.billing_address = this.getCurrentBillingAddress();
    request.shipping_address = this.getCurrentShippingAddress();
    request.payment_method = this.state.payment_method;
    request.save_payment_method = this.state.save_new_payment;
    if (!this.props.authenticated) request.email = this.props.guest_email;
    request.use_reward_points = this.state.reward_points_to_use;
    if (this.state.gift_card_code && this.state.gift_card_code !== "" && this.state.gift_card_use_amount !== 0) {
      request.gift_card_code = this.state.gift_card_code;
      request.gift_card_use_value = this.state.gift_card_use_amount;
    }
    request.grand_total = final_total;

    // reset placeOrderResponseErrorMessage
    this.setState({
      placeOrderResponseErrorMessage: ""
    });

    // TEMP: REMOVE REDUNDANT INFO OF SHIPPING/BILLING ADDRESS, NOT GOOD, WILL IMPROVE
    delete request.shipping_address.email;
    delete request.billing_address.email;
    delete request.shipping_address.same_as_billing;
    delete request.billing_address.same_as_billing;
    delete request.shipping_address.region_id;
    delete request.billing_address.region_id;
    delete request.shipping_address.id;
    delete request.billing_address.id;


    this.setState({
      placingOrder: true
    });
    // dispatch order action
    this.props.dispatch(postOrder(request, this.handlePlaceOrderResponse));
  }

  handleOrderSuccessDataPush(orderID) {
    // Google analytics: construct DL_Data
    console.log("PushDL_OrderSuccess called");
    const { total_segments, product_list, reward_points_to_value_rate } = this.props;
    const {
      currentShippingMethod, use_reward_points, reward_points_to_use, use_gift_card, gift_card_use_amount
    } = this.state;
    const revenue = this.getFinalTotalPrice();
    const rewardPointsValue = use_reward_points ? (Math.round(reward_points_to_use * 100 / reward_points_to_value_rate) / 100) : 0;
    const giftCardValue = use_gift_card ? Number(gift_card_use_amount) : 0;
    const DL_Data = constructOrderSuccessData({
      total_segments, product_list, revenue, currentShippingMethod, orderID, rewardPointsValue, giftCardValue
    });
    PushDL_OrderSuccess(DL_Data);
  }

  handlePlaceOrderResponse(success, message, orderID) {
    console.log("handlePlaceOrderResponse called");
    this.setState({
      placingOrder: false
    });
    if (success) {
      this.handleOrderSuccessDataPush(orderID);
      console.log("order placed, should push to order placed page");
      history.push("/checkout/success");
    } else {
      console.log("order failed");
      console.log(message);
      this.setState({
        showPlaceOrderResponseErrorMessage: true,
        placeOrderResponseErrorMessage: message,
      });
    }
  }

  closePlaceOrderFailedMessage() {
    this.setState({
      showPlaceOrderResponseErrorMessage: false
    });
  }
  // Place Order -------- END

  //
  // Price  --------- START
  getFinalTotalPrice() {
    if (this.props.total_segments && this.props.total_segments.grand_total) {
      const grand_total = this.props.total_segments.grand_total.value;
      // avoid javscipt floating calculation precision issue !!!!
      const final_total = Math.round(grand_total * 100 - (this.state.use_gift_card ? 1 : 0) * this.state.gift_card_use_amount * 100 + (this.state.currentShippingMethod && (this.state.currentShippingMethod.amount ? this.state.currentShippingMethod.amount : 0)) * 100 - (this.state.use_reward_points ? 1 : 0) * this.state.reward_points_to_use / this.props.reward_points_to_value_rate * 100) / 100;
      return final_total;
    }
    return "Calculating";
  }

  getTotalDeductible() {
    // return (this.props.total_segments.deductible * 100 + this.state.currentShippingMethod.deductible * 100)/100;
    return Math.round(this.props.total_segments.grand_total.value * 100 + (this.state.currentShippingMethod && this.state.currentShippingMethod.deductible ? this.state.currentShippingMethod.deductible : 0) * 100) / 100;
  }

  getIntFromString(str) {
    if (str.length >= 1 && str[0] === "0") return "0";
    const intValue = /\d+/.exec(str);
    if (intValue === null) {
      return "";
    }
    return intValue[0];
  }

  getFloatFromString(str) {
    if (str.length > 1 && str[0] === "0" && str[1] !== ".") return "0";
    const intValue = /^[1-9][0-9]?/.exec(str);
    const floatValue = /^[1-9][0-9]?[.]?[0-9]?[0-9]?/.exec(str);
    const floatValueLessThanOne = /^[0][.]?[0-9]?[0-9]?/.exec(str);
    if (floatValueLessThanOne !== null) {
      return floatValueLessThanOne[0];
    } if (floatValue !== null) {
      return floatValue[0];
    } if (intValue !== null) {
      return intValue[0];
    }
    return "";
  }
  // Price  --------- END

  // Shipping Method -------- START
  onShipMethodSelect(option) {
    this.setState({
      currentShippingMethod: option
    });
  }
  // Shipping Method -------- END

  // Others --------- START
  getStepStatusClassname(step) {
    if (this.state.currentStep > step) {
      return " done";
    } if (this.state.currentStep == step) {
      return " current";
    }
    return " todo";
  }

  tryNextStep(new_cur_step) {
    const prevStep = new_cur_step || this.state.currentStep;
    switch (prevStep) {
      case 0: // enter your info
        if (this.props.authenticated || this.props.guest_account_exist === false) {
          this.setState({
            currentStep: prevStep + 1,
          });
          const checkoutOption1 = { actionField: { step: 2, option: "not-sign-in" } };
          onCheckoutOption(checkoutOption1);
        }

        break;
      case 1: // shipping address
        this.setState({
          currentStep: prevStep + 1
        });
        const optionForGA = this.state.shipNew ? "new_address" : "old_address";
        const checkoutOption = { actionField: { step: 3, option: optionForGA } };
        onCheckoutOption(checkoutOption);
        break;
      case 2: // payment and billing address
        // validation payment

        if (this.state.payment_method === "braintree_saved" && this.state.token_braintree_saved_selected === null) { break; }
        if (this.state.payment_method === "braintree_credit_card" && this.state.nonce_braintree_credit_card_feteched === null) { break; }
        if (this.state.payment_method === "braintree_paypal_account" && this.state.nonce_braintree_paypal_account_feteched === null) { break; }
        if (this.state.useAsBilling || this.state.billDifConfirmed) {
          this.nextStep();
        }
        break;
      case 3: // review
        break;
      default: break;
    }
  }

  nextStep(prevStep) {
    this.setState({
      currentStep: (prevStep || this.state.currentStep) + 1
    });
    if (this.state.save_new_payment) PushDL_FB_ADD_Payment();
    const optionForGA = this.state.payment_method;

    const checkoutOption = { actionField: { step: 4, option: optionForGA } };
    onCheckoutOption(checkoutOption);
  }

  edit(step) {
    this.setState({
      currentStep: step
    });
  }
  // Others --------- END

  renderShippingHeader() {
    const currentSelect = this.state.currentShippingMethod;
    return (
      <div>
        <div>{`${currentSelect.method_title} | ` + `$${currentSelect.amount}`}</div>
      </div>
    );
  }

  renderAddress(address) {
    if (!address) { return null; }
    return (
      <div>
        <div>{ `${address.firstname} ${address.lastname}` }</div>
        <div>{ address.street ? address.street[0] : null }</div>
        <div>{ (address.street && address.street.length > 1) ? address.street[1] : null }</div>
        <div>{ `${address.city}, ${address.region ? address.region.region : ""}, ${address.postcode}, ${address.country_id}` }</div>
      </div>
    );
  }

  renderYourInfomationStep() {
    const headers = [
      "YOUR INFORMATION",
      "SHIPPING ADDRESS",
      "PAYMENT INFORMATION",
      "REVIEW AND SHIPPING METHOD"
    ];
    const headerNodes = headers.map((val, step) => {
      let Edit = "";
      if (this.state.currentStep > step) {
        Edit = (
          <Button bsClass={`btn pull-right ${styles["edit-btn"]}`} onClick={() => { this.edit(step); }}>
            Edit
          </Button>
        );
      }
      return (
        <div>
          {" "}
          {step + 1}
.
          {" "}
          {val}
          {" "}
          {Edit}
        </div>
      );
    });
    let yourInfo = null;
    const thisStep = 0;
    if (!this.props.authenticated) {
      yourInfo = (
        <Panel className={styles["step-panel"] + this.getStepStatusClassname(thisStep)} collapsible expanded={this.state.currentStep >= 0} header={headerNodes[0]}>
          <div className={this.state.currentStep !== thisStep ? "hidden" : ""}>
            <YourInfomationForm tryNextStep={this.tryNextStep} exist={this.props.guest_account_exist} />
          </div>
          <div className={styles["option-content"] + (this.state.currentStep === thisStep ? " hidden" : "")}>
            Email:
            {" "}
            { this.props.guest_email }
          </div>
        </Panel>
      );
    } else {
      yourInfo = "";
    }
    return yourInfo;
  }

  renderShippingAdderssStep() {
    const showShipExist = this.props.customer && this.props.authenticated && this.props.customer.addresses && this.props.customer.addresses.length > 0;
    const showBillExist = showShipExist && this.state.useAsBilling === false;
    const thisStep = 1;

    return (
      <div>
        <div className={this.state.currentStep !== thisStep ? "hidden" : ""}>
          { showShipExist === true
            ? (
              <Radiobox
                name="ship"
                id="shipexist"
                value="exist"
                title="Ship to Existing Address"
                checked={this.state.shipNew === false}
                onChange={this.handleShipOptionChange}
              />
            ) : ""}
          { showShipExist === true && this.state.shipNew === false ? <ShipAddressSelector handleSubmit={this.handleShipToExistAddress} useAsBilling={this.state.useAsBilling} selected={this.state.shipExistId} onSelectAsBilling={this.onSelectAsBilling} onShipAddressSelect={this.onShipAddressSelect} addresses={this.props.customer.addresses} /> : "" }
          <Radiobox
            name="ship"
            id="shipenew"
            value="new"
            title="Ship to new address"
            checked={this.state.shipNew === true}
            onChange={this.handleShipOptionChange}
          />
          <div className={styles["option-content"]}>
            { this.state.shipNew === true
              ? (
                <ShippingAddressForm
                  tryNextStep={this.tryNextStep}
                  saveAddresses={this.saveAddresses}
                  isGuest={!this.props.authenticated}
                  shippingAddress={this.props.shipping_address}
                  getCurrentShippingAddress={this.getCurrentShippingAddress}
                  getCurrentBillingAddress={this.getCurrentBillingAddress}
                  billingAddress={this.props.billing_address}
                  onSelectAsBilling={this.onSelectAsBilling}
                  useAsBilling={this.state.useAsBilling}
                  saveNewShippingAddress={this.state.saveNewShippingAddress}
                  toggleSaveShippingAddress={this.toggleSaveShippingAddress}
                />
              )
              : "" }
          </div>
        </div>
        <div className={styles["option-content"] + (this.state.currentStep === thisStep ? " hidden" : "")}>
          { this.renderAddress(this.getCurrentShippingAddress()) }
        </div>
      </div>
    );
  }

  renderBraintreeCreditCardInfo(detail) {
    if (detail) {
      return (
        <div>
          <div>
            { detail.imageUrl ? <img src={detail.imageUrl} /> : null }
            { detail.last4 ? (
              <span>
                {" "}
xxxx - xxxx - xxxx -
                { detail.last4 }
                {" "}

              </span>
            ) : null }
            { detail.details && detail.details.cardType ? (
              <span>
                { detail.details.cardType }
                {" "}
              </span>
            ) : null}
            { detail.description ? (
              <span>
                { detail.description }
                {" "}
              </span>
            ) : null}
          </div>
          <div>
            { detail.expirationDate ? (
              <span>
Expire in:
                { detail.expirationDate }
              </span>
            ) : null}
          </div>
        </div>
      );
    }
    return null;
  }

  renderBraintreePaypal(detail) {
    if (detail) {
      return (
        <div>
          <img src={detail.imageUrl} />
          { `${detail.payerFirstName} ${detail.payerLastName}`}
        </div>
      );
    }
    return null;
  }

  renderCurrentPayment() {
    const saveNewRender = (
      (this.state.payment_method !== "braintree_saved")
        ? (this.state.save_new_payment ? <div>Save this payment method </div> : null)
        : null);
    const payment = this.state.payment_method;
    const extra = (
      <div>
        { this.state.use_reward_points && this.state.reward_points_to_use !== 0
          ? (
            <div>
Using
              {this.state.reward_points_to_use}
              {" "}
reward points (
              {this.props.currency}
              {this.state.reward_points_to_use / this.props.reward_points_to_value_rate}
)
            </div>
          ) : null }
        { this.state.use_gift_card && this.state.gift_card_use_amount !== 0
          ? (
            <div>
Using
              {this.props.currency}
              {this.state.gift_card_use_amount}
              {" "}
from gift card xxxx
              { this.state.gift_card_code.substr(parseInt(this.state.gift_card_code.length / 2))}
            </div>
          ) : null }
      </div>
    );

    let paymentInfo = null;
    switch (payment) {
      case "braintree_saved":
        const detail = this.state.payment_method_detail_saved;

        if (detail && detail.last4) {
          // credit card
          paymentInfo = this.renderBraintreeCreditCardInfo(detail);
        } else if (detail && detail.payerLastName) {
          // paypal
          paymentInfo = this.renderBraintreePaypal(detail);
        } else {
          paymentInfo = <div>Some Saved Payment</div>;
        }
        break;
      case "braintree_credit_card":
        paymentInfo = this.renderBraintreeCreditCardInfo(this.state.payment_method_detail_credit_card);
        break;
      case "braintree_paypal_account":
        paymentInfo = this.renderBraintreePaypal(this.state.payment_method_detail_paypal);
        break;
      default:
        break;
    }
    return (
      <div>
        { paymentInfo }
        { saveNewRender }
        { extra }
      </div>
    );
  }

  renderPaymentStep(savingItemProps) {
    const showShipExist = this.props.customer && this.props.authenticated && this.props.customer.addresses && this.props.customer.addresses.length > 0;
    const showBillExist = showShipExist && this.state.useAsBilling === false;
    const savedPaymentList = (this.props.customer && this.props.customer.payments) ? this.props.customer.payments : [];

    const thisStep = 2;
    return (
      <div>
        <div className={this.state.currentStep !== thisStep ? "hidden" : ""}>
          <div className={styles["subsection-title"]}>Payment Method</div>
          <Braintree
            handleBraintreePaypalOnAuthorize={this.handleBraintreePaypalOnAuthorize}
            handleBraintreePaypalOnCancel={this.handleBraintreePaypalOnCancel}
            handleBraintreePaypalOnError={this.handleBraintreePaypalOnError}
            saveHostedFieldsInstance={this.setBraintreeCreditCardHostedFieldsInstance}
            paymentMethodsAvailable={this.props.payment_methods}
            paypalMount={this.refs.paypal_button_mount}
            parentState={this.state}
            setPaymentConfigs={this.setPaymentConfigs}
            savedPaymentList={savedPaymentList}
            onToggleSaveNewPayment={this.onToggleSaveNewPayment}
            authenticated={this.props.authenticated}
            handleSavedMethodSelect={this.handleSavedMethodSelect}
            handlePaymentMethodSelect={this.handlePaymentMethodSelect}
            shippingAddress={this.getCurrentShippingAddress()}
          />
          <SavingItemComponents {...savingItemProps} />
          <div className={styles["subsection-title"]}>Billing Address</div>
          <div className={styles.billingAddress}>Use shipping address for billing address ?</div>
          <div className={styles.shippingInfo}>
            <Radiobox
              name="useasbilling"
              id="useasbilling-yes"
              value="yes"
              title="Yes"
              checked={this.state.useAsBilling}
              onChange={this.handleUseAsBillingChange}
            />
            { this.state.useAsBilling === true
              ? (
                <div className={styles["option-content"]}>
                  <ConfirmedBillingAddressCard billingAddress={this.state.shipNew ? this.props.shipping_address : this.getSelectedShippingAddress()} />
                </div>
              ) : null}
            <Radiobox
              name="useasbilling"
              id="useasbilling-no"
              value="no"
              title="No, bill to different address"
              checked={!this.state.useAsBilling}
              onChange={this.handleUseAsBillingChange}
            />
            { this.state.useAsBilling === false && this.state.billDifConfirmed === true
              ? <button className={styles["edit-btn-context"]} onClick={() => this.setBillDifStatus(false)}>Edit</button> : null }
          </div>
          <div className={styles["option-content"]}>
            { this.state.useAsBilling === false && this.state.billDifConfirmed === true
              ? <ConfirmedBillingAddressCard billingAddress={this.state.billNew ? this.props.billing_address : this.getSelectedBillingAddress()} /> : null}
            { showBillExist === true && this.state.billDifConfirmed === false ? <Radiobox name="bill" value="exist" checked={this.state.billNew === false} onChange={() => this.handleBillOptionChange(false)} title="Bill Existing" /> : ""}
            { showBillExist === true && this.state.billDifConfirmed === false && this.state.billNew === false ? <BillAddressSelector handleSubmit={this.handleBillToExistAddress} selected={this.state.billExistId} onBillAddressSelect={this.onBillAddressSelect} addresses={this.props.customer.addresses} /> : "" }
            { this.state.useAsBilling === false && this.state.billDifConfirmed === false
              ? <Radiobox name="bill" value="new" checked={this.state.billNew === true} onChange={() => this.handleBillOptionChange(true)} title="Bill New" />
              : "" }
            <BillingAddressForm
              getCurrentShippingAddress={this.getCurrentShippingAddress}
              getCurrentBillingAddress={this.getCurrentBillingAddress}
              saveAddresses={this.saveAddresses}
              isGuest={!this.props.authenticated}
              billingAddress={this.props.billing_address}
              saveNewBillingAddress={this.state.saveNewBillingAddress}
              toggleSaveBillingAddress={this.toggleSaveBillingAddress}
              setBillDifStatus={this.setBillDifStatus}
              BillDifStatus={this.state.billDifConfirmed}
              hasExistBillingForm={this.state.hasExistBillingForm}
              show={this.state.useAsBilling === false && this.state.billNew === true && this.state.billDifConfirmed === false}
            />
          </div>
          <div className={(this.state.payment_method === "braintree_paypal_account" && (this.state.useAsBilling === true || this.state.billDifConfirmed === true) && this.state.nonce_braintree_paypal_account_feteched === null) ? `show ${styles["paypal-btn-wrapper"]}` : "hidden"} ref="paypal_button_mount" />
          <div style={{ color: "red", display: this.state.paymentMethod_err_msg ? "" : "none", margin: "1% 0 0 0" }}>{this.state.paymentMethod_err_msg}</div>
          { (this.state.payment_method !== "braintree_paypal_account" || this.state.nonce_braintree_paypal_account_feteched !== null) && (this.state.useAsBilling === true || this.state.billDifConfirmed === true) ? <button className={styles["next-button"]} onClick={() => this.handlePaymentContinue()}>CONTINUE</button> : "" }
        </div>
        <div className={styles["option-content"] + (this.state.currentStep === thisStep ? " hidden" : "")}>
          <div className={styles["subsection-title"]}>Payment Method:</div>
          { this.renderCurrentPayment() }
          <div className={styles["subsection-title"]}>Billing Address:</div>
          { this.renderAddress(this.getCurrentBillingAddress()) }
        </div>
      </div>
    );
  }

  renderPlaceOrder(validateQty) {
    return (
      <div className={styles["place-order-wrapper"]}>
        <button disabled={this.state.currentStep != this.state.finalStep || !validateQty || this.state.placingOrder} className={styles["next-button"]} onClick={() => this.handlePlaceOrder()}>PLACE ORDER</button>
        <div className={styles["error-msg"]}>{ this.state.placeOrderErrorMessage ? this.state.placeOrderErrorMessage : null }</div>
        {
          validateQty ? null : <div className={styles["error-msg"]}>{ this.state.qtyCheckErrorMessage ? this.state.qtyCheckErrorMessage : null }</div>
        }
      </div>
    );
  }

  renderPlaceOrderError() {
    const modalProps = {
      size: "medium",
      showModal: this.state.showPlaceOrderResponseErrorMessage,
      onHide: this.closePlaceOrderFailedMessage,
      padding: "20px",
    };


    return (
      <CustomModal {...modalProps}>
        { this.state.placeOrderResponseErrorMessage }
      </CustomModal>
    );
  }

  renderReviewStep(validateQty) {
    const firstName = (this.props.customer && this.props.customer.firstname) ? (`${this.props.customer.firstname}, `) : "";
    const ColSetting = {
      left: {
        lg: 6, md: 6, sm: 6, xs: 6
      },
      right: {
        lg: 6, md: 6, sm: 6, xs: 6
      }
    };
    const ShippingMethodsDropdownProps = {
      currentShippingMethod: this.state.currentShippingMethod,
      shippingMethods: this.props.shipping_methods,
      onShipMethodSelect: this.onShipMethodSelect,
      id: "select-shipping-method-2",
      currency: this.props.currency
    };
    const thisStep = 3;
    return (
      <div className={styles["option-content"]}>
        <div>
          <p>
Congratulations!
            { firstName }
            {" "}
you are almost done. Please review your shipping address, payment information, and order summary. Your order will begin processing within 1-2 business days.
          </p>
          <p>You can also update your shipping method here:</p>
        </div>
        <div>
          { this.state.currentShippingMethod
            ? <ShippingMethodsDropdown {...ShippingMethodsDropdownProps} />
            : null
          }
        </div>
        { this.renderPlaceOrder(validateQty) }
      </div>
    );
  }

  renderCustomHistory() {
    const historyProps = {
      pathname: this.props.location.pathname,
      search: this.props.location.search,
      name: "Checkout Page"
    };
    return <CustomHistory record={historyProps} />;
  }


  render() {
    console.log("checkout render props", this.props);
    const GridSettings = {
      left: {
        xs: 12, sm: 7, md: 7, lg: 8
      },
      right: {
        xs: 12, sm: 5, md: 5, lg: 4
      }
    };
    const headers = [
      "YOUR INFORMATION",
      "SHIPPING ADDRESS",
      "PAYMENT INFORMATION",
      "REVIEW AND SHIPPING METHOD"
    ];
    const Titles = [
      "Your Information",
      "Shipping Address",
      "Payment Information",
      "Review and Shipping Method"
    ];
    const headerNodes = headers.map((val, step) => {
      let Edit = "";
      if (this.state.currentStep > step) {
        Edit = (
          <Button bsClass={`btn pull-right ${styles["edit-btn"]}`} onClick={() => { this.edit(step); }}>
            Edit
          </Button>
        );
      }
      return (
        <div>
          {" "}
          {this.props.authenticated ? step : step + 1}
.
          {" "}
          {val}
          {" "}
          {Edit}
        </div>
      );
    });
    const savingItemProps = {
      authenticated: this.props.authenticated,

      reward_points_avail: (this.props.customer && this.props.customer.reward_points) ? this.props.customer.reward_points : 0,
      use_reward_points: this.state.use_reward_points,
      reward_points_to_use: this.state.reward_points_to_use,
      toggleUseRewardPoints: this.toggleUseRewardPoints,
      onRewardPointChange: this.onRewardPointChange,
      editRewardPoints: this.state.editRewardPoints,
      toggleEditRewardPoints: this.toggleEditRewardPoints,

      use_gift_card: this.state.use_gift_card,
      gift_card_code: this.state.gift_card_code,
      gift_card_avail_amount: this.state.gift_card_avail_amount,
      gift_card_use_amount: this.state.gift_card_use_amount,
      editGiftCardCode: this.state.editGiftCardCode,
      editGiftCardAmount: this.state.editGiftCardAmount,
      toggleEditGiftCardCode: this.toggleEditGiftCardCode,
      toggleEditGiftCardAmount: this.toggleEditGiftCardAmount,
      onGiftCardCodeChange: this.onGiftCardCodeChange,
      onGiftCardAmountChange: this.onGiftCardAmountChange,
      toggleUseGiftCard: this.toggleUseGiftCard,
      handleGiftCardApply: this.handleGiftCardApply,
      removeGiftCardCode: this.removeGiftCardCode,
      currency: this.props.currency,
    };
    const totalSegmentsExtras = {
      use_reward_points: this.state.use_reward_points,
      reward_points_to_use: this.state.reward_points_to_use,
      reward_points_to_value_rate: this.props.reward_points_to_value_rate,
      use_gift_card: this.state.use_gift_card,
      gift_card_use_amount: this.state.gift_card_use_amount
    };
    const validateQty = this.validateItemsQty();
    let currentCoupon;
    if (this.props.total_segments && this.props.total_segments.extras) {
      for (const key in this.props.total_segments.extras) {
        const extra = this.props.total_segments.extras[key];
        if (extra.code === "coupon") {
          currentCoupon = extra.title;
        }
      }
    }
    return (
      <div>
        <Helmet
          title={`${Titles[this.state.currentStep]} - Checkout`}
          script={[
            {
              src: "https://www.paypalobjects.com/api/checkout.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.13.0/js/paypal-checkout.min.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.13.0/js/client.min.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.13.0/js/hosted-fields.min.js"
            },
            {
              src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBe_KXwdc-mBeWQa8Js4T2htfbmJtzeuek&libraries=places"
            }
          ]}
        />

        <Grid className={styles["checkout-page"]}>
          <header className={styles["checkout-title"]}>
            {" "}
            { this.props.authenticated ? "Checkout" : "Guest Checkout"}
          </header>
          <Row>
            <Col {...GridSettings.left} className={styles.leftCol}>
              { this.renderYourInfomationStep() }
              <Panel className={styles["step-panel"] + this.getStepStatusClassname(1)} collapsible expanded={this.state.currentStep >= 1} header={headerNodes[1]}>
                { this.renderShippingAdderssStep() }
              </Panel>
              <Panel className={styles["step-panel"] + this.getStepStatusClassname(2)} collapsible expanded={this.state.currentStep >= 2} header={headerNodes[2]}>
                { this.renderPaymentStep(savingItemProps) }
              </Panel>
              <Panel className={styles["step-panel"] + this.getStepStatusClassname(3)} collapsible expanded={this.state.currentStep >= 3} header={headerNodes[3]}>
                { this.renderReviewStep(validateQty) }
              </Panel>
            </Col>
            <Col {...GridSettings.right}>
              <div className={styles["order-summary"]}>
                <TotalSegments
                  onShipMethodSelect={this.onShipMethodSelect}
                  currentShippingMethod={this.state.currentShippingMethod}
                  getFinalTotalPrice={this.getFinalTotalPrice}
                  cartId={this.props.cartId}
                  shippingMethods={this.props.shipping_methods}
                  totalSegments={this.props.total_segments}
                  showDetail={false /* this.state.currentStep==3 */}
                  currency={this.props.currency}
                  {...totalSegmentsExtras}
                >
                  { this.renderPlaceOrder(validateQty) }
                </TotalSegments>
              </div>
              { this.renderPlaceOrderError() }
              <div className={styles["extras-wrapper"]}>
                <div className={cartStyles["extra-top-bar"]}>
                  <LiveChatTrigger>
                    {" "}
                    {" WAYS TO SAVE MORE "}
                    {" "}
                  </LiveChatTrigger>
                </div>
                <div className={cartStyles["extras-row"]}>
                  <div className={styles["coupon-wrapper"]}>
                    <CouponInput currentCoupon={currentCoupon} onApply={this.resetRewardPointsAndGiftCard} onRemove={this.resetRewardPointsAndGiftCard} />
                  </div>
                  <SavingItemComponents {...savingItemProps} />
                </div>
              </div>
              <div className={styles["order-summary"]}>
                <TotalSegments
                  onShipMethodSelect={this.onShipMethodSelect}
                  currentShippingMethod={this.state.currentShippingMethod}
                  getFinalTotalPrice={this.getFinalTotalPrice}
                  cartId={this.props.cartId}
                  shippingMethods={this.props.shipping_methods}
                  productList={this.props.product_list}
                  totalSegments={this.props.total_segments}
                  showDetail
                  currency={this.props.currency}
                  {...totalSegmentsExtras}
                >
                  { this.renderPlaceOrder(validateQty) }
                </TotalSegments>
              </div>
            </Col>
          </Row>
        </Grid>
        { this.renderCustomHistory() }
      </div>
    );
  }
}
// guestEmail: getGuestEmail(store),
function mapStateToProps(store) {
  return {
    total_segments: getTotalSegments(store),
    product_list: getProductList(store),
    customer: getCustomer(store),
    coupon_used: getCouponUsed(store),
    billing_address: getBillingAddress(store),
    // new_billing_address: getNewBillingAddress(store),
    shipping_address: getShippingAddress(store),
    shipping_methods: getShippingMethods(store),
    payment_methods: getPaymentMethods(store),
    guest_account_exist: getGuestAccountExist(store),
    guest_email: getGuestEmail(store),
    authenticated: getAuthStatus(store),
    reward_points_to_value_rate: getRewardPointsToValueRate(store),
    currency: getCurrency(store),
    intl: store.intl,
    productNum: getProductNum(store),
  };
}

export default connect(mapStateToProps)(CheckoutPage);
