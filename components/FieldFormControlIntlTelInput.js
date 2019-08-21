import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import styles from "./FieldFormControlIntlTelInput.css";

class FieldFormControlIntlTelInput extends Component {
  render() {
    const {
      placeholder,
      disabled,
      onSelectFlag,
      onPhoneNumberChange,
      fieldName,
      defaultCountry,
      onlyCountries,
      preferredCountries,
      addressForm // Styled differently when used in address form
    } = this.props;

    const inputClassName = addressForm
      ? styles["intl-tel-input-text-addr"]
      : styles["intl-tel-input-text"];
    const defaultPreferredCountries = ["us", "ca", "gb", "au", "fr"];

    return (
      <IntlTelInput
        preferredCountries={preferredCountries || defaultPreferredCountries}
        // Add this Key to force this component to rerender when onlyCountries value changes;
        // Inspried by: https://github.com/patw0929/react-intl-tel-input/issues/240
        key={JSON.stringify(onlyCountries) || "IntlTelInput-key"}
        fieldName={fieldName}
        formatOnInit={false}
        placeholder={placeholder}
        onPhoneNumberChange={onPhoneNumberChange}
        onSelectFlag={onSelectFlag}
        defaultCountry={defaultCountry}
        onlyCountries={onlyCountries} // if pass a value, init it with empty array [], same as default
        disabled={disabled}
        containerClassName={`intl-tel-input ${styles["intl-tel-input-container"]}`}
        inputClassName={inputClassName}
      />
    );
  }
}

export default FieldFormControlIntlTelInput;
