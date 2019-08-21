import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import CircleLoader from "../../../../components/masks/CircleLoader";

import {
  changeQty,
  addToCart,
  addToWishList,
  removeWishListItem,
  moveToCart,
  removeRPRPListItem,
  redeemToCart
} from "../../CheckoutActions";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import {
  constructUpdateCartItemData,
  ACTION_FIELD_LIST,
  constructAddToCartData
} from "../../../Analytics/components/GA";

import styles from "./ItemButtons.css";

class ItemButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changingQty: false,
      remove_loading: false,
      localQty: props.productData.qty,
      dif: 0
    };
    this.onChangeQty = _.debounce(this.onChangeQty.bind(this), 200);
    this.handleChangeQtyResponse = this.handleChangeQtyResponse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productData.qty !== this.state.localQty) {
      this.setState({
        localQty: nextProps.productData.qty
      });
    }
  }

  onChangeQty(remove) {
    console.log(
      "--- change qty ---",
      this.props.productData.sku,
      remove,
      this.state.localQty
    );
    const { productData } = this.props;
    const egiftCard = this.props.productData.name
      .replace(/\s+/g, "")
      .toLowerCase()
      .indexOf("e-giftcard") !== -1;
    this.setState({
      changingQty: true,
      remove_loading: !!remove
    });
    const DL_DataProps = {
      display_id: this.props.id ? this.props.id : "",
      simple: this.props.productData,
      qty:
        this.state.dif < 0
          ? -this.state.dif
          : this.state.dif === 0
            ? this.state.localQty
            : this.state.dif,
      DL: {
        list: ACTION_FIELD_LIST.CART_PAGE_ITEMS_LIST,
        position: this.props.pos
      }
    };
    const DL_Data = this.state.dif > 0
      ? constructAddToCartData({}, constructUpdateCartItemData(DL_DataProps))
      : constructUpdateCartItemData(DL_DataProps);
    this.props.dispatch(
      changeQty(
        remove ? 0 : this.state.localQty,
        this.props.productData.sku,
        DL_Data,
        this.handleChangeQtyResponse,
        remove ? -1 * this.state.localQty : this.state.dif,
        remove && egiftCard && productData.eGiftcard
          ? productData.eGiftcard.giftCardOption._id
          : null,
        this.props.productData.final_sale
      )
    ); // changeQty(qty, sku, DL_Data, cb)
  }

  onChangeLocalQty(qtyToAdd) {
    this.setState({
      localQty: this.state.localQty + qtyToAdd < 0 ? 0 : this.state.localQty + qtyToAdd,
      dif: qtyToAdd
    });
    this.onChangeQty();
  }

  handleChangeQtyResponse(err, data) {
    if (!err) {
      if (this.state.remove_loading) {
        this.setState({
          remove_loading: false
        });
      } else {
        this.setState({
          changingQty: false
        });
      }
      console.log("--- change qty success ---", data);
    } else {
      this.setState({
        changingQty: false,
        remove_loading: false
      });
    }
  }

  render() {
    const {
      productData,
      mode,
      // callback,
      authStatus
      // eGiftCard,
      // clearGiftCardId
    } = this.props;

    const egiftCard = productData
      && productData.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .indexOf("e-giftcard") !== -1;
    let addToCart_data = null;
    if (egiftCard && productData.eGiftcard && productData.eGiftcard.giftCardOption) {
      const giftcard = productData.eGiftcard.giftCardOption;
      addToCart_data = {
        sku: productData.sku,
        qty: productData.qty,
        "E-giftCard": true,
        fromName: giftcard.fromName,
        toName: giftcard.toName,
        receiptEmail: giftcard.receiptEmail,
        message: giftcard.message,
        price: productData.price
      };
    } else {
      addToCart_data = {
        sku: productData.sku,
        qty: productData.qty ? productData.qty : 1, // set qty to 1 for redeemed product
        final_sale: productData.final_sale,
        redeem_points: productData.redeem_points ? productData.redeem_points : null
      };
    }
    let giftCardOption = {};

    const DL_DataProps = {
      display_id: this.props.id ? this.props.id : "",
      simple: this.props.productData,
      qty: this.state.localQty,
      DL: {
        list: ACTION_FIELD_LIST.CART_PAGE_ITEMS_LIST,
        position: this.props.pos
      }
    };
    const DL_Data = constructAddToCartData({}, constructUpdateCartItemData(DL_DataProps));

    const DL_DataProps_wl = {
      display_id: this.props.id ? this.props.id : "",
      simple: this.props.productData,
      qty: 1,
      DL: {
        list: ACTION_FIELD_LIST.CART_PAGE_ITEMS_LIST,
        position: this.props.pos
      }
    };
    const DL_Data_wl = constructAddToCartData(
      {},
      constructUpdateCartItemData(DL_DataProps_wl, "wishlist")
    );

    if (egiftCard) {
      giftCardOption = { price: productData.price };
    }
    switch (mode) {
      // for cart
      case "cart_remove":
        return (
          <div
            style={{
              display: "inline",
              marginLeft: "15px",
              marginRight: "5px"
            }}
          >
            <button
              className={styles.goldTextBtn}
              onClick={() => {
                this.onChangeQty("remove");
              }}
            >
              Remove
            </button>
            {this.state.remove_loading ? (
              <span className={styles.loaderContainer} style={{ marginLeft: "5px" }}>
                <CircleLoader />
              </span>
            ) : null}
          </div>
        );

      case "cart_undo":
        return (
          <button
            className={styles.goldTextBtn}
            onClick={() => {
              this.props.dispatch(addToCart(addToCart_data, DL_Data));
            }}
          >
            Undo
          </button>
        );
      case "cart_move_to_wishlist":
        return authStatus ? (
          <div
            style={{
              display: "inline",
              marginLeft: "15px",
              marginRight: "5px"
            }}
          >
            <button
              className={styles.goldTextBtn}
              onClick={() => {
                this.props.dispatch(
                  addToWishList(productData.qty, productData.sku, () => {
                    this.onChangeQty("remove");
                  })
                );
              }}
            >
              Move to wishlist
            </button>
            {this.state.remove_loading ? (
              <span className={styles.loaderContainer} style={{ marginLeft: "5px" }}>
                <CircleLoader />
              </span>
            ) : null}
          </div>
        ) : null;
      // for wishlist
      case "wishlist_remove":
        return authStatus ? (
          <button
            className={styles.goldTextBtn}
            onClick={() => {
              this.props.dispatch(removeWishListItem(productData.sku, 0));
            }}
          >
            Remove
          </button>
        ) : null;
      case "wishlist_undo":
        return authStatus ? (
          <button
            className={styles.goldTextBtn}
            onClick={() => {
              this.props.dispatch(addToWishList(1, productData.sku));
            }}
          >
            Undo
          </button>
        ) : null;
      case "wishlist_move_to_cart":
        return authStatus && productData.stock.in_stock && !egiftCard ? (
          <button
            className={styles.goldTextBtn}
            onClick={() => {
              this.props.dispatch(
                moveToCart(productData.sku, 1, null, DL_Data_wl, giftCardOption)
              );
            }}
          >
            Move to cart
          </button>
        ) : null;
      // for rprplist
      case "rprplist_remove":
        return authStatus ? (
          <button
            className={styles.goldTextBtn}
            onClick={() => {
              this.props.dispatch(removeRPRPListItem(productData.sku, 0));
            }}
          >
            Remove
          </button>
        ) : null;
      case "rprplist_undo":
        // const DL_DataProps = {
        //   display_id: this.props.id ? this.props.id : '',
        //   simple: this.props.productData,
        //   qty: this.state.localQty,
        //   DL: {
        //     list: ACTION_FIELD_LIST.CART_PAGE_ITEMS_LIST,
        //     position: this.props.pos
        //   }
        // };
        // const DL_Data = constructAddToCartData(
        //   {},
        //   constructUpdateCartItemData(DL_DataProps)
        // );
        return (
          <button
            className={styles.goldTextBtn}
            onClick={() => {
              this.props.dispatch(
                redeemToCart({ qty: 1, sku: productData.sku }, null, null)
              );
            }}
          >
            Undo
          </button>
        );
      case "qty_config":
        return (
          <div className={styles.qtyController}>
            {/* minus button */}
            <button
              className={styles.minus}
              onClick={() => {
                this.onChangeLocalQty(-1);
              }}
            >
              <i className="ion-android-remove" />
            </button>
            {/* qty */}
            <span className={styles.qty}>{this.state.localQty}</span>
            {/* add button */}
            <button
              className={styles.add}
              onClick={() => {
                this.onChangeLocalQty(1);
              }}
            >
              <i className="ion-android-add" />
            </button>
            {this.state.changingQty ? (
              <span className={styles.loaderContainer}>
                <CircleLoader />
              </span>
            ) : null}
          </div>
        );
      case "qty_only":
        return (
          <div className={styles.qtyController}>
            {" "}
x
            {this.state.localQty}
          </div>
        );
      default:
        return null;
    }
  }
}

function mapStateToProps(store) {
  return {
    authStatus: getAuthStatus(store)
  };
}

export default connect(mapStateToProps)(ItemButtons);
