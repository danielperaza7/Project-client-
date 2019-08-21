import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { reduxForm } from "redux-form";
import { postAccountInfo } from "../../CustomerActions";
import { fetchCustomer } from "../../../App/AppActions";
// import style
import styles from "./AccountInformation.css";

class AccountInfoSaveAndResetButton extends Component {
  constructor(props) {
    super(props);
    this.handleSaveAccountInformation = this.handleSaveAccountInformation.bind(this);
  }

  handleSaveAccountInformation(formProps) {
    console.log(formProps);
    this.props.dispatch(postAccountInfo(formProps));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12} sm={6}>
            <div
              className={styles["save-changes-button"]}
              onClick={handleSubmit(this.handleSaveAccountInformation)}
            >
              SAVE CHANGES
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div
              className={styles["reset-changes-button"]}
              onClick={() => this.props.dispatch(fetchCustomer())}
            >
              RESET CHANGES
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default reduxForm({
  form: "AccountInfo"
})(AccountInfoSaveAndResetButton);
