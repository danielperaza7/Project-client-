import React, { Component } from "react";
// import Helmet from 'react-helmet';
import {
  Grid, Row, Col, Checkbox
} from "react-bootstrap";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import styles from "./braintreeNewCreditCard.css";


class BraintreeNewCreditCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const setupProps = {
      form: this.refs.form,
      submit: this.refs.submit,
      cb: this.props.saveHostedFieldsInstance
    };
    this.props.setup("braintreeNewCreditCard", setupProps);
  }

  componentWillUnmount() {
    this.props.saveHostedFieldsInstance(null);
  }

  render() {
    const ColSettings = {
      number: {
        xs: 12, sm: 12, md: 12, lg: 12
      },
      expire: {
        xs: 6, sm: 6, md: 6, lg: 6
      },
      cvv: {
        xs: 6, sm: 6, md: 6, lg: 6
      },
      saveNew: {
        xs: 12, sm: 12, md: 12, lg: 12
      }
    };

    return (
      <div>
        <Row className={this.props.hidden ? "hidden" : ""}>
          <form ref="form" id="checkout-form" action="/transaction-endpoint" method="post">
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
          <Col {...ColSettings.saveNew}>
            <div className={this.props.authenticated ? "" : "hidden"}>
              <FieldFormControlCheckbox id="save_card" title="Save this credit card in my account" input={{ value: this.props.savePayment, onChange: this.props.onToggleSaveNewPayment }} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BraintreeNewCreditCard;
