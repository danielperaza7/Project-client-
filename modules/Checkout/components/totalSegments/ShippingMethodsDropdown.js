/*
  props:
  currentShippingMethod
  shippingMethods
  onShipMethodSelect
  id
  currency
*/

import React, { Component } from "react";
import { ButtonToolbar, MenuItem, DropdownButton } from "react-bootstrap";

import styles from "./ShippingMethodsDropdown.css";

class ShippingMethodsDropdown extends Component {
  constructor(props) {
    super(props);
  }

  renderShippingHeader() {
    const currentSelect = this.props.currentShippingMethod;
    if (currentSelect) {
      return (
        <div>
          <div>
            {`${currentSelect.method_title} | ${this.props.currency}${currentSelect.amount}  `}
            {" "}
            <i className="ion-chevron-down pull-right" />
          </div>
          {/* <div>{currentSelect.detail}</div> */}
        </div>
      );
    }
    return (
      <div>no shipping method selected</div>
    );
  }

  render() {
    return (
      <ButtonToolbar className={styles["shipping-method-btn-wrapper"]}>
        <DropdownButton className={styles["shipping-method-btn"]} noCaret rootCloseEvent="click" title={this.renderShippingHeader()} id="select-shipping-method-2">
          { this.props.shippingMethods && this.props.shippingMethods.options ? this.props.shippingMethods.options.map((option, index) => {
            return (
              <MenuItem key={index} onClick={() => this.props.onShipMethodSelect(option)}>
                <div>{`${option.method_title} | ${this.props.currency}${option.amount}`}</div>
                {/* <div>{option.detail}</div> */}
              </MenuItem>
            );
          }) : null
          }
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default ShippingMethodsDropdown;
