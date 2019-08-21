// PROPS: billingAddress, billDif, billNew

import React, { Component } from "react";

class ConfirmedBillingAddressCard extends Component {
  render() {
    // check props
    if (!this.props.billingAddress) {
      return <div>check props return</div>;
    }
    const address = this.props.billingAddress;
    return (
      <div>
        <div>{ `${address.firstname} ${address.lastname}` }</div>
        <div>{ address.street[0] }</div>
        <div>{ address.street[1] }</div>
        <div>{ `${address.city}, ${address.region.region_code}, ${address.postcode}, ${address.country_id}` }</div>
      </div>
    );
  }
}

export default ConfirmedBillingAddressCard;
