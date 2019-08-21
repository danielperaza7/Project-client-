/**
* Order summary part
*/

import React, { Component } from "react";
import {
  Row, Col, ButtonToolbar, DropdownButton, Collapse, MenuItem
} from "react-bootstrap";
import { connect } from "react-redux";

// import styles
import styles from "./TotalSegments.css";

// import components
import CheckoutOrderItem from "./CheckoutOrderItem";
import ShippingMethodsDropdown from "./ShippingMethodsDropdown";

class TotalSegments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveMoreOpen: true,
      currentSavingFocus: "coupon"
    };
  }

  componentWillReceiveProps(props) {

  }

  renderBillItem(item, surplus) {
    const ColSetting = {
      left: {
        lg: 6, md: 6, sm: 6, xs: 6
      },
      right: {
        lg: 6, md: 6, sm: 6, xs: 6
      }
    };
    const extraStyle = item.value < 0 ? styles.attention : null;
    return (
      <Row key={item.code} className={styles["price-detail-bar"]}>
        <Col {...ColSetting.left}>{item.title}</Col>
        {surplus ? <Col {...ColSetting.right} className={`text-right ${extraStyle}`}>{item.value >= 0 ? `$${item.value + surplus}` : `-$${-item.value + surplus}`}</Col> : <Col xs={6} className={`text-right ${extraStyle}`}>{item.value >= 0 ? `$${item.value}` : `-$${-item.value}`}</Col>}
      </Row>
    );
  }

  renderShippingOptions() {
    if (this.props.currentShippingMethod && this.props.shippingMethods) {
      const ShippingMethodsDropdownProps = {
        currentShippingMethod: this.props.currentShippingMethod,
        shippingMethods: this.props.shippingMethods,
        onShipMethodSelect: this.props.onShipMethodSelect,
        id: "select-shipping-method-1",
        currency: this.props.currency
      };
      const ColSetting = {
        left: {
          lg: 12, md: 12, sm: 12, xs: 12
        },
        right: {
          lg: 12, md: 12, sm: 12, xs: 12
        }
      };
      return (
        <div>
          <Row className={styles["price-detail-bar"]}>
            <Col {...ColSetting.left}>
Shipping Method
              <span className="pull-right">
                {this.props.currentShippingMethod.amount === 0 ? "FREE" : `$${this.props.currentShippingMethod.amount}`}
              </span>
            </Col>
          </Row>
          <Row className={styles["price-detail-bar"]}>
            <Col {...ColSetting.right}>
              <ShippingMethodsDropdown {...ShippingMethodsDropdownProps} />
            </Col>
          </Row>
        </div>
      );
    }
    return null;
  }

  renderOrderSummary() {
    const totalSegments = this.props.totalSegments;
    const subTotal = totalSegments.subtotal;

    // grandTotal = totalSegments.grand_total,

    const tax = totalSegments.tax;
    // grandTotal will be caculated in front extends
    const grandTotal = this.props.getFinalTotalPrice();
    const reswardPointsValue = (this.props.reward_points_to_use && this.props.reward_points_to_value_rate) ? this.props.reward_points_to_use / this.props.reward_points_to_value_rate : "";
    return (
      <div>
        <div>
          <div className={styles["segment-wrapper"]}>
            {this.renderBillItem(subTotal)}
          </div>

          {totalSegments.extras.map((segment) => {
            const extraStyle = segment.value < 0 ? styles.attention : null;
            let amount;
            if ("value" in segment) {
              amount = segment.value >= 0 ? `$${segment.value}` : `-$${-segment.value}`;
            }
            return (
              <div key={segment.code} className={styles["segment-wrapper"]}>
                <Row className={styles["price-detail-bar"]}>
                  <Col lg={6} xs={6}>{segment.title}</Col>
                  <Col lg={6} xs={6} className={`text-right ${extraStyle}`}>{ amount }</Col>
                </Row>
              </div>
            );
          })
          }

          <div className={styles["segment-wrapper"]}>
            {this.renderBillItem(tax)}
          </div>
          <div className={styles["segment-wrapper"]}>
            {this.renderShippingOptions()}
          </div>
          <div className={this.props.use_reward_points ? styles["segment-wrapper"] : null}>
            { this.props.use_reward_points ? this.renderBillItem({ code: "use-reward-points", title: `Using ${this.props.reward_points_to_use} reward points `, value: -reswardPointsValue }) : null }
          </div>
          <div className={this.props.use_gift_card ? styles["segment-wrapper"] : null}>
            { this.props.use_gift_card ? this.renderBillItem({ code: "use-gift-card", title: "Using gift card", value: -this.props.gift_card_use_amount }) : null }
          </div>
        </div>

        <div>
          <div className={styles["grand-total-wrapper"]}>
            { this.renderBillItem({ code: "grand_total", title: "Grand Total", value: grandTotal }) }
          </div>
        </div>
      </div>
    );
  }

  //  /*this.renderSavingSection()*/


  render() {
    if (this.props.totalSegments) {
      return (
        <div className={styles["summary-wrapper"]}>
          <div className={styles["summary-title"]}>{this.props.showDetail ? "ITEMS LIST" : "ORDER SUMMARY"}</div>
          {this.props.showDetail ? <CheckoutOrderItem productList={this.props.productList} /> : null}
          { this.renderOrderSummary() }
          <div className={styles["extra-children"]}>{ this.props.children }</div>
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

export default connect()(TotalSegments);
