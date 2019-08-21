import React, { Component } from "react";
import { connect } from "react-redux";

import AddressCard from "../AddressCard/AddressCard";
import { getBillExistID } from "../../CheckoutReducer";


import { getAddressBook } from "../../../App/AppReducer";

class AddressCardListGeneral extends Component {
  componentWillMount() {
    const {
      addressBook, selectedID, selectCallback, defaultSelectedKey
    } = this.props;
  }

  render() {
    const {
      addressBook, selectedID, selectCallback, defaultSelectedKey, billExistID
    } = this.props;
    console.log("--- address list general ---", addressBook);
    if (!addressBook || addressBook.length === 0 || !selectCallback) {
      return <div> no saved addresses </div>;
    }
    return (
      <div>
        {addressBook.map((address, index) => {
          return <AddressCard key={index} formName="billing_Address" address={address} selected_id={billExistID} selected={address._id === selectedID} selectAction={() => { selectCallback(address); }} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    addressBook: getAddressBook(store),
    billExistID: getBillExistID(store),
  };
}

export default connect(mapStateToProps)(AddressCardListGeneral);
