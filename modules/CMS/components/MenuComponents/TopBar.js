import React, { Component } from "react";
import styles from "./HeaderMenuDesktop.css";
import CMSBlock from "../../pages/CMS/CMSBlock";

class TopBar extends Component {
  renderTop() {
    return (
      <div
        className={`${styles.topBar_container} ${
          this.props.isOpened === 0 || this.props.isOpened > 0 ? "show" : "hidden"
        }`}
      >
        <CMSBlock {...{ cmsid: "TopBar_Desktop" }} />
      </div>
    );
  }

  render() {
    return <div style={{ borderTop: "1px solid #E0E0E0" }}>{this.renderTop()}</div>;
  }
}

export default TopBar;
