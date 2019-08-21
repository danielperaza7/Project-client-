/**
 * Created by warrenchen on 4/19/17.
 */
import React, { Component } from "react";

// import components
import ProductItem from "./ProductItem";

class CheckoutOrderItem extends Component {
  render() {
    return (
      <div>
        { /* we should use sku as key, but somehow I found there can be items have same sku, before found out what's the problem, use index instead */ }
        {this.props.productList.items.map((item, index) => <ProductItem key={index /* item.sku */} {...item} />)}
      </div>
    );
  }
}

export default CheckoutOrderItem;
