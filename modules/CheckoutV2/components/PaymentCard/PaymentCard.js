import React, { Component } from "react";
import { connect, batch } from "react-redux";

import {
  setTokenBraintreeSavedSelected,
  setPaymentSavedDetail,
  setPayWithNew
} from "../../CheckoutActions";

import { getTokenBraintreeSavedSelected } from "../../CheckoutReducer";

import styles from "./PaymentCard.css";

const fakeCards = {
  "American Express": {
    title: "American Express",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/AmEx-Card%402x.png"
  },
  "Carte Blanche": {
    title: "Carte Blanche",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/CarteBlanche-Card%402x.png"
  },
  "China UnionPay": {
    title: "China UnionPay",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/UnionPay-Card%402x.png"
  },
  "Diners Club": {
    title: "Diners Club",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/DinersClub-Card%402x.png"
  },
  Discover: {
    title: "Discover",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Discover-Card%402x.png"
  },
  JCB: {
    title: "JCB",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/JCB-Card%402x.png"
  },
  Laser: {
    title: "Laser",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Laser-Card%402x.png"
  },
  Maestro: {
    title: "Maestro",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Maestro-Card%402x.png"
  },
  MasterCard: {
    title: "MasterCard",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Mastercard-Card%402x.png"
  },
  Solo: {
    title: "Solo",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Solo-Card%402x.png"
  },
  Switch: {
    title: "Switch",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Switch-Card%402x.png"
  },
  Visa: {
    title: "Visa",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Visa-Card%402x.png"
  },
  Unknown: {
    title: "Unknown",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/Unknown-Card%402x.png"
  },
  paypal: {
    title: "Paypal",
    image:
      "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/PaymentsCards/PC%20Size/PayPal%402x.png"
  }
};

class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.onSelectPayment = this.onSelectPayment.bind(this);
  }

  onSelectPayment(details) {
    console.log("---onSelectPayment---", details);
    batch(() => {
      this.props.dispatch(setTokenBraintreeSavedSelected(details.token));
      this.props.dispatch(setPaymentSavedDetail(details));
      this.props.dispatch(setPayWithNew(false));
    });
  }

  render() {
    const { payment, seeMoreCallback, tokenBraintreeSavedSelected } = this.props;
    if (payment.type === "seeMore") {
      return (
        <div
          className={`${styles.paymentWrapper} ${styles.seeMore}`}
          onClick={seeMoreCallback}
        >
          ...
          <br />
          See More
        </div>
      );
    }
    const details = JSON.parse(payment.details);
    const {
      token, cardType, maskedNumber, expirationDate, payerEmail
    } = details; // need extract more keys for paypal account, no holder name for cards
    const selected = tokenBraintreeSavedSelected === token;
    if (payment.type === "braintree_credit_card") {
      return (
        <div
          className={`${styles.paymentWrapper} ${selected ? styles.paymentSelected : ""}`}
          onClick={() => {
            this.onSelectPayment(details);
          }}
        >
          <div className={styles.paymentInnerWrapper}>
            <img
              className={styles.bgImage}
              role="presentation"
              src={fakeCards[cardType] ? fakeCards[cardType].image : ""}
              alt={fakeCards[cardType] ? fakeCards[cardType].title : "Unknown card type"}
            />
            <span className={styles.cardNumber}>
              {" "}
              {maskedNumber}
              {" "}
            </span>
            <span className={styles.expireDate}>
              {" "}
              {expirationDate}
              {" "}
            </span>
          </div>
        </div>
      );
    } // else if (payment.type === 'braintree_paypal_account') {
    return (
      <div
        className={`${styles.paymentWrapper} ${selected ? styles.paymentSelected : ""}`}
        onClick={() => {
          this.onSelectPayment(details);
        }}
      >
        <div className={styles.paymentInnerWrapper}>
          <img
            className={styles.bgImage}
            role="presentation"
            src={fakeCards.paypal.image}
          />
          <span className={styles.paypalAccountTitle}> Account: </span>
          <span className={styles.paypalAccountValue}>
            {" "}
            {payerEmail}
            {" "}
          </span>
        </div>
      </div>
    );
    // }
  }
}

function mapStateToProps(store) {
  return {
    tokenBraintreeSavedSelected: getTokenBraintreeSavedSelected(store)
  };
}

export default connect(mapStateToProps)(PaymentCard);
