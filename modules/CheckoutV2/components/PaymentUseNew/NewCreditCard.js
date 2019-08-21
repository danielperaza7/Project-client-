import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { setBraintreeCardInstance } from "../../CheckoutActions";

import { getBraintreeToken } from "../../CheckoutReducer";

import styles from "./PaymentUseNew.css";

// need to check if guest or logged in users ->  wether render the save the payment method checkbox

const braintreeCreateCardInstanceStyles = {
  // styling: https://developers.braintreepayments.com/guides/hosted-fields/styling/javascript/v3
  input: {
    "font-size": "14px"
  },
  "input.invalid": {
    color: "red"
  },
  "input.valid": {
    color: "green"
  }
};

const braintreeCreateCardInstanceFields = {
  number: {
    selector: "#card-number",
    placeholder: "Credit Card Number"
  },
  cvv: {
    selector: "#cvv",
    placeholder: "CVV"
  },
  expirationDate: {
    selector: "#expiration-date",
    placeholder: "MM/YYYY"
  }
};

class NewCreditCard extends Component {
  constructor(props) {
    super(props);
    this.braintreeCreditCardSetup = this.braintreeCreditCardSetup.bind(this);
    this.fetchInstanceCallback = this.fetchInstanceCallback.bind(this);
  }

  componentDidMount() {
    this.braintreeCreditCardSetup(
      this.refs.form,
      this.refs.submit,
      this.fetchInstanceCallback
    );
  }

  fetchInstanceCallback(hostedFieldsInstance) {
    this.props.dispatch(setBraintreeCardInstance(hostedFieldsInstance)); // instance saved when "try next step" in checkout
  }

  braintreeCreditCardSetup(form, submit, cb) {
    window.braintree.client.create(
      {
        authorization: this.props.braintreeClientToken
      },
      (clientErr, clientInstance) => {
        if (clientErr) {
          console.error(" - Error creating client:", clientErr);
          return;
        }
        window.braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: braintreeCreateCardInstanceStyles,
            fields: braintreeCreateCardInstanceFields
          },
          (hostedFieldsErr, hostedFieldsInstance) => {
            if (hostedFieldsErr) {
              console.log(" - Handle error in Hosted Fields creation", hostedFieldsErr);
              return;
            }
            // save hostedFieldsInstance in this checkout state
            cb(hostedFieldsInstance);
          }
        );
      }
    );
  }

  render() {
    const ColSettings = {
      number: { xs: 12 },
      expire: { xs: 6 },
      cvv: { xs: 6 },
      saveNew: { xs: 12 }
    };

    return (
      <div
        style={this.props.hidden ? { display: "none" } : {}}
        className={`${styles.innerSections} ${styles.cardSection}`}
      >
        <Row>
          <form
            ref="form"
            id="checkout-form"
            action="/transaction-endpoint"
            method="post"
          >
            <div id="error-message" />
            <Col {...ColSettings.number}>
              <label htmlFor="card-number">
                Card Number
                <span style={{ color: "red" }}>*</span>
              </label>
              <div className={styles["hosted-field"]} id="card-number" />
            </Col>
            <Col {...ColSettings.expire}>
              <label htmlFor="expiration-date">
                Expiration Date
                <span style={{ color: "red" }}>*</span>
              </label>
              <div className={styles["hosted-field"]} id="expiration-date" />
            </Col>
            <Col {...ColSettings.cvv}>
              <label htmlFor="cvv">
                CVV
                <span style={{ color: "red" }}>*</span>
              </label>
              <div className={styles["hosted-field"]} id="cvv" />
            </Col>
            <input type="hidden" name="payment_method_nonce" />
          </form>
          {/* <Col {...ColSettings.saveNew} >
            <div className={this.props.authenticated ? '':'hidden'}>
              <FieldFormControlCheckbox id={"save_card"} title={"Save this credit card in my account"} input={{ value: this.props.savePayment, onChange: this.props.onToggleSaveNewPayment}} />
            </div>
          </Col> */}
        </Row>
      </div>
    );
    // return <div> testtes </div>
  }
}

function mapStateToProps(store) {
  return {
    braintreeClientToken: getBraintreeToken(store)
  };
}

export default connect(mapStateToProps)(NewCreditCard);
