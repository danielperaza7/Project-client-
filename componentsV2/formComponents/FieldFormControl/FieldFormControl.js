import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

import styles from "./FieldFormControl.css";

class FieldFormControl extends Component {
  render() {
    const {
      placeholder, type, input, bsClass, disabled
    } = this.props;
    return (
      <div className={styles.FieldFormControl}>
        <FormControl
          bsClass={`form-control ${bsClass}`}
          type={type}
          placeholder={placeholder}
          {...input}
          disabled={disabled}
        />
        {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error && (
          <span className={styles["error-msg"]}>{this.props.meta.error}</span>
        )}
      </div>
    );
  }
}

export default FieldFormControl;
