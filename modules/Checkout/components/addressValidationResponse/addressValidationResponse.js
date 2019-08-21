import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import styles from "./addressValidationResponse.css";
import checkoutStyles from "../../pages/CheckoutPage/CheckoutPage.css";

class AddressValidationResponse extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      validateResponse, showModal, addressConfirm, extraConfirm, close, new_addr, continueWithAddress, accecptSuggested
    } = this.props;
    // return early

    if (!showModal) return <div />;
    if (!validateResponse) return <div>Loading</div>;

    // content initialization
    let title = "";
    let body = "";
    const shareButtons = (
      <div>
        <button className={`${checkoutStyles["next-button"]} ${styles["go-back-btn"]}`} onClick={() => close()}>Go Back And Modify My Address</button>
        <button className={`${checkoutStyles["next-button"]} ${styles["use-current-btn"]}`} onClick={continueWithAddress}>Continue With The Address That I Typed</button>
      </div>
    );
    let exclusiveButtons = "";

    // addresses strings

    let addressStr = new_addr.street ? (`${new_addr.street[0]}, ${(new_addr.street.length > 1 && new_addr.street[1] !== "" && new_addr.street[1] !== undefined) ? (`${new_addr.street[1]}, `) : ""}`)
      : (`${new_addr.street1}, ${(new_addr.street2 && new_addr.street2 !== "" && new_addr.street2 !== undefined) ? (`${new_addr.street2}, `) : ""}`);
    addressStr = `${addressStr + new_addr.city}, ${
      new_addr.region_code ? new_addr.region_code : new_addr.region.region_code}, ${
      new_addr.postcode}, ${
      new_addr.country_id}`;

    const sugAddress = validateResponse.address;
    let suggestedAddressStr = "";
    if (sugAddress) {
      suggestedAddressStr = `${sugAddress.address_line1}, ${
        sugAddress.address_line2}${sugAddress.address_line2 === "" ? "" : ", "
      }${sugAddress.address_city}, ${
        sugAddress.address_state}, ${
        sugAddress.address_zip}, ${
        sugAddress.address_country}`;
    }

    // mode decision
    if ("error" in validateResponse) {
      title = "Sorry! We could not validate your address";
      body = (
        <div>
          <p className={styles["sub-title"]}>The address that you typed:</p>
          <p>{ addressStr }</p>
        </div>
      );
    } else {
      // no error
      if ("address" in validateResponse && !addressConfirm) {
        exclusiveButtons = (
          <button className={`${checkoutStyles["next-button"]} ${styles["accept-btn"]}`} onClick={accecptSuggested}>Accept This Suggested Address</button>
        );
        title = "Address Suggestion Found";
        body = (
          <div>
            <p className={styles["sub-title"]}>The address that you typed:</p>
            <p>{ addressStr }</p>
            <p className={styles["sub-title"]}>Suggested Address:</p>
            <p>{ suggestedAddressStr }</p>
          </div>
        );
      } else if ("message" in validateResponse && !extraConfirm) {
        title = "Apt/suite/unit number missing";
        body = (
          <div>
            <p className={styles["sub-title"]}>You may have forgotten to add your apt/suite/unit number, and we suggest you to edit now</p>
            <p className={styles["sub-title"]}>The address that you typed:</p>
            <p>{ addressStr }</p>
          </div>
        );
      } else {
        title = "",
        body = (
          <div>
            <p>
              Processing ...
            </p>
          </div>
        );
      }
    }

    return (
      <Modal show={showModal} onHide={this.props.close} dialogClassName={styles.dialog}>
        <Modal.Header closeButton>
          <Modal.Title bsClass={styles.title}>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { body }
        </Modal.Body>
        <Modal.Footer>
          { exclusiveButtons }
          { shareButtons }
        </Modal.Footer>
      </Modal>
    );
  }
}
// <p>{response.message?response.message:''}</p>
// //  <Button onClick={close}>Close</Button>
export default AddressValidationResponse;
