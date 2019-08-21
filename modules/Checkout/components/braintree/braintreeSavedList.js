import React, { Component } from "react";
import { Radio } from "react-bootstrap";

class BraintreeSavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selectedSavedToken = this.props.selectedSavedToken;

    // if no data, early return
    if (!this.props.list || (!this.props.list.braintree_credit_card && !this.props.list.braintree_paypal_account)) {
      return <div>no saved payment</div>;
    }
    let creditCardList = null;
    if (this.props.list.braintree_credit_card) {
      creditCardList = this.props.list.braintree_credit_card.map((payment) => {
        const expireModule = payment.is_expired ? (
          <span>
            {" "}
Expired:
            {payment.expirationDate}
          </span>
        ) : (
          <span>
Expire in:
            {payment.expirationDate}
          </span>
        );
        return (
          <div key={payment.token}>
            <Radio disabled={payment.is_expired} name="saved_payment" value={payment.token} checked={payment.token === selectedSavedToken} onChange={this.props.handleSavedMethodSelect}>
              <div>
                <img src={payment.imageUrl} />
                <span>
                  {" "}
xxxx - xxxx - xxxx -
                  { payment.last4 }
                </span>
              </div>
              <div>
                { expireModule }
              </div>
            </Radio>
          </div>
        );
      });
    }
    let payPalList = null;
    if (this.props.list.braintree_paypal_account) {
      payPalList = this.props.list.braintree_paypal_account.map((payment) => {
        return (
          <div key={payment.token}>
            <Radio name="saved_payment" value={payment.token} checked={payment.token === selectedSavedToken} onChange={this.props.handleSavedMethodSelect}>
              <img src={payment.imageUrl} />
              { `${payment.payerFirstName} ${payment.payerLastName}`}
            </Radio>
          </div>
        );
      });
    }

    return (
      <div className={this.props.hidden ? "hidden" : ""}>
        { creditCardList }
        { payPalList }
      </div>
    );
  }
}

export default BraintreeSavedList;
