/**
 * Created by warrenchen on 4/11/17.
 */
import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import styles from "./FieldFormControlSelectAddressBook.css";

class FieldFormControlSelectAddressBook extends Component {
  render() {
    const {
      placeholder, type, input, bsClass, disabled
    } = this.props;

    return (
      <div className={`${styles.FieldFormControl} ${styles.FieldFormControlSelect}`}>
        <FormControl
          componentClass="select"
          bsClass={bsClass}
          type={type}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange}
          disabled={disabled}
        >
          {this.props.options
            ? this.props.options.map(optionItem => (
              <option value={optionItem.code} key={optionItem.id}>
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

export default FieldFormControlSelectAddressBook;
