import React, { Component } from "react";
import { Form, Col, FormGroup } from "react-bootstrap";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import AccountInfoSubscriptionCheckboxField from "../../../../components/AccountInfoSubscriptionCheckboxField";
import { unsubscribeNewsletter, postNewsLetter } from "../../CustomerActions";
import { getSubscriptionInfo } from "../../CustomerReducer";
import CustomModal from "../../../../components/Modal/CustomModal";
// import style
import styles from "./AccountInformation.css";

class Subscription extends Component {
  constructor() {
    super();
    this.state = {
      modal_for_response: false,
      modal_content: ""
    };
  }

  handleSubmitResponse = (response, msg) => {
    this.setState({ modal_for_response: true, modal_content: msg });
  };

  closeResponse = () => {
    this.setState({ modal_for_response: false });
  };

  handleFormSubmit = (event) => {
    if (event.target.checked) {
      this.props.dispatch(
        postNewsLetter(this.props.SubscriptionInfo.email, this.handleSubmitResponse)
      );
    } else {
      this.props.dispatch(unsubscribeNewsletter(this.handleSubmitResponse));
    }
  };

  render() {
    const modalProps = {
      size: "small",
      showModal: this.state.modal_for_response,
      onHide: this.closeResponse
    };
    return (
      <div className={styles.subscription}>
        <Form horizontal>
          <div className={styles["subscription-title"]}>SUBSCRIPTION</div>

          <FormGroup controlId="formHorizontalEmailList">
            <Col sm={12}>
              <Field
                name="evesEmailList"
                type="checkbox"
                component={AccountInfoSubscriptionCheckboxField}
                fieldName="EVE's Email list"
                onChange={this.handleFormSubmit}
              />
            </Col>
          </FormGroup>
        </Form>
        <CustomModal {...modalProps}>
          <div style={{ padding: "20px 20px" }}>{this.state.modal_content}</div>
        </CustomModal>
      </div>
    );
  }
}

Subscription = reduxForm({
  form: "AccountInfo"
})(Subscription);

// const selector = formValueSelector('AccountInfo');

function mapStateToProps(store) {
  return {
    SubscriptionInfo: getSubscriptionInfo(store)
    // initialValues: { evesEmailList: selector(store, 'evesEmailList') },
  };
}

export default connect(mapStateToProps)(Subscription);
