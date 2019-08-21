import React, { Component } from "react";
import { connect } from "react-redux";

// import style
import styles from "./AccountInfoSignInInfoPasswordField.css";

// import actions
import { changePassword } from "../modules/App/AppActions";

class AccountInfoSignInInfoPasswordFieldField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      error: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.changePasswordCallback = this.changePasswordCallback.bind(this);
  }

  validatePassword() {
    // TODO
    return true;
  }

  handleChangePassword() {
    // clear the error
    this.setState({
      error: ""
    });

    // check if the two new pass word are the same
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({
        error: "password mismatch"
      });
    } else if (
      !this.state.oldPassword
      || !this.state.confirmNewPassword
      || !this.state.newPassword
    ) {
      this.setState({
        error: "You should fill all the fields"
      });
    } else if (!this.validatePassword(this.state.newPassword)) {
      // TODO
    } else {
      this.props.dispatch(
        changePassword(
          {
            phone: this.props.phone,
            email: this.props.email,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
          },
          this.changePasswordCallback
        )
      ); // need improving
    }
  }

  changePasswordCallback(err, msg) {
    if (err) {
      this.setState({ error: msg });
    } else {
      this.setState({
        readOnly: true,
        error: "Your password has been changed successfully!",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // console.log("this is the input value", name, value);

    this.setState({
      [name]: value
    });
  }

  renderReadOnlyPasswordInputBox() {
    const { fieldName } = this.props;

    // input options
    const opts = {};
    if (this.state.readOnly) {
      opts.readOnly = "readOnly";
    }

    return (
      <div className={styles["input-field-container"]}>
        <div
          className={styles["input-field-change-function"]}
          onClick={() => this.setState({
            readOnly: false,
            error: ""
          })
          }
        >
          {`Change ${fieldName}`}
        </div>
        <div className={styles["input-field-input-area-wrapper"]} data-value={fieldName}>
          <input className={styles["input-field-input-area"]} {...opts} />
        </div>

        <div className={styles["error-message"]} style={{ color: "#4C9F67" }}>
          {this.state.error}
        </div>
      </div>
    );
  }

  renderChangePasswordInputBox() {
    // input options
    const opts = {};
    if (this.state.readOnly) {
      opts.readOnly = "readOnly";
    }

    return (
      <div>
        <div className={styles["change-password-title"]}>Change Password</div>
        <div
          className={`${styles["input-field-container"]} ${
            styles["input-field-container-bottom-margin"]
          }`}
        >
          <div
            className={styles["input-field-change-function"]}
            onClick={() => this.setState({
              readOnly: true,
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
              error: ""
            })
            }
          >
            {"Cancel"}
          </div>
          <div className={styles["input-field-input-area-wrapper"]}>
            <input
              name="oldPassword"
              value={this.state.oldPassword}
              onChange={this.handleInputChange}
              placeholder="Current Password"
              className={styles["input-field-input-area"]}
              {...opts}
              type="password"
            />
          </div>
        </div>

        <div
          className={`${styles["input-field-container"]} ${
            styles["input-field-container-bottom-margin"]
          }`}
        >
          <div className={styles["input-field-input-area-wrapper"]}>
            <input
              name="newPassword"
              value={this.state.newPassword}
              onChange={this.handleInputChange}
              placeholder="New Password"
              className={styles["input-field-input-area"]}
              {...opts}
              type="password"
            />
          </div>
        </div>

        <div
          className={`${styles["input-field-container"]} ${
            styles["input-field-container-bottom-margin"]
          }`}
        >
          <div className={styles["input-field-input-area-wrapper"]}>
            <input
              name="confirmNewPassword"
              value={this.state.confirmNewPassword}
              onChange={this.handleInputChange}
              placeholder="Confirm Password"
              className={styles["input-field-input-area"]}
              {...opts}
              type="password"
            />
          </div>
        </div>

        <div
          className={styles["save-password-button"]}
          onClick={this.handleChangePassword}
        >
          SAVE
        </div>

        <div className={styles["error-message"]}>{this.state.error}</div>
      </div>
    );
  }

  render() {
    if (this.state.readOnly) {
      return this.renderReadOnlyPasswordInputBox();
    }
    return this.renderChangePasswordInputBox();
  }
}

export default connect()(AccountInfoSignInInfoPasswordFieldField);

// {...this.props.input}
