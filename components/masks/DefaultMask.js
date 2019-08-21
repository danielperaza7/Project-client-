/*
  props:
    show: boolean
    fixed: true or false
*/

import React, { Component } from "react";
import styles from "./DefaultMask.css";

class DefaultMask extends Component {
  render() {
    const style = {};
    if (this.props.fixed) {
      style.position = "fixed";
    }
    return (
      <div className={styles.wrapper} style={style}>
        <div className={styles["spin-circle"]}>
          <div className={styles.circle}>
            <div className={styles.inner} />
          </div>
          <div className={styles.circle}>
            <div className={styles.inner} />
          </div>
          <div className={styles.circle}>
            <div className={styles.inner} />
          </div>
          <div className={styles.circle}>
            <div className={styles.inner} />
          </div>
          <div className={styles.circle}>
            <div className={styles.inner} />
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultMask;
