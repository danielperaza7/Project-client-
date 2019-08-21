/*
  Shipping address Form
*/

import React, { Component } from "react";
import { Form, ControlLabel, FormGroup } from "react-bootstrap";
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
  getFormValues,
  untouch
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

// import components
import FieldFormControl from "../../../../componentsV2/formComponents/FieldFormControl/FieldFormControl";
import FieldFormControlSelect from "../../../../componentsV2/formComponents/FieldFormControlSelect/FieldFormControlSelect_Region";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import FieldFormControlIntlTelInput from "../../../../components/FieldFormControlIntlTelInput";
import AddressValidationResponse from "../AddressValidationResponse/AddressValidationResponse";
import AddressStreet1AutoComplete from "../../../../componentsV2/formComponents/FieldFormControl/AddressStreet1AutoComplete";

import {
  COUNTRIES,
  COUNTRY_TO_STATES,
  CURRENT_COUNTRY,
  COUNTRIES_DEFAULT
} from "../../../../config/config";

// import actions
import { setLocalAddress } from "../../../App/FormActions";
import {
  validateAddress,
  setSaveNewShippingAddress,
  setSaveNewBillingAddress,
  setBillingFormStatus
  // setShippingAddress,
  // setBillingAddress
} from "../../CheckoutActions";
import {
  getCheckoutStep,
  getSaveNewShippingAddress,
  getSaveNewBillingAddress,
  getCurrentBillingAddress,
  getCurrentShippingAddress
} from "../../CheckoutReducer";
import styles from "./AddressForm.css";

