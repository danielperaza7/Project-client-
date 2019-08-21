import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import _ from "lodash";

// import local components
import Styles from "./braintree.css";
import BraintreeNewCreditCard from "./braintreeNewCreditCard";
import BraintreeSavedList from "./braintreeSavedList";
import BraintreePaypal from "./braintreePaypal";
import Radiobox from "../../../../components/FieldFormControlRadiobox";

// import actions
import { fetchBraintreeToken } from "../../CheckoutActions";

class BrainTree extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      braintreeClientToken: null,
      savedMounted: null,
      creditCardMounted: null,
      paypalMounted: null
    });
    this.clientTokenFetched = this.clientTokenFetched.bind(this);
    this.braintreeCreditCardSetup = this.braintreeCreditCardSetup.bind(this);
    this.braintreePaypalSetup = this.braintreePaypalSetup.bind(this);
    this.trySetupPayment = this.trySetupPayment.bind(this);
  }

  componentDidMount() {
    //  do some braintree initialization
    // Get client braintree token
    this.props.dispatch(fetchBraintreeToken(this.clientTokenFetched));
  }

  componentWillReceiveProps(nextProps) {
    // should let use setup success callback to set mounted, not in following way
    switch (nextProps.parentState.payment_method) {
      case "braintree_saved":
        if (this.state.savedMounted === null) {
          this.setState({
            savedMounted: true
          });
        }
        break;
      case "braintree_credit_card":
        if (this.state.creditCardMounted === null) {
          // this.setState({
          //   creditCardMounted: true
          // })
        }
        break;
      case "braintree_paypal_account":
        if (this.state.paypalMounted === null) {
          // this.setState({
          //   paypalMounted: true
          // })
        }
        break;
    }
  }

  trySetupPayment(id, props) {
    // trySetupPayment called
    console.log("trySetupPayment called");
    let count = 0;
    switch (id) {
      case "braintreeNewCreditCard":
        if (!this.state.creditCardMounted) {
          count = 0;
          const tryBrainTreeCreditCard = window.setInterval(() => {
            count++;
            console.log("tryBrainTreeCreditCard ", count);
            if (window.braintree && window.braintree.client && this.state.braintreeClientToken) {
              this.braintreeCreditCardSetup(props);
              this.setState({
                creditCardMounted: true
              });
              clearInterval(tryBrainTreeCreditCard);
            }
            if (count > 100) { clearInterval(tryBrainTreeCreditCard); }
          }, 100);
        }
        break;
      case "braintreePaypal":
        count = 0;
        if (!this.state.paypalMounted) {
          const tryBrainTreePaypal = window.setInterval(() => {
            count++;
            console.log("tryBrainTreePaypal ", count);
            if (window.braintree && window.braintree.client && this.state.braintreeClientToken) {
              this.braintreePaypalSetup(props);
              this.setState({
                paypalMounted: true
              });
              clearInterval(tryBrainTreePaypal);
            }
            if (count > 100) { clearInterval(tryBrainTreePaypal); }
          }, 100);
        }
        break;
      default:
    }
  }

  braintreeCreditCardSetup({ form, submit, cb }) {
    console.log("braintreeCreditCardSetup called");
    const authorization = this.state.braintreeClientToken;
    window.braintree.client.create({
      authorization
    }, (clientErr, clientInstance) => {
      if (clientErr) {
        // Handle error in client creation
        console.error("Error creating client:", clientErr);
        return;
      }
      // 1. =====  start of Braintree Credit Card =====
      window.braintree.hostedFields.create({
        client: clientInstance,
        styles: { // styling: https://developers.braintreepayments.com/guides/hosted-fields/styling/javascript/v3
          input: {
            "font-size": "14px"
          },
          "input.invalid": {
            color: "red"
          },
          "input.valid": {
            color: "green"
          }
        },
        fields: {
          number: {
            selector: "#card-number",
            // placeholder: '4111 1111 1111 1111'
            placeholder: "Credit Card Number"
          },
          cvv: {
            selector: "#cvv",
            placeholder: "CVV"
            // placeholder: '123'
          },
          expirationDate: {
            selector: "#expiration-date",
            // placeholder: '10/2019'
            placeholder: "MM/YYYY"
          }
        }
      }, (hostedFieldsErr, hostedFieldsInstance) => {
        if (hostedFieldsErr) {
          // Handle error in Hosted Fields creation
          console.log("Handle error in Hosted Fields creation");
          return;
        }

        // save hostedFieldsInstance in this checkout state
        cb(hostedFieldsInstance);
      });
      //= ====  end of Braintree Credit Card =====
    }); // ===== end of braintree.client.create ===
  }

  braintreePaypalSetup({
    form, submit, onAuthorizeCb, onCancelCb, onErrorCb, shippingAddress
  }) {
    console.log("braintreePaypalSetup called");
    const authorization = this.state.braintreeClientToken;
    window.braintree.client.create({
      authorization
    }, (clientErr, clientInstance) => {
      if (clientErr) {
        // Handle error in client creation
        console.error("Error creating client:", clientErr);
        return;
      }
      // 2. =====  start of Braintree Paypal =====
      // Create a PayPal Checkout component.
      window.braintree.paypalCheckout.create({
        client: clientInstance
      }, (paypalCheckoutErr, paypalCheckoutInstance) => {
        // Stop if there was a problem creating PayPal Checkout.
        // This could happen if there was a network error or if it's incorrectly
        // configured.
        if (paypalCheckoutErr) {
          console.error("Error creating PayPal Checkout:", paypalCheckoutErr);
          return;
        }

        // Set up PayPal with the checkout.js library
        paypal.Button.render({
          env: "production", // or 'sandbox'

          payment() {
            return paypalCheckoutInstance.createPayment({
              flow: "vault", // Required checkout or vault
              // billingAgreementDescription: 'Your agreement description',
              enableShippingAddress: true,
              shippingAddressEditable: false,
              shippingAddressOverride: {
                recipientName: `${shippingAddress.firstname} ${shippingAddress.lastname}`,
                line1: shippingAddress.street && shippingAddress.street[0] ? shippingAddress.street[0] : "",
                line2: shippingAddress.street && shippingAddress.street[1] ? shippingAddress.street[1] : "",
                city: shippingAddress.city,
                countryCode: shippingAddress.country_id,
                postalCode: shippingAddress.postcode,
                state: shippingAddress.region.region_code,
                phone: shippingAddress.telephone
              }
            });
          },

          onAuthorize(data, actions) {
            console.log("onAuthorize called");
            return paypalCheckoutInstance.tokenizePayment(data)
              .then(
                (payload) => { onAuthorizeCb(payload); }
              );
          },

          onCancel: onCancelCb,

          onError: onErrorCb
        }, "#paypal-button").then(() => {
          // The PayPal button will be rendered in an html element with the id
          // `paypal-button`. This function will be called when the PayPal button
          // is set up and ready to be used.
        });
      });
      //= ====  end of Braintree Paypal =====
    }); // ===== end of braintree.client.create ===
  }

  clientTokenFetched(token) {
    this.setState({
      braintreeClientToken: token
    });
  }

  render() {
    // do we have a better solution to load  braintree's 3rd party script ????
    const paymentList = ["braintree_saved", "braintree_credit_card", "braintree_paypal_account"];
    const useSaved = (paymentList[0] === this.props.parentState.payment_method && this.props.authenticated); // the saved methods are alreay filtered by backend, no need to check if they are available
    const useNew = (paymentList[1] === this.props.parentState.payment_method && _.findIndex(this.props.paymentMethodsAvailable, { code: paymentList[1] }) > -1);
    const usePaypal = (paymentList[2] === this.props.parentState.payment_method && _.findIndex(this.props.paymentMethodsAvailable, { code: paymentList[2] }) > -1);

    return (
      <div>
        { this.props.authenticated && this.props.savedPaymentList && (this.props.savedPaymentList.braintree_credit_card && this.props.savedPaymentList.braintree_credit_card.length > 0 || this.props.savedPaymentList.braintree_paypal_account && this.props.savedPaymentList.braintree_paypal_account.length > 0)
          ? (
            <Radiobox
              name="payment_method"
              id="payment_method_braintree_saved"
              value="braintree_saved"
              title="Pay with saved payments"
              checked={useSaved}
              onChange={this.props.handlePaymentMethodSelect}
            />
          )

          : null}
        <div className={Styles["option-content"]}>
          { (useSaved || this.state.savedMounted === true) ? <BraintreeSavedList hidden={!useSaved} list={this.props.savedPaymentList} selectedSavedToken={this.props.parentState.token_braintree_saved_selected} handleSavedMethodSelect={this.props.handleSavedMethodSelect} /> : "" }
        </div>
        <Radiobox
          name="payment_method"
          id="payment_method_braintree_credit_card"
          value="braintree_credit_card"
          title="Pay with Credit Card"
          checked={useNew}
          onChange={this.props.handlePaymentMethodSelect}
        />
        <div className={Styles["option-content"]}>
          { (useNew || this.state.creditCardMounted === true) ? <BraintreeNewCreditCard authenticated={this.props.authenticated} hidden={!useNew} saveHostedFieldsInstance={this.props.saveHostedFieldsInstance} setup={this.trySetupPayment} savePayment={this.props.parentState.save_new_payment} onToggleSaveNewPayment={this.props.onToggleSaveNewPayment} /> : "" }
        </div>
        <Radiobox
          name="payment_method"
          id="payment_method_braintree_paypal_account"
          value="braintree_paypal_account"
          title="Pay with Paypal"
          checked={usePaypal}
          onChange={this.props.handlePaymentMethodSelect}
        />
        <div className={Styles["option-content"]}>
          { (usePaypal || this.state.paypalMounted === true) ? (
            <BraintreePaypal
              shippingAddress={this.props.shippingAddress}
              hidden={!usePaypal}
              mount={this.props.paypalMount}
              setup={this.trySetupPayment}
              onAuthorizeCb={this.props.handleBraintreePaypalOnAuthorize}
              onCancelCb={this.props.handleBraintreePaypalOnCancel}
              onErrorCb={this.props.handleBraintreePaypalOnError}
            />
          ) : "" }
        </div>
      </div>
    );
  }
}

export default connect()(BrainTree);
