/*
  props:
    currentCoupon
*/
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

// import actions
import { applyCoupon, removeCoupon } from "../../CheckoutActions";
import { getCurrentCouponList } from "../../CheckoutReducer";
// import styles
import styles from "./CouponInput.css";
import checkoutStyles from "../../pages/CheckoutPage/CheckoutPage.css";


class CouponInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon: "",
      msg: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleCouponApply = this.handleCouponApply.bind(this);
    this.handleCouponRemove = this.handleCouponRemove.bind(this);
    this.handleCouponApplyResponse = this.handleCouponApplyResponse.bind(this);
  }

  // className={styles['edit-btn-context']} onClick={ ()=> this.props.toggleEditGiftCardAmount() }
  handleCouponApply(event) {
    event.preventDefault();
    if (this.props.onApply) { this.props.onApply(); }
    this.props.dispatch(applyCoupon(this.state.coupon, 1, this.handleCouponApplyResponse));
  }

  handleCouponApplyResponse(err, msg) {
    if (!err) {
      // if 200, show success or not valid coupon code
      this.setState({ msg });
    } else {
      this.setState({ msg: "Sorry, please try later." });
    }
  }

  handleCouponRemove() {
    if (this.props.onRemove) { this.props.onRemove(); }
    this.setState({
      coupon: "",
      msg: ""
    });
    this.props.dispatch(removeCoupon(1));
  }

  onInputChange(event) {
    this.setState({
      coupon: event.target.value
    });
  }

  renderMsg(msg) {
    if (msg) {
      return <div className={styles.show_msg}>{this.state.msg}</div>;
    }
  }

  render() {
    const currentCoupons = this.props.coupon_list;
    const currentCoupons_list = currentCoupons.map((item, index) => {
      return (
        <div key={index}>
          { item }
        </div>
      );
    });
    if (!currentCoupon) {
      return (
        <div className={styles["coupon-input-wrapper"]}>
          <div className={styles.title}>Have a Coupon Code?</div>
          <form onSubmit={this.handleCouponApply}>
            <input className={`${checkoutStyles["input-style"]} ${styles["coupon-input"]}`} value={this.state.coupon} onChange={this.onInputChange} type="text" />
            <button type="submit" className={`${checkoutStyles["button-style"]} ${styles["coupon-apply"]} ${this.state.coupon ? "" : styles["disabled-btn"]}`} disabled={!this.state.coupon}>
              apply
            </button>
          </form>
          <div className={styles.codesNote}> Multiple coupon codes cannot be combined.</div>
          {this.renderMsg(this.state.msg)}
        </div>

      );
    }
    return (
      <div className={styles["coupon-input-wrapper"]}>
        <span>{ currentCoupon }</span>
        <button onClick={() => this.handleCouponRemove()} className={checkoutStyles["edit-btn-context"]}>
          <i className="ion-android-close" />
        </button>
        {this.renderMsg(this.state.msg)}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    coupon_list: getCurrentCouponList(store)
  };
}

export default connect()(CouponInput);
