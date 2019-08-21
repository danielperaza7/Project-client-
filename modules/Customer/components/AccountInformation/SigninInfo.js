/**
 * Created by warrenchen on 4/8/17.
 */
import React, { Component } from "react";
import {
  reduxForm, Field, formValueSelector, change
} from "redux-form";
import { connect } from "react-redux";
import { Form, FormGroup, Col } from "react-bootstrap";
import AccountInfoSignInInfoInputField from "../../../../components/AccountInfoSignInInfoInputField";
import AccountInfoSignInInfoPasswordField from "../../../../components/AccountInfoSignInInfoPasswordField";
import AccountInfoSubscriptionCheckboxField from "../../../../components/AccountInfoSubscriptionCheckboxField";
import { postAccountInfo } from "../../CustomerActions";
import { getUserData } from "../../../App/AppReducer";
import { fetchCustomer } from "../../../App/AppActions";
import styles from "./AccountInformation.css";

class SigninInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      already_phone: false,
      already_email: false
    };
    this.handleCheckBoxEmailSubmit = this.handleCheckBoxEmailSubmit.bind(this);
    this.handleCheckBoxPhoneSubmit = this.handleCheckBoxPhoneSubmit.bind(this);
  }

  handleCheckBoxEmailSubmit(formProps) {
    const uncheck_phone = (!formProps.phoneNotification && this.state.already_phone)
      || (!formProps.phoneNotification && !this.state.already_phone);
    const uncheck_email = (!formProps.emailNotification && this.state.already_email)
      || (!formProps.emailNotification && !this.state.already_email);
    if ((!uncheck_email && uncheck_phone) || !formProps.email) {
      this.setState({
        msg: formProps.email
          ? "There should be one way to receive notification"
          : "please input your email address",
        already_phone: false,
        already_email: false
      });
      this.props.dispatch(fetchCustomer());
    } else {
      this.setState({
        msg: "",
        already_email: true
      });
      this.props.dispatch(postAccountInfo(formProps, "email"));
    }
  }

  handleCheckBoxPhoneSubmit(formProps) {
    const uncheck_phone = (!formProps.phoneNotification && this.state.already_phone)
      || (!formProps.phoneNotification && !this.state.already_phone);
    const uncheck_email = (!formProps.emailNotification && this.state.already_email)
      || (!formProps.emailNotification && !this.state.already_email);
    if ((!uncheck_phone && uncheck_email) || !formProps.phone) {
      this.setState({
        msg: formProps.phone
          ? "There should be one way to receive notification"
          : "please input your phone number",
        already_phone: false,
        already_email: false
      });
      this.props.dispatch(fetchCustomer());
    } else {
      this.setState({
        msg: "",
        already_phone: true
      });
      this.props.dispatch(postAccountInfo(formProps, "phone"));
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form horizontal>
        <div className={styles["sign-in-info-title"]}>SIGN IN INFO</div>
        {this.state.msg ? (
          <div style={{ color: "red", fontSize: "12px" }}>{this.state.msg}</div>
        ) : null}
        <FormGroup controlId="formHorizontalEmail">
          <Col sm={12}>
            <Field
              name="email"
              fieldName="Email address"
              type="email"
              component={AccountInfoSignInInfoInputField}
              label="email"
              placeholder="email"
              changeBack={(value) => {
                this.props.dispatch(change("AccountInfo", "email", value));
              }}
            />
            <Field
              name="emailNotification"
              type="checkbox"
              component={AccountInfoSubscriptionCheckboxField}
              fieldName="Use email to receive Notification"
              onChange={handleSubmit(this.handleCheckBoxEmailSubmit)}
            />
          </Col>
          <Col sm={12} style={{ marginTop: "10px" }}>
            <Field
              name="phone"
              fieldName="Phone Number"
              type="text"
              component={AccountInfoSignInInfoInputField}
              label="phone"
              placeholder="10-digit US Phone Number"
              changeBack={(value) => {
                this.props.dispatch(change("AccountInfo", "phone", value));
              }}
            />
            <Field
              name="phoneNotification"
              type="checkbox"
              component={AccountInfoSubscriptionCheckboxField}
              fieldName="Use phone number to receive Notification"
              onChange={handleSubmit(this.handleCheckBoxPhoneSubmit)}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={12}>
            <Field
              name="password"
              fieldName="Password"
              type="password"
              component={AccountInfoSignInInfoPasswordField}
              label="password"
              placeholder="password"
              email={this.props.email}
              phone={this.props.phone}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

SigninInfo = reduxForm({
  form: "AccountInfo"
})(SigninInfo);

const selector = formValueSelector("AccountInfo");

function mapStateToProps(store) {
  return {
    customer: getUserData(store)
  };
}
export default connect(mapStateToProps)(
  connect((state) => {
    return {
      email: selector(state, "email"),
      phone: selector(state, "phone"),
      phoneNotification: selector(state, "phoneNotification"),
      emailNotification: selector(state, "emailNotification")
    };
  })(SigninInfo)
);
