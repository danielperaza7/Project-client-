/**
 * Created by warrenchen on 4/8/17.
 */
import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Form, FormGroup, Col } from "react-bootstrap";
import AccountInfoPersonalInfoInputField from "../../../../components/AccountInfoPersonalInfoInputField";
// import AccountInfoPersonalInfoSelectField from "../../../../components/AccountInfoPersonalInfoSelectField";
import styles from "./AccountInformation.css";

// import configs
// import { ACCOUNT_AGES } from "../../../../config/Customer/customerConfig";
// import { COUNTRIES, COUNTRY_TO_STATES } from "../../../../config/config";

class PersonalInfo extends Component {
  render() {
    return (
      <Form horizontal>
        <div className={styles["personal-info-title"]}>PERSONAL INFO</div>

        <div className={styles["personal-info-description"]}>
          Tell us more about you to best serve you.
        </div>

        <FormGroup controlId="formHorizontalFirstName">
          <Col sm={12}>
            <Field
              name="firstname"
              type="text"
              component={AccountInfoPersonalInfoInputField}
              fieldName="First Name"
              placeholder="First Name"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLastName">
          <Col sm={12}>
            <Field
              name="lastname"
              fieldName="Last Name"
              type="text"
              component={AccountInfoPersonalInfoInputField}
              placeholder="Last Name"
            />
          </Col>
        </FormGroup>

        {/*
        <FormGroup controlId="formControlsSelectGender">
        <Col sm={12}>
        <Field
        name="gender"
        fieldName="Gender"
        component={AccountInfoPersonalInfoSelectField}
        options={[{'id': 'male', 'code':'male', 'name':'male'}, {'id': 'female', 'code':'female', 'name':'female'}]}
        />
        </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalStreet1">
        <Col sm={12}>
        <Field
        name="street1"
        fieldName="Street address"
        type="text"
        component={AccountInfoPersonalInfoInputField}
        placeholder="Apartment/Unit/Suite/Floor etc."
        />
        </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalStreet2">
        <Col sm={12}>
        <Field
        name="street2"
        type="text"
        component={AccountInfoPersonalInfoInputField}
        placeholder="Apartment/Unit/Suite/Floor etc."
        />
        </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelectCountries">
        <Col sm={12}>
        <Field
        name="countries"
        fieldName="Country"
        component={AccountInfoPersonalInfoSelectField}
        options={COUNTRIES}
        />
        </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalZip">
        <Col sm={12}>
        <Field
        name="zip"
        fieldName="Zip Code"
        type="text"
        component={AccountInfoPersonalInfoInputField}
        placeholder="Zip Code"
        />
        </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelectStates">
        <Col sm={12}>
        <Field
        name="states"
        fieldName="State"
        component={AccountInfoPersonalInfoSelectField}
        options={COUNTRY_TO_STATES[this.props.country]}
        />
        </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCity">
        <Col sm={12}>
        <Field
        name="city"
        fieldName="City"
        type="text"
        component={AccountInfoPersonalInfoInputField}
        placeholder="City"/>
        </Col>
        </FormGroup>
        */}
      </Form>
    );
  }
}

PersonalInfo = reduxForm({
  form: "AccountInfo"
})(PersonalInfo);

// get the field countries's value
const selector = formValueSelector("AccountInfo");
PersonalInfo = connect((state) => {
  const country = selector(state, "countries");

  return {
    country: `${country || "US"}`
  };
})(PersonalInfo);

export default PersonalInfo;