class AddressFormV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      validateResponse: null,
      addressConfirm: false,
      extraConfirm: false,
      country: "US",
      phone: ""
    };
    this.autoFill = this.autoFill.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValidateResponse = this.handleValidateResponse.bind(this);
    this.close = this.close.bind(this);
    this.accecptSuggested = this.accecptSuggested.bind(this);
    this.continueWithAddress = this.continueWithAddress.bind(this);
    this.isSameAddress = this.isSameAddress.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onSelectFlag = this.onSelectFlag.bind(this);
  }

  componentWillMount() {
    const { formName, disableCountry } = this.props;
    switch (formName) {
      case "shippingAddress":
        this.loadAddressToForm(this.props.currentShippingAddress, this.props.formName);
        break;
      case "billingAddress":
        this.loadAddressToForm(this.props.currentBillingAddress, this.props.formName);
        break;
      default:
        break;
    }
    if (disableCountry) {
      this.props.dispatch(change("AddressFormV2", "country_id", CURRENT_COUNTRY));
    }
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.formName) {
      case "shippingAddress":
        if (nextProps.checkoutStep !== 1 && this.props.checkoutStep === 1) {
          // when disappear
          // console.log('shipping address disappear')
          // this.props.dispatch(setShippingAddress(nextProps.localAddress));
          if (nextProps.localAddress) {
            this.props.dispatch(
              setSaveNewShippingAddress(nextProps.localAddress.save_in_address_book)
            );
          }
        } else if (nextProps.checkoutStep === 1 && this.props.checkoutStep !== 1) {
          // when appear
          // this.loadCurrentAddressToLocalAddressAddSaveNew(nextProps);
          // console.log('shipping address appear')
          this.loadAddressToForm(nextProps.currentShippingAddress, nextProps.formName);
        }
        break;
      case "billingAddress":
        if (nextProps.checkoutStep !== 2 && this.props.checkoutStep === 2) {
          // when disappear
          // this.props.dispatch(setBillingAddress(this.props.localAddress));
          // console.log('billing address disappear')
          if (this.props.localAddress) {
            this.props.dispatch(
              setSaveNewBillingAddress(this.props.localAddress.save_in_address_book)
            );
          }
        } else if (nextProps.checkoutStep === 2 && this.props.checkoutStep !== 2) {
          // when appear
          // console.log('billing address disappear')
          this.loadAddressToForm(nextProps.currentBillingAddress, nextProps.formName);
        }
        break;
      default:
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.selectedCountry !== nextProps.selectedCountry) {
      const formName = "AddressFormV2";
      // const { selectedCountry } = this.props;
      const regionValue = COUNTRY_TO_STATES[nextProps.selectedCountry]
        && COUNTRY_TO_STATES[nextProps.selectedCountry][0]
        ? COUNTRY_TO_STATES[nextProps.selectedCountry][0].code
        : "";
      this.props.dispatch(change(formName, "region_code", regionValue));
    }
  }

  onSelectFlag(value, countryData, number) {
    this.setCountryAndNumber(countryData, number);
  }

  onPhoneNumberChange(status, value, countryData, number) {
    this.setCountryAndNumber(countryData, number);
  }

  loadAddressToForm(address, formName) {
    // console.log('loadAddressToForm called', address, formName)
    if (address) {
      const {
        country_id,
        city,
        firstname,
        lastname,
        postcode,
        region_code,
        street,
        telephone,
        save_billing_address,
        save_shipping_address
      } = address;
      const reduxFormName = "AddressFormV2";
      if (country_id) {
        this.props.dispatch(change(reduxFormName, "country_id", country_id));
      }
      if (city) {
        this.props.dispatch(change(reduxFormName, "city", city));
      }
      if (firstname) {
        this.props.dispatch(change(reduxFormName, "firstname", firstname));
      }
      if (lastname) {
        this.props.dispatch(change(reduxFormName, "lastname", lastname));
      }
      if (postcode) {
        this.props.dispatch(change(reduxFormName, "postcode", postcode));
      }
      if (region_code) {
        this.props.dispatch(change(reduxFormName, "region_code", region_code));
      }
      if (street && Array.isArray(street) && street[0]) {
        this.props.dispatch(change(reduxFormName, "street1", street[0]));
      }
      if (street && Array.isArray(street) && street.length > 1) {
        this.props.dispatch(change(reduxFormName, "street2", street[1]));
      }
      if (telephone) this.props.dispatch(change(reduxFormName, "telephone", telephone));
      if ((formName = "shippingAddress" && save_shipping_address)) {
        this.props.dispatch(
          change(reduxFormName, "save_in_address_book", save_shipping_address)
        );
      }
      if ((formName = "billingAddress" && save_billing_address)) {
        this.props.dispatch(
          change(reduxFormName, "save_in_address_book", save_billing_address)
        );
      }
    } else {
      this.initializeCountryAndRegion();
    }
  }

  setCountryAndNumber(countryData, number) {
    // Replace characters of ( ) - or space with empty string
    const replaceSet = {
      "(": "",
      ")": "",
      "-": "",
      " ": ""
    };
    const formattedPhone = number.replace(/[()-\s]/g, (s) => {
      return replaceSet[s];
    });
    this.setState({
      country: countryData.iso2.toUpperCase(),
      phone: formattedPhone
    });
  }

  getDialCodefrom(country_id) {
    let countryDial = "US+1";
    if (country_id) {
      const country = COUNTRIES.find(c => c.code === country_id);
      countryDial = `${_.get(country, "code", "US")} ${_.get(country, "dial", "+1")}`;
    }
    return countryDial;
  }

  initializeCountryAndRegion() {
    const { localAddress } = this.props;
    if (!localAddress || !localAddress.country_id) {
      this.props.dispatch(change("AddressFormV2", "country_id", CURRENT_COUNTRY));
      if (!localAddress || !localAddress.region_code) {
        const country = localAddress && localAddress.country_id
          ? localAddress.country_id
          : CURRENT_COUNTRY;
        this.props.dispatch(
          change(
            "AddressFormV2",
            "region_code",
            COUNTRY_TO_STATES[country] && COUNTRY_TO_STATES[country][0]
              ? COUNTRY_TO_STATES[country][0]
              : ""
          )
        );
      }
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  isSameAddress(localAddress, matchedAddress) {
    const same = matchedAddress.city_locality.toUpperCase() === localAddress.city.toUpperCase()
      && matchedAddress.country_code.toUpperCase()
        === localAddress.country_id.toUpperCase()
      && matchedAddress.address_line1.toUpperCase() === localAddress.street1.toUpperCase()
      && matchedAddress.address_line2.toUpperCase()
        === (localAddress.street2 ? localAddress.street2.toUpperCase() : "")
      && matchedAddress.state_province.toUpperCase()
        === localAddress.region_code.toUpperCase()
      && matchedAddress.postal_code.toUpperCase().substring(0, 5)
        === localAddress.postcode.toUpperCase().substring(0, 5); // TODO us only verify first five
    return same;
  }

  reconstructOuputAddress(address) {
    const {
      city,
      country_id,
      firstname,
      lastname,
      postcode,
      region_code,
      street1,
      street2,
      // telephone,
      save_in_address_book
    } = address;
    const street = [street1];
    if (street2 && street2 !== "") street.push(street2);
    const regionObject = COUNTRY_TO_STATES[country_id]
      ? COUNTRY_TO_STATES[country_id].find(o => o.code === region_code)
      : null;
    return {
      city,
      country_id,
      firstname,
      lastname,
      postcode,
      region: regionObject ? regionObject.name : region_code,
      region_code,
      region_id: regionObject ? parseInt(regionObject.id) : region_code,
      street,
      telephone: this.state.phone ? this.state.phone : undefined,
      save_in_address_book
    };
  }

  handleValidateResponse(data) {
    // if data only has address key and if suggested address is not same or similar, show Modal
    const { callback, localAddress } = this.props;
    const { status, matched_address, messages } = data;
    this.setState({
      validateResponse: data
    });
    switch (status) {
      case "warning": // The address was validated, but the address should be double checked
      case "verified": //  Address was successfully verified. has suggested address
        const same = this.isSameAddress(localAddress, matched_address);
        let AptMissing = false;
        if (messages.length > 0) {
          messages.forEach((message) => {
            if (message.code === "a1002") {
              AptMissing = true;
            }
          });
        }
        if (same && !AptMissing) {
          callback(this.reconstructOuputAddress(localAddress));
          break;
        } else {
          this.setState({
            showModal: true,
            addressConfirm: same,
            extraConfirm: !AptMissing
          });
        }
        break;
      case "unverified": // Address validation was not validated against the database because pre-validation failed
      case "error": // The address could not be validated with any degree of certainty against the database
      default:
        this.setState({
          showModal: true
        });
        break;
    }

    // a1001
    // The country is not supported.
    // a1002
    // Parts of the address could not be verified.
    // a1003
    // Some fields were modified while verifying the address.
    // a1004
    // The address was found but appears incomplete.
    // a1005
    // The address failed pre-validation.
  }

  handleFormSubmit(formProps) {
    // const { callback, localAddress } = this.props;
    this.setState({
      addressConfirm: false,
      extraConfirm: false
    });
    // validate address with a callback
    // if (formProps && formProps.country_id && formProps.country_id.toUpperCase() === 'US') {
    // Get the phone number from intl phone input
    const formPropsCopy = JSON.parse(JSON.stringify(formProps));
    formPropsCopy.telephone = this.state.phone;
    this.props.dispatch(validateAddress(formPropsCopy, this.handleValidateResponse));
    // } else {
    //  callback(this.reconstructOuputAddress(localAddress));
    // }
  }

  accecptSuggested() {
    const { localAddress, callback } = this.props;
    const sAddress = this.state.validateResponse.matched_address;
    const suggest = {
      // data from validation, and some data keep same
      firstname: localAddress.firstname,
      lastname: localAddress.lastname,
      street1: sAddress.address_line1,
      street2: sAddress.address_line2,
      country_id: sAddress.country_code,
      postcode: sAddress.postal_code,
      region_code: sAddress.state_province,
      city: sAddress.city_locality,
      telephone: localAddress.telephone,
      save_in_address_book: localAddress.save_in_address_book
    };
    this.props.dispatch(setLocalAddress(suggest));

    this.setState({
      addressConfirm: true
    });
    let AptMissing = false;
    if (this.state.validateResponse.messages.length > 0) {
      this.state.validateResponse.messages.forEach((message) => {
        if (message.code === "a1002") {
          AptMissing = true;
        }
      });
    }
    if (AptMissing) {
      // if validate response has message key, need further user interaction
    } else {
      this.setState({
        showModal: false
      });
      callback(this.reconstructOuputAddress(suggest));
    }
  }

  continueWithAddress() {
    const { callback, localAddress } = this.props;
    // if has suggested address, address not confirmed, and has extra message ( apt missing )
    let AptMissing = false;
    if (this.state.validateResponse.messages.length > 0) {
      this.state.validateResponse.messages.forEach((message) => {
        if (message.code === "a1002") {
          AptMissing = true;
        }
      });
    }
    if (
      this.state.validateResponse.matched_address
      && AptMissing
      && this.state.addressConfirm === false
    ) {
      this.setState({
        addressConfirm: true
      });
    } else {
      this.setState({
        showModal: false
      });
      callback(this.reconstructOuputAddress(localAddress));
    }
  }

  autoFill(addressComponents, type) {
    const formName = "AddressFormV2";

    const componentForm = {
      street_number: "street1",
      route: "street1",
      premise: "street1",
      locality: "city",
      administrative_area_level_1: "region_code",
      country: "country_id",
      postal_code: "postcode",
      postal_code_suffix: "postcode"
    };

    let street1 = "";
    // Loop 1: dispatch country first
    // we dispatch country first so that the react have time to rerender region , region can be a select input or text input
    if (addressComponents && addressComponents.length) {
      for (let i = 0; i < addressComponents.length; i++) {
        const addressType = addressComponents[i].types[0];
        switch (addressType) {
          case "country":
            this.props.dispatch(
              change(
                formName,
                componentForm[addressType],
                addressComponents[i].short_name
              )
            );
            break;
          default:
            continue;
        }
      }
      // Loop 2: dispatch others
      for (let i = 0; i < addressComponents.length; i++) {
        const addressType = addressComponents[i].types[0];

        switch (addressType) {
          case "street_number":
            if (type === "(regions)") {
              break;
            }
            street1 = addressComponents[i].long_name;
            break;
          case "route":
            if (type === "(regions)") {
              break;
            }
            street1 += ` ${addressComponents[i].short_name}`;
            this.props.dispatch(change(formName, "street1", street1));
            break;
          case "premise":
            if (type === "(regions)") {
              break;
            }
            break;
          case "locality":
            this.props.dispatch(
              change(
                formName,
                componentForm[addressType],
                addressComponents[i].short_name
              )
            );
            break;
          // postal_town is city for UK
          case "postal_town":
            this.props.dispatch(
              change(formName, componentForm.locality, addressComponents[i].short_name)
            );
            break;
          case "postal_code":
            this.props.dispatch(
              change(
                formName,
                componentForm[addressType],
                `${addressComponents[i].long_name} `
              )
            );
            break;
          case "administrative_area_level_1": // region
            this.props.dispatch(
              change(
                formName,
                componentForm[addressType],
                addressComponents[i].short_name
              )
            );
            break;
          case "postal_code_suffix":
            this.props.dispatch(
              change(
                formName,
                componentForm[addressType],
                `${addressComponents[i - 1].long_name}-${
                  addressComponents[i].long_name
                }`
              )
            );
            break;
          default:
            continue;
        }
      }
    }
  }

  render() {
    const {
      extraFields,
      selectedCountry,
      handleSubmit,
      submitting,
      pristine,
      invalid,
      extraButtons,
      localAddress,
      auth,
      formName,
      // shipNew,
      billingFormStatus,
      disableCountry
    } = this.props;
    // console.log("++++", formName, shipNew)
    const disabled = invalid || pristine || submitting;

    const country_options = disableCountry ? COUNTRIES_DEFAULT : COUNTRIES;

    const onlyCountries = selectedCountry
      ? [selectedCountry].map(v => v.toLowerCase())
      : [];
    const preferredCountries = selectedCountry ? selectedCountry.toLowerCase() : "";

    return (
      <div className={styles.formWrapper}>
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <FormGroup>
            <div className={styles.inline_style}>
              <ControlLabel>First Name *</ControlLabel>
              <Field
                name="firstname"
                type="text"
                component={FieldFormControl}
                label="firstname"
                placeholder="First Name"
                inline="true"
              />
            </div>
            <div className={styles.inline_style} style={{ marginLeft: "20px" }}>
              <ControlLabel>Last Name *</ControlLabel>
              <Field
                name="lastname"
                type="text"
                component={FieldFormControl}
                label="lastname"
                placeholder="Last Name"
                inline="true"
              />
            </div>

            <ControlLabel>Country/Region *</ControlLabel>
            <Field
              name="country_id"
              type="text"
              component={FieldFormControlSelect}
              label="country_id"
              placeholder="Country/district"
              options={country_options}
            />

            <ControlLabel>Street Address *</ControlLabel>
            <Field
              name="street1"
              type="text"
              component={AddressStreet1AutoComplete}
              callback={this.autoFill}
              AutoCompleteType="address"
              label="street1"
              placeholder="Street Address"
            />
            <Field
              name="street2"
              type="text"
              component={FieldFormControl}
              label="street2"
              placeholder="Apartment/ Unit/ Suite/ Floor etc."
            />

            <div className={styles.zip_inline_style}>
              <ControlLabel>Zip Code *</ControlLabel>
              <Field
                name="postcode"
                type="text"
                component={AddressStreet1AutoComplete}
                callback={this.autoFill}
                AutoCompleteType="(regions)"
                label="postcode"
                placeholder="Zip Code"
              />
            </div>
            <div className={styles.city_inline_style}>
              <ControlLabel>City *</ControlLabel>
              <Field
                name="city"
                type="text"
                component={FieldFormControl}
                label="city"
                placeholder="City"
              />
            </div>
            <div className={styles.state_inline_style}>
              <ControlLabel>State/Region *</ControlLabel>
              {COUNTRY_TO_STATES[selectedCountry] ? (
                <Field
                  name="region_code"
                  type="text"
                  component={FieldFormControlSelect}
                  label="state"
                  placeholder="State"
                  options={COUNTRY_TO_STATES[selectedCountry]}
                />
              ) : (
                <Field
                  name="region_code"
                  type="text"
                  component={FieldFormControl}
                  label="state"
                  placeholder="State"
                />
              )}
            </div>

            <ControlLabel>Phone Number *</ControlLabel>
            <br />
            <Field
              name="telephone"
              type="text"
              component={FieldFormControlIntlTelInput}
              onPhoneNumberChange={this.onPhoneNumberChange}
              onSelectFlag={this.onSelectFlag}
              defaultCountry={preferredCountries}
              preferredCountries={onlyCountries ? [] : null}
              onlyCountries={onlyCountries}
              addressForm
            />

            {extraFields && extraFields.length !== 0 ? extraFields : ""}
            {auth ? (
              <Field
                name="save_in_address_book"
                type="checkbox"
                component={FieldFormControlCheckbox}
                label="save_in_address_book"
                title="Save this address"
                formName={formName}
              />
            ) : null}
            {billingFormStatus && formName !== "shippingAddress" ? (
              <div
                className={styles.editBTN}
                onClick={() => this.props.dispatch(setBillingFormStatus(false))}
              >
                {" "}
                EDIT
                {" "}
              </div>
            ) : null}
          </FormGroup>
          {formName !== "shippingAddress" ? (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={this.props.pristine}
              style={{ display: billingFormStatus ? "none" : "" }}
            >
              {" "}
              Use this address
              {" "}
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitAndNextstep}
              disabled={disabled}
            >
              {" "}
              SHIP TO THIS ADDRESS
            </button>
          )}
          {extraButtons || ""}
        </Form>
        <AddressValidationResponse
          {...this.state}
          close={this.close}
          new_addr={localAddress}
          accecptSuggested={this.accecptSuggested}
          continueWithAddress={this.continueWithAddress}
        />
      </div>
    );
  }
}

