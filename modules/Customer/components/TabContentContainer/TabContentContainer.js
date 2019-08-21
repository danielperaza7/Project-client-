/**
 * Created by warrenchen on 4/8/17.
 */
import React, { Component } from "react";
import AccountInformation from "../AccountInformation/AccountInformation";
import OrderHistory from "../OrderHistory/OrderHistory";
import GiftcardWrapper from "../GiftcardWrapper/GiftcardWrapper";
import RewardPoints from "../RewardPoint/RewardPoint";
import AddressBook from "../AddressBook/AddressBook";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import WishList from "../../../CheckoutV2/components/WishList/WishList";

class TabContentContainer extends Component {
  render() {
    switch (this.props.curTab) {
      case "account_information":
        return <AccountInformation customer={this.props.customer} />;
      case "order_history":
        return <OrderHistory />;
      case "reward_point":
        return <RewardPoints />;
      case "account_balance_gift_card":
        return <GiftcardWrapper customer={this.props.customer} />;
      case "payment_method":
        return <PaymentMethod customer={this.props.customer} />;
      case "addressbook":
        return <AddressBook customer={this.props.customer} />;
      case "wishlist":
        return <WishList />;
      default:
        return <AccountInformation customer={this.props.customer} />;
    }
  }
}

export default TabContentContainer;
