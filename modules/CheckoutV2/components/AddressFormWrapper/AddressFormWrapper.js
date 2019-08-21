import React, { Component } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line import/no-useless-path-segments
import AddressFormV2 from "../../../CheckoutV2/components/AddressForm/AddressForm";

import {
  nextCheckoutStep,
  setShippingAddress,
  setBillingAddress,
  postUserCheckoutInputs,
  setBillingFormStatus
} from "../../CheckoutActions";
import { onCheckoutOption } from "../../../Analytics/components/GA";
import {
  getbillingFormStatus,
  getRewardPointsToUse,
  getAccountBalanceToUse,
  getCurrentShippingMethod,
  getCurrentShippingAddress,
  getCurrentBillingAddress,
  getSaveNewShippingAddress,
  getSaveNewBillingAddress,
  getShipNew
} from "../../CheckoutReducer";
import { getCartBillingAddress, getCartShippingAddress } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";

import styles from "./AddressFormWrapper.css";

class AddressFormWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleAddressCallback = this.handleAddressCallback.bind(this);
    this.postAddressCallback = this.postAddressCallback.bind(this);
  }

  handleAddressCallback(address, dataPush) {
    const {
      rewardPointsToUse,
      accountBalanceToUse,
      currentShippingMethod,
      cartBillingAddress,
      cartShippingAddress,
      formName,
      authentication
    } = this.props;
    console.log(
      "handleAddressCallback called addrepostShippingAddressCallbackss:",
      address
    );
    if (formName === "shippingAddress") {
      this.props.dispatch(setShippingAddress(address));
    }
    if (formName === "billingAddress") {
      this.props.dispatch(setBillingAddress(address));
    }
    const data = {
      gift_card_usage: accountBalanceToUse,
      reward_point_usage: rewardPointsToUse,
      shipping_method: currentShippingMethod,
      shipping_address: formName === "shippingAddress" ? address : cartShippingAddress,
      billing_address: formName === "billingAddress" ? address : cartBillingAddress,
      save_shipping_address:
        formName === "shippingAddress" && authentication
          ? address.save_in_address_book
          : false,
      save_billing_address:
        formName === "billingAddress" && authentication
          ? address.save_in_address_book
          : false
    };
    this.props.dispatch(postUserCheckoutInputs(data, this.postAddressCallback, dataPush));
  }

  postAddressCallback(success, dataPush) {
    // need to do different things
    const { formName } = this.props;
    if (success) {
      if (formName === "shippingAddress") {
        this.props.dispatch(nextCheckoutStep());
        if (!dataPush) {
          onCheckoutOption({ actionField: { step: 3, option: "new_address" } });
        }
      }
    }
    if (formName === "billingAddress") this.props.dispatch(setBillingFormStatus(success));
  }

  render() {
    const {
      formName,
      currentShippingAddress,
      currentBillingAddress,
      authentication,
      saveNewBillingAddress,
      saveNewShippingAddress,
      shipNew,
      billingFormStatus
    } = this.props; // formName should be 'shippingAddress', or 'billingAddress'
    let initialData = {};
    switch (formName) {
      case "shippingAddress":
        initialData = currentShippingAddress || {};
        break;
      case "billingAddress":
        initialData = currentBillingAddress || {};
        break;
      default:
        break;
    }
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.newFormTitle}> Add a new address </div>
        <AddressFormV2
          initialData={initialData}
          callback={this.handleAddressCallback}
          extraFields={null}
          extraButtons={null}
          auth={authentication}
          saveNewShippingAddress={saveNewShippingAddress}
          saveNewBillingAddress={saveNewBillingAddress}
          formName={formName}
          shipNew={shipNew}
          billingFormStatus={billingFormStatus}
        />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    rewardPointsToUse: getRewardPointsToUse(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    currentShippingMethod: getCurrentShippingMethod(store),
    cartBillingAddress: getCartBillingAddress(store),
    cartShippingAddress: getCartShippingAddress(store),
    currentShippingAddress: getCurrentShippingAddress(store),
    currentBillingAddress: getCurrentBillingAddress(store),
    authentication: getAuthStatus(store),
    saveNewShippingAddress: getSaveNewShippingAddress(store),
    saveNewBillingAddress: getSaveNewBillingAddress(store),
    shipNew: getShipNew(store),
    billingFormStatus: getbillingFormStatus(store)
  };
}

export default connect(mapStateToProps)(AddressFormWrapper);
