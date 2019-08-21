/**
 * Created by chris on 5/18/17.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import CircleLoader from "../../../../components/masks/CircleLoader";
import { fetchDeletePaymentMethod } from "../../CustomerActions";
import styles from "../AddressBook/AddressBook.css";

class SinglePaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      delete: false
    };
    this.remove = this.remove.bind(this);
    this.handleDeleteResponse = this.handleDeleteResponse.bind(this);
  }

  remove(id) {
    this.props.dispatch(fetchDeletePaymentMethod(id, this.handleDeleteResponse));
    this.setState({ delete: false, uploading: true });
  }

  handleDeleteResponse(msg, err) {
    this.setState({ uploading: false });

    if (!err) {
      console.log("delete payment method err", msg);
    }
  }

  render() {
    const param = this.props.param;
    // NOTICE: param now doesn't have card address and country id
    let credit;
    let paypal;
    // it's a credit card
    if (param.cardType) {
      credit = (
        <div>
          <p>{param.cardType}</p>
          <p>
Card Number:
            {param.maskedNumber}
          </p>
          <p>
Expiration Date:
            {param.expirationDate}
          </p>
          <p>{param.cardholderName}</p>
        </div>
      );
    } else {
      // it's paypal
      paypal = (
        <div>
          <img src={param.imageUrl} alt="paypal icon" />
          <p>{`${param.payerFirstName}  ${param.payerLastName}`}</p>
        </div>
      );
    }

    return (
      <div className={styles["single-address"]}>
        {this.state.uploading ? (
          <div className={styles["addressbook-overview-hiddenbtn-wrapper"]}>
            <div className={styles["addressbook-overview-hiddenbtn"]}>
              <CircleLoader />
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.delete === true ? (
          <div className={styles["addressbook-overview-hiddenbtn-wrapper"]}>
            <div className={styles["addressbook-overview-hiddenbtn"]}>
              <button onClick={() => this.remove(param._id)}>Remove</button>
              <button
                onClick={() => {
                  this.setState({ delete: false });
                }}
              >
                {" Cancel "}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <a
          style={{ float: "right" }}
          className={styles["addressbook-overview-closebtn"]}
          onClick={() => {
            this.setState({ delete: true });
          }}
        >
          <i className="ion-close"> Remove </i>
        </a>
        {credit}
        {paypal}
      </div>
    );
  }
}

export default connect()(SinglePaymentMethod);
