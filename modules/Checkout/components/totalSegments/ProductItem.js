/**
 * Created by warrenchen on 4/21/17.
 */
import React from "react";
import { Media } from "react-bootstrap";
import { connect } from "react-redux";
import { ITEM_QTY_MAX } from "../../../../config/config";

import { changeCartItem } from "../../CheckoutActions";

import styles from "./ProductItem.css";
import FinalSale from "../../../Category/components/FinalSale/FinalSale";

class ProductItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, };
    this.changeCartItem = _.debounce(this.changeCartItem, 500);
    this.handlePopover = this.handlePopover.bind(this);
    this.closeFinalSale = this.closeFinalSale.bind(this);
  }

  handlePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  closeFinalSale() {
    this.setState({ isOpen: false });
  }

  renderAttr() {
    return (
      <div>
        <div>
          Color:
          {" "}
          { this.props.attr && this.props.attr.color && this.props.attr.color[0] ? this.props.attr.color[0].name : null }
        </div>
        <div>
          Size:
          {" "}
          { this.props.attr && this.props.attr.size && this.props.attr.size[0] ? this.props.attr.size[0].name : null }
        </div>
      </div>
    );
  }

  changeCartItem(qty, sku) {
    this.props.dispatch(changeCartItem(qty, sku));
  }

  renderQty() {
    const { qty, stock } = this.props;
    return (
      <div>
        <span>
Qty:
          { qty }
        </span>
      </div>
    );
  }

  renderQtyButtons() {
    const { qty, stock, sku } = this.props;
    return (
      <div className={styles.qtyButtonWrapper}>
        { stock.in_stock && stock.qty > 0
          ? (qty > stock.qty
            ? (
              <span
                className={styles.qtyButton}
                onClick={() => { this.changeCartItem(stock.qty, sku); }}
              >
                <i className="ion-minus-circled" />
              </span>
            ) : null)
          : (
            <span
              className={styles.qtyButton}
              onClick={() => { this.changeCartItem(0, sku); }}
            >
remove
            </span>
          )}
      </div>
    );
  }

  renderItemStock() {
    const { stock, sku } = this.props;
    if (stock.in_stock && stock.qty > 0) {
      return (
        <div>
          <div className={styles["low-qty-msg"]}>
            {stock.qty <= ITEM_QTY_MAX ? `Only ${stock.qty} left` : null}
          </div>
          <div>
            {stock.qty <= ITEM_QTY_MAX ? null : "In stock"}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={styles["low-qty-msg"]}>
          <span>out of stock</span>
        </div>
      </div>
    );
  }

  renderFinalSale() {
    return (
      <div className={styles.finalSale}>
        <a
          className="button"
          onClick={() => this.handlePopover()}
        >
          <span className={styles.fsSpan}>FINAL SALE</span>
          <i className="ion-help-circled" />
        </a>
      </div>
    );
  }

  render() {
    const order_item_name = this.props.images && this.props.images.main && this.props.images.main.title ? this.props.images.main.title : null;
    const finalSale_props = {
      isOpen: this.state.isOpen,
      closeFinalSale: this.closeFinalSale,
      handlePopover: this.handlePopover,
      final_sale: this.props.final_sale,
      no_popover: true,
    };

    return (
      <div className={styles["order-item-wrapper"]}>
        <Media>
          <Media.Left align="top">
            <img src={this.props.images.main.images.sm.url} alt={order_item_name} title={order_item_name} />
          </Media.Left>
          <Media.Body>
            <div className={styles["current-price"]}>
$
              {this.props.price.current}
            </div>
            <div className={styles["prod-name"]}>{this.props.name}</div>
            <div>
Item:
              {this.props.sku}
            </div>
            { this.renderAttr() }
            { this.renderQty() }
            { this.renderItemStock() }
            {!this.props.final_sale ? null : this.renderFinalSale()}
          </Media.Body>
        </Media>
        {!this.props.final_sale ? null : <FinalSale {...finalSale_props} />}
      </div>
    );
  }
}


export default connect()(ProductItem);
