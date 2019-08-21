import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import FieldFormControlRadiobox from "../../../../components/FieldFormControlRadiobox";
// import actions
import { forgetPassword, verifyPhone, resendVerifyCode } from "../../AuthActions";

import styles from "./ForgotpasswordPage.css";
import history from "../../../../history";

class ForgotpasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      msg: "",
      valid: false,
      waitResponse_email: false,
      dirty: false,
      phone: "",
      guestMethod: "email",
      success: false,
      verifyCode_success: false,
      phone_code: "",
      submitCode_success: false,
      waitResponse_phone: false,
      verifyCode_err: false
    };
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
    this.handleToggleGuestMethod = this.handleToggleGuestMethod.bind(this);
    this.handleInputPhone = this.handleInputPhone.bind(this);
    this.handleInputPhoneVerifyCode = this.handleInputPhoneVerifyCode.bind(this);
    this.submitVerifyCode = this.submitVerifyCode.bind(this);
  }

  handleInputEmail(event) {
    this.setState({
      email: event.target.value,
      success: false
    });
    this.validateEmail(event.target.value);
  }

  handleInputPhone(event) {
    this.setState({
      phone: event.target.value,
      submitCode_success: false
    });
    this.validatePhone(event.target.value);
  }

  handleToggleGuestMethod(e) {
    this.setState({
      guestMethod: e.target.value,
      msg: ""
    });
  }

  submitVerifyCode() {
    event.preventDefault();
    this.setState({
      dirty: false,
      msg: ""
    });
    this.props.dispatch(
      resendVerifyCode(
        { phone: `+1${this.state.phone}` },
        this.handleSubmitVerifyCodeResponse.bind(this)
      )
    );
  }

  handleSubmitVerifyCodeResponse(success, msg) {
    this.setState({
      msg,
      submitCode_success: success
    });
  }

  validatePhone(phone) {
    const reg = /^\d{10}$/;
    if (reg.test(phone)) {
      this.setState({
        msg: "",
        valid: true,
        submitCode_success: false,
        dirty: true
      });
      return true;
    }
    this.setState({
      msg: "Please type in a valid phone",
      valid: false
    });
    return false;
  }

  handleInputPhoneVerifyCode(event) {
    this.setState({
      phone_code: event.target.value,
      verifyCode_success: false
    });
    this.validatePhoneCode(event.target.value);
  }

  validatePhoneCode(code) {
    const reg = /^\d{4}$/;
    if (reg.test(code)) {
      this.setState({
        msg: "",
        valid: true,
        verifyCode_success: false,
        dirty: true,
        verifyCode_err: false
      });
      return true;
    }
    this.setState({
      msg: code && code.length > 4 ? "Please type in 4-digit verify code" : "",
      verifyCode_err: code && code.length > 4,
      valid: false
    });
    return false;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      this.setState({
        msg: "",
        valid: true,
        success: false,
        dirty: true
      });
      return true;
    }
    this.setState({
      msg: "Please type in a valid email",
      valid: false
    });
    return false;
  }

  handleSubmit(event) {
    const method = this.state.guestMethod;
    event.preventDefault();
    this.setState({
      waitResponse_email: method === "email",
      waitResponse_phone: method === "phone",
      dirty: false,
      msg: ""
    });

    if (method === "phone") {
      if (this.state.submitCode_success) {
        this.props.dispatch(
          verifyPhone(
            { phone: `+1${this.state.phone}`, code: this.state.phone_code },
            this.handleSubmitResponse
          )
        );
      }
    } else {
      this.props.dispatch(
        forgetPassword({ email: this.state.email }, this.handleSubmitResponse)
      );
    }
  }

  handleSubmitResponse(success, msg, token) {
    const cur = this.state.guestMethod;
    this.setState({
      waitResponse_email: false,
      waitResponse_phone: false
    });
    this.setState({
      msg,
      success: cur === "email" ? success : false,
      verifyCode_success: cur === "phone" ? success : false,
      dirty: !success
    });
    if (cur === "phone" && this.state.verifyCode_success && token) {
      history.push(`/account/password/reset/${token}`);
    }
  }

  renderPhonefetchingPassword() {
    return (
      <div>
        <input
          className={styles.input}
          type="text"
          value={this.state.phone}
          onChange={this.handleInputPhone}
          placeholder="Enter 10-digit US Phone Number"
        />
        <div
          className={styles.sendPhoneCode}
          style={{ color: !this.state.valid ? "" : "black" }}
          onClick={!this.state.valid ? null : this.submitVerifyCode}
        >
          Send Verify Code
        </div>
        {this.state.msg && this.state.msg !== "" ? (
          <div
            className={
              this.state.submitCode_success && !this.state.verifyCode_err
                ? styles.success
                : styles.error
            }
          >
            {this.state.msg}
          </div>
        ) : null}
        <div className={styles.phoneCode}>
          <span>Please input 4-digit code here</span>
          <input
            className={styles.input}
            type="text"
            value={this.state.phone_code}
            onChange={this.handleInputPhoneVerifyCode}
            placeholder="4-digit code"
          />
        </div>
        {this.state.waitResponse ? (
          <div className={styles.submit}>
            <i className="ion-load-c" />
          </div>
        ) : (
          <input
            className={styles.submit}
            disabled={!this.state.valid || !this.state.dirty}
            type="submit"
            value="Next"
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Having trouble signing in ?</div>
          <div className={styles.panel}>
            <div className={styles.profileWrapper}>
              <i className="ion-android-person" />
            </div>

            <p className={styles.text}>Please select a way to change your password</p>
            <Form onSubmit={this.handleSubmit}>
              <div className={styles.email_to_change}>
                <FieldFormControlRadiobox
                  name="guest_forget_password_method"
                  id="with_email"
                  value="email"
                  title="Find Password with Email"
                  checked={this.state.guestMethod === "email"}
                  onChange={this.handleToggleGuestMethod}
                />
              </div>
              {this.state.guestMethod === "email" ? (
                <div>
                  <input
                    className={styles.input}
                    type="email"
                    value={this.state.email}
                    onChange={this.handleInputEmail}
                    placeholder="Enter Email"
                  />
                  {this.state.msg && this.state.msg !== "" ? (
                    <div className={this.state.success ? styles.success : styles.error}>
                      {this.state.msg}
                    </div>
                  ) : null}
                  {this.state.waitResponse_email ? (
                    <div className={styles.submit}>
                      <i className="ion-load-c" />
                    </div>
                  ) : (
                    <input
                      className={styles.submit}
                      disabled={!this.state.valid || !this.state.dirty}
                      type="submit"
                      value="Next"
                    />
                  )}
                </div>
              ) : null}
              <FieldFormControlRadiobox
                name="guest_forget_password_method"
                id="with_phone"
                value="phone"
                title="Find Password with Phone Number"
                checked={this.state.guestMethod === "phone"}
                onChange={this.handleToggleGuestMethod}
              />
              {this.state.guestMethod === "phone"
                ? this.renderPhonefetchingPassword()
                : null}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ForgotpasswordPage);
