/**
 * Created by chris on 4/19/17.
 */
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import SingleAddress from "./SingleAddress";
import styles from "./AddressBook.css";

export default class PrimaryAddress extends Component {
  renderPrimary(address, type) {
    const ColSettings = {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6
    };
    if (!address) {
      return "No Address";
    }
    let primaryAddress = null;
    for (let i = 0; i < address.length; i++) {
      if (type === 0) {
        if (address[i].default_shipping === true) {
          primaryAddress = address[i];
        }
      }
      if (type === 1) {
        if (address[i].default_billing === true) {
          primaryAddress = address[i];
        }
      }
    }
    if (primaryAddress === null) {
      return (
        <Col {...ColSettings} className={styles["address-overview-col"]}>
          {type === 0
            ? "No Primary Shipping Address Selected."
            : "No Primary Billing Address Selected."}
        </Col>
      );
    }
    const otheraddr = address.filter((addr) => {
      return addr !== primaryAddress;
    });
    return (
      <Col {...ColSettings} className={styles["address-overview-col"]}>
        {type === 0 ? (
          <h4 style={{ fontSize: "14px" }}>PRIMARY SHIPPING ADDRESS</h4>
        ) : (
          <h4 style={{ fontSize: "14px" }}>PRIMARY BILLING ADDRESS</h4>
        )}
        <SingleAddress
          address={primaryAddress}
          type={type}
          otheraddr={otheraddr}
          onEditClick={this.props.onEditClick}
        />
      </Col>
    );
  }

  render() {
    const { address } = this.props;
    return (
      <div className={styles["addressbook-overview-primary-wrapper"]}>
        <Row className={styles["addressbook-overview-primary-row"]}>
          {this.renderPrimary(address, 0)/* 0 for shipping */}
          {this.renderPrimary(address, 1)/* 1 for billing */}
        </Row>
      </div>
    );
  }
}
