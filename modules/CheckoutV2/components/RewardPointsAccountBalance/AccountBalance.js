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

class AccountBalance extends Component {
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
      value: this.props.accountBalanceToUse
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
    console.log("--- apply acc balance called ---", this.state.value);
    if (
      !/^[0-9]+\.?[0-9]?[0-9]?$/.test(this.state.value)
      || parseFloat(this.state.value) > this.props.accountBalance / 100
    ) {
      this.setState({
        err: `Please input an integer no more than $${this.props.accountBalance
          / 100} for account balance usage.`
      });
      return;
    }
    const {
      rewardPointsToUse,
      accountBalanceToUse,
      currentShippingMethod,
      cartShippingAddress,
      cartBillingAddress
    } = this.props;
    const data = {
      gift_card_usage: Math.floor(parseFloat(this.state.value) * 100),
      reward_point_usage: rewardPointsToUse,
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
      accountBalance,
      accountBalanceToUse,
      authStatus
    } = this.props;

    const innerNode = authStatus ? (
      <div className={styles.innerNode}>
        <span className={styles.dollarSign}>$</span>
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
        {accountBalanceToUse ? (
          <div className={styles.applied}>
            {" "}
$
            {accountBalanceToUse / 100}
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
        <div style={{ fontFamily: "GothamMedium" }}>For registered customer only</div>
        <div>
          <Link to="/checkout/signin">Sign in</Link>
          {" "}
to use Gift Card. Or
          {" "}
          <Link to="/checkout/signup">Become a member</Link>
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
          {`Use your Account Balance ($${accountBalance / 100 || 0} available)`}
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

export default connect(mapStateToProps)(AccountBalance);
