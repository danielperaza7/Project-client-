import React, { Component } from "react";
import { connect } from "react-redux";
import { getWishListInfo } from "../../CheckoutReducer";
import { getWishList } from "../../CheckoutActions";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import ItemsList from "../ItemsList/ItemsList";

class WishList extends Component {
  componentDidMount() {
    const { authStatus } = this.props;
    if (authStatus) {
      this.props.dispatch(getWishList(1));
    }
  }

  render() {
    const { WishListInfo, authStatus } = this.props;
    console.log("--------WishListInfo.items --------", WishListInfo);
    if (authStatus && WishListInfo && WishListInfo.items) {
      return <ItemsList productList={WishListInfo.items} mode="wishlist" />;
    }
    return <ItemsList productList={[]} mode="wishlist" />;
  }
}

function mapStateToProps(store) {
  return {
    WishListInfo: getWishListInfo(store),
    authStatus: getAuthStatus(store)
  };
}

export default connect(mapStateToProps)(WishList);
