import React, { Component } from "react";
import {
  Form, ControlLabel, FormGroup, Row, Col, Checkbox, Button
} from "react-bootstrap";
import {
  reduxForm, Field, formValueSelector, change
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import FieldFormControl from "../../../../components/FieldFormControl";
import FieldFormControlSelect from "../../../../components/FieldFormControlSelect_Region";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import AddressValidationResponse from "../addressValidationResponse/addressValidationResponse";
import AddressStreet1AutoComplete from "../../../../components/AddressStreet1AutoComplete";

import { COUNTRIES, COUNTRY_TO_STATES, CURRENT_COUNTRY } from "../../../../config/config";

// import actions
import {
  setBillingAddress, setBillingAddressForm, postCartAddress, validateAddress
} from "../../CheckoutActions";

// import styles
import checkoutPagestyles from "../../pages/CheckoutPage/CheckoutPage.css";

class BillingAddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      showModal: false,
      validateResponse: null,
      addressConfirm: false,
      extraConfirm: false,
    });
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValidateResponse = this.handleValidateResponse.bind(this);
    this.accecptSuggested = this.accecptSuggested.bind(this);
    this.closeModalthenTryNextStep = this.closeModalthenTryNextStep.bind(this);
    this.continueWithAddress = this.continueWithAddress.bind(this);
    this.close = this.close.bind(this);
    this.autoFill = this.autoFill.bind(this);
  }

  componentWillMount() {
    const initialData = {
      country_id: CURRENT_COUNTRY
    };
    this.props.dispatch(setBillingAddressForm(initialData));
  }

  componentWillUpdate(nextProps, nextState) {
    // update region if country changeStore
    if (this.props.selectedCountry !== nextProps.selectedCountry) {
      const formName = "BillingAddressForm";
      const { selectedCountry } = this.props;
      const regionValue = COUNTRY_TO_STATES[nextProps.selectedCountry] && COUNTRY_TO_STATES[nextProps.selectedCountry][0] ? COUNTRY_TO_STATES[nextProps.selectedCountry][0].code : "";
      this.props.dispatch(change(formName, "region_code", regionValue));
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  handleValidateResponse(data) {
    // if data only has address key and if suggested address is not same or similar, show Modal
    console.log("handleValidateResponse called");
    this.setState({
      validateResponse: data
    });
    if (!("error" in data) && ("address" in data)) {
      // no error and has address response
      const same = data.address.address_city.toUpperCase() === this.props.billingAddress.city.toUpperCase()
      && data.address.address_country.toUpperCase() === this.props.billingAddress.country_id.toUpperCase()
      && data.address.address_line1.toUpperCase() === this.props.billingAddress.street[0].toUpperCase()
      && data.address.address_line2.toUpperCase() === this.props.billingAddress.street[1].toUpperCase()
      && data.address.address_state.toUpperCase() === this.props.billingAddress.region.region_code.toUpperCase()
      && data.address.address_zip.toUpperCase().substring(0, 5) === this.props.billingAddress.postcode.toUpperCase().substring(0, 5);
      console.log("same", same);
      if (!("message" in data)) {
        // no apartment missing
        console.log("// no apartment missing");
        this.setState({
          extraConfirm: false
        });
        if (same) {
          // correct address
          console.log("correct address should post cart address");
          // dispatch setAddresses to save new billing address
          this.props.setBillDifStatus(true);
          this.props.dispatch(postCartAddress(this.props.getCurrentShippingAddress(), this.props.billingAddress, this.props.getCurrentBillingAddress(), this.props.tryNextStep()));
        } else {
          // not correct
          console.log("not correct");
          this.setState({
            showModal: true
          });
        }
      }
      if ("message" in data) {
        // means apartment missing
        console.log("apartment missing");
        if (same) {
          this.setState({
            showModal: true,
            addressConfirm: true
          });
        } else {
          this.setState({
            showModal: true
          });
        }
      }
    } else {
      // error case
      console.log("case 2");
      this.setState({
        showModal: true
      });
    }
  }

  handleFormSubmit(formProps) {
    // reset addressConfirm
    this.setState({ addressConfirm: false });
    // prepare shipping addresses
    const CurrentCountry = formProps.country_id; // should get country from app state...
    const currentRegion = _.find(COUNTRY_TO_STATES[CurrentCountry], { code: formProps.region_code });
    // COUNTRY_TO_STATES, CurrentCountry
    let BillingAddress = null;
    BillingAddress = {
      firstname: formProps.firstname,
      lastname: formProps.lastname,
      street: [formProps.street1, formProps.street2 ? formProps.street2 : ""],
      country_id: formProps.country_id,
      postcode: formProps.postcode,
      region: {
        region_code: formProps.region_code,
        region: currentRegion ? currentRegion.name : formProps.region_code,
        region_id: currentRegion ? currentRegion.id : 0
      },
      city: formProps.city,
      save_in_address_book: formProps.save_in_address_book ? 1 : 0,
      // same_as_shipping: same_as_shipping,
      telephone: formProps.telephone
      // email:formProps.email
    };

    // dispatch save address to save current shipping address form data
    this.props.dispatch(setBillingAddress(BillingAddress));
    // validate address with a callback
    if (CurrentCountry.toUpperCase() === "US") {
      this.props.dispatch(validateAddress(formProps, this.handleValidateResponse));
    } else {
      this.props.setBillDifStatus(true);
    }
  }

  closeModalthenTryNextStep() {
    this.setState({
      showModal: false
    });
    this.props.setBillDifStatus(true);
  }

  accecptSuggested() {
    console.log("accecptSuggested called");

    // data preparation: construct new address
    const sAddress = this.state.validateResponse.address;
    const newAddress = this.props.billingAddress;
    newAddress.city = sAddress.address_city;
    newAddress.country_id = sAddress.address_country;
    newAddress.postcode = sAddress.address_zip;
    newAddress.region.region_code = sAddress.address_state; // and  id name
    const stateIndex = _.findIndex(COUNTRY_TO_STATES[sAddress.address_country], (o) => {
      return o.code.toUpperCase() === sAddress.address_state.toUpperCase();
    });
    const acceptStateObject = COUNTRY_TO_STATES[sAddress.address_country][(stateIndex > -1) ? stateIndex : 0];
    newAddress.region.region = acceptStateObject.name;
    newAddress.region.region_id = acceptStateObject.id;
    newAddress.street = [sAddress.address_line1, sAddress.address_line2];


    // data preparation: update shipping address form
    const shippingForm = {
      // data from validation, and some data keep same
      firstname: this.props.billingAddress.firstname,
      lastname: this.props.billingAddress.lastname,
      street1: sAddress.address_line1,
      street2: sAddress.address_line2,
      country_id: sAddress.address_country,
      postcode: sAddress.address_zip,
      region_code: sAddress.address_state,
      city: sAddress.address_city,
      same_as_shipping: this.props.billingAddress.same_as_shipping,
      save_in_address_book: this.props.billingAddress.save_in_address_book,
      telephone: this.props.billingAddress.telephone
    };

    // save current shipping address
    this.props.dispatch(setBillingAddress(newAddress));
    // save shipping to form data
    this.props.dispatch(setBillingAddressForm(shippingForm));
    this.setState({
      addressConfirm: true
    });

    if ("message" in this.state.validateResponse) {
    // if validate response has message key, need further user interaction
    } else {
      // dispatch postAddress
      // though in the postCartAddress has a cb to close it, here we close it before resposne
      this.setState({
        showModal: false
      });
      this.props.dispatch(postCartAddress(this.props.getCurrentShippingAddress(), newAddress, this.closeModalthenTryNextStep));
    }
  }

  continueWithAddress() {
    console.log("continueWithAddress called");
    // if has suggested address, address not confirmed, and has extra message ( apt missing )
    if (("address" in this.state.validateResponse) && ("message" in this.state.validateResponse) && (this.state.addressConfirm === false)) {
      this.setState({
        addressConfirm: true
      });
    } else {
      this.props.dispatch(postCartAddress(this.props.getCurrentShippingAddress(), this.props.getCurrentBillingAddress(), this.closeModalthenTryNextStep));
    }
  }

  autoFill(address_components, type) {
    const formName = "BillingAddressForm";

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
    for (let i = 0; i < address_components.length; i++) {
      const addressType = address_components[i].types[0];
      switch (addressType) {
        case "country":
          this.props.dispatch(change(formName, componentForm[addressType], address_components[i].short_name));
          break;
        default:
          continue;
      }
    }
    // Loop 2: dispatch others
    for (let i = 0; i < address_components.length; i++) {
      const addressType = address_components[i].types[0];

      switch (addressType) {
        case "street_number":
          if (type === "(regions)") { break; }
          street1 = address_components[i].long_name;
          break;
        case "route":
          if (type === "(regions)") { break; }
          street1 += (` ${address_components[i].short_name}`);
          this.props.dispatch(change(formName, "street1", street1));
          break;
        case "premise":
          if (type === "(regions)") { break; }
        case "locality":
          this.props.dispatch(change(formName, componentForm[addressType], address_components[i].short_name));
          break;
        case "postal_code":
          this.props.dispatch(change(formName, componentForm[addressType], (`${address_components[i].long_name} `)));
          break;
        case "administrative_area_level_1": // region
          this.props.dispatch(change(formName, componentForm[addressType], address_components[i].short_name));
          break;
        case "postal_code_suffix":
          this.props.dispatch(change(formName, componentForm[addressType], `${address_components[i - 1].long_name}-${address_components[i].long_name}`));
        default:
          continue;
      }
    }
  }

  render() {
    const {
      billingAddress, handleSubmit, submitting, pristine, invalid, show
    } = this.props;
    if (!show) return null;
    const selectedCountry = billingAddress.country_id;
    const disabled = invalid || pristine || submitting;
    return (
      <div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <FormGroup>
            <ControlLabel>First Name *</ControlLabel>
            <Field
              name="firstname"
              type="text"
              component={FieldFormControl}
              label="firstname"
              placeholder="First Name"
            />

            <ControlLabel>Last Name *</ControlLabel>
            <Field
              name="lastname"
              type="text"
              component={FieldFormControl}
              label="lastname"
              placeholder="Last Name"
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
              placeholder="Apartment/Unit/Suite/Floor etc."
            />


            <ControlLabel>Country/Region *</ControlLabel>
            <Field
              name="country_id"
              type="text"
              component={FieldFormControlSelect}
              label="country_id"
              placeholder="Country/district"
              options={COUNTRIES}
            />

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

            <ControlLabel>State/Province *</ControlLabel>
            {
              COUNTRY_TO_STATES[selectedCountry]
                ? (
                  <Field
                    name="region_code"
                    type="text"
                    component={FieldFormControlSelect}
                    label="state"
                    placeholder="State/Province"
                    options={COUNTRY_TO_STATES[selectedCountry]}
                  />
                )
                : (
                  <Field
                    name="region_code"
                    type="text"
                    component={FieldFormControl}
                    label="state"
                    placeholder="State/Province"
                  />
                )
            }

            <ControlLabel>City *</ControlLabel>
            <Field
              name="city"
              type="text"
              component={FieldFormControl}
              label="city"
              placeholder="City"
            />

            { !this.props.isGuest
              ? (
                <Field
                  name="save_in_address_book"
                  type="checkbox"
                  component={FieldFormControlCheckbox}
                  label="save_in_address_book"
                  title="Save this Address for later"
                  checked={this.props.saveNewbillingAddress}
                  onChange={this.props.toggleSavebillingAddress}
                  disabled={this.props.isGuest === true}
                />
              ) : null }

            <ControlLabel>Phone Number *</ControlLabel>
            <Field
              name="telephone"
              type="text"
              component={FieldFormControl}
              label="telephone"
              placeholder="telephone"
            />
          </FormGroup>
          <button className={checkoutPagestyles["next-button"] + (disabled ? " disabled" : "")} type="submit" disabled={disabled}>BILL TO THIS NEW ADDRESS</button>
        </Form>
        <AddressValidationResponse close={this.close} {...this.state} new_addr={this.props.billingAddress} accecptSuggested={this.accecptSuggested} continueWithAddress={this.continueWithAddress} />
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
  if (!formProps.telephone) {
    errors.telephone = "Please enter phone number";
  }
  if (!formProps.region_code) {
    errors.region_code = "Please enter State/Province";
  }
  return errors;
}

BillingAddressForm = reduxForm({
  form: "BillingAddressForm",
  validate
})(BillingAddressForm);

// get the field countries's value
const selector = formValueSelector("BillingAddressForm");
export default connect(
  (state) => {
    const selectedCountry = selector(state, "country_id");
    return {
      selectedCountry
    };
  }
)(BillingAddressForm);
