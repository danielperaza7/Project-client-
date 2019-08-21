/**
 * Created by warrenchen on 3/24/17.
 */
import React, { Component } from "react";
import { NavDropdown, MenuItem } from "react-bootstrap";
import history from "../../../../history";
import styles from "./Header.css";

class HeaderNavTabHoverOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const tabData = this.props.tabData;
    return (
      <NavDropdown
        id={`${tabData.label}-header-tab`}
        key={tabData.label}
        title={tabData.label}
        open={this.state.isOpen}
        onToggle={() => {}}
        onClick={() => {
          if (tabData.url) history.push("/et");
        }}
        onMouseEnter={() => this.setState({ isOpen: true })}
        onMouseLeave={() => this.setState({ isOpen: false })}
        className={styles["header-nav-tab-container"]}
      >
        {tabData.sub.map(submenu => (
          <div key={submenu.label}>
            <MenuItem onClick={() => history.push("/et")}>{submenu.label}</MenuItem>
            {/* submenu.items.map(
                (item) =>
                  <MenuItem onClick={() => history.push('/et')} key={item.name}>
                    {item.name}
                  </MenuItem>
              ) */}
          </div>
        ))}
      </NavDropdown>
    );
  }
}

export default HeaderNavTabHoverOpen;
