import React, { Component } from "react";
import { Col } from "react-bootstrap";

import styles from "./Layout.css";

class Layout1 extends Component {
  render() {
    if (!this.props) {
      return null;
    }

    const {
      colSettings,
      inline_classNames = "",
      inline_styles = {},
      child_inline_className,
      componentsAtPositions
    } = this.props;

    if (!colSettings) return null;
    return (
      <div className={inline_classNames} style={inline_styles}>
        <Col
          {...colSettings["1"]}
          className={styles[`${child_inline_className}`]}
          bsClass="test"
        >
          {componentsAtPositions["1"]}
        </Col>
      </div>
    );
  }
}

export default Layout1;
