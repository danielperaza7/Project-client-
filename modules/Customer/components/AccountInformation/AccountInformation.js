import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, batch } from "react-redux";
import SigninInfo from "./SigninInfo";
import PersonalInfo from "./PersonalInfo";
import Subscription from "./Subscription";
import AccountInfoSaveAndResetButton from "./AccountInfoSaveAndResetButton";
import {
  setAccountInformationTab,
  setSubscription,
  postVerifiedEmail
} from "../../CustomerActions";
import { fetchCustomer } from "../../../App/AppActions";
import styles from "./AccountInformation.css";

class AccountInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      send_already: false,
      resend_email_response: ""
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCustomer());
  }

  componentDidMount() {
    if (this.props.customer) {
      // set account information tab, address book tab, payment methods tab, reward point
      batch(() => {
        this.props.dispatch(setAccountInformationTab(this.props.customer));
        this.props.dispatch(setSubscription(this.props.customer));
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customer) {
      console.log("next state", nextProps.customer);
      // set account information tab, address book tab, payment methods tab, reward point
      nextProps.dispatch(setAccountInformationTab(nextProps.customer));
      // nextProps.dispatch(setSubscription(nextProps.customer));
    }
  }

  sendEmail() {
    const { email, firstname, group_id } = this.props.customer;
    const data = {
      firstname,
      email,
      group_id
    };
    this.props.dispatch(postVerifiedEmail(data, this.sendEmailResponse.bind(this)));
    this.setState({
      send_already: true,
      resend_email_response: ""
    });
  }

  sendEmailResponse(msg) {
    this.setState({
      send_already: false,
      resend_email_response: msg
    });
  }

  render() {
    const { customer } = this.props;
    const { send_already, resend_email_response } = this.state;
    return (
      <div>
        <Row>
          <Col xs={12} sm={6}>
            <div className={styles["account-information-title"]}>Account Information</div>
            {customer && customer.specialGroup ? (
              <div className={styles["account-information-membership"]}>
                <div style={{ marginBottom: "20px" }}>MEMBERSHIP</div>
                {customer.specialGroupVerified ? (
                  <div className={styles.memberships}>
                    <i
                      className="ion-checkmark-circled"
                      style={{ color: "#63D270", fontSize: "18px", marginRight: "10px" }}
                    />
                    {customer.specialGroup}
                  </div>
                ) : (
                  <div className={styles.memberships_verfied}>
                    Your account qualifies for an upgrade to
                    {" "}
                    <span>{customer.specialGroup}</span>
                    {" "}
status. Please activate your
                    account to enjoy more discount. By clicking "Send Email", you will
                    receive an email guiding you through the process.
                  </div>
                )}
                {!customer.specialGroupVerified ? (
                  <div
                    className={styles.resentBTN}
                    onClick={!send_already ? this.sendEmail : null}
                    style={{
                      background: send_already ? "grey" : "",
                      color: send_already ? "black" : ""
                    }}
                  >
                    Send Me Email
                  </div>
                ) : null}
                {!customer.specialGroupVerified && resend_email_response ? (
                  <div className={styles.resentNote}>{resend_email_response}</div>
                ) : null}
              </div>
            ) : null}
            <SigninInfo />
            <PersonalInfo />
          </Col>
          <Col xs={12} sm={6}>
            <Subscription />
          </Col>
        </Row>
        <AccountInfoSaveAndResetButton />
      </div>
    );
  }
}

export default connect()(AccountInformation);
