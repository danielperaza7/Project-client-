import React, { Component } from "react";

import styles from "./AccountInfoSubscriptionCheckboxField.css";

class AccountInfoSubscriptionCheckboxField extends Component {
  render() {
    const { fieldName, input } = this.props;
    return (
      <div className={styles["checkbox-container"]}>
        <div className={styles["checkbox-wrapper"]}>
          <input
            type="checkbox"
            onChange={this.props.onChange}
            {...input}
            className={styles["checkbox-input"]}
          />
          <label className={styles["checkbox-label"]}>{fieldName}</label>
        </div>
      </div>
    );
  }
}

export default AccountInfoSubscriptionCheckboxField;
