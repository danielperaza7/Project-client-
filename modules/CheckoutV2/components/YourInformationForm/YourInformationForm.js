/*
  Shipping address Form
*/

import React, { Component } from "react";
import { Form, ControlLabel, FormGroup } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import FieldFormControl from "../../../../componentsV2/formComponents/FieldFormControl/FieldFormControl";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import {
  nextCheckoutStep,
  setOrderEmail,
  setSubscription,
  fetchCart
} from "../../CheckoutActions";
import { getSubscribeEmail } from "../../CheckoutReducer";
import { getUserEmail } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import styles from "./YourInformationForm.css";
// import { checkAccountExist } from '../../CheckoutActions';
// import { signinUser } from '../../../Authentication/AuthActions';
import { postNewsLetter } from "../../../Customer/CustomerActions";

// import checkoutPagestyles from '../../pages/CheckoutPage/CheckoutPage.css';
// import styles from './yourInformationForm.css';

class YourInformationForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleSubscribeEmail = this.toggleSubscribeEmail.bind(this);
  }

  toggleSubscribeEmail(event) {
    this.props.dispatch(setSubscription(event.currentTarget.checked));
  }

  handleFormSubmit(formProps) {
    console.log("handleFormSubmit called", formProps);
    // save orderEmail
    if (!formProps.email) {
      return;
    }
    this.props.dispatch(setOrderEmail(formProps.email));
    if (this.props.subscriptionStatus && !this.props.authentication) {
      this.props.dispatch(postNewsLetter(formProps.email));
    }
    this.props.dispatch(nextCheckoutStep());
    if (this.props.authentication) {
      this.props.dispatch(fetchCart("", true, "sign-in"));
    } else {
      this.props.dispatch(fetchCart("", true, "not-sign-in"));
    }
    // if(formProps.sign_up_for_newsletter){
    //   this.setState({show_subscribe:false})
    //   this.props.dispatch(postNewsLetter(formProps.email, function(err, msg){if(err)this.setState({show_subscribe:true})}.bind(this) ));
    // }
    // if( true===this.props.exist && true===this.state.allowSignInMode ){
    //   // login action
    //   this.props.dispatch(signinUser(formProps,this.handlePasswordErr,"not-sign-in"));
    // }else{
    //   this.props.dispatch(checkAccountExist(formProps, this.props.tryNextStep));
    // }
    // // reset as allow, only email changes will disable this mode
    // this.setState({
    //   allowSignInMode: true
    // })
  }

  render() {
    const { handleSubmit, submitting, authentication } = this.props;
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
            />
          </FormGroup>
          {!authentication ? (
            <FieldFormControlCheckbox
              input={{
                value: this.props.subscriptionStatus === true,
                onChange: this.toggleSubscribeEmail
              }}
              name="ssubscribe_your_email"
              id="ssubscribe_your_email"
              label="ssubscribe_your_email"
              title="Sign up to receive exclusive offers + promotions"
            />
          ) : null}
          {/* this.state.show_subscribe?<Field name="sign_up_for_newsletter" component={FieldFormControlCheckbox} title="Sign Up for Newsletter" bsClass={`checkbox-circle ${styles["stay-sign-in-checkbox"]}`}/> : "" */}
          <button className={styles.InfoPanelBTN} type="submit" disabled={submitting}>
            {!authentication ? "USE THIS EMAIL" : "CONTINUE"}
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
    initialValues: { email: getUserEmail(store) },
    email: getUserEmail(store),
    authentication: getAuthStatus(store),
    subscriptionStatus: getSubscribeEmail(store)
  };
}

YourInformationForm = reduxForm({
  form: "yourInformationForm",
  validate
})(YourInformationForm);

export default connect(mapStateToProps)(YourInformationForm);
