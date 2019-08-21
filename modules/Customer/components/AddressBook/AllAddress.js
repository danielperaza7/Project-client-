/* Created by chris on 4/25/17. */
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import SingleAddress from "./SingleAddress";
import styles from "./AddressBook.css";

export default class AllAddress extends Component {
  render() {
    const ColSettings = {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6
    };
    const address = this.props.address;
    const type = 2;
    if (!address) {
      return (
        <div className={styles["addressbook-overview-all-wrapper"]}>
          <h5>No Address</h5>
        </div>
      );
    }
    const tmp_address = address.filter((addr) => {
      return addr.default_shipping !== true && addr.default_billing !== true;
    });
    return (
      <div className={styles["addressbook-overview-all-wrapper"]}>
        <h4 style={{ fontSize: "14px" }}>ALL OTHER ADDRESS</h4>
        <Row className={styles["addressbook-overview-all-row"]}>
          {tmp_address.map((addr, index) => {
            return (
              <Col
                {...ColSettings}
                className={styles["address-overview-col"]}
                key={index}
              >
                <SingleAddress
                  className={styles["addressbook-overview-singleaddr"]}
                  address={addr}
                  otheraddr={address}
                  type={type}
                  onEditClick={this.props.onEditClick}
                  key={addr._id}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
