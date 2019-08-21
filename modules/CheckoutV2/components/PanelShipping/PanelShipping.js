import React, { Component } from "react";
import { connect } from "react-redux";

import AddressCardList from "../AddressCardList/AddressCardList";
import AddressFormWrapper from "../AddressFormWrapper/AddressFormWrapper";
import CircleLoader from "../../../../components/masks/CircleLoader";
import { onCheckoutOption } from "../../../Analytics/components/GA";
import { getCartShippingAddress, getCartBillingAddress } from "../../../App/AppReducer";
import {
  getShipNew,
  getRewardPointsToUse,
  getAccountBalanceToUse,
  getShipExistID
} from "../../CheckoutReducer";
import { postUserCheckoutInputs, nextCheckoutStep } from "../../CheckoutActions";
import styles from "./PanelShipping.css";
import { getAuthStatus } from "../../../Authentication/AuthReducer";

class PanelShipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_address: false,
      firstTime: true,
      loading: false
    };
    this.handleShippingPanelSubmit = this.handleShippingPanelSubmit.bind(this);
    this.handleShipToExistResponse = this.handleShipToExistResponse.bind(this);
    this.handleTryNext = this.handleTryNext.bind(this);
  }

  handleShippingPanelSubmit(address) {
    const { rewardPointsToUse, accountBalanceToUse, cartBillingAddress } = this.props;
    // should call postUserCheckoutInputs, if success then go next step
    this.setState({
      loading: true
    });
    const data = {
      reward_point_usage: rewardPointsToUse,
      gift_card_usage: accountBalanceToUse,
      shipping_address: address,
      billing_address:
        !cartBillingAddress
        || !cartBillingAddress.postcode
        || !cartBillingAddress.country_id
          ? address
          : cartBillingAddress
    };
    this.props.dispatch(postUserCheckoutInputs(data, this.handleShipToExistResponse));
  }

  handleShipToExistResponse(success) {
    if (success) {
      this.setState({
        loading: false
      });
    } else {
      this.setState({
        loading: false,
        errorMsg: "Please check your shipping address and try later."
      });
    }
  }

  handleTryNext() {
    if (this.props.cartShippingAddress && this.props.cartShippingAddress.postcode) {
      this.props.dispatch(nextCheckoutStep());
      onCheckoutOption({ actionField: { step: 3, option: "old_address" } });
    } else {
      this.setState({
        errorMsg: "Please select your shipping address and try again."
      });
    }
  }

  renderAddress() {
    const { cartShippingAddress } = this.props;
    if (cartShippingAddress) {
      const {
        firstname,
        lastname,
        region_code,
        street,
        telephone,
        country_id,
        city,
        postcode
      } = cartShippingAddress;
      return (
        <div>
          <div>
            {firstname}
            {" "}
            {lastname}
          </div>
          <div>
            {`${street ? street.toString() : ""}, ${city || ""}, ${region_code
            || ""}, ${postcode || ""}, ${country_id || ""}`}
          </div>
          <div>{telephone}</div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { shipNew, editing, showSummary } = this.props;
    const disabled = this.state.loading || !this.props.shipExistID;
    return (
      <div>
        <div className={editing ? "" : "hidden"}>
          <AddressCardList
            formName="shippingAddress"
            handleSelectExistCB={this.handleShippingPanelSubmit}
          />
          <div className={shipNew || !this.props.authentication ? "" : "hidden"}>
            <AddressFormWrapper formName="shippingAddress" />
          </div>
          {!shipNew && this.props.authentication ? (
            <button
              onClick={this.handleTryNext}
              className={styles.shippingPanelBTN}
              disabled={disabled}
            >
              SHIP TO THIS ADDRESS
              {" "}
              {this.state.loading ? <CircleLoader /> : null}
            </button>
          ) : null}
        </div>

        <div
          className={!showSummary ? "hidden" : ""}
          style={{ marginLeft: "20px", fontSize: "12px" }}
        >
          {this.renderAddress()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    shipNew: getShipNew(store),
    authentication: getAuthStatus(store),
    cartShippingAddress: getCartShippingAddress(store),
    rewardPointsToUse: getRewardPointsToUse(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    cartBillingAddress: getCartBillingAddress(store),
    shipExistID: getShipExistID(store)
  };
}

export default connect(mapStateToProps)(PanelShipping);
