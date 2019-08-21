import React, { Component } from "react";
import { connect, batch } from "react-redux";

import PanelSectionDivider from "../PanelSectionDivider/PanelSectionDivider";
import PaymentCardList from "../PaymentCardList/PaymentCardList";
import PaymentUseNew from "../PaymentUseNew/PaymentUseNew";
import BillingAddress from "../BillingAddress/BillingAddress";
// import RewardPoints from "../RewardPointsAccountBalance/RewardPoints";
import AccountBalance from "../RewardPointsAccountBalance/AccountBalance";
import GiftcardWrapper from "../RewardPointsAccountBalance/GiftcardWrapper";
import CustomModal from "../../../../components/Modal/CustomModal";

import {
  fetchBraintreeToken,
  setCreditCardNonce,
  setCreditCardDetail,
  nextCheckoutStep
} from "../../CheckoutActions";
import {
  getBraintreeCardInstance,
  getPaymentMethod,
  getPaymentMethodDetailSaved,
  getPaymentMethodDetailCreditCard,
  getPaymentMethodDetailPaypal,
  getBraintreeToken,
  getbillingFormStatus,
  getBillNew
} from "../../CheckoutReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { getCartBillingAddress, getUserPayments } from "../../../App/AppReducer";
import { onCheckoutOption } from "../../../Analytics/components/GA";

import styles from "./PanelPayment.css";

class PanelPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
    this.testConfirmPayment = this.testConfirmPayment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.editing && nextProps.editing && !this.props.braintreeClientToken) {
      this.props.dispatch(fetchBraintreeToken());
    }
    if (!this.props.editing && nextProps.editing && nextProps.retryPayment) {
      this.testConfirmPayment();
    }
  }

  testConfirmPayment() {
    batch(() => {
      console.log("--- test confirm payment called ---");
      const {
        paymentMethod,
        cartBillingAddress,
        paymentDetailPP,
        paymentDetailSaved,
        braintreeCreateCardInstanceFields
      } = this.props;
      const checkoutOption = {
        actionField: { step: 4, option: "braintree_saved" }
      };
      const checkoutOption2 = {
        actionField: { step: 4, option: "braintree_paypal_account" }
      };

      if (!cartBillingAddress) {
        this.setState({
          errorMessage: "Please complete the billing information"
        });
        return;
      }
      switch (paymentMethod) {
        case "braintree_saved":
          if (!paymentDetailSaved) {
            this.setState({
              errorMessage: "Please complete the payment information"
            });
            return;
          }
          onCheckoutOption(checkoutOption);
          this.props.dispatch(nextCheckoutStep());
          break;
        case "braintree_credit_card":
          braintreeCreateCardInstanceFields.tokenize((err, payload) => {
            if (err) {
              this.setState({
                errorMessage: "Please complete the payment information"
              });
              return;
            }
            const checkoutOption1 = {
              actionField: { step: 4, option: "braintree_credit_card" }
            };
            onCheckoutOption(checkoutOption1);
            this.props.dispatch(setCreditCardNonce(payload.nonce));
            this.props.dispatch(setCreditCardDetail(payload));
            this.props.dispatch(nextCheckoutStep());
          });
          break;
        case "braintree_paypal_account":
          if (!paymentDetailPP) {
            this.setState({
              errorMessage: "Please complete the payment information"
            });
            return;
          }
          onCheckoutOption(checkoutOption2);
          this.props.dispatch(nextCheckoutStep());
          break;
        default:
          console.log("---not valid payment method---");
          this.setState({
            errorMessage: "Please select a valid payment method."
          });
      }
    });
  }

  renderAddress(cartBillingAddress) {
    if (cartBillingAddress) {
      const {
        firstname,
        lastname,
        region_code,
        street,
        city,
        telephone,
        country_id
      } = cartBillingAddress;
      return (
        <div className={styles.billingSummary}>
          <div>
            {firstname}
            {" "}
            {lastname}
          </div>
          <div>
            {`${street ? street.toString() : ""} ${city || ""} ${region_code
            || ""} ${country_id || ""}`}
          </div>
          <div>{telephone}</div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      editing,
      showSummary,
      braintreeClientToken,
      paymentMethod,
      authStatus,
      paymentDetailSaved,
      paymentDetailCC,
      paymentDetailPP,
      cartBillingAddress,
      billingFormStatus,
      billNew,
      paymentList
    } = this.props;
    const paymentDetails = {
      braintree_saved:
        paymentDetailSaved && paymentDetailSaved.cardType
          ? `${paymentDetailSaved.cardType} ending in ${paymentDetailSaved.last4}`
          : `Paypal account ${paymentDetailSaved ? paymentDetailSaved.payerEmail : ""}`,
      braintree_credit_card:
        paymentDetailCC && paymentDetailCC.details
          ? `${paymentDetailCC.details.cardType} ending in ${
            paymentDetailCC.details.lastFour
          }`
          : "",
      braintree_paypal_account:
        paymentDetailPP && paymentDetailPP.details
          ? paymentDetailPP.details.description
          : "" // need to test
    };
    const modalProps = {
      size: "medium",
      showModal: this.state.errorMessage,
      onHide: () => {
        this.setState({ errorMessage: "" });
      },
      padding: "20px"
    };
    const payment_saved = authStatus && paymentList.length !== 0 && !!paymentList[0].details;
    return (
      <div>
        <CustomModal {...modalProps}>{this.state.errorMessage}</CustomModal>
        <div className={!editing ? "hidden" : ""}>
          <h3 className={styles.innerTitle}>Payment Method</h3>
          {authStatus && payment_saved ? <PaymentCardList /> : null}
          {braintreeClientToken ? (
            <PaymentUseNew authStatus={authStatus} collapse={payment_saved} />
          ) : null}
          <PanelSectionDivider />
          <BillingAddress authStatus={authStatus} editing={editing} />
          <PanelSectionDivider />
          {/* RewardPoints will no longer be used as cash after redeem program release
          <RewardPoints authStatus={authStatus} />
        */}
          <GiftcardWrapper authStatus={authStatus} />
          <AccountBalance authStatus={authStatus} />
          <div className={billNew && !billingFormStatus ? " hidden" : ""}>
            <button onClick={this.testConfirmPayment} className={styles.paymentPanelBTN}>
              {" "}
              USE THIS PAYMENT METHOD
              {" "}
            </button>
          </div>
        </div>
        <div
          className={!showSummary ? "hidden" : ""}
          style={{ marginLeft: "20px", fontSize: "12px" }}
        >
          <div>
            {/* <img src="" alt="[paymentlogo]" /> */}
            <span>
              <strong>Payment: </strong>
              {paymentDetails[paymentMethod]}
              {" "}
            </span>
          </div>
          <div>
            <span>
              <strong>Billing address: </strong>
              {this.renderAddress(cartBillingAddress)}
              {" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    braintreeClientToken: getBraintreeToken(store),
    paymentMethod: getPaymentMethod(store),
    braintreeCreateCardInstanceFields: getBraintreeCardInstance(store),
    authStatus: getAuthStatus(store),
    paymentDetailSaved: getPaymentMethodDetailSaved(store),
    paymentDetailCC: getPaymentMethodDetailCreditCard(store),
    paymentDetailPP: getPaymentMethodDetailPaypal(store),
    cartBillingAddress: getCartBillingAddress(store),
    billingFormStatus: getbillingFormStatus(store),
    billNew: getBillNew(store),
    paymentList: getUserPayments(store)
  };
}

export default connect(mapStateToProps)(PanelPayment);
