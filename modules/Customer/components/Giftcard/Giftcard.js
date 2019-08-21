import React, { Component } from "react";
import { connect } from "react-redux";

import { checkGiftCardAmount, redeemGiftcard } from "../../CustomerActions";
import styles from "./Giftcard.css";

class Giftcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: "",
      balance: "",
      amount: "",
      err: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRedeem = this.handleRedeem.bind(this);
    this.handleCheckAmount = this.handleCheckAmount.bind(this);
    this.handleRedeemResponse = this.handleRedeemResponse.bind(this);
    this.handleCheckResponse = this.handleCheckResponse.bind(this);
  }

  handleChange(value) {
    this.setState({
      cardNum: value,
      balance: "",
      amount: "",
      err: ""
    });
  }

  handleRedeem() {
    console.log("--- handleRedeem called ---");
    this.props.dispatch(redeemGiftcard(this.state.cardNum, this.handleRedeemResponse));
  }

  handleCheckAmount() {
    console.log("--- handleCheckAmount called ---");
    this.props.dispatch(
      checkGiftCardAmount(this.state.cardNum, this.handleCheckResponse)
    );
  }

  handleRedeemResponse(err, balance) {
    console.log("finish redeem -- ", err, balance);
    if (err) {
      this.setState({
        err: balance || "Invalid card number"
      });
      return;
    }
    this.setState({
      balance: balance / 100
    });
  }

  handleCheckResponse(err, amount) {
    console.log("finish check -- ", err, amount);
    if (err) {
      this.setState({
        err: amount || "Invalid card number"
      });
      return;
    }
    this.setState({
      amount: amount / 100
    });
  }

  render() {
    const { apply_mode } = this.props;
    return (
      <div>
        {!apply_mode ? (
          <div className="giftCard">
            <input
              type="text"
              onChange={(e) => {
                this.handleChange(e.target.value);
              }}
              className={styles.giftCardInput}
            />
            <button onClick={this.handleRedeem} className={styles.giftCardBtn}>
              {" "}
              Redeem
              {" "}
            </button>
            {this.state.balance ? (
              <div className="redeemed">
                {" "}
                Redeem success! Your account balance is $
                {this.state.balance}
.
                {" "}
              </div>
            ) : null}
            {this.state.err ? (
              <div className="error" style={{ color: "red" }}>
                {this.state.err}
              </div>
            ) : null}
            {this.state.amount ? (
              <div className="checkAmount">
                {" "}
Amount: $
                {this.state.amount}
                {" "}

              </div>
            ) : (
              <button onClick={this.handleCheckAmount} className={styles.giftCardBtn}>
                {" "}
                Check amount without redeem
                {" "}
              </button>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              onChange={(e) => {
                this.handleChange(e.target.value);
              }}
              className={styles.giftCardInput}
            />
            <button onClick={this.handleRedeem}> Apply </button>
            {this.state.balance ? (
              <div className="redeemed">
                {" "}
                Redeem success! Your account balance is $
                {this.state.balance}
.
                {" "}
              </div>
            ) : null}
            {this.state.err ? (
              <div className="error" style={{ color: "red" }}>
                {this.state.err}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default connect()(Giftcard);
