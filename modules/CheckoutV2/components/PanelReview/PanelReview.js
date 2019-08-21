import React, { Component } from "react";
import { connect, batch } from "react-redux";
import PanelSectionDivider from "../PanelSectionDivider/PanelSectionDivider";
import ShippingMethods from "../ShippingMethods/ShippingMethods";
import styles from "./PanelReview.css";
import { getCartShippingAddress, getCartBillingAddress } from "../../../App/AppReducer";
import {
  getRewardPointsToUse,
  getAccountBalanceToUse,
  getCurrentShippingMethod,
  getShippingMethodSelected
} from "../../CheckoutReducer";
import {
  postUserCheckoutInputs,
  setShippingMethod,
  setShippingMethodStatus
} from "../../CheckoutActions";
// import { onCheckoutOption } from "../../../Analytics/components/GA";

class PanelReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_shippingMethod: this.props.currentShippingMethod
    };
    this.handleShippingMethodSelect = this.handleShippingMethodSelect.bind(this);
    this.handleShippingMethodSelectResponse = this.handleShippingMethodSelectResponse.bind(
      this
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentShippingMethod !== this.state.selected_shippingMethod) {
      this.setState({ selected_shippingMethod: nextProps.currentShippingMethod });
    }
  }

  handleShippingMethodSelect(event) {
    batch(() => {
    // should update payment_method_detail
      this.props.dispatch(setShippingMethod(event.target.value));
      const {
        rewardPointsToUse,
        accountBalanceToUse,
        cartBillingAddress,
        cartShippingAddress
      } = this.props;
      // should call postUserCheckoutInputs, if success then go next step
      const data = {
        reward_point_usage: rewardPointsToUse,
        gift_card_usage: accountBalanceToUse,
        shipping_method: event.target.value,
        shipping_address: cartShippingAddress,
        billing_address: cartBillingAddress
      };
      this.props.dispatch(
        postUserCheckoutInputs(data, this.handleShippingMethodSelectResponse)
      );
    });
  }

  handleShippingMethodSelectResponse(res) {
    if (res) {
      this.props.dispatch(setShippingMethodStatus(true));
      // let checkoutOption={'actionField': {'step': 5, 'option': this.props.currentShippingMethod}};
      // onCheckoutOption(checkoutOption);
    }
  }

  render() {
    const { handlePlaceOrder } = this.props;
    return (
      <div>
        <div className={styles.panelTitle}>
          Please
          {" "}
          <span style={{ fontFamily: "GothamMedium" }}>select your shipping method</span>
,
          and
          <span style={{ fontFamily: "GothamMedium" }}>review</span>
          {" "}
your order
          information before placing the order.
        </div>
        <PanelSectionDivider />
        <ShippingMethods
          onChange_shipping={this.handleShippingMethodSelect}
          radioBox_value={this.state.selected_shippingMethod}
        />
        <button
          onClick={handlePlaceOrder}
          className={styles.placeOrderBTN}
          disabled={!this.props.shippingMethod_Selected}
        >
          <i className={`ion-ios-locked ${styles["ion-ios-locked"]}`} />
          PLACE ORDER
        </button>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    currentShippingMethod: getCurrentShippingMethod(store),
    rewardPointsToUse: getRewardPointsToUse(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    cartShippingAddress: getCartShippingAddress(store),
    cartBillingAddress: getCartBillingAddress(store),
    shippingMethod_Selected: getShippingMethodSelected(store)
  };
}

export default connect(mapStateToProps)(PanelReview);
