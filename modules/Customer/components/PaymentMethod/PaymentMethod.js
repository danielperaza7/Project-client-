/**
 * Created by chris on 5/18/17.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import SinglePaymentMethod from "./SinglePaymentMethod";

import { getPaymentMethod } from "../../CustomerReducer";

import styles from "../AddressBook/AddressBook.css";

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: {}
    };
    this.renderPrimary = this.renderPrimary.bind(this);
    this.renderOther = this.renderOther.bind(this);
  }

  renderPrimary() {
    const ColSettings = {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6
    };
    if (!this.props.paymentMethod || this.props.paymentMethod.length === 0) {
      return "No payment methods";
    }

    const credit = this.props.paymentMethod.braintree_credit_card;
    const paypal = this.props.paymentMethod.braintree_paypal_account;
    const primary = (credit
      ? credit.find((card) => {
        return card.is_default;
      })
      : null)
      || (paypal
        ? paypal.find((account) => {
          return account.is_default;
        })
        : null);

    return (
      <div className={styles["addressbook-overview-all-wrapper"]}>
        <h5>PRIMARY PAYMENT METHOD</h5>
        <Row className={styles["addressbook-overview-all-row"]}>
          {primary ? (
            <Col {...ColSettings} className={styles["address-overview-col"]}>
              <SinglePaymentMethod param={primary} remove={this.remove} />
            </Col>
          ) : (
            <Col {...ColSettings} className={styles["address-overview-col"]}>
              <div>Yor have not set primary payment method</div>
            </Col>
          )}
        </Row>
      </div>
    );
  }

  renderOther() {
    const ColSettings = {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6
    };

    if (!this.props.paymentMethod || this.props.paymentMethod.length === 0) {
      return "No payment methods";
    }
    const credit = this.props.paymentMethod.braintree_credit_card;
    const paypal = this.props.paymentMethod.braintree_paypal_account;

    return (
      <div className={styles["addressbook-overview-all-wrapper"]}>
        <h5>ALL PAYMENT METHODS</h5>
        <Row className={styles["addressbook-overview-all-row"]}>
          {credit
            ? credit.map((card, index) => {
              return (
                <Col
                  {...ColSettings}
                  className={styles["address-overview-col"]}
                  key={index}
                >
                  <SinglePaymentMethod
                    className={styles["addressbook-overview-singleaddr"]}
                    param={card}
                  />
                </Col>
              );
            })
            : ""}
          {paypal
            ? paypal.map((account, index) => {
              return (
                <Col
                  {...ColSettings}
                  className={styles["address-overview-col"]}
                  key={index}
                >
                  <SinglePaymentMethod
                    className={styles["addressbook-overview-singleaddr"]}
                    param={account}
                  />
                </Col>
              );
            })
            : ""}
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div className={styles["addressbook-overview"]}>
        <div>
          <div className={styles["addressbook-title"]}>
            <span>Payment Methods</span>
          </div>
          {/* <p>Manager your credit cards, making checkout fast and easy</p> */}
          <div>
            {/* this.renderPrimary() */}
            {this.renderOther()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    paymentMethod: getPaymentMethod(store)
  };
}

export default connect(mapStateToProps)(PaymentMethod);
