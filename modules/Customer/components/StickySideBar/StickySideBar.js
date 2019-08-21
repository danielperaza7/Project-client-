/**
 * Created by warrenchen on 4/7/17.
 */
import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";
import history from "../../../../history";

import { CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP } from "../../../../config/Customer/customerConfig";
import styles from "./StickySideBar.css";

class StickySideBar extends Component {
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
      <Nav bsStyle="tabs" stacked className={styles["sidebar-nav"]}>
        {this.props.customerList.map((name, ind) => {
          const edition = CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP[name] === this.state.currentNav
            ? "_b.svg"
            : "_g.svg";
          return (
            <NavItem
              key={name}
              eventKey={name}
              className={
                // eslint-disable-next-line no-nested-ternary
                [0, 3].indexOf(ind) !== -1
                  ? styles["sidebar-nav-item_bottom"]
                  : [1, 4].indexOf(ind) !== -1
                    ? styles["sidebar-nav-item_top"]
                    : styles["sidebar-nav-item"]
              }
              onClick={() => {
                history.push(
                  `/account/dashboard/${CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP[name]}`
                );
              }}
              // onClick={(event) => {this.props.changeTab(CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP[name])}}
              style={{
                fontFamily:
                  CUSTOMER_LIST_ITEMS_NAME_TO_ID_MAP[name] === this.state.currentNav
                    ? "GothamMedium"
                    : "GothamBook"
              }}
            >
              <img
                src={`https://hiddenfigure.evestemptation.com/email/MyAccount/${name
                  .split(" ")
                  .join("")
                  .toLowerCase()}${edition}`}
                alt={`${name} pic`}
                style={{ marginRight: "25px" }}
              />
              {name}
            </NavItem>
          );
        })}
      </Nav>
    );
  }
}

export default StickySideBar;
