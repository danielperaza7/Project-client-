import React, { Component } from "react";
// import Helmet from 'react-helmet';

class BraintreePaypal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountedDOM: null
    };
  }

  componentWillMount() {
    // append mount dom
    const paypalButton = document.createElement("div");
    paypalButton.setAttribute("id", "paypal-button");
    this.props.mount.appendChild(paypalButton);
    this.setState({
      mountedDOM: paypalButton
    });
  }

  componentDidMount() {
    // delete dom element
    const setupProps = {
      form: this.refs.form,
      shippingAddress: this.props.shippingAddress,
      submit: this.refs.submit,
      onAuthorizeCb: this.props.onAuthorizeCb,
      onCancelCb: this.props.onCancelCb,
      onErrorCb: this.props.onErrorCb
    };
    this.props.setup("braintreePaypal", setupProps);
  }

  componentWillUnmount() {
    // remove mounted dom
    if (this.state.mountedDOM !== null) {
      this.props.mount.removeChild(this.state.mountedDOM);
      this.setState({ // do we really need this for Unmount?
        mountedDOM: null
      });
    }
  }

  // <Helmet
  //   script={[
  //     {
  //       src:"https://www.paypalobjects.com/api/checkout.js"
  //     },
  //     {
  //       src:"https://js.braintreegateway.com/web/3.13.0/js/paypal-checkout.min.js"
  //     }
  //   ]}
  // />
  render() {
    return (

      <div className={this.props.hidden ? "hidden" : ""} />
    );
  }
}

export default BraintreePaypal;
