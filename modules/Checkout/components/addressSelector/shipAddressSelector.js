import React, { Component } from "react";
import { Button } from "react-bootstrap";
// { addresses,  }
import styles from "../../pages/CheckoutPage/CheckoutPage.css";
import FieldFormControlSelect from "../../../../components/FieldFormControlSelect";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";

class ShipAddressSelector extends Component {
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
        <FieldFormControlSelect
          input={{ onChange: this.props.onShipAddressSelect, value: this.props.selected }}
          placeholder="select"
          options={options}
        />
        <FieldFormControlCheckbox label="use_for_billing" input={{ value: this.props.useAsBilling, onChange: this.props.onSelectAsBilling }} title="Use this Shipping Address for Billing Address" />
        { this.props.useAsBilling ? "" : (
          <p>
            <i className="ion-ios-information-outline" />
            {" "}
Billing information can be selected or edited in payment information step.
          </p>
        )}
        <button className={styles["next-button"]} onClick={() => this.props.handleSubmit(this.props.useAsBilling)}>SHIP TO THIS ADDRESS</button>
      </div>
    );
  }
}

export default ShipAddressSelector;
