import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { injectIntl } from "react-intl";

import styles from "./OrderBy.css";

class OrderBy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAcitve() {
    for (const order of this.props.orderby) {
      if (order.status && order.status === 1) {
        return order;
      }
    }
    return null;
  }

  renderOrder(order, mode, sortedOption) {
    switch (mode) {
      case 1: {
        // return (
        //   <MenuItem key={order.id} onClick={ () => {document.cookie="scrolledPlace="+document.documentElement.scrollTop;this.props.changeSortOrder(order)}}>
        //     {order.name}
        //   </MenuItem>
        // )
        return (
          <MenuItem
            key={order.id}
            onClick={() => {
              document.cookie = `scrolledPlace=${document.documentElement.scrollTop}`;
              this.props.changeSortOrder(order);
            }}
          >
            {order.name}
          </MenuItem>
        );
      }
      case 2: {
        return (
          <div
            key={order.id}
            className={
              order.id === sortedOption ? styles.CheckedSortOption : styles.SortOption
            }
            onClick={() => this.props.changeSortOrder(order)}
          >
            {order.name}
          </div>
        );
      }
      default:
        return null;
    }
  }

  render() {
    if (!this.props.orderby) {
      return null;
    }
    const active = this.getAcitve();
    switch (this.props.mode) {
      case 1: {
        return (
          <div className={styles.orderBy}>
            <DropdownButton
              className={styles["order-option"]}
              bsStyle="link"
              title={active ? active.name : "Mystical"}
              id="order-by"
            >
              {this.props.orderby.map((order) => {
                return this.renderOrder(order, this.props.mode, active.id);
              })}
            </DropdownButton>
          </div>
        );
      }
      case 2: {
        return (
          <div className={styles.orderBy_2}>
            {this.props.orderby.map((order) => {
              return this.renderOrder(order, this.props.mode, active.id);
            })}
          </div>
        );
      }
      default: {
        return null;
      }
    }
  }
}

export default injectIntl(OrderBy);
