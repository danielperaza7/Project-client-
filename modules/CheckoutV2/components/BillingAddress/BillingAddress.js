import React, { Component } from "react";
import { connect } from "react-redux";

import AddressCardListGeneral from "../AddressCardListGeneral/AddressCardListGeneral";
import AddressFormWrapper from "../AddressFormWrapper/AddressFormWrapper";
import FieldFormControlRadiobox from "../../../../components/FieldFormControlRadiobox";

import {
  setBillNew,
  setBillExistID,
  setUseAsBilling,
  postUserCheckoutInputs,
  setBillingFormStatus
} from "../../CheckoutActions";

import { getCartBillingAddress, getCartShippingAddress } from "../../../App/AppReducer";
import {
  getBillNew,
  getUseAsBilling,
  getBillExistID,
  getRewardPointsToUse,
  getAccountBalanceToUse,
  getCurrentShippingMethod,
  getCurrentBillingAddress,
  getbillingFormStatus
} from "../../CheckoutReducer";

import styles from "./BillingAddress.css";

class BillingAddress extends Component {
  constructor(props) {
    super(props);
    this.handleBillingSelect = this.handleBillingSelect.bind(this);
    this.selectExistID = this.selectExistID.bind(this);
    this.constructPostData = this.constructPostData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.useAsBilling && nextProps.editing && !this.props.editing) {
      this.props.dispatch(
        postUserCheckoutInputs(
          this.constructPostData(this.props.cartShippingAddress),
          this.postAddressCallback
        )
      );
    }

    // maybe need extra code to handle these...

