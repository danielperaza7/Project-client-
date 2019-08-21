import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import styles from "./AddressValidationResponse.css";
import checkoutStyles from "../../../Checkout/pages/CheckoutPage/CheckoutPage.css";

class AddressValidationResponse extends Component {
  render() {
    const {
      validateResponse,
      showModal,
      addressConfirm,
      extraConfirm,
      close,
      new_addr,
      continueWithAddress,
      accecptSuggested
    } = this.props;
    // return early

    if (!showModal) return <div />;
    if (!validateResponse) return <div>No validateResponse</div>;

    let AptMissing = false;
    if (validateResponse.messages.length > 0) {
      validateResponse.messages.forEach((message) => {
        if (message.code === "a1002") {
          AptMissing = true;
        }
      });
    }

    // content initialization
    let title = "";
    let body = "";
    const shareButtons = (
      <div>
        <button
          className={`${checkoutStyles["next-button"]} ${styles["go-back-btn"]}`}
          onClick={() => close()}
        >
          Go Back And Modify My Address
        </button>
        <button
          className={`${checkoutStyles["next-button"]} ${styles["use-current-btn"]}`}
          onClick={continueWithAddress}
        >
          Continue With The Address That I Typed
        </button>
      </div>
    );
    let exclusiveButtons = "";

    // addresses strings

    const street2 = new_addr.street2 && new_addr.street2 !== "" ? new_addr.street2 : "";
    let addressStr = new_addr.street1 + street2;
    // (new_addr.street2 && new_addr.street2 !== '') ? (', ' + new_addr.street2) : '';
    addressStr = `${addressStr}, ${new_addr.city}, ${
      new_addr.region_code ? new_addr.region_code : new_addr.region.region_code
    }, ${new_addr.postcode}, ${new_addr.country_id}`;

    addressStr = addressStr.toUpperCase();

    const sugAddress = validateResponse.matched_address;
    let suggestedAddressStr = "";
    if (sugAddress) {
      suggestedAddressStr = `${sugAddress.address_line1}, ${sugAddress.address_line2}${
        sugAddress.address_line2 === "" ? "" : ", "
      }${sugAddress.city_locality}, ${sugAddress.state_province}, ${
        sugAddress.postal_code
      }, ${sugAddress.country_code}`;
    }

    // mode decision
    if (!validateResponse.matched_address) {
      title = "Sorry! We could not validate your address";
      body = (
        <div>
          <p className={styles["sub-title"]}>The address that you typed:</p>
          <p>{addressStr}</p>
        </div>
      );
    } else {
      // no error
      if (!addressConfirm) {
        exclusiveButtons = (
          <button
            className={`${checkoutStyles["next-button"]} ${styles["accept-btn"]}`}
            onClick={accecptSuggested}
          >
            Accept This Suggested Address
          </button>
        );
        title = "Address Suggestion Found";
        body = (
          <div>
            <p className={styles["sub-title"]}>The address that you typed:</p>
            <p>{addressStr}</p>
            <p className={styles["sub-title"]}>Suggested Address:</p>
            <p>{suggestedAddressStr}</p>
          </div>
        );
      } else if (AptMissing && !extraConfirm) {
        title = "Apt/suite/unit number missing";
        body = (
          <div>
            <p className={styles["sub-title"]}>
              You may have forgotten to add your apt/suite/unit number, and we suggest you
              to edit now
            </p>
            <p className={styles["sub-title"]}>The address that you typed:</p>
            <p>{addressStr}</p>
          </div>
        );
      } else {
        title = "";
        body = (
          <div>
            <p>some error ...</p>
          </div>
        );
      }
    }

    return (
      <Modal show={showModal} onHide={this.props.close} dialogClassName={styles.dialog}>
        <Modal.Header closeButton>
          <Modal.Title bsClass={styles.title}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {exclusiveButtons}
          {shareButtons}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddressValidationResponse;
