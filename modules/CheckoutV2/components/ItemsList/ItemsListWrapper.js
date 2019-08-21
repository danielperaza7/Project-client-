import React, { Component } from "react";
import { connect } from "react-redux";

import ItemsList from "./ItemsList";

// getters
import { getProductList } from "../../CheckoutReducer";
import { getProductNum } from "../../../App/AppReducer";

class ItemsListWrapper extends Component {
  render() {
    const {
      productList, noButtons, mode, atCheckoutPage
    } = this.props;
    console.log("ItemsListWrapper productList", productList);
    return (
      <div>
        <ItemsList
          productList={productList}
          noButtons={noButtons}
          mode={mode}
          productNum={this.props.productNum}
          atCheckoutPage={atCheckoutPage}
        />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    productList: getProductList(store),
    productNum: getProductNum(store)
  };
}

export default connect(mapStateToProps)(ItemsListWrapper);
