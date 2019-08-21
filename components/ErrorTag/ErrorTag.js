import React, { Component } from "react";

import styles from "./ErrorTag.css";

class ErrorTag extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles["error-tag-wrapper"]}>
        <div className={styles["error-tag"]}>{children}</div>
      </div>
    );
  }
}

export default ErrorTag;
