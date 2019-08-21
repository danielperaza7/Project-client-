import React, { Component } from "react";
import { Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { reduxForm, Field, change } from "redux-form";
import { connect } from "react-redux";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";
import history from "../../../../history";
import FieldFormControl from "../../../../components/FieldFormControl";
import FieldFormControlIntlTelInput from "../../../../components/FieldFormControlIntlTelInput";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import FieldFormControlRadiobox from "../../../../components/FieldFormControlRadiobox";
import { signinUser, authError } from "../../AuthActions";
import { getPreviousCustomHistory } from "../../../App/AppReducer";
import styles from "./SigninForm.css";

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: false,
      showEmailField: true,
      method: "email",
      country: "US",
      phone: "",
      recaptcha_token: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSigninResponse = this.handleSigninResponse.bind(this);
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

  handleFormSubmit(formProps) {
    this.setState({ isButtonDisabled: true });
    const phone = this.state.phone;
    const country_code = this.state.country;
    this.props.dispatch(
      signinUser(
        formProps,
        phone,
        country_code,
        this.handleSigninResponse,
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

  handleSigninResponse(err) {
    if (!err) {
      if (this.props.signinCallback) {
        this.props.signinCallback();
      }
      if (this.props.wherefrom) {
        history.push(this.props.wherefrom.wherefrom);
      }
    }
    // Stays in the page if error and enable sign in button
    this.setState({ isButtonDisabled: false });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">{this.props.errorMessage}</div>;
    }
    return null;
  }

  verifyCallback(recaptchaToken) {
    console.log(recaptchaToken);
    this.setState({
      recaptcha_token: recaptchaToken
    });
  }

  renderForm() {
    const { handleSubmit, checkoutMode } = this.props;
    const lower = value => value && value.toLowerCase();

    return (
      <div className={`${styles["signin-form-container"]} signin-form-container`}>
        <Form
          className={`${styles["sign-in-form"]} sign-in-form`}
          horizontal
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <div className={`${styles["input-container"]} input-container`}>
            <FormGroup controlId="formHorizontalEmail">
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
              <Col sm={12} hidden={!this.state.showEmailField}>
                <Field
                  name="email"
                  component={FieldFormControl}
                  label="Email/Phone Number"
                  placeholder="Email*"
                  bsClass={styles["ebe-form-control"]}
                  normalize={lower}
                />
              </Col>
              <div hidden={this.state.showEmailField}>
                <Col md={12} style={{ width: "100%" }}>
                  <Field
                    name="phone"
                    component={FieldFormControlIntlTelInput}
                    onPhoneNumberChange={this.onPhoneNumberChange}
                    onSelectFlag={this.onSelectFlag}
                  />
                </Col>
              </div>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col sm={12} className={{}}>
                <Field
                  name="password"
                  type="password"
                  component={FieldFormControl}
                  label="password"
                  placeholder="Password*"
                  bsClass={styles["ebe-form-control"]}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <div className={styles.newsLetterAndForgetPassword}>
                <div>
                  <Field
                    name="sign_up_for_newsletter"
                    component={FieldFormControlCheckbox}
                    title="Sign Up for Newsletter"
                    bsClass={`checkbox-circle ${styles["stay-sign-in-checkbox"]}`}
                  />
                </div>
                <div
                  className={`${
                    styles["forget-password-link"]
                  } text-right forget-password-link`}
                >
                  <Link
                    to="/account/password/forgot"
                    style={{ textDecoration: "underline" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Col
                sm={12}
                className={`${
                  styles["sign-in-button-container"]
                } sign-in-button-container`}
              >
                {typeof window !== 'undefined' && window.grecaptcha  && typeof window.grecaptcha.render === 'function' && <ReCaptcha
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
                  onClick={() => this.props.dispatch(authError(""))}
                  disabled={this.state.isButtonDisabled}
                  type="submit"
                  className={`${styles["sign-in-button"]} sign-in-button`}
                >
                  {checkoutMode ? "SIGN IN & CHECKOUT" : "SIGN IN"}
                </button>
              </Col>
            </FormGroup>

            {this.props.errorMessage ? this.renderAlert() : null}
          </div>
        </Form>
      </div>
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

function validate(formProps) {
  const errors = {};

  // if(!formProps.email && !formProps.phone) {
  //   errors.email = 'Please enter a valid email/phone number';
  // }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  return errors;
}

function mapStateToProps(store) {
  return {
    errorMessage: store.auth.error,
    initialValues: { sign_up_for_newsletter: true },
    previousCustomHistory: getPreviousCustomHistory(store)
  };
}

SigninForm = reduxForm({
  form: "signinForm",
  validate
})(SigninForm);

export default connect(mapStateToProps)(SigninForm);
