import React, { Component } from "react";
import { connect } from "react-redux";
import AddressCard from "../AddressCard/AddressCard";
import { addError } from "../../../App/AppActions";
import { setShipExistID, setShipNew, nextCheckoutStep } from "../../CheckoutActions";
import { getAddressBook } from "../../../App/AppReducer";
import {
  getShipNew,
  getShipExistID,
  getRewardPointsToUse,
  getAccountBalanceToUse,
  getCurrentShippingMethod
} from "../../CheckoutReducer";
import styles from "./AddressCardList.css";

import { COUNTRY_TO_STATES } from "../../../../config/config";

class AddressCardList extends Component {
  constructor(props) {
    super(props);
    this.handleShipToExistaResponse = this.handleShipToExistaResponse.bind(this);
    this.handleSelectNewAnonymous = () => {
      console.log("handleSelectNewAnonymous called");
      this.props.dispatch(setShipNew(true));
    };
  }

  handleSelectExist(id) {
    console.log("handleSelect called", id, this.props);
    // save address to checkout.shippingAddress
    const existAddress = this.props.addressBook.find(o => o._id === id);
    let addressHasError = false;
    if (existAddress) {
      // check if address is legal before do anything
      const {
        city,
        firstname,
        lastname,
        postcode,
        street,
        // telephone,
        // region_code,
        country_id
      } = existAddress;
      let missings = "";
      if (!city) missings += "city ";
      if (!firstname) missings += "firstname ";
      if (!lastname) missings += "lastname ";
      if (!postcode) missings += "postcode ";
      if (!street || !Array.isArray(street) || !street[0]) missings += "street ";
      // if (!telephone) missings += 'telephone ';
      // if (!region_code) missings += 'region_code ';
      if (!country_id) missings += "country_id ";
      if (missings !== "") {
        const addressName = "Address ";
        const msg = `${addressName}${missings}missing`;
        this.props.dispatch(
          addError({
            code: "address has error",
            msg
          })
        );
        if (cb) {
          cb(false);
        }
        addressHasError = true;
      }
      if (!addressHasError) {
        this.props.dispatch(setShipExistID(id));
        this.props.handleSelectExistCB(this.reconstructOuputAddress(existAddress));
      }
    } else {
      this.props.dispatch(
        addError({
          code: "SEA", // select existing address
          msg: "Could not find this address in address book"
        })
      );
    }
  }

  handleSelectNew() {
    console.log("handleSelectNew called");
    this.props.dispatch(setShipNew(true));
  }

  handleShipToExistaResponse(success) {
    const { formName } = this.props;
    if (success) {
      if (formName === "shippingAddress") this.props.dispatch(nextCheckoutStep());
    }
  }

  reconstructOuputAddress(address) {
    const {
      city,
      country_id,
      firstname,
      lastname,
      postcode,
      region_code,
      street,
      street1,
      street2,
      telephone
    } = address;
    const street_new = [street1];
    if (street2 && street2 !== "") street_new.push(street2);
    const statesMap = COUNTRY_TO_STATES[country_id];
    let regionObject = null;
    if (statesMap) {
      regionObject = COUNTRY_TO_STATES[country_id].find(o => o.code === region_code);
    }
    return {
      city,
      country_id,
      firstname,
      lastname,
      postcode,
      region: regionObject ? regionObject.name : "",
      region_code,
      region_id: regionObject ? parseInt(regionObject.id) : "",
      street: street || street_new,
      telephone
    };
  }

  render() {
    const { addressBook, shipNew, shipExistID } = this.props;
    if (!addressBook || !Array.isArray(addressBook) || addressBook.length < 1) {
      this.handleSelectNewAnonymous();
      return null;
    }
    // console.log("addressBook",addressBook)
    const list = addressBook.map((address, index) => {
      return (
        <AddressCard
          formName="shipping_Address"
          key={index}
          address={address}
          selected_id={shipExistID}
          selected={!shipNew && address._id === shipExistID}
          selectAction={() => {
            this.handleSelectExist(address._id);
          }}
        />
      );
    });
    const newAddressNode = (
      <div
        className={styles.addNewAddress}
        onClick={() => {
          this.handleSelectNew();
        }}
      >
        + &nbsp;&nbsp;&nbsp;&nbsp; Add a new address
        {" "}
      </div>
    );
    return (
      <div>
        {list}
        {!shipNew ? newAddressNode : null}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    addressBook: getAddressBook(store),
    shipNew: getShipNew(store),
    shipExistID: getShipExistID(store),
    rewardPointsToUse: getRewardPointsToUse(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    currentShippingMethod: getCurrentShippingMethod(store)
  };
}

export default connect(mapStateToProps)(AddressCardList);
