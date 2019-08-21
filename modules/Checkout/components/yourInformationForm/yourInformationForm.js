/*
  Shipping address Form
*/

import React, { Component } from "react";
import { Form, ControlLabel, FormGroup } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router";

import FieldFormControl from "../../../../components/FieldFormControl";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";

// import actions
import { checkAccountExist } from "../../CheckoutActions";
import { signinUser } from "../../../Authentication/AuthActions";
import { postNewsLetter } from "../../../Customer/CustomerActions";

import checkoutPagestyles from "../../pages/CheckoutPage/CheckoutPage.css";
import styles from "./yourInformationForm.css";

class YourInfomationForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      allowSignInMode: true,
      pw_err: false,
      show_subscribe: true
    });
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePasswordErr = this.handlePasswordErr.bind(this);
  }

  handlePasswordErr(flag) {
    if (flag) this.setState({ pw_err: true });
  }

  handleFormSubmit(formProps) {
    if (formProps.sign_up_for_newsletter) {
      this.setState({ show_subscribe: false });
      this.props.dispatch(postNewsLetter(formProps.email, (err, msg) => { if (err) this.setState({ show_subscribe: true }); }));
    }
    if (this.props.exist === true && this.state.allowSignInMode === true) {
      // login action
      this.props.dispatch(signinUser(formProps, this.handlePasswordErr, "not-sign-in"));
    } else {
      this.props.dispatch(checkAccountExist(formProps, this.props.tryNextStep));
    }
    // reset as allow, only email changes will disable this mode
    this.setState({
      allowSignInMode: true
    });
  }

  // evan@evestemptation.com
  render() {
    const {
      handleSubmit, submitting, anyTouched, pristine
    } = this.props;
    const showLogin = this.props.exist === true && this.state.allowSignInMode === true;
    const loginExtra = showLogin ? (
      <FormGroup>
        <ControlLabel>Password *</ControlLabel>
        <Field
          name="password"
          type="password"
          component={FieldFormControl}
          label="password"
          placeholder=""
        />
        <div style={{ color: "red", display: this.state.pw_err ? "" : "none" }}>Please enter the correct password</div>
        <div className={styles.forgotWrapper}><Link to="/account/password/forgot">Forgot password ? </Link></div>
      </FormGroup>
    ) : null;

    return (
      <div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <FormGroup>
            <ControlLabel>Email *</ControlLabel>
            <Field
              name="email"
              type="email"
              component={FieldFormControl}
              label="email"
              placeholder="Email"
              onChange={
                (event) => {
                  this.setState({
                    allowSignInMode: false
                  });
                }
              }
            />
            { showLogin ? <div className={styles["input-warning"]}>It looks like you’re already a member</div> : null}
          </FormGroup>
          { loginExtra }
          {this.state.show_subscribe ? <Field name="sign_up_for_newsletter" component={FieldFormControlCheckbox} title="Sign Up for Newsletter" bsClass={`checkbox-circle ${styles["stay-sign-in-checkbox"]}`} /> : ""}
          <button className={checkoutPagestyles["next-button"]} type="submit" disabled={pristine || submitting}>
            { (this.props.exist === true && this.state.allowSignInMode === true) ? "SIGN IN" : "CONTINUE"}
            {" "}
          </button>
        </Form>
      </div>
    );
  }
}

// validate the sign up form
function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Please enter your email";
  }
  if (formProps.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
      errors.email = "Invalid email address";
    }
  }
  return errors;
}


function mapStateToProps(store) {
  return {
    initialValues: { sign_up_for_newsletter: true }
  };
}

YourInfomationForm = reduxForm({
  form: "yourInfomationForm",
  validate
})(YourInfomationForm);

export default connect(mapStateToProps)(YourInfomationForm);