// validate the sign up form
function validate(formProps) {
  const errors = {};
  if (!formProps.firstname) {
    errors.firstname = "Please enter your first name";
  }
  if (!formProps.lastname) {
    errors.lastname = "Please enter your last name";
  }
  if (!formProps.street1) {
    errors.street1 = "Please enter street address";
  }
  if (!formProps.postcode) {
    errors.postcode = "Please enter a valid zipcode";
  }
  if (!formProps.city) {
    errors.city = "Please enter a city";
  }
  // if (!formProps.telephone) {
  //   errors.telephone = "Please enter phone number";
  // }
  if (!formProps.region_code) {
    errors.region_code = "Please enter a valid state/province";
  }
  return errors;
}

AddressFormV2 = reduxForm({
  form: "AddressFormV2",
  validate
})(AddressFormV2);

// get the field countries's value
const selector = formValueSelector("AddressFormV2");
export default connect((state) => {
  const selectedCountry = selector(state, "country_id");
  return {
    localAddress: getFormValues("AddressFormV2")(state),
    currentBillingAddress: getCurrentBillingAddress(state),
    currentShippingAddress: getCurrentShippingAddress(state),
    selectedCountry,
    checkoutStep: getCheckoutStep(state),
    saveNewShippingAddress: getSaveNewShippingAddress(state),
    saveNewBillingAddress: getSaveNewBillingAddress(state)
  };
})(AddressFormV2);
