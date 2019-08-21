import React, { Component } from "react";
import { FormControl, Button, Checkbox } from "react-bootstrap";
import { connect } from "react-redux";

import FieldFormControlSelect from "../../../../components/FieldFormControlSelect";

import checkoutPagestyles from "../../pages/CheckoutPage/CheckoutPage.css";

class BillAddressSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.addresses.map((address, index) => {
      return {
        id: address.id,
        name: `${address.firstname} ${address.lastname}, ${address.street} , ${address.city} ${address.region.region_code} ${address.postcode} ${address.country_id} `
      };
    });
    return (
      <div>
        {" "}
Billing Address Selector
        <FieldFormControlSelect
          input={{ onChange: this.props.onBillAddressSelect, value: this.props.selected }}
          placeholder="select"
          options={options}
        />
        <button className={checkoutPagestyles["next-button"]} onClick={() => this.props.handleSubmit(this.props.useAsBilling)}>BILL TO THIS ADDESS</button>
      </div>
    );
  }
}

export default connect()(BillAddressSelector);
