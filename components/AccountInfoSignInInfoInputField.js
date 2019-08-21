import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeEmail,
  changePhone
} from "../modules/Customer/CustomerActions";
import styles from "./AccountInfoSignInInfoInputField.css";

class AccountInfoSignInInfoInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,
      oriEmail: "",
      oriPhone: "",
      msg: ""
    };
    this.onToggle = this.onToggle.bind(this);
    this.changeEmailCB = this.changeEmailCB.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.oriEmail
      && nextProps.input.value
      && nextProps.fieldName === "Email address"
    ) {
      this.setState({ oriEmail: nextProps.input.value });
    }
    if (
      !this.state.oriPhone
      && nextProps.input.value
      && nextProps.fieldName === "Phone Number"
    ) {
      this.setState({ oriPhone: nextProps.input.value });
    }
  }

  onToggle() {
    const { dispatch, input, fieldName } = this.props;
    const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!this.state.readOnly) {
      if (fieldName === "Email address") {
        if (!input.value || input.value.indexOf("@") === -1 || !myreg.test(input.value)) {
          this.setState({ msg: "Please enter correct email address" });
        } else {
          this.setState({ msg: "" });
          dispatch(changeEmail({ newEmail: input.value }, this.changeEmailCB));
        }
      } else if (fieldName === "Phone Number") {
        if (!input.value || input.value.length < 10) {
          this.setState({ msg: "Please enter correct US Phone Number" });
        } else {
          this.setState({ msg: "" });
          dispatch(
            changePhone(
              {
                newPhone:
                  input.value.substring(0, 2) !== "+1" ? `+1${input.value}` : input.value
              },
              this.changeEmailCB
            )
          );
        }
      }
    }
    if (this.state.readOnly) this.setState({ readOnly: false });
  }

  changeEmailCB(err, msg, method) {
    if (err) {
      this.setState({ msg: `Failed! ${msg}` });
      if (method === "email") this.props.changeBack(this.state.oriEmail);
      else this.props.changeBack(this.state.oriPhone);
    } else {
      if (method === "email") this.setState({ msg: "Email changed successfully!" });
      else this.setState({ msg: "Phone Number changed successfully!" });
      this.setState({ readOnly: true });
    }
  }

  render() {
    const { fieldName } = this.props;
    // input options
    const opts = {};
    if (this.state.readOnly) {
      opts.readOnly = "readOnly";
    }

    return (
      <div className={styles["input-field-container"]}>
        <div className={styles["input-field-change-function"]} onClick={this.onToggle}>
          {this.state.readOnly ? `Change ${fieldName}` : "Save changes"}
        </div>
        <div className={styles["input-field-input-area-wrapper"]} data-value={fieldName}>
          <input
            {...this.props.input}
            className={styles["input-field-input-area"]}
            {...opts}
          />
        </div>
        {this.state.msg ? (
          <div
            style={{
              padding: "10px",
              textAlign: "justify",
              color:
                this.state.msg.charAt(0) === "F" || this.state.msg.includes("Please")
                  ? "red"
                  : "rgb(76, 159, 103)",
              fontSize: "10px",
              letterSpacing: ".02em"
            }}
          >
            {this.state.msg}
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect()(AccountInfoSignInInfoInputField);
