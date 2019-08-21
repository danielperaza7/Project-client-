import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { postUserCheckoutInputs } from "../../CheckoutActions";

import {
  getRewardPoints,
  getAccountBalance,
  getCartShippingAddress,
  getCartBillingAddress
} from "../../../App/AppReducer";
import {
  getRewardPointsToUse,
  getAccountBalanceToUse,
  getCurrentShippingMethod
} from "../../CheckoutReducer";

import styles from "./RewardPointsAccountBalance.css";

class RewardPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      value: "",
      err: ""
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyUse = this.applyUse.bind(this);
    this.postAddressCallback = this.postAddressCallback.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: this.props.rewardPointsToUse
    });
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  postAddressCallback(success) {
    if (!success) {
      this.setState({
        err: "Apply failed, please try later."
      });
    }
  }

  applyUse() {
    console.log("--- apply reward called ---", this.state.value, this.props.rewardPoints);
    if (
      !/^[0-9]+$/.test(this.state.value)
      || parseInt(this.state.value) > this.props.rewardPoints
    ) {
      this.setState({
        err: `Please input an integer no more than ${
          this.props.rewardPoints
        } for reward points usage.`
      });
      return;
    }
    const {
      // rewardPointsToUse,
      accountBalanceToUse,
      currentShippingMethod,
      cartShippingAddress,
      cartBillingAddress
    } = this.props;
    const data = {
      gift_card_usage: accountBalanceToUse,
      reward_point_usage: parseInt(this.state.value),
      shipping_method: currentShippingMethod,
      shipping_address: cartShippingAddress || {},
      billing_address: cartBillingAddress || {}
    };
    this.props.dispatch(postUserCheckoutInputs(data, this.postAddressCallback));
  }

  handleChange(value) {
    this.setState({
      value,
      err: ""
    });
  }

  render() {
    const {
      rewardPoints,
      rewardPointsToUse,
      // accountBalance,
      // accountBalanceToUse,
      authStatus
    } = this.props;

    const innerNode = authStatus ? (
      <div className={styles.innerNode}>
        <input
          type="text"
          value={this.state.value || ""}
          onChange={(e) => {
            this.handleChange(e.target.value);
          }}
        />
        <button
          onClick={() => {
            this.applyUse();
          }}
        >
          Apply
        </button>
        {rewardPointsToUse ? (
          <div className={styles.applied}>
            {" "}
            {rewardPointsToUse}
            {" "}
applied
            {" "}
          </div>
        ) : null}
        {this.state.err ? (
          <div className={styles.error}>
            {" "}
            {this.state.err}
            {" "}
          </div>
        ) : null}
      </div>
    ) : (
      <div className={styles.innerNode}>
        <div style={{ fontFamily: "GothamMedium" }}>No Reward Points available</div>
        <div>
          <Link to="/checkout/signin">Sign in</Link>
          {" "}
to check your Reward Points.
        </div>
        <div>
          New to us?
          {" "}
          <Link to="/checkout/signup">Become a member</Link>
          {" "}
to earn
          {" "}
          <span style={{ fontFamily: "GothamMedium" }}>1 Reward Point per dollar</span>
          {" "}
          from every purchase!
        </div>
      </div>
    );

    return (
      <div className={styles.sectionWrapper}>
        <div className={styles.title} onClick={this.toggleCollapsed}>
          <i
            className={`${styles.collapsedIcon} ${
              this.state.collapsed ? "ion-android-add" : "ion-android-remove"
            }`}
          />
          {`Use your Reward Points (${rewardPoints || 0} available)`}
        </div>
        {this.state.collapsed ? null : innerNode}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    rewardPoints: getRewardPoints(store),
    rewardPointsToUse: getRewardPointsToUse(store),
    accountBalance: getAccountBalance(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    currentShippingMethod: getCurrentShippingMethod(store),
    cartShippingAddress: getCartShippingAddress(store),
    cartBillingAddress: getCartBillingAddress(store)
  };
}

export default connect(mapStateToProps)(RewardPoints);
