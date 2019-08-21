/* eslint-disable dot-notation */
import React, { Component } from "react";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import styles from "./DropdownMenu.css";
import { NavigationInfo } from "../Navigation/Navigation";

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.items1 = NavigationInfo.props.items1;
    this.items2 = NavigationInfo.props.items2;
  }

  render() {
    return (
      <div className={styles["dropdownMenu"]}>
        <div style={{ display: "flex" }}>
          <span style={{ margin: "auto" }}>Menu</span>
          <ButtonToolbar>
            <DropdownButton bsStyle="default" noCaret id="dropdown-no-caret">
              <MenuItem header>SERVICE</MenuItem>
              <MenuItem href="/page/shipping">Shipping Policy</MenuItem>
              <MenuItem href="/page/return">Return & Exchange</MenuItem>
              <MenuItem href="/page/giftcard">Gift Card</MenuItem>
              <MenuItem href="/page/faqs">FAQs</MenuItem>
              <MenuItem divider />
              <MenuItem header>ABOUT</MenuItem>
              <MenuItem href="/page/about-us">About us</MenuItem>
              <MenuItem href="http://blog.evestemptation.com/">Blog</MenuItem>
              <MenuItem href="/page/career">Careers</MenuItem>
              <MenuItem href="/page/store-location">Store Locations</MenuItem>
              <MenuItem href="/page/terms-and-conditions">Terms & Conditions</MenuItem>
              <MenuItem href="/page/privacy-policy">Privacy Policy</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
export default DropdownMenu;
