import React, { Component } from "react";

import styles from "./AccountInfoPersonalInfoSelectField.css";

class AccountInfoPersonalInfoSelectField extends Component {
  render() {
    const { options, fieldName } = this.props;

    return (
      <div className={styles["select-container"]}>
        <div className={styles["select-wrapper"]} data-value={fieldName}>
          <select {...this.props.input} className={styles["select-panel"]}>
            {options.map((option) => {
              return (
                <option
                  value={option.code}
                  className={styles["select-item"]}
                  key={option.id}
                >
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default AccountInfoPersonalInfoSelectField;
