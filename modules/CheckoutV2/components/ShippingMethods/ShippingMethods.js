import React, { Component } from "react";
import { connect } from "react-redux";
import Radiobox from "../../../../componentsV2/formComponents/FieldFormControlRadiobox/FieldFormControlRadiobox";
import styles from "./ShippingMethods.css";
// actions
import { getPriceCalcResult } from "../../CheckoutReducer";
// getters

class ShippingMethods extends Component {
  renderShippingMethod_title() {
    return (
      <div>
        <div className={styles.title}>Shipping Methods</div>
        <div style={{ fontSize: "12px" }}>
          Notes: Processing time usually takes 1-2 business days. (Business days:
          Monday-Friday)
        </div>
      </div>
    );
  }

  render() {
    const { priceCalcResult } = this.props;
    console.log("it is shipping Method", priceCalcResult);
    if (priceCalcResult) {
      const shippingMethod_content_list = priceCalcResult.value.shipping.available_options;
      const shippingMethod_list = shippingMethod_content_list.map((item, key) => {
        const checked = item.name === this.props.radioBox_value ? "checked" : "";
        return (
          <label
            className={styles.shippingMethod_list_item}
            key={key}
            style={{ border: checked ? "2px black solid" : "" }}
            htmlFor={item.name}
          >
            <Radiobox
              name="shipping_method"
              id={item.name}
              value={item.name}
              width="100%"
              onChange={this.props.onChange_shipping}
              checked={checked}
            >
              <div className={styles.Method_content_Responsive}>{item.name}</div>
              <div className={styles.Method_content_medium}>{item.delivery_time}</div>
              <div
                className={styles.Method_content}
                style={{
                  color: item.name === "USPS" && item.price === 0 ? "#FC2674" : ""
                }}
              >
                {item.price !== 0 ? `$ ${item.price}` : "FREE"}
              </div>
            </Radiobox>
          </label>
        );
      });
      return (
        <div>
          {this.renderShippingMethod_title()}
          {shippingMethod_list}
        </div>
      );
    }

    return <div>loading...</div>;
  }
}

function mapStateToProps(store) {
  return {
    priceCalcResult: getPriceCalcResult(store)
  };
}

export default connect(mapStateToProps)(ShippingMethods);
