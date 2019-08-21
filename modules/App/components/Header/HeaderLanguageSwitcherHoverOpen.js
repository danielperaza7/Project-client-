/**
 * Created by warrenchen on 3/24/17.
 */
import React, { Component } from "react";
import { Nav, NavDropdown, MenuItem } from "react-bootstrap";
import styles from "./Header.css";

class HeaderLanguageSwitcherHoverOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const enabledLanguages = this.props.enabledLanguages;
    return (
      <div className={styles["language-switcher-bar"]}>
        <Nav>
          <NavDropdown
            open={this.state.isOpen}
            onToggle={() => {}}
            noCaret
            onMouseEnter={() => this.setState({ isOpen: true })}
            onMouseLeave={() => this.setState({ isOpen: false })}
            title={this.props.locale === "en" ? "North America . English" : "中国 . 中文"}
            id="language-switcher-container"
          >
            {enabledLanguages.map(lang => (
              <MenuItem key={lang} onClick={() => this.props.switchLanguage(lang)}>
                {lang}
              </MenuItem>
            ))}
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default HeaderLanguageSwitcherHoverOpen;
