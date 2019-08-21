import React, { Component } from "react";
import styles from "./FieldFormControlRadiobox.css";

class FieldFormControlRadiobox extends Component {
  render() {
    const {
      value,
      title,
      checked,
      disabled = false,
      id,
      name,
      onChange,
      style
    } = this.props;
    return (
      <div className={`RadioBox ${styles["radio-box"]}`} style={style}>
        <label htmlFor={id}>
          <input
            type="radio"
            name={name}
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
          <span className={styles.outer}>
            <span className={styles.inner} />
          </span>
          <label className={styles.title}>{title}</label>
        </label>
      </div>
    );
  }
}

export default FieldFormControlRadiobox;
