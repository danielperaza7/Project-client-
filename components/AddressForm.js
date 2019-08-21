/**
 * Created by dongyu on 08/01/17.
 */

/**
 *
 */

import React, { Component } from "react";
import { Form, ControlLabel, FormGroup } from "react-bootstrap";
import {
  reduxForm, Field, formValueSelector, change, getFormValues
} from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

// import components
import FieldFormControl from "./FieldFormControl";
import FieldFormControlSelect from "./FieldFormControlSelect_Region";
import AddressStreet1AutoComplete from "./AddressStreet1AutoComplete";
import AddressValidationResponse from "../modules/CheckoutV2/components/AddressValidationResponse/AddressValidationResponse";

import { COUNTRIES, COUNTRY_TO_STATES /* , CURRENT_COUNTRY */ } from "../config/config";

// import actions
import { setLocalAddress } from "../modules/App/FormActions";
import { validateAddress } from "../modules/CheckoutV2/CheckoutActions";

// import styles

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      validateResponse: null,
      addressConfirm: false,
      extraConfirm: false
    };

    this.autoFill = this.autoFill.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValidateResponse = this.handleValidateResponse.bind(this);
    this.onClose = this.onClose.bind(this);
    this.accecptSuggested = this.accecptSuggested.bind(this);
    this.continueWithAddress = this.continueWithAddress.bind(this);
  }

  componentWillMount() {
    // if(this.props.isNew){
    //   const initialData = {
    //     country_id: CURRENT_COUNTRY,
    //     region_code: COUNTRY_TO_STATES[CURRENT_COUNTRY][0].code, // FERV2 might cause a bug if current country is not in the list
    //   };
    //   this.props.dispatch(setLocalAddress(initialData));
    // }
  }

  componentWillUpdate(nextProps) {
    // update region if country changeStore
    if (
      this.props.selectedCountry !== nextProps.selectedCountry
      && this.props.selectedCountry
    ) {
      const formName = "Address_Form";
      const regionValue = COUNTRY_TO_STATES[nextProps.selectedCountry]
        && COUNTRY_TO_STATES[nextProps.selectedCountry][0]
        ? COUNTRY_TO_STATES[nextProps.selectedCountry][0].code
        : "";
      this.props.dispatch(change(formName, "region_code", regionValue));
    }
  }

  onClose() {
    this.setState({ showModal: false });
  }

  handleFormSubmit(formProps) {
    this.setState({
      addressConfirm: false,
      extraConfirm: false
    });

    // validate address with a callback
    if (formProps.country_id.toUpperCase() === "US") {
      this.props.dispatch(validateAddress(formProps, this.handleValidateResponse));
    } else {
      this.props.continueDo(this.props.local_address);
    }
  }

  handleValidateResponse(data) {
    // if data only has address key and if suggested address is not same or similar, show Modal

    this.setState({
      validateResponse: data
    });
    if (!("error" in data) && "address" in data) {
      // no error and has address response
      const same = data.address.address_city.toUpperCase()
          === this.props.local_address.city.toUpperCase()
        && data.address.address_country.toUpperCase()
          === this.props.local_address.country_id.toUpperCase()
        && data.address.address_line1.toUpperCase()
          === this.props.local_address.street1.toUpperCase()
        && data.address.address_line2.toUpperCase()
          === (this.props.local_address.street2
            ? this.props.local_address.street2.toUpperCase()
            : "")
        && data.address.address_state.toUpperCase()
          === this.props.local_address.region_code.toUpperCase()
        && data.address.address_zip.toUpperCase().substring(0, 5)
          === this.props.local_address.postcode.toUpperCase().substring(0, 5);

      if (same && !data.message) {
        this.props.continueDo(this.props.local_address);
      }

      this.setState({
        showModal: !(same && !data.message),
        addressConfirm: data.message && same,
        extraConfirm: !data.message
      });
    } else {
      // error case
      console.log("case 2");
      this.setState({
        showModal: true
      });
    }
  }

  autoFill(address_components, type) {
    const formName = "Address_Form";

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
          this.props.dispatch(
            change(formName, componentForm[addressType], address_components[i].short_name)
          );
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
          if (type === "(regions)") {
            break;
          }
          street1 = address_components[i].long_name;
          break;
        case "route":
          if (type === "(regions)") {
            break;
          }
          street1 += ` ${address_components[i].short_name}`;
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
              address_components[i].short_name
            )
          );
          break;
        case "postal_code":
          this.props.dispatch(
            change(
              formName,
              componentForm[addressType],
              `${address_components[i].long_name} `
            )
          );
          break;
        case "administrative_area_level_1": // region
          this.props.dispatch(
            change(formName, componentForm[addressType], address_components[i].short_name)
          );
          break;
        case "postal_code_suffix":
          this.props.dispatch(
            change(
              formName,
              componentForm[addressType],
              `${address_components[i - 1].long_name}-${address_components[i].long_name}`
            )
          );
          break;
        default:
          continue;
      }
    }
  }

  accecptSuggested() {
    const sAddress = this.state.validateResponse.address
      ? this.state.validateResponse.address
      : this.state.validateResponse.matched_address;
    console.log(".....", sAddress);
    const suggest = {
      // data from validation, and some data keep same
      firstname: this.props.local_address.firstname,
      lastname: this.props.local_address.lastname,
      street1: sAddress.address_line1,
      street2: sAddress.address_line2,
      country_id: sAddress.address_country
        ? sAddress.address_country
        : sAddress.country_code,
      postcode: sAddress.address_zip ? sAddress.address_zip : sAddress.postal_code,
      region_code: sAddress.address_state
        ? sAddress.address_state
        : sAddress.state_province,
      city: sAddress.address_city ? sAddress.address_city : sAddress.city_locality,
      telephone: this.props.local_address.telephone,
      default_shipping: this.props.local_address.default_shipping,
      default_billing: this.props.local_address.default_billing
    };
    this.props.dispatch(setLocalAddress(suggest));

    this.setState({
      addressConfirm: true
    });

    if ("message" in this.state.validateResponse) {
      // if validate response has message key, need further user interaction
    } else {
      this.setState({
        showModal: false
      });
      this.props.continueDo(suggest);
    }
  }

  continueWithAddress() {
    // if has suggested address, address not confirmed, and has extra message ( apt missing )
    if (
      "address" in this.state.validateResponse
      && "message" in this.state.validateResponse
      && this.state.addressConfirm === false
    ) {
      this.setState({
        addressConfirm: true
      });
    } else {
      this.setState({
        showModal: false
      });
      this.props.continueDo(this.props.local_address);
    }
  }

  render() {
    const { selectedCountry, handleSubmit } = this.props;
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

            <ControlLabel>Country/Region *</ControlLabel>
            <Field
              name="country_id"
              type="text"
              component={FieldFormControlSelect}
              label="country_id"
              placeholder="Country/district"
              options={COUNTRIES}
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
            {COUNTRY_TO_STATES[selectedCountry] ? (
              <Field
                name="region_code"
                type="text"
                component={FieldFormControlSelect}
                label="region_code"
                placeholder="State/Province"
                options={COUNTRY_TO_STATES[selectedCountry]}
              />
            ) : (
              <Field
                name="region_code"
                type="text"
                component={FieldFormControl}
                label="region_code"
                placeholder="State/Province"
              />
            )}

            <ControlLabel>City *</ControlLabel>
            <Field
              name="city"
              type="text"
              component={FieldFormControl}
              label="city"
              placeholder="City"
            />

            <ControlLabel>Phone Number *</ControlLabel>
            <Field
              name="telephone"
              type="text"
              component={FieldFormControl}
              label="telephone"
              placeholder="telephone"
            />

            {this.props.extraFields
              ? this.props.extraFields.length !== 0
                ? this.props.extraFields
                : ""
              : ""}
          </FormGroup>
          <button type="submit" className="submitButton" disabled={this.props.pristine}>
            {" "}
            Submit
            {" "}
          </button>
          {this.props.cancelButton || ""}
        </Form>
        <AddressValidationResponse
          {...this.state}
          close={this.onClose}
          new_addr={this.props.local_address}
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
  if (!formProps.region_code) {
    errors.region_code = "Please enter a valid state";
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
  return errors;
}

AddressForm = reduxForm({
  form: "Address_Form",
  validate
})(AddressForm);

// get the field countries's value
const selector = formValueSelector("Address_Form");
export default connect((state) => {
  const selectedCountry = selector(state, "country_id");
  return {
    local_address: getFormValues("Address_Form")(state),
    selectedCountry
  };
})(AddressForm);
