import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./PaymentUseNew.css";
import { setPayWithNew } from "../../CheckoutActions";


class PaymentUseNewCollapse extends Component {
  constructor(props) {
    super(props);
    this.handleSelectNew = this.handleSelectNew.bind(this);
  }

  handleSelectNew() {
    console.log("handleSelectNew payment called");
    this.props.dispatch(setPayWithNew(true));
  }

  render() {
    const cardsImg = "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/Cards.svg";

    return (
      <div className={styles.addNewPayment} onClick={() => { this.handleSelectNew(); }}>
        + &nbsp;&nbsp;&nbsp;&nbsp; Use a new payment method
        <img src={cardsImg} className={styles.creditCardLogos} />
      </div>
    );
  }
}

export default connect()(PaymentUseNewCollapse);
