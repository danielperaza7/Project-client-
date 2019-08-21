/**
 * Created by Evan on 4/11/17.
 */
import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import styles from "./FieldFormControl.css";

class FieldFormControlSelect extends Component {
  render() {
    const {
      placeholder, type, input, bsClass, disabled, dial
    } = this.props;
    let supportedRegion = true;
    if (!this.props.options.find(o => (dial ? o.dial : o.code === input.value))) {
      supportedRegion = false;
    }

    return (
      <div className={`${styles.FieldFormControl} ${styles.FieldFormControlSelect}`}>
        <FormControl
          componentClass="select"
          bsClass={bsClass}
          type={type}
          placeholder={placeholder}
          value={supportedRegion ? input.value : "UNKNOWN"}
          onChange={input.onChange}
          disabled={disabled}
        >
          {this.props.options
            ? this.props.options.map(optionItem => (
              <option
                value={dial ? optionItem.dail : optionItem.code}
                key={optionItem.id}
              >
                {optionItem.name}
              </option>
            ))
            : null}
        </FormControl>
        <i className={`ion-chevron-down ${styles["select-arrow-icon"]}`} />
      </div>
    );
  }
}

export default FieldFormControlSelect;
