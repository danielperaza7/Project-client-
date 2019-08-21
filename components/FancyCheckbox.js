import React, { Component } from "react";
import styles from "./FancyCheckbox.css";

class FancyCheckbox extends Component {
  render() {
    const {
      title, checked, disabled = false, label, id, onChange
    } = this.props;
    return (
      <div className={styles.checkbox}>
        <input
          id={id || label}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id || label}>
          <span className={styles.check} />
          <span className={styles["box-check"]} />
          {title}
        </label>
      </div>
    );
  }
}

export default FancyCheckbox;
