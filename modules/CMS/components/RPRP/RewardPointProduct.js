// import dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import {
  redeemToCart,
  setTotalRedeemedPointsInCart
} from "../../../CheckoutV2/CheckoutActions";
import styles from "./RPRP.css";

import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { getRPRPListInfo } from "../../../CheckoutV2/CheckoutReducer";

class RewardPointProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrimaryImg: true,
      redeemingToCart: false,
      redeemed: false,
      showDialogue: false,
      redeemToCartResponse: "",
      redeemedPointsInCart: this.props.redeemedPointsInCart
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleRedeemToCartResponse = this.handleRedeemToCartResponse.bind(this);
    this.checkIfRedeemed = this.checkIfRedeemed.bind(this);
  }

  checkIfRedeemed(redeemProductList) {
    if (!redeemProductList) return;
    return redeemProductList.some(
      element => element.item_id === this.props.product.sku
        || element.sku === this.props.product.sku
    );
  }

  handleMouseOver() {
    if (this.props.product.images.hover) {
      this.setState({ showPrimaryImg: false });
    }
  }

  handleMouseOut() {
    if (this.props.product.images.hover) {
      this.setState({ showPrimaryImg: true });
    }
  }

  handleRedeemToCart() {
    console.log("handleRedeemToCart called!", this.props);
    if (this.state.redeemingToCart) {
      return;
    }
    this.setState({
      redeemingToCart: true
    });
    this.props.dispatch(
      redeemToCart(
        { qty: 1, sku: this.props.product.sku },
        null,
        this.handleRedeemToCartResponse
      )
    );
  }

  handleRedeemToCartResponse(response) {
    if (response) {
      this.setState({
        redeemToCartResponse: "add to cart successfully!"
      });
      this.props.dispatch(
        setTotalRedeemedPointsInCart(
          this.props.redeemedPointsInCart + _.get(this.props.product, "redeem_points", 0)
        )
      );
    }
    this.setState({ redeemingToCart: false });
  }

  render() {
    const { product } = this.props;
    let currentLocation = "";
    try {
      currentLocation = window.location.pathname ? window.location.pathname : "";
    } catch (err) {
      currentLocation = "";
    }
    // product.stock.in_stock = false;
    console.log("RewardPointProduct render", this.props);

    const mainImage = _.get(product, "images.main.images.md.url", "");
    const hoverImage = _.get(product, "images.hover.images.md.url", "");
    const mainImageTitle = _.get(product, "images.main.title", "");
    const hoverImageTitle = _.get(product, "images.hover.title", "");
    const productName = _.get(product, "name", "");
    const productRedeemPoint = _.get(product, "redeem_points", 0);
    const extraInfo = _.get(product, "extraInfo", "");
    const productLink = `/product/${_.get(product, "display_id", "")}`;
    const isRedeemed = this.checkIfRedeemed(this.props.redeemedList);

    return (
      <div>
        {/* signin dialog */}
        <div className={styles.modalContainer}>
          <Modal
            show={this.state.showDialogue}
            onHide={() => {
              this.setState({ showDialogue: false });
            }}
            dialogClassName={styles.dialog}
          >
            <div className={styles.contentBox}>
              <div className={styles.cross}>
                <span
                  onClick={() => {
                    this.setState({ showDialogue: false });
                  }}
                >
                  &times;
                </span>
              </div>
              <div className={styles.textBox}>
                <p className={styles.textDescription}>
                  Sign in to redeem your reward points and view exclusive redemption
                  offers.
                </p>
              </div>
              <hr className={styles.hrInModal} />
              <div className={styles.buttonBox}>
                <div className={styles.singleButton} style={{ width: "50%" }}>
                  <span
                    onClick={() => {
                      this.setState({ showDialogue: false });
                    }}
                  >
                    Back
                  </span>
                </div>
                <div
                  className={`${styles.singleButton} ${styles.singleButtonSignin}`}
                  style={{ width: "50%" }}
                >
                  <Link
                    to={{
                      pathname: "/signin",
                      state: { wherefrom: currentLocation }
                    }}
                  >
                    Sign in now
                  </Link>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className={styles.productWithRPContainer}>
          {/* Below parts are product Image */}
          <div
            className={styles.imageContainer}
            onMouseOver={() => {
              this.handleMouseOver();
            }}
            onMouseOut={() => {
              this.handleMouseOut();
            }}
          >
            <Link to={productLink}>
              <img
                src={mainImage}
                alt={mainImageTitle}
                title={mainImageTitle}
                style={{ width: "100%" }}
              />
              <img
                className={styles.hoverImage}
                src={this.state.showPrimaryImg || !hoverImage ? mainImage : hoverImage}
                alt={hoverImageTitle}
                title={hoverImageTitle}
                style={{ width: "100%" }}
              />
            </Link>
          </div>
          {/* Below parts are product info: (RP, Name, Expiration Date, Exhibition period, ExtraInfo) */}
          <div className={styles.productInfoSection}>
            <div className={styles.productRewardPoint}>
              {`${productRedeemPoint} Points`}
            </div>
            <div>
              <Link to={productLink} className={styles.productName}>
                <h3>{productName}</h3>
              </Link>
            </div>
            <div className={styles.productExtraInfo}>{extraInfo}</div>
            {/* <div className={styles.productExpirationDate}>{expirationDate}</div> */}
          </div>
          {/* Redeem Button */}
          {this.props.isAuthenticated ? (
            _.get(product, "stock.in_stock", false) ? (
              isRedeemed ? (
                <div className={styles.buttonDisabled}>
                  <span>Redeemed</span>
                </div>
              ) : this.props.redeemablePoints
                && this.props.redeemablePoints >= productRedeemPoint ? (
                  <div>
                    {this.state.redeemingToCart ? (
                      <div className={styles.redeemButton}>
                        <span>Redeeming</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => this.handleRedeemToCart(this.props.customer)}
                        className={styles.redeemButton}
                      >
                        <span>Redeem</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className={styles.buttonDisabled}>Redeem</span>
                )
            ) : (
              <span className={styles.buttonDisabled}>Out of stock</span>
            )
          ) : (
            <div
              onClick={() => this.setState({ showDialogue: true })}
              className={styles.redeemButton}
            >
              <span>Redeem</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: getAuthStatus(state),
    redeemedList: getRPRPListInfo(state)
  };
}

export default connect(mapStateToProps)(RewardPointProduct);
