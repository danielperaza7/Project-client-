import React from "react";
import {
  Row, Col, Media, ButtonToolbar, Button
} from "react-bootstrap";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router";

// import components
import CircleLoader from "../../../../components/masks/CircleLoader";
// import style
import styles from "./ItemDetail.css";

// import actions
import { changeCartItem } from "../../CheckoutActions";
import { constructUpdateCartItemData, ACTION_FIELD_LIST } from "../../../Analytics/components/GA";

// import Constants
import { ITEM_QTY_MAX } from "../../../../config/config";
import FinalSale from "../../../Category/components/FinalSale/FinalSale";

class ItemDetailObject extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shadow: false,
      qty: null,
      qtyChanged: 0,
      waitForResponse: false,
      isOpen: false,
    };
    this.addItemQty = this.addItemQty.bind(this);
    this.deleteItemQty = this.deleteItemQty.bind(this);
    this.changeCartItem = _.debounce(this.changeCartItem, 500);
    this.handlePopover = this.handlePopover.bind(this);
    this.closeFinalSale = this.closeFinalSale.bind(this);
  }

  componentWillMount() {
    this.setState({ qty: this.props.qty });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.qty !== this.props.qty) {
      this.setState({
        qty: nextProps.qty,
        qtyChanged: 0,
        waitForResponse: false
      });
    }
  }

  changeCartItem(qty, sku, removeButton) {
    if (removeButton) this.setState({ qtyChanged: qty - this.state.qty });
    this.setState({ waitForResponse: true });
    const DL_DataProps = {
      display_id: this.props.display_id ? this.props.display_id : "",
      simple: this.props,
      qty: this.state.qtyChanged < 0 ? -this.state.qtyChanged : this.state.qtyChanged,
      DL: { list: ACTION_FIELD_LIST.CART_PAGE_ITEMS_LIST, position: this.props.position }
    };
    // console.log('DL_DataProps', DL_DataProps)
    const DL_Data = constructUpdateCartItemData(DL_DataProps);
    // console.log('DL_Data',DL_Data)
    console.log("qtyChanged", this.state.qtyChanged);
    this.props.dispatch(changeCartItem(qty, sku, DL_Data, this.state.qtyChanged, "USD"));
  }

  addItemQty(sku) {
    let newQty = this.state.qty + 1;
    if (newQty <= ITEM_QTY_MAX && newQty <= this.props.stock.qty) {
      this.setState({ qty: newQty, qtyChanged: this.state.qtyChanged + newQty - this.state.qty }, () => {
        this.changeCartItem(this.state.qty, sku, false);
      });
    } else if (this.state.qty > ITEM_QTY_MAX || this.state.qty > this.props.stock.qty) {
      newQty = (this.state.qty > this.props.stock.qty ? this.props.stock.qty : this.state.qty);
      newQty = (newQty > ITEM_QTY_MAX ? ITEM_QTY_MAX : newQty);
      this.setState({ qty: newQty, qtyChanged: this.state.qtyChanged + newQty - this.state.qty }, () => {
        this.changeCartItem(this.state.qty, sku, false);
      });
    }
  }

  deleteItemQty(sku) {
    let newQty = this.state.qty - 1;
    if (newQty > 0 || this.state.shadow) {
      if (newQty <= ITEM_QTY_MAX && newQty <= this.props.stock.qty) {
        this.setState({ qty: newQty, qtyChanged: this.state.qtyChanged + newQty - this.state.qty }, () => {
          this.changeCartItem(this.state.qty, sku, false);
        });
      } else if (this.state.qty > ITEM_QTY_MAX || this.state.qty > this.props.stock.qty) {
        newQty = (this.state.qty > this.props.stock.qty ? this.props.stock.qty : this.state.qty);
        newQty = (newQty > ITEM_QTY_MAX ? ITEM_QTY_MAX : newQty);
        this.setState({ qty: newQty, qtyChanged: this.state.qtyChanged + newQty - this.state.qty }, () => {
          this.changeCartItem(this.state.qty, sku, false);
        });
      }
    } else { // 1->0
      this.removeItem();
    }
  }

  removeItem() {
    if (!this.state.shadow) {
      this.setState({ shadow: "panel" });
    }
  }

  handlePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  closeFinalSale() {
    this.setState({ isOpen: false });
  }

  renderItemTitle() {
    let priceDetail;
    if (this.props.price.original !== this.props.price.current) {
      priceDetail = (
        <Col xs={4} className={`${styles["item-detail-object-price"]} text-right`}>
          <div className={styles["item-detail-object-price-origin"]}>{`$${this.props.price.original}`}</div>
          <div className={styles["item-detail-object-price-current"]}>{`$${this.props.price.current}`}</div>
        </Col>
      );
    } else {
      priceDetail = (
        <Col xs={4} className={`${styles["item-detail-object-price"]} text-right`}>
          <div className={styles["item-detail-object-price-current"]}>{`$${this.props.price.current}`}</div>
        </Col>
      );
    }
    return (
      <Row>
        <Col className={`${styles["item-detail-object-title"]} ${styles["small-bottom-margin"]}`} xs={8}>
          {this.props.name}
        </Col>
        {priceDetail}
      </Row>
    );
  }

  renderItemAttributes() {
    const {attr} = this.props;
    return (
      <Row>
        <Col xs={12}>
          {attr.color ? (
            <div className={`${styles["small-bottom-margin"]}`}>
COLOR:
              {attr.color[0].name}
            </div>
          ) : null}
          {attr.size ? (
            <div className={`${styles["small-bottom-margin"]}`}>
SIZE:
              {attr.size[0].name}
            </div>
          ) : null}
        </Col>
      </Row>
    );
  }

  renderItemSku() {
    return (
      <Row>
        <Col xs={12} className={`${styles["small-bottom-margin"]}`}>
          ITEM:
          {" "}
          {this.props.sku}
        </Col>
      </Row>
    );
  }

  renderItemStock() {
    const {stock} = this.props;
    const {sku} = this.props;

    if (stock.in_stock && stock.qty > 0) {
      return (
        <Row>
          <Col xs={12}>
            <div className={styles["low-qty-msg"]}>
              {stock.qty <= ITEM_QTY_MAX ? `Only ${stock.qty} left` : null}
            </div>
            <div>
              {stock.qty <= ITEM_QTY_MAX ? null : "In stock"}
            </div>
          </Col>
          <div className={!this.state.isOpen ? styles["qty-manage"] : styles["qty-manage-mobile"]}>
            <div className={styles["remove-btn"]} onClick={() => { this.removeItem(); }}>
            Remove
            </div>
            <div className={`${styles["quantity-controller"]} text-right`}>
              {this.state.waitForResponse ? <span className={styles["quantity-shadow"]}><CircleLoader /></span> : ""}
              <i className="ion-minus-circled" onClick={() => this.deleteItemQty(sku)} />
              <div className={`${styles["qty-value"]} ${stock.qty < this.state.qty ? styles["overflow-qty"] : null}`}>{this.state.qty}</div>
              <i className="ion-plus-circled" onClick={() => this.addItemQty(sku)} />
            </div>
          </div>

        </Row>
      );
    }
    return (
      <Row>
        <Col xs={12}>
          <div className={styles["out-of-stock"]}>Out of Stock</div>
        </Col>
        <div className={!this.state.isOpen ? styles["qty-manage"] : styles["qty-manage-mobile"]}>
          <div className={styles["remove-btn"]} onClick={() => { this.removeItem(); }}>
            Remove
          </div>
        </div>
      </Row>
    );
  }

  renderFinalSale() {
    return (
      <Row>
        <Col xs={12} className={`${styles["small-bottom-margin-fs"]}`}>
          <a
            className="button"
            onClick={() => this.handlePopover()}
          >
            <span className={styles.fsSpan}>FINAL SALE</span>
            <i className="ion-help-circled" />
          </a>
        </Col>
      </Row>
    );
  }

  renderMediaDescription() {
    return (
      <div className={`${styles["media-description-container"]}`}>
        {this.renderItemTitle()}
        {this.renderItemSku()}
        {this.renderItemAttributes()}
        {this.renderItemStock()}
        {!this.props.final_sale ? null : this.renderFinalSale()}
      </div>
    );
  }


  render() {
    let shadow = null;


    const {sku} = this.props;
    if (this.state.shadow) {
      shadow = (
        <div>
          {this.state.shadow == "panel"
            ? (
              <div className={styles["item-overlay-shadow"]}>
                <div className={styles["center-parent"]}>
                  <div className={styles["mask-wording"]}>
                    {" "}
                    <span>Remove this item?</span>
                    {" "}
                  </div>
                  <div className={styles["center-child"]}>
                    <span
                      className={`${styles["mask-outline-btn"]} ${styles["mask-remove-btn"]}`}
                      onClick={() => {
                        this.changeCartItem(0, sku, true);
                        this.setState({ shadow: "mask" });
                      }
                    }
                    >
                    REMOVE
                    </span>
                    <span
                      className={`${styles["mask-outline-btn"]} ${styles["mask-cancel-btn"]}`}
                      onClick={() => {
                        this.setState({ shadow: false });
                      }}
                    >
                    CANCEL
                    </span>
                  </div>
                </div>
              </div>
            )
            : (
              <div className={styles["item-overlay-shadow"]}>
                <div className={styles["center-child"]}>
                  <CircleLoader />
                </div>
              </div>
            )
          }
        </div>
      );
    }
    const shopping_bag_name = this.props.images && this.props.images.main && this.props.images.main.title ? this.props.images.main.title : null;
    const finalSale_props = {
      isOpen: this.state.isOpen,
      closeFinalSale: this.closeFinalSale,
      handlePopover: this.handlePopover,
      final_sale: this.props.final_sale,
      no_popover: false,
    };

    return (
      <div className={styles["item-media-container"]}>
        <Media bsClass="">
          {shadow}
          <Media.Left align="top">
            <Link to={`/product/${this.props.display_id}`}>
              <img width={112} src={this.props.images.main.images.sm.url} alt={shopping_bag_name} title={shopping_bag_name} />
            </Link>
          </Media.Left>
          <Media.Body>
            {this.renderMediaDescription()}
          </Media.Body>
        </Media>
        {!this.props.final_sale ? null : <FinalSale {...finalSale_props} />}
      </div>
    );
  }
}

export default connect()(ItemDetailObject);


/*
1. 实现图片
2. 显示description, sku, details
3. 实现增加和删除产品
4. 是否in stock,
5. 实现总价格的display
6. 加入wishlist
7. remove产品
 */
