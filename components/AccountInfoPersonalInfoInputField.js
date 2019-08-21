import React, { Component } from "react";

// import style
import styles from "./AccountInfoPersonalInfoInputField.css";

class AccountInfoSignInInfoInputField extends Component {
  render() {
    const { fieldName, placeholder, type } = this.props;

    return (
      <div className={styles["input-field-container"]}>
        <div className={styles["input-field-input-area-wrapper"]} data-value={fieldName}>
          <input
            {...this.props.input}
            className={styles["input-field-input-area"]}
            placeholder={placeholder}
            type={type}
          />
        </div>
      </div>
    );
  }
}

export default AccountInfoSignInInfoInputField;
