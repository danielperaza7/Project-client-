/*
  props:
  authenticated: this.props.authenticated,

  reward_points_avail: ( this.props.customer && this.props.customer.reward_points ) ? this.props.customer.reward_points:0,
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

  currency: this.props.currency,

*/
import React, { Component } from "react";
import { Button, FormControl } from "react-bootstrap";
// Col, Row, Form, FormGroup, FormControl, Button

import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import styles from "../../pages/CheckoutPage/CheckoutPage.css";

class SavingItemComponents extends Component {
  constructor(props) {
    super(props);
  }

  renderRewardPointsDetail() {
    const ColSetting = {
      lg: 12, md: 12, sm: 12, xs: 12
    };
    if (this.props.use_reward_points) {
      if (this.props.editRewardPoints) {
        return (
          <div className={styles["option-content"]}>
            <form onSubmit={this.props.toggleEditRewardPoints}>
              <input className={`${styles["input-style"]} ${styles["input-structure"]}`} type="text" value={this.props.reward_points_to_use} onChange={this.props.onRewardPointChange} />
              <button className={`${styles["button-style"]} ${styles["button-structure"]}`} onClick={() => this.props.toggleEditRewardPoints()}>
                  apply
              </button>
            </form>
          </div>
        );
      }
      return (
        <div className={styles["option-content"]}>
            Use
          {" "}
          { this.props.reward_points_to_use }
          {" "}
points
          <button className={styles["edit-btn-context"]} onClick={() => this.props.toggleEditRewardPoints()}>
            <i className="ion-ios-compose" />
          </button>
        </div>
      );
    }
    return null;
  }

  renderRewardPoints() {
    if (this.props.authenticated && this.props.reward_points_avail !== 0) {
      return (
        <div>
          <FieldFormControlCheckbox label="reward_points" input={{ value: this.props.use_reward_points === true, onChange: this.props.toggleUseRewardPoints }} title={`Spend your Reward Points ( ${this.props.reward_points_avail} available )`} />
          { this.renderRewardPointsDetail() }
        </div>
      );
    }
    return null;
  }

  renderCurrentGiftCard() {
    return (
      <div style={{ marginBottom: "10px" }}>
Using xxxx
        { this.props.gift_card_code.substr(parseInt(this.props.gift_card_code.length / 2))}
        {" "}
(
        {this.props.currency}
        {" "}
        {this.props.gift_card_avail_amount}
        {" "}
)
        <button className={styles["edit-btn-context"]} onClick={() => this.props.toggleEditGiftCardCode()}><i className="ion-ios-compose" /></button>
        <button className={styles["edit-btn-context"]} onClick={() => this.props.removeGiftCardCode()}><i className="ion-android-close" /></button>
      </div>
    );
  }
  //

  renderGiftCardDetail() {
    if (this.props.use_gift_card) {
      if (this.props.editGiftCardCode) {
        return (
          <div className={styles["option-content"]}>
            <form onSubmit={this.props.handleGiftCardApply}>
              <input className={`${styles["input-style"]} ${styles["input-structure"]}`} type="text" value={this.props.gift_card_code} onChange={this.props.onGiftCardCodeChange} />
              <button className={`${styles["button-style"]} ${styles["button-structure"]}`} onClick={() => this.props.handleGiftCardApply()} type="button">
                apply
              </button>
            </form>
          </div>
        );
      } if (this.props.editGiftCardAmount) {
        return (
          <div className={styles["option-content"]} style={{ marginBottom: "15px" }}>
            { this.renderCurrentGiftCard() }
            <div style={{ marginBottom: "5px" }}>Please enter gift card amount to use</div>
            <form onSubmit={this.props.toggleEditGiftCardAmount}>
              <input className={`${styles["input-style"]} ${styles["input-structure"]}`} type="text" value={this.props.gift_card_use_amount} onChange={this.props.onGiftCardAmountChange} />
              <button className={`${styles["button-style"]} ${styles["button-structure"]}`} onClick={() => this.props.toggleEditGiftCardAmount()}>
                apply
              </button>
            </form>
          </div>
        );
      }
      // show current using amount and code
      return (
        <div className={styles["option-content"]} style={{ marginBottom: "15px" }}>
          { this.renderCurrentGiftCard() }
            Use
          {" "}
          {this.props.currency}
          { this.props.gift_card_use_amount }
          <button className={styles["edit-btn-context"]} onClick={() => this.props.toggleEditGiftCardAmount()}>
            <i className="ion-ios-compose" />
          </button>
        </div>
      );
    }
  }

  renderGiftCard() {
    return (
      <div>
        <FieldFormControlCheckbox label="gift_card" input={{ value: this.props.use_gift_card, onChange: this.props.toggleUseGiftCard }} title="Use Gift Card" />
        {this.renderGiftCardDetail()}
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderRewardPoints() }
        { this.renderGiftCard() }
      </div>
    );
  }
}

export default SavingItemComponents;
