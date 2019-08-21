import React, { Component } from "react";
import styles from "./FieldFormControlRadiobox.css";

class FieldFormControlRadiobox extends Component {
  render() {
    const {
      value,
      children,
      checked,
      disabled = false,
      id,
      name,
      width = "",
      onChange
    } = this.props;
    return (
      <div className={`RadioBox ${styles["radio-box"]}`}>
        <label htmlFor={id} style={{ width }}>
          <input
            onChange={onChange}
            type="radio"
            name={name}
            id={id}
            value={value}
            checked={checked}
            disabled={disabled}
          />
          <span className={styles.outer}>
            <span className={styles.inner} />
          </span>
          <label className={styles.title} style={{ width }}>
            {children}
          </label>
        </label>
      </div>
    );
  }
}

export default FieldFormControlRadiobox;
