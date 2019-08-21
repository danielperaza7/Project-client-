import React, { Component } from "react";
import { connect } from "react-redux";
import WishListObject from "./WishListObject";
import styles from "../ItemDetail/ItemDetail.css";
import { getWishListInfo } from "../../CheckoutReducer";
import { getWishList } from "../../CheckoutActions";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: null
    };
  }

  componentWillMount() {
    this.props.dispatch(getWishList(false));
    this.setState({ productList: this.props.WishListInfo });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.WishListInfo != this.state.productList) {
      this.setState({ productList: nextProps.WishListInfo });
    }
  }

  render() {
    console.log("productList", this.state.productList);
    if (this.state.productList) {
      return (
        <div>
          <div className={styles.WishList}> WishList </div>
          {this.state.productList.wishList_product_list.items.map(item => <WishListObject key={item.item_id} {...item} />)}
        </div>
      );
    }

    return (<div>...Loading</div>);
  }
}

function mapStateToProps(store) {
  return {
    WishListInfo: getWishListInfo(store),
  };
}

export default connect(mapStateToProps)(WishList);
