import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

import styles from "./Layout.css";

class Layout4 extends Component {
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
      <Row className={inline_classNames} style={inline_styles}>
        <Col {...colSettings["1"]} className={styles[`${child_inline_className}`]}>
          {componentsAtPositions["1"]}
        </Col>
        <Col {...colSettings["2"]} className={styles[`${child_inline_className}`]}>
          {componentsAtPositions["2"]}
        </Col>
        <Col {...colSettings["3"]} className={styles[`${child_inline_className}`]}>
          {componentsAtPositions["3"]}
        </Col>
        <Col {...colSettings["4"]} className={styles[`${child_inline_className}`]}>
          {componentsAtPositions["4"]}
        </Col>
      </Row>
    );
  }
}

export default Layout4;
