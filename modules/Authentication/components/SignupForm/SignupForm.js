import React, { Component } from "react";
import {
  Form, FormGroup, Row, Col
} from "react-bootstrap";
import {
  reduxForm, Field, formValueSelector, change
} from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";
import FieldFormControl from "../../../../components/FieldFormControl";
import FieldFormControlIntlTelInput from "../../../../components/FieldFormControlIntlTelInput";
import FieldFormControlRadiobox from "../../../../components/FieldFormControlRadiobox";
import { signupUser, authError } from "../../AuthActions";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";

// import styles
import styles from "./SignupForm.css";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmailField: true,
      method: "email",
      country: "US",
      phone: "",
      recaptcha_token: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setCredentialName = this.setCredentialName.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onSelectFlag = this.onSelectFlag.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.RecaptureCallback = this.RecaptureCallback.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(authError(""));
  }

  componentDidMount() {
    this.props.dispatch(change("SignupForm", "sign_up_for_newsletter", true));
    this.props.dispatch(change("SignupForm", "stay_sign_in", true));
    loadReCaptcha();
    if (this.captchaBox) {
      console.log("started, just a second...");
      this.captchaBox.reset();
    }
  }

  onLoadRecaptcha() {
    if (this.captchaBox) {
      this.captchaBox.reset();
    }
  }

  onSelectFlag(value, countryData, number) {
    this.setCountryAndNumber(countryData, number);
  }

  onPhoneNumberChange(status, value, countryData, number) {
    this.setCountryAndNumber(countryData, number);
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

  setCredentialName(event) {
    const methodEmail = event.target.checked && event.target.value === "email";
    this.setState({
      showEmailField: methodEmail,
      method: methodEmail ? "email" : "phone"
    });
  }

  verifyCallback(recaptchaToken) {
    this.setState({
      recaptcha_token: recaptchaToken
    });
  }

  handleFormSubmit(formProps) {
    const phone = this.state.phone;
    const country_code = this.state.country;
    this.props.dispatch(
      signupUser(
        formProps,
        phone,
        country_code,
        this.RecaptureCallback,
        this.state.method,
        this.state.recaptcha_token
      )
    );
  }

  RecaptureCallback() {
    if (this.captchaBox) {
      this.captchaBox.reset();
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">{this.props.errorMessage}</div>;
    }
    return null;
  }

  render() {
    const {
      handleSubmit, no_checkbox, checkoutMode, checkoutSuccessMode
    } = this.props;
    const lower = value => value && value.toLowerCase();
    console.log("this is no_checkbox", no_checkbox);
    console.log("check for auto filled email", this.props.autoFilledEmail);

    return (
      <div
        className={`${styles["sign-up-form-container"]} sign-up-form-container`}
        style={{ margin: checkoutSuccessMode ? "20px 0 0 0" : "" }}
      >
        {checkoutMode || checkoutSuccessMode ? null : (
          <div className={`${styles["sign-up-form-title"]}`}>CREATE ACCOUNT </div>
        )}
        <Form onSubmit={handleSubmit(this.handleFormSubmit)} className="sign-up-form">
          <FormGroup>
            <Row>
              <Col md={6}>
                <Field
                  name="first_name"
                  type="text"
                  component={FieldFormControl}
                  label="first_name"
                  placeholder="First Name*"
                  bsClass={`${styles["ebe-form-control"]}`}
                />
              </Col>
              <Col md={6}>
                <Field
                  name="last_name"
                  type="text"
                  component={FieldFormControl}
                  label="last_name"
                  placeholder="Last Name*"
                  bsClass={`${styles["ebe-form-control"]}`}
                />
                {/* <FormControl type="text" /> */}
              </Col>
            </Row>
            {/* radio button to select email or phone */}
            <Row>
              <Col md={12} style={{ display: "flex" }}>
                <FieldFormControlRadiobox
                  name="email_signin"
                  id="email_signin"
                  value="email"
                  title="Email"
                  checked={this.state.method === "email"}
                  onChange={this.setCredentialName}
                  style={{ marginLeft: "20px", paddingBottom: "5px" }}
                />
                <FieldFormControlRadiobox
                  name="phone_signin"
                  id="phone_signin"
                  value="phone"
                  title="Phone Number"
                  checked={this.state.method === "phone"}
                  onChange={this.setCredentialName}
                  style={{ marginLeft: "50px" }}
                />
              </Col>
            </Row>

            <Row hidden={!this.state.showEmailField}>
              <Col md={12}>
                <Field
                  name="email"
                  component={FieldFormControl}
                  label="Email/Phone Number"
                  placeholder={checkoutSuccessMode ? "Email" : "Email*"}
                  bsClass={`${styles["ebe-form-control"]}`}
                  normalize={lower}
                />
              </Col>
            </Row>

            <Row hidden={this.state.showEmailField}>
              <Col md={12} style={{ width: "100%" }}>
                <Field
                  name="phone"
                  component={FieldFormControlIntlTelInput}
                  onPhoneNumberChange={this.onPhoneNumberChange}
                  onSelectFlag={this.onSelectFlag}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Field
                  name="password"
                  type="password"
                  component={FieldFormControl}
                  label="password"
                  placeholder="Password*"
                  bsClass={`${styles["ebe-form-control"]}`}
                />
                {/* <FormControl type="text" /> */}
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Field
                  name="password_confirm"
                  type="password"
                  component={FieldFormControl}
                  label="password_confirm"
                  placeholder="Confirm password*"
                  bsClass={`${styles["ebe-form-control"]}`}
                />
              </Col>
            </Row>
            <div className={styles.checkboxContainer}>
              <div
                className={styles.staySignedIn}
                style={{ display: no_checkbox ? "none" : "" }}
              >
                <Field
                  name="stay_sign_in"
                  component={FieldFormControlCheckbox}
                  title="Stay signed in"
                  bsClass="checkbox-circle"
                  id="stay_signed_in"
                />
              </div>
              <div
                className={styles.subscribeNewsletters}
                style={{ display: no_checkbox ? "none" : "" }}
              >
                <Field
                  name="sign_up_for_newsletter"
                  component={FieldFormControlCheckbox}
                  title="Subscribe Newsletters"
                  bsClass={`checkbox-circle ${styles["stay-sign-in-checkbox"]}`}
                />
              </div>
            </div>
            {this.renderAlert()}
            {typeof window !== 'undefined' && window.grecaptcha && typeof window.grecaptcha.render === 'function' && <ReCaptcha
              ref={(el) => {
                this.captchaBox = el;
              }}
              size="normal"
              data-theme="light"
              render="explicit"
              sitekey={process.env.RAZZLE_ENV_RECAPTCHA_KEY}
              onloadCallback={this.onLoadRecaptcha}
              verifyCallback={this.verifyCallback}
            />}
            <button
              style={{ margin: no_checkbox ? "3% 0 0 0" : "" }}
              className={`${styles["sign-up-button"]} sign-up-button`}
              onClick={() => this.props.dispatch(authError(""))}
              type="submit"
            >
              {checkoutMode ? "CREATE & CHECKOUT" : "CREATE AN ACCOUNT"}
            </button>
          </FormGroup>
        </Form>
        {checkoutMode || checkoutSuccessMode ? null : (
          <Link className={`${styles["back-to-login"]}`} to="/signin">
            Have an account? Sign In Now
          </Link>
        )}
      </div>
    );
  }
}

// validate the sign up form
function validate(formProps) {
  const errors = {};
  console.log("fn", formProps.first_name);
  if (!formProps.first_name) {
    console.log("fn", formProps.first_name);
    errors.first_name = "Please enter your first name";
  }

  if (!formProps.last_name) {
    errors.last_name = "Please enter your first name";
  }

  // if (!formProps.email && !formProps.phone) {
  //   errors.email = 'Please enter an email or phone number';
  // }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.password_confirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.password_confirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(store, ownProps) {
  return {
    errorMessage: store.auth.error,
    initialValues: {
      sign_up_for_newsletter: true,
      email: ownProps.autoFilledEmail ? ownProps.autoFilledEmail : "",
      first_name: ownProps.autoFilledFirstName ? ownProps.autoFilledFirstName : "",
      last_name: ownProps.autoFilledLastName ? ownProps.autoFilledLastName : ""
    }
  };
}

SignupForm = reduxForm({
  form: "SignupForm",
  validate
})(SignupForm);

const selector = formValueSelector("SignupForm");
export default connect(mapStateToProps)(SignupForm);
