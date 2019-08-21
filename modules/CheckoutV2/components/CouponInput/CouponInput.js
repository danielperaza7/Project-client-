// import React, { Component } from 'react';
//
// class CouponInput extends Component {
//   render() {
//     return (
//       <div>
//         Have a promo code ?
//         <input />
//         <button>Apply</button>
//       </div>
//     );
//   }
// }
//
// export default CouponInput;
/*
  props:
    currentCoupon
*/
import React, { Component } from "react";
import { connect } from "react-redux";

// import actions
import { applyCoupon, removeCoupon } from "../../CheckoutActions";
import {
  getPriceCalcResult,
  getAccountBalanceToUse,
  getRewardPointsToUse,
  getCurrentShippingMethod
} from "../../CheckoutReducer";
// import styles
import styles from "./CouponInput.css";
import checkoutStyles from "../../pages/CheckoutPage/CheckoutPage.css";

class CouponInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: "",
      msg: "",
      button_disabled: true,
      apply_coupon_err: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleCouponApply = this.handleCouponApply.bind(this);
    this.handleCouponRemove = this.handleCouponRemove.bind(this);
    this.handleCouponApplyResponse = this.handleCouponApplyResponse.bind(this);
    // this.setButtonStatus= this.setButtonStatus.bind(this);
  }

  // setButtonStatus(){
  //   this.setState({ button_disabled: false });
  // }
  // className={styles['edit-btn-context']} onClick={ ()=> this.props.toggleEditGiftCardAmount() }

  onInputChange(event) {
    this.setState({
      coupon: event.target.value,
      apply_coupon_err: false,
      msg: ""
    });
  }

  handleCouponApplyResponse(err, msg) {
    if (!err) {
      // if 200, show success or not valid coupon code
      this.setState({ msg });
    } else {
      this.setState({ msg, apply_coupon_err: true });
    }
    if (this.inputRef) this.inputRef.select();
  }

  handleCouponRemove(detail) {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
    this.setState({
      coupon: "",
      msg: ""
    });
    const extraData = {
      gift_card_usage: this.props.accountBalanceToUse,
      reward_point_usage: this.props.rewardPointsToUse,
      shipping_method: this.props.currentShippingMethod
    };
    this.props.dispatch(removeCoupon(detail, extraData));
  }

  handleCouponApply(event) {
    event.preventDefault();
    if (this.props.onApply) {
      this.props.onApply();
    }
    const extraData = {
      gift_card_usage: this.props.accountBalanceToUse,
      reward_point_usage: this.props.rewardPointsToUse,
      shipping_method: this.props.currentShippingMethod
    };
    this.props.dispatch(
      applyCoupon(this.state.coupon, 1, this.handleCouponApplyResponse, extraData)
    );
  }

  renderMsg(msg) {
    if (msg) {
      return <div className={styles.show_msg}>{this.state.msg}</div>;
    }

    return null;
  }

  render() {
    const currentCoupon = this.props.currentCoupon;
    const currentCoupons = this.props.priceCalcResult && this.props.priceCalcResult.value.coupon_info
      ? this.props.priceCalcResult.value.coupon_info
      : null;
    const currentCoupons_list = currentCoupons
      ? currentCoupons.map((item, index) => {
        return (
          <div style={{ display: "flex" }}>
            <div
              key={index}
              onClick={() => this.handleCouponRemove(item.coupon_code)}
              className={styles.coupon_card}
            >
              {item.coupon_code}
              <span style={{ float: "right", fontSize: "12px", marginTop: "-2px" }}>
                <i className="ion-close" />
              </span>
            </div>
            {item.active ? (
              <span className={styles.couponAppliedStatus} style={{ color: "#4C9F67" }}>
                  Applied
                {" "}
                {`-$${item.change_value}`}
              </span>
            ) : (
              <span className={styles.couponAppliedStatus} style={{ color: "#FD4F57" }}>
                  Not applied
              </span>
            )}
          </div>
        );
      })
      : null;
    if (!currentCoupon) {
      return (
        <div className={styles["coupon-input-wrapper"]}>
          <div className={styles.title}>Have a Coupon Code?</div>
          <form onSubmit={this.handleCouponApply}>
            <input
              className={`${checkoutStyles["input-style"]} ${styles["coupon-input"]}`}
              style={{ borderColor: this.state.apply_coupon_err ? "red" : "" }}
              value={this.state.coupon}
              onChange={this.onInputChange}
              type="text"
              placeholder="Add code"
              ref={(input) => {
                this.inputRef = input;
              }}
            />
            <button
              type="submit"
              className={`${checkoutStyles["button-style"]} ${styles["coupon-apply"]} ${
                this.state.coupon ? "" : styles["disabled-btn"]
              }`}
              disabled={!this.state.coupon}
            >
              APPLY
            </button>
          </form>
          {this.renderMsg(this.state.msg)}
          {currentCoupons ? currentCoupons_list : null}
        </div>
      );
    }

    return (
      <div className={styles["coupon-input-wrapper"]}>
        <span>{currentCoupon}</span>
        <button
          onClick={() => this.handleCouponRemove()}
          className={checkoutStyles["edit-btn-context"]}
        >
          <i className="ion-android-close" />
        </button>
        {this.renderMsg(this.state.msg)}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    priceCalcResult: getPriceCalcResult(store),
    currentShippingMethod: getCurrentShippingMethod(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    rewardPointsToUse: getRewardPointsToUse(store)
  };
}

export default connect(mapStateToProps)(CouponInput);
