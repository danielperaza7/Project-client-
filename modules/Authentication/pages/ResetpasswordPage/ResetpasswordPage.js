import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  Form, FormGroup, ControlLabel, Row, Modal
} from "react-bootstrap";
import history from "../../../../history";

import { resetPassword, validateResetToken } from "../../AuthActions";
import { getResetMethod } from "../../AuthReducer";
import FieldFormControl from "../../../../components/FieldFormControl";
import LinkWrapper from "../../../CMS/components/LinkWrapper/LinkWrapper";

import styles from "./ResetpasswordPage.css";

class ResetpasswordPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      response_err: "",
      show_modal: false,
      modal_msg: ""
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleResetResponse = this.handleResetResponse.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleValidateTokenResponse = this.handleValidateTokenResponse.bind(this);
  }

  componentWillMount() {
    const token_data = {
      token: this.props.match.params.token
    };
    if (token_data.token) {
      this.props.dispatch(validateResetToken(token_data, this.handleValidateTokenResponse));
    }
  }

  handleValidateTokenResponse(err, msg) {
    console.log("handle balidate toke response", err);
    if (err) {
      this.setState({ show_modal: true, modal_msg: msg });
    }
  }

  handleFormSubmit(formProps) {
    const { resetMethod } = this.props;
    console.log("handle reset form submit");
    const method = resetMethod.verify_method;
    const data_body = {
      [method]: resetMethod[method],
      password: formProps.password,
      token: this.props.match.params.token
    };
    console.log("data_body", data_body);
    this.props.dispatch(resetPassword(data_body, this.handleResetResponse, method));

    // this.handleResetResponse(true, "testtesttest")
  }

  handleResetResponse(err, msg) {
    // console.log("handle reset response");
    if (err) {
      this.setState({ response_err: msg });
    } else {
      // success!
      // go back to sign in page with successful message
      this.setState({ show_modal: true, modal_msg: msg });
    }
  }

  handleModalClose() {
    this.setState({ show_modal: false });
    history.push("/signin");
  }

  render() {
    const { handleSubmit, resetMethod } = this.props;
    if (!resetMethod) return null;
    const linkProps = {
      path: "/signin",
      click: true,
      url: "",
      browserPushCallback: ""
    };

    return (
      <div className={`container ${styles["reset-page"]}`}>
        <div className={styles["reset-title"]}> RESET YOUR PASSWORD </div>
        <Form
          onSubmit={handleSubmit(this.handleFormSubmit)}
          className={styles["reset-form"]}
        >
          <FormGroup>
            {resetMethod.verify_method === "email" ? (
              <Row>
                <div className={styles.methodLabel}>Email Address</div>
                <div className={styles.methodContent}>{resetMethod.email}</div>
              </Row>
            ) : null}
            {resetMethod.verify_method === "phone" ? (
              <Row>
                <div className={styles.methodLabel}>Phone Number</div>
                <div className={styles.methodContent}>{resetMethod.phone}</div>
              </Row>
            ) : null}
            <Row>
              <ControlLabel>Password</ControlLabel>
              <Field
                name="password"
                type="password"
                component={FieldFormControl}
                label="password"
                bsClass={`${styles["ebe-form-control"]}`}
              />
            </Row>
            <Row>
              <ControlLabel>Confirm Password</ControlLabel>
              <Field
                name="password_confirm"
                type="password"
                component={FieldFormControl}
                label="password_confirm"
                bsClass={`${styles["ebe-form-control"]}`}
              />
            </Row>
            <Row>
              <button className={styles["reset-btn"]} type="submit">
                RESET
              </button>
            </Row>
            <Row>
              <div className={styles["reset-err"]}>
                {this.state.response_err
                  ? `Sorry. ${this.state.response_err} - Please try later.`
                  : ""}
              </div>
            </Row>
          </FormGroup>
        </Form>
        <div>
          <Modal
            show={this.state.show_modal}
            onHide={this.handleModalClose}
            className={styles["reset-modal"]}
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modal_msg}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>{this.state.modal_msg}</div>
            </Modal.Body>
            <Modal.Footer>
              <LinkWrapper {...linkProps}>
                {" "}
                {"LOGIN AND GO SHOPPING"}
                {" "}
              </LinkWrapper>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

// validate the sign up form
function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = "Please enter a password";
  } else if (formProps.password.length < 8) {
    errors.password = "Please enter a password with at least 8 characters.";
  }

  if (!formProps.password_confirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.password_confirm) {
    errors.password = "Passwords must match";
    errors.passwordConfirm = "Passwords must match";
  }
  return errors;
}

function mapStateToProps(store) {
  return {
    resetMethod: getResetMethod(store)
  };
}

export default reduxForm({
  form: "resetPasswordForm",
  validate
})(connect(mapStateToProps)(ResetpasswordPage));
