import React, { Component } from "react";
import { connect } from "react-redux";

import PaymentCard from "../PaymentCard/PaymentCard";

import {
  setPaymentMethod,
  setTokenBraintreeSavedSelected,
  setPaymentSavedDetail
} from "../../CheckoutActions";

import { getPaymentMethod } from "../../CheckoutReducer";
import { getUserPayments } from "../../../App/AppReducer";

import styles from "./PaymentCardList.css";

class PaymentCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMore: false
    };
    this.toggleSeeMore = this.toggleSeeMore.bind(this);
  }

  componentDidMount() {
    if (this.props.paymentMethod === null) {
      if (!this.props.paymentList || this.props.paymentList.length === 0) {
        // this.props.dispatch(setPaymentMethod('braintree_credit_card')); // no default payment method if no saved payments
      } else {
        this.props.dispatch(setPaymentMethod("braintree_saved"));
        this.props.dispatch(
          setTokenBraintreeSavedSelected(
            JSON.parse(this.props.paymentList[0].details).token
          )
        );
        this.props.dispatch(
          setPaymentSavedDetail(JSON.parse(this.props.paymentList[0].details))
        );
      }
    }
  }

  toggleSeeMore() {
    console.log("----- on click see more -----");
    this.setState({
      seeMore: !this.state.seeMore
    });
  }

  render() {
    const { paymentList } = this.props;
    if (!paymentList || paymentList.length === 0) {
      return null;
    }

    return (
      <div className={styles.listWrapper}>
        {paymentList.map((ele, index) => {
          return <PaymentCard key={index} payment={ele} />;
        })}
        {/* <PaymentCard payment={{ type: 'seeMore' }} seeMoreCallback={this.toggleSeeMore} /> */}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    paymentList: getUserPayments(store),
    paymentMethod: getPaymentMethod(store)
  };
}

export default connect(mapStateToProps)(PaymentCardList);
