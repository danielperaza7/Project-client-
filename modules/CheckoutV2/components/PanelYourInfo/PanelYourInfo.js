import React, { Component } from "react";
import { connect } from "react-redux";

import YourInformationForm from "../YourInformationForm/YourInformationForm";

import { getLoadingCart, getOrderEmail, getOrderPhone } from "../../CheckoutReducer";
// import { getOrderEmail } from '../../../App/FormReducer';

class PanelYourInfo extends Component {
  render() {
    const {
      loadingCart,
      editing,
      showSummary,
      orderEmail,
      orderPhone,
      method
    } = this.props;
    let notify_method = null;
    if (loadingCart) return <div>loading cart</div>;
    if (method && method.length > 0) {
      notify_method = method.includes("email") ? "email" : "phone";
    }
    return (
      <div>
        <div className={editing ? "" : "hidden"}>
          <YourInformationForm />
        </div>
        <div
          className={showSummary ? "" : "hidden"}
          style={{ marginLeft: "20px", fontSize: "12px" }}
        >
          {!notify_method || notify_method === "email" ? orderEmail : orderPhone}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    loadingCart: getLoadingCart(store),
    orderEmail: getOrderEmail(store),
    orderPhone: getOrderPhone(store)
  };
}

export default connect(mapStateToProps)(PanelYourInfo);
