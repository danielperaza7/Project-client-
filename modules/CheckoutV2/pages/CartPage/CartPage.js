import React from "react";
import { connect, batch } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import history from "../../../../history";

// import custom components
import CartPromotions from "../../components/CartPromotions/CartPromotions";
import ItemsListWrapper from "../../components/ItemsList/ItemsListWrapper";
import WishList from "../../components/WishList/WishList";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import DefaultMask from "../../../../components/masks/DefaultMask";
// import RewardShop from "../../components/RPList/RewardShop";

// import actions
import { getUserByToken, getIdentityResponse } from "../../../Authentication/AuthActions";

// import getters
import { getProductNum, getPreviousCustomHistory } from "../../../App/AppReducer";
import { getCartIsEmpty, getLoadingCart, getProductList } from "../../CheckoutReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";

import styles from "./CartPage.css";

class CartPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ableToCheckOut: null
    };
  }

  componentDidMount() {
    // cart link from email
    batch(() => {
      if (!this.props.authenticated && this.props.location.search.includes("token=")) {
        const urlParams = new URLSearchParams(this.props.location.search);
        const customerIdToken = urlParams.get("token");
        this.props.dispatch(getUserByToken(customerIdToken));
        this.props.dispatch(getIdentityResponse());
      }
    });
    console.log('componentDidMount');
  }

  handleGoCheckout() {
    const { authStatus, productList } = this.props;
    // console.log('handleGoCheckout called, authStatus:', authStatus);
    let regularItemNum = 0;
    for (let i = 0; i < productList.length; i++) {
      if (
        !productList[i].stock.in_stock
        || productList[i].stock.qty < productList[i].qty
      ) {
        this.setState({
          ableToCheckOut: (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  "You have 1 or more <b>out-of-stock</b> redemption item(s) in your cart. Please remove the item(s) before continue."
              }}
            />
          )
        });
        return;
      }
      let expired = false;
      if (productList[i].redeem_expire_date) {
        expired = new Date(productList[i].redeem_expire_date.split(" ")[0]).getTime()
            - new Date().getTime()
          < 0;
      } // special case for iOS Safari browser
      if (expired) {
        this.setState({
          ableToCheckOut: (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  "You have 1 or more <b>expired</b> redemption item(s) in your cart. Please remove the item(s) before continue."
              }}
            />
          )
        });
        return;
      }
      if (
        !productList[i].redeem_points
        || productList[i].redeem_points === 0
        || productList[i].name
          .replace(/\s+/g, "")
          .toLowerCase()
          .indexOf("giftcard") !== -1
      ) {
        regularItemNum++;
      }
    }
    if (regularItemNum === 0) {
      this.setState({
        ableToCheckOut:
          "Merchandise must be included in your order to check out. Please add one or more non-redeem product to your shopping bag."
      });
      return;
    }
    if (authStatus) {
      this.setState({
        ableToCheckOut: null
      });
      history.push("/checkout");
    } else {
      history.push("/checkout/signin");
    }
  }

  render() {
    const { cartIsEmpty, loadingCart } = this.props;
    const colSettings = {
      left: {
        lg: 8, md: 7, sm: 7, xs: 12
      },
      right: {
        lg: 4, md: 5, sm: 5, xs: 12
      }
    };
    if (loadingCart && !cartIsEmpty) return <DefaultMask />;

    return (
      <Grid>
        <div className={styles.shoppingBagTitle}>Your Shopping Bag</div>
        <Row>
          <Col {...colSettings.left}>
            <div className={styles.leftCol}>
              <CartPromotions />
              <ItemsListWrapper mode="YOUR ORDER ITEMS" />
              <WishList />
            </div>
          </Col>
          <Col {...colSettings.right}>
            {cartIsEmpty ? (
              <OrderSummary
                inCart
                btnAction={() => {
                  this.handleGoCheckout();
                }}
                ableToCheckOut={this.state.ableToCheckOut}
                cartIsEmpty
              />
            ) : (
              <OrderSummary
                inCart
                btnAction={() => {
                  this.handleGoCheckout();
                }}
                ableToCheckOut={this.state.ableToCheckOut}
              />
            )}
            {/* <RewardShop /> */}
          </Col>
        </Row>
      </Grid>
    );
  }
}

CartPage.propTypes = {
  cartIsEmpty: PropTypes.bool
};

function mapStateToProps(store) {
  return {
    authenticated: getAuthStatus(store),
    productNum: getProductNum(store),
    cartIsEmpty: getCartIsEmpty(store),
    loadingCart: getLoadingCart(store),
    authStatus: getAuthStatus(store),
    productList: getProductList(store),
    previousCustomHistory: getPreviousCustomHistory(store)
  };
}

export default connect(mapStateToProps)(CartPage);