    // need to update billExist, billNew, useAsBilling when shipNew, shipExistID, cartBillingAddress, cartShippingAddress change
  }

  constructPostData(billingAddress) {
    const {
      rewardPointsToUse,
      accountBalanceToUse,
      cartShippingAddress,
      currentShippingMethod
    } = this.props;
    return {
      gift_card_usage: accountBalanceToUse,
      reward_point_usage: rewardPointsToUse,
      shipping_method: currentShippingMethod,
      shipping_address: cartShippingAddress,
      billing_address: billingAddress
    };
  }

  postAddressCallback(success) {
    if (!success) {
      console.log("--- set billing address failed ---");
    }
  }

  handleBillingSelect(e) {
    console.log("--- handle Billing Select ---", e.target.value);
    const { billingFormStatus, currentBillingAddress } = this.props;
    switch (e.target.value) {
      case "use_as_billing":
        this.props.dispatch(setUseAsBilling());
        this.props.dispatch(
          postUserCheckoutInputs(
            this.constructPostData(this.props.cartShippingAddress),
            this.postAddressCallback
          )
        );
        break;
      case "bill_exist_id":
        this.props.dispatch(setBillExistID(""));
        break;
      case "bill_new":
        // if new form is completed, need to call API
        this.props.dispatch(setBillNew());
        if (billingFormStatus) {
          this.props.dispatch(
            postUserCheckoutInputs(
              this.constructPostData(currentBillingAddress),
              this.postAddressCallback
            )
          );
        }
        break;
      default:
        this.props.dispatch(
          postUserCheckoutInputs(
            this.constructPostData(this.props.cartShippingAddress),
            this.postAddressCallback
          )
        );
    }
  }

  selectExistID(address) {
    if (address) {
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
      } = address;
      let missings = "";
      let addressHasError = false;
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
        // todo: this code will not work what is addError fn?
        this.props.dispatch(
          addError({
            code: "address has error",
            msg
          })
        );
        addressHasError = true;
      }
      if (!addressHasError) {
        this.props.dispatch(setBillExistID(address._id));
        this.props.dispatch(
          postUserCheckoutInputs(
            this.constructPostData(address),
            this.postAddressCallback
          )
        );
      }
    } else {
      // todo: this code will not work
      this.props.dispatch(
        addError({
          code: "SEA", // select existing address
          msg: "Could not find this address in address book"
        })
      );
    }
  }

  renderAddress(address) {
    if (address) {
      const {
        firstname,
        lastname,
        region_code,
        city,
        street,
        telephone,
        country_id,
        postcode
      } = address;
      return (
        <div style={{ marginLeft: "20px" }}>
          <div>
            {firstname}
            {" "}
            {lastname}
          </div>
          <div>
            {`${street ? street.toString() : ""}, ${city || ""}, ${region_code
            || ""}, ${postcode || ""}, ${country_id || ""}`}
          </div>
          <div>{telephone}</div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      authStatus,
      editing,
      useAsBilling,
      billNew,
      billExistID,
      cartBillingAddress,
      billingFormStatus,
      currentBillingAddress
    } = this.props;

    return (
      <div className={styles.billingWrapper}>
        <h4 className={styles.billingTitle}>Billing address</h4>
        <div>
          <FieldFormControlRadiobox
            name="billing_address"
            id="use_as_billing"
            value="use_as_billing"
            title="Use shipping address for billing address"
            checked={useAsBilling}
            onChange={this.handleBillingSelect}
          />
          {useAsBilling ? this.renderAddress(cartBillingAddress) : null}
          {authStatus ? (
            <FieldFormControlRadiobox
              name="billing_address"
              id="bill_exist_id"
              value="bill_exist_id"
              title="Use saved address"
              checked={!useAsBilling && !billNew}
              onChange={this.handleBillingSelect}
            />
          ) : null}
          {!useAsBilling && !billNew ? (
            <AddressCardListGeneral
              selectedID={billExistID}
              selectCallback={this.selectExistID}
              defaultSelectedKey="default_billing"
            />
          ) : null}
          <FieldFormControlRadiobox
            name="billing_address"
            id="bill_new"
            value="bill_new"
            title="Use a new address"
            checked={billNew}
            onChange={this.handleBillingSelect}
          />
          {/* <div style={billNew ? {} : { display: 'none' }}><AddressFormWrapper formName="billingAddress" /></div> */}
          <div className={billingFormStatus ? "hidden" : ""}>
            {billNew && editing ? <AddressFormWrapper formName="billingAddress" /> : null}
          </div>
          <div
            className={billingFormStatus && billNew ? "" : "hidden"}
            style={{ marginLeft: "20px" }}
          >
            <div>
              {currentBillingAddress && currentBillingAddress.firstname
                ? currentBillingAddress.firstname
                : null}
              {" "}
              {currentBillingAddress && currentBillingAddress.lastname
                ? currentBillingAddress.lastname
                : null}
              <span
                className={styles.editBtn}
                onClick={() => this.props.dispatch(setBillingFormStatus(false))}
              >
                {" "}
                Edit
                {" "}
              </span>
            </div>
            <div>
              {currentBillingAddress && currentBillingAddress.street
                ? currentBillingAddress.street.toString()
                : null}
              {", "}
              {currentBillingAddress && currentBillingAddress.city
                ? currentBillingAddress.city
                : null}
              {", "}
              {currentBillingAddress && currentBillingAddress.region_code
                ? currentBillingAddress.region_code
                : null}
              {", "}
              {currentBillingAddress && currentBillingAddress.country_id
                ? currentBillingAddress.country_id
                : null}
            </div>
            <div>
              {currentBillingAddress && currentBillingAddress.telephone
                ? currentBillingAddress.telephone
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    useAsBilling: getUseAsBilling(store),
    billNew: getBillNew(store),
    billExistID: getBillExistID(store),
    cartBillingAddress: getCartBillingAddress(store),
    cartShippingAddress: getCartShippingAddress(store),
    rewardPointsToUse: getRewardPointsToUse(store),
    accountBalanceToUse: getAccountBalanceToUse(store),
    currentShippingMethod: getCurrentShippingMethod(store),
    currentBillingAddress: getCurrentBillingAddress(store),
    billingFormStatus: getbillingFormStatus(store)
  };
}

export default connect(mapStateToProps)(BillingAddress);
