/**
 * Created by warrenchen on 4/12/17.
 */
import React, { Component } from "react";
import styles from "./StickySideBarMobile.css";
import history from "../../../../history";
import { CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP } from "../../../../config/Customer/customerConfig";

class StickySideBarMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNav: "order_history"
    };
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      let currentNav = window.location.pathname.split("/");
      currentNav = currentNav[currentNav.length - 1] !== ""
        ? currentNav[currentNav.length - 1]
        : "order_history";
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ currentNav });
    }
  }

  componentDidUpdate() {
    if (typeof window !== "undefined") {
      let currentNav = window.location.pathname.split("/");
      currentNav = currentNav[currentNav.length - 1] !== ""
        ? currentNav[currentNav.length - 1]
        : "order_history";
      if (currentNav !== this.state.currentNav) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ currentNav });
      }
    }
  }

  render() {
    return (
      <div className={styles["sidebar-nav-button"]}>
        {this.props.customerList.map((name) => {
          const currentNavStyle = CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP[name] === this.state.currentNav
            ? { fontFamily: "GothamMedium", textDecoration: "underline" }
            : { fontFamily: "GothamBook", textDecoration: "none" };
          return (
            <div
              key={name}
              className={styles["sidebar-nav-item-mobile"]}
              onClick={() => history.push(
                `/account/dashboard/${CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP[name]}`
              )
              }
              style={currentNavStyle}
            >
              {name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default StickySideBarMobile;
