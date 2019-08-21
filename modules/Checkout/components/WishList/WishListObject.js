/**
 * Created by warrenchen on 4/29/17.
 */
import React, { Component } from "react";
import {
  Row, Col, Media, ButtonToolbar, Button
} from "react-bootstrap";
import _ from "lodash";
import { connect } from "react-redux";

// import style
import styles from "../ItemDetail/ItemDetail.css";

// import actions
import { changeCartItem, moveToCart } from "../../CheckoutActions";
import { getUserData } from "../../../App/AppReducer";

class WishListObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadow: false,
      qty: null,
      currentResponseItem_id: "",
      moveToWishListResponse: ""
    };
    this.changeCartItem = _.debounce(this.changeCartItem, 500);
    this.handleMTCresponse = this.handleMTCresponse.bind(this);
  }


  componentWillMount() {
    this.setState({ qty: this.props.qty });
  }

  changeCartItem(qty) {
    this.props.dispatch(changeCartItem(qty));
  }

  moveToCartResponse(sku, qty) {
    this.setState({
      currentResponseItem_id: sku
    });
    this.props.dispatch(moveToCart(sku, qty, this.handleMTCresponse));
  }

  handleMTCresponse(response) {
    console.log("hello");
    if (response) {
      console.log("hello");
      this.setState({
        moveToWishListResponse: "already in the cart"
      });
    } else {
      this.setState({
        moveToWishListResponse: "",
      });
    }
  }

  renderItemTitle() {
    return (
      <Row>
        <Col xs={8}>
          {this.props.name}
        </Col>
        <Col xs={4}>
          <div>{this.props.price.original}</div>
          <div>{this.props.price.current}</div>
        </Col>
      </Row>
    );
  }

  renderItemAttributes() {
    const attr = this.props.attr;
    return (
      <Row>
        <Col xs={8}>
          {attr.color ? (
            <div>
Color:
              {attr.color}
            </div>
          ) : null}
          {attr.size ? (
            <div>
Size:
              {attr.size}
            </div>
          ) : null}
        </Col>
      </Row>
    );
  }

  renderItemSku() {
    return (
      <Row>
        <Col xs={12}>
          Sku:
          {" "}
          {this.props.item_id}
        </Col>
      </Row>
    );
  }

  renderItemQty() {
    return (
      <Row>
        <Col xs={12}>
          Qty:
          {" "}
          {this.props.item_qty}
        </Col>
      </Row>
    );
  }

  renderItemStock() {
    const stock = this.props.stock;
    if (stock.in_stock) {
      return (
        <Row>
          <Col xs={8}>
            In Stock
            {" "}
            {stock.qty <= 5 ? `Only ${stock.qty} items left` : null}
          </Col>
          <Col className={styles["quantity-controller"]} xs={4}>

            <div>
Quantity:
              {this.state.qty}
            </div>

          </Col>
        </Row>
      );
    }
    return (
      <div>Out of Stock</div>
    );
  }

  renderMoveToCartBTN() {
    return (
      <Row>
        <Col xs={12}>
          {!this.state.moveToWishListResponse
            ? <button className={styles.moveToCart} onClick={() => this.moveToCartResponse(this.props.item_id, this.props.item_qty)}>move to cart</button> : <div style={{ color: "green", marginTop: "20px" }}>{this.state.moveToWishListResponse}</div>
         }
        </Col>
      </Row>
    );
  }

  renderMediaDescription() {
    return (
      <div>
        {this.renderItemSku()}
        {this.renderItemQty()}
        {this.renderItemAttributes()}
        {this.renderItemStock()}
        {this.renderItemTitle()}
        {this.renderMoveToCartBTN()}
      </div>
    );
  }

  render() {
    let shadow = null;
    if (this.state.shadow) {
      shadow = (
        <div className={styles["item-overlay-shadow"]}>
          <ButtonToolbar>
            <Button
              onClick={() => {
                this.setState({ qty: 0 });
                this.deleteItemQty();
              }}
              bsStyle="danger"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                this.setState({ shadow: false });
              }}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </div>
      );
    }
    const { product_list, priceCalcResult } = this.props.customerInfo;
    return (
      <Row className={styles["item-media-container"]} style={{ marginLeft: "-2px", marginRight: "-2px", marginTop: "10px" }}>
        <Media>
          <Media.Left align="top">
            <img width={112} src="http://via.placeholder.com/150x150" alt="Image" />
          </Media.Left>
          <Media.Body>
            {this.renderMediaDescription()}
          </Media.Body>
        </Media>
      </Row>
    );
  }
}

function mapStateToProps(store) {
  return {
    customerInfo: getUserData(store),
  };
}

export default connect(mapStateToProps)(WishListObject);
