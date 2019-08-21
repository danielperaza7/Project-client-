/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import essential packages
import { connect, batch } from "react-redux";
import MediaQuery from "react-responsive";
import { Grid, Row, Col } from "react-bootstrap";
import React from "react";
import _ from "lodash";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import history from "../../../../history";
// import actions
import { setEmptyCart, moveToCart } from "../../CheckoutActions";
import { setShowHeader, addError } from "../../../App/AppActions";

// import components
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import CouponInput from "../../components/couponInput/CouponInput";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";
import LiveChatTrigger from "../../../../components/LiveChatTrigger";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import WishList from "../../components/WishList/WishList";
// fetch selector
import {
  getProductList,
  getTotalSegments,
  getCanCheckout
} from "../../CheckoutReducer";
import { getCartId, getAuthStatus } from "../../../Authentication/AuthReducer";
import {
  getCurrency,
  getPreviousCustomHistory,
  getClientMD,
  getCartIsEmpty,
  getUserData
} from "../../../App/AppReducer";


// import styles
import styles from "./CartPage.css";

class CartPage extends React.PureComponent {
  static contextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    router: PropTypes.object
  };

  componentDidMount() {
    batch(() => {
      const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
      if (width < 768) {
        this.props.dispatch(setShowHeader(false));
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(setEmptyCart(false)); // Display loading every time.
    this.props.dispatch(setShowHeader(true));
  }

  validateItemsQty() {
    const { product_list } = this.props;
    let res = true;
    if (product_list && product_list.items && product_list.items.length > 0) {
      product_list.items.map((item) => {
        if (!item.stock.in_stock || item.stock.qty < item.qty) {
          res = false;
        }
      });
      return res;
    }
    return res; // prevent show error msg in initialization
  }

  handleGoCheckout() {
    this.context.router.push("/checkout");
  }

  renderCheckoutButton() {
    const { total_segments, clientMD } = this.props;
    const ableCheckout = this.validateItemsQty();
    const msg = !ableCheckout
      ? "Your items maybe be out of stock or in low stock"
      : null;
    let merchandiseSubtotal = 0;
    if (total_segments && total_segments.subtotal) {
      merchandiseSubtotal = total_segments.subtotal.value;
      if (total_segments.extras && total_segments.extras.length > 0) {
        total_segments.extras.map((segment) => {
          if (segment.value) {
            merchandiseSubtotal = Math.round(merchandiseSubtotal * 100 + segment.value * 100) / 100;
          }
        });
      }
    }

    if (!this.props.isAuthenticated) {
      return (
        <div>
          <div
            className={styles["signIn-button"]}
            onClick={() => this.context.router.push("/signin")}
          >
            <span>SIGN IN</span>
          </div>
          <div
            className={`${styles["checkout-button"]} ${
              this.props.canCheckout ? "" : "checkout-button-disable"
            }`}
            onClick={() => {
              if (this.props.canCheckout) {
                if (ableCheckout) {
                  this.handleGoCheckout();
                } else if (msg) {
                  this.props.dispatch(
                    addError({ code: "cartpage: cant checkout", msg })
                  );
                }
              } else if (msg) {
                this.props.dispatch(
                  addError({ code: "cartpage: cant checkout", msg })
                );
              }
            }}
          >
            <span>CHECKOUT</span>
          </div>
          <div className={styles["checkout-err-msg"]}>{msg}</div>
          <MediaQuery
            maxWidth={767}
            values={{ width: clientMD && clientMD.fakeDeviceWidth }}
          >
            <div className={styles.mobileCheckoutWrapper}>
              <div className={styles.mobileSubtotal}>
                Merchandise Subtotal:
                {" "}
                <span>
$
                  {merchandiseSubtotal}
                </span>
                <div className={styles["checkout-err-msg"]}>{msg}</div>
              </div>
              <div>
                <div className={styles.mobileSignInWrapper}>
                  <div
                    className={styles["signIn-button"]}
                    onClick={() => this.context.router.push("/signin")}
                  >
                    <span>SIGN IN</span>
                  </div>
                </div>
                <div className={styles.mobileGuestCheckoutWrapper}>
                  <div
                    className={`${styles["checkout-button"]} ${
                      this.props.canCheckout ? "" : "checkout-button-disable"
                    }`}
                    onClick={() => {
                      if (this.props.canCheckout) {
                        if (ableCheckout) {
                          this.handleGoCheckout();
                        } else if (msg) {
                          this.props.dispatch(
                            addError({
                              code: "cartpage: cant checkout",
                              msg
                            })
                          );
                        }
                      } else if (msg) {
                        this.props.dispatch(
                          addError({
                            code: "cartpage: cant checkout",
                            msg
                          })
                        );
                      }
                    }}
                  >
                    <span>CHECKOUT</span>
                  </div>
                </div>
              </div>
            </div>
          </MediaQuery>
        </div>
      );
    }
    return (
      <div>
        <div
          className={`${styles["checkout-button"]} ${
            this.props.canCheckout ? "" : "checkout-button-disable"
          }`}
          onClick={() => {
            if (this.props.canCheckout) {
              // ?
              if (ableCheckout) {
                this.handleGoCheckout();
              }
            }
          }}
        >
          <span>CHECKOUT</span>
        </div>
        <div className={styles["checkout-err-msg"]}>{msg}</div>
        <MediaQuery
          maxWidth={767}
          values={{ width: clientMD && clientMD.fakeDeviceWidth }}
        >
          <div className={styles.mobileCheckoutWrapper}>
            <div className={styles.mobileSubtotal}>
                Merchandise Subtotal:
              {" "}
              <span>
$
                {merchandiseSubtotal}
              </span>
              <div className={styles["checkout-err-msg"]}>{msg}</div>
            </div>
            <div
              className={`${styles["checkout-button"]} ${
                this.props.canCheckout ? "" : "checkout-button-disable"
              }`}
              onClick={() => {
                if (this.props.canCheckout) {
                  // ?
                  if (ableCheckout) {
                    this.handleGoCheckout();
                  }
                }
              }}
            >
              <span>CHECKOUT</span>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }

  renderItemDetail() {
    const colSettings = {
      lg: 8, md: 7, sm: 7, xs: 12
    };
    if (!this.props.emptyCart) {
      return (
        <Col className={`${styles["item-detail-container"]}`} {...colSettings}>
          <div className={styles["item-detail-title"]}>ITEM DETAILS</div>
          <ItemDetail productList={this.props.product_list} />
          {/* <div>WISH LIST</div> */}
          {/* <WishList productList={this.props.wish_list} /> */}
        </Col>
      );
    }
    return null;
  }

  renderOrderSummary() {
    const colSettings = {
      lg: 4, md: 5, sm: 5, xs: 12
    };
    const wishlist_productList = this.props.customerInfo
      ? this.props.customerInfo.wish_list
      : null;

    if (!this.props.emptyCart) {
      return (
        <Col {...colSettings}>
          <div className={styles["order-summary-container"]}>
            <OrderSummary
              totalSegments={this.props.total_segments}
              productList={this.props.product_list}
              currency={this.props.currency}
            />
            {this.renderCheckoutButton()}
            <div className={styles["text-under-checkout-btn"]}>
              <CMSBlock {...{ cmsid: "text-under-checkout-btn" }} />
            </div>
          </div>
          <div>{this.renderExtras()}</div>
          {wishlist_productList ? (
            <WishList wishlist_productList={wishlist_productList} />
          ) : null}
        </Col>
      );
    }
    return null;
  }

  renderItemDetailTitle() {
    const { clientMD } = this.props;
    return (
      <div>
        <MediaQuery minWidth={768} values={{ width: clientMD.fakeDeviceWidth }}>
          <header className={styles["cart-page-header"]}>
            <div>SHOPPING BAG</div>
          </header>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD.fakeDeviceWidth }}>
          <header className={styles["cart-page-header-mobile"]}>
            <div>SHOPPING BAG</div>
            <i
              className="ion-close"
              onClick={() => {
                if (!this.props.previousCustomHistory) {
                  history.push("/");
                } else {
                  history.goBack();
                }
              }}
            />
          </header>
        </MediaQuery>
      </div>
    );
  }

  renderExtras() {
    let currentCoupon;
    if (this.props.total_segments && this.props.total_segments.extras) {
      _.map(this.props.total_segments.extras, ({ code, title }) => {
        if (code === "coupon") {
          currentCoupon = title;
        }
      });
    }
    return (
      <div className={styles["extras-wrapper"]}>
        <div className={styles["extra-top-bar"]}>
          <LiveChatTrigger>
            {" "}
            {" WAYS TO SAVE MORE "}
            {" "}
          </LiveChatTrigger>
        </div>
        <div className={styles["extras-row"]}>
          <CouponInput currentCoupon={currentCoupon} />
        </div>
      </div>
    );
  }

  render() {
    const historyProps = {
      ...(this.props.location ? this.props.location : {}),
      name: "Shopping Bag"
    };
    const { product_list } = this.props;
    const cart_qty = product_list && product_list.items_qty ? product_list.items_qty : 0;
    return (
      <Grid className={styles["cart-page"]}>
        <Helmet title={`Shopping Bag (${cart_qty})`} />
        {this.renderItemDetailTitle()}
        <Row>
          {this.renderItemDetail()}
          {this.renderOrderSummary()}
          {this.props.emptyCart ? (
            <EmptyCart
              goBack={() => {
                if (!this.props.previousCustomHistory) {
                  history.push("/");
                } else {
                  history.push(
                    this.props.previousCustomHistory.pathname
                      + this.props.previousCustomHistory.search
                  );
                }
              }}
            />
          ) : null}
        </Row>
        <CustomHistory record={historyProps} />
      </Grid>
    );
  }
}

function mapStateToProps(store) {
  return {
    previousCustomHistory: getPreviousCustomHistory(store),
    product_list: getProductList(store),
    total_segments: getTotalSegments(store),
    intl: store.intl,
    cartId: getCartId(store),
    isAuthenticated: getAuthStatus(store),
    emptyCart: getCartIsEmpty(store),
    canCheckout: getCanCheckout(store),
    currency: getCurrency(store),
    clientMD: getClientMD(store),
    customerInfo: getUserData(store)
  };
}

export default connect(mapStateToProps)(CartPage);
