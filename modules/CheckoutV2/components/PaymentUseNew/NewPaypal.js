import React, { Component } from "react";
import { connect } from "react-redux";

import { setPaypalNonce, setPaypalDetail } from "../../CheckoutActions";

import { getBraintreeToken } from "../../CheckoutReducer";
import { getCartShippingAddress } from "../../../App/AppReducer";

import styles from "./PaymentUseNew.css";

// import styles from './PaymentUseNew.css';

// const shippingAddressPaypal = {
//   recipientName: shippingAddress.firstname + ' '+ shippingAddress.lastname,
//   line1: shippingAddress.street&&shippingAddress.street[0] ? shippingAddress.street[0] : '',
//   line2: shippingAddress.street&&shippingAddress.street[1] ? shippingAddress.street[1] : '',
//   city: shippingAddress.city,
//   countryCode: shippingAddress.country_id,
//   postalCode: shippingAddress.postcode,
//   state: shippingAddress.region.region_code,
//   phone: shippingAddress.telephone
// }

class NewPaypal extends Component {
  constructor(props) {
    super(props);
    this.braintreePaypalSetup = this.braintreePaypalSetup.bind(this);
    this.onAuthorizeCb = this.onAuthorizeCb.bind(this);
  }

  // componentWillMount(){
  //   // append mount dom
  //   let paypalButton = document.createElement('div');
  //   paypalButton.setAttribute('id','paypal-button');
  //   this.props.mount.appendChild(paypalButton);
  //   // this.setState({
  //   //   mountedDOM: paypalButton
  //   // })
  // }

  componentDidMount() {
    const { shippingAddress } = this.props;
    const setupProps = {
      onAuthorizeCb: this.onAuthorizeCb,
      onCancelCb: this.onCancelCb,
      onErrorCb: this.onErrorCb,
      shippingAddress: {
        recipientName: shippingAddress
          ? `${shippingAddress.firstname || ""} ${shippingAddress.lastname || ""}`
          : "",
        line1:
          shippingAddress && shippingAddress.street && shippingAddress.street[0]
            ? `${shippingAddress.street[0]}`
            : "",
        line2:
          shippingAddress && shippingAddress.street && shippingAddress.street.length > 1
            ? `${shippingAddress.street[1]}`
            : "",
        city: shippingAddress && shippingAddress.city ? `${shippingAddress.city}` : "",
        countryCode:
          shippingAddress && shippingAddress.country_id
            ? `${shippingAddress.country_id}`
            : "",
        postalCode:
          shippingAddress && shippingAddress.postcode
            ? `${shippingAddress.postcode}`
            : "",
        state:
          shippingAddress && shippingAddress.region_code
            ? `${shippingAddress.region_code}`
            : "",
        phone:
          shippingAddress && shippingAddress.telephone
            ? `${shippingAddress.telephone}`
            : ""
      }
    };
    this.braintreePaypalSetup(setupProps);
  }

  onAuthorizeCb(payload) {
    console.log("=== on Authorize Cb called ===", payload);
    this.props.dispatch(setPaypalNonce(payload.nonce));
    this.props.dispatch(setPaypalDetail(payload));
  }

  onCancelCb(data) {
    console.log("=== on onCancelCb Cb called ===", data);
  }

  onErrorCb(data) {
    console.log("=== on onErrorCb Cb called ===", data);
  }

  braintreePaypalSetup({
    onAuthorizeCb, onCancelCb, onErrorCb, shippingAddress
  }) {
    // check if braintree loaded and if paypal is already mounted
    console.log("braintreePaypalSetup called");
    window.braintree.client.create(
      {
        authorization: this.props.braintreeClientToken
      },
      (clientErr, clientInstance) => {
        if (clientErr) {
          // Handle error in client creation
          console.error("Error creating client:", clientErr);
          return;
        }
        // 2. =====  start of Braintree Paypal =====
        // Create a PayPal Checkout component.
        window.braintree.paypalCheckout.create(
          {
            client: clientInstance
          },
          (paypalCheckoutErr, paypalCheckoutInstance) => {
            // Stop if there was a problem creating PayPal Checkout.
            // This could happen if there was a network error or if it's incorrectly
            // configured.
            if (paypalCheckoutErr) {
              console.error("Error creating PayPal Checkout:", paypalCheckoutErr);
              return;
            }
            // Set up PayPal with the checkout.js library
            window.paypal.Button.render(
              {
                env: "production", // or 'sandbox' 'production'
                payment: () => {
                  return paypalCheckoutInstance.createPayment({
                    flow: "vault", // Required checkout or vault
                    // billingAgreementDescription: 'Your agreement description',
                    enableShippingAddress: true,
                    shippingAddressEditable: false,
                    shippingAddressOverride: shippingAddress
                  });
                },

                onAuthorize: (data, actions) => {
                  console.log("onAuthorize called", actions);
                  return paypalCheckoutInstance
                    .tokenizePayment(data)
                    .then((payload) => {
                      onAuthorizeCb(payload);
                    });
                },

                onCancel: onCancelCb,

                onError: onErrorCb
              },
              "#paypal-button"
            ).then(() => {
              // The PayPal button will be rendered in an html element with the id
              // `paypal-button`. This function will be called when the PayPal button
              // is set up and ready to be used.
            });
          }
        );
        // =====  end of Braintree Paypal =====
      }
    ); // ===== end of braintree.client.create ===
  }

  render() {
    return (
      <div
        id="paypal-button"
        ref={(ele) => {
          this["paypal-button"] = ele;
        }}
        style={this.props.hidden ? { display: "none" } : {}}
        className={`${styles.innerSections} ${styles.paypalSection}`}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    braintreeClientToken: getBraintreeToken(store),
    shippingAddress: getCartShippingAddress(store)
  };
}

export default connect(mapStateToProps)(NewPaypal);
