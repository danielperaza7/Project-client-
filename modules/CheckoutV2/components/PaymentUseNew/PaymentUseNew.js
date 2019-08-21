import React, { Component } from "react";
import { connect } from "react-redux";

import NewCreditCard from "./NewCreditCard";
import NewPaypal from "./NewPaypal";
import FieldFormControlRadiobox from "../../../../components/FieldFormControlRadiobox";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import PaymentUseNewCollapse from "./PaymentUseNewCollapse";

import { setPaymentMethod, setSaveNewPayment } from "../../CheckoutActions";

import {
  getPaymentMethod,
  getSaveNewPayment,
  getPayNew,
  getTokenBraintreeSavedSelected
} from "../../CheckoutReducer";

import styles from "./PaymentUseNew.css";

class PaymentUseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardMounted: false,
      paypalMounted: false
    };
    this.handlePaymentMethodSelect = this.handlePaymentMethodSelect.bind(this);
    this.onToggleSaveNew = this.onToggleSaveNew.bind(this);
  }

  onToggleSaveNew() {
    this.props.dispatch(setSaveNewPayment(!this.props.saveNewPayment));
  }

  handlePaymentMethodSelect(event) {
    this.props.dispatch(setPaymentMethod(event.target.value));
    if (!this.state.creditCardMounted && event.target.value === "braintree_credit_card") {
      this.setState({
        creditCardMounted: true
      });
    } else if (
      !this.state.paypalMounted
      && event.target.value === "braintree_paypal_account"
    ) {
      this.setState({
        paypalMounted: true
      });
    }
  }

  render() {
    const {
      authStatus,
      paymentMethod,
      saveNewPayment,
      payNew,
      // tokenBraintreeSavedSelected,
      collapse
    } = this.props;
    const cardsImg = "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/Cards.svg";
    const paypalImg = "https://hiddenfigure.evestemptation.com/email/FERV2CHECKOUT/CHECKOUT_PAYMENT_IMG/paypal.svg";
    return (
      <div>
        {payNew || !collapse ? (
          <div
            className={
              paymentMethod === "braintree_saved"
                ? styles.newPaymentWrapper
                : `${styles.newPaymentWrapper} ${styles.selected}`
            }
          >
            <h4 className={styles.useNewTitle}>Use a new payment method</h4>
            <FieldFormControlRadiobox
              name="payment_method"
              id="payment_method_braintree_credit_card"
              value="braintree_credit_card"
              title="Pay with Credit Card"
              checked={paymentMethod === "braintree_credit_card"}
              onChange={this.handlePaymentMethodSelect}
            />
            <img src={cardsImg} className={styles.creditCardLogos} />
            {paymentMethod === "braintree_credit_card" || this.state.creditCardMounted ? (
              <NewCreditCard hidden={paymentMethod !== "braintree_credit_card"} />
            ) : null}
            <FieldFormControlRadiobox
              name="payment_method"
              id="payment_method_braintree_paypal_account"
              value="braintree_paypal_account"
              title="Pay with PayPal"
              checked={paymentMethod === "braintree_paypal_account"}
              onChange={this.handlePaymentMethodSelect}
            />
            <img src={paypalImg} className={styles.creditCardLogos} alt="" />
            <div
              className={styles.paypalNote}
            >
You will be redirected to PayPal and return to our website to finalize your order.
            </div>
            {paymentMethod === "braintree_paypal_account" || this.state.paypalMounted ? (
              <NewPaypal hidden={paymentMethod !== "braintree_paypal_account"} />
            ) : null}
            {authStatus && paymentMethod !== "braintree_saved" ? (
              <FieldFormControlCheckbox
                id="save_new_payment"
                input={{ value: saveNewPayment, onChange: this.onToggleSaveNew }}
                title="Save the payment method"
              />
            ) : null}
          </div>
        ) : (
          <PaymentUseNewCollapse />
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    paymentMethod: getPaymentMethod(store),
    saveNewPayment: getSaveNewPayment(store),
    payNew: getPayNew(store),
    tokenBraintreeSavedSelected: getTokenBraintreeSavedSelected(store)
  };
}

export default connect(mapStateToProps)(PaymentUseNew);
