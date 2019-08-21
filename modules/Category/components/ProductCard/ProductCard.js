import React from "react";
import { Link } from "react-router-dom";
import marked from "marked";
import Waypoint from "react-waypoint";
import { connect } from "react-redux";
import _ from "lodash";
import {
  convertMap, renderPrice, renderPriceMap, mergePrice
} from "../Price/PriceRange";
import { constructConfigQuery } from "../Category_helpers";
import {
  constructProductClickData,
  PushDL_ClickProduct,
  constructProductViewedData,
  PushDL_ViewProduct,
  pushPromotionList,
  constructPromData,
  PushDL_ClickPromotion
} from "../../../Analytics/components/GA";

import styles from "./ProductCard.css";
import MembershipPrice from "../MembershipPrice/MembershipPrice";

let viewTimer;

class ProductCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPrimaryImg: true,
      startView: false,
      viewed: false,
      mount: false
    };
    this.onEnter = this.onEnter.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentWillUnmount() {
    if (viewTimer) {
      window.clearTimeout(viewTimer);
    }
  }

  onClick(priceToPush) {
    PushDL_ClickProduct(
      constructProductClickData({
        product: this.props.product,
        DL: this.props.DL || {},
        priceToPush
      })
    );

    if (this.props.promData && this.props.promData.id) {
      PushDL_ClickPromotion(
        constructPromData(
          this.props.promData,
          this.props.creative,
          this.props.DL ? this.props.DL.position : ""
        )
      );
    }
  }

  onEnter(priceToPush) {
    if (this.state.mount) {
      PushDL_ViewProduct(
        constructProductViewedData({
          product: this.props.product,
          DL: this.props.DL || {},
          priceToPush
        })
      );
      if (this.props.promData && this.props.promData.id) {
        pushPromotionList(
          constructPromData(
            this.props.promData,
            this.props.creative,
            this.props.DL ? this.props.DL.position : ""
          )
        );
      }
      this.setState({ viewed: true });
    }
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

  render() {
    // console.log('productCard Render!', this.props);
    // console.log('tagVals', this.props.tagVals);
    // if (!this.props.tagVals) {
    //   console.log('productCard Render!', this.props);
    // }
    const {
      product, membershipPriceDisabled, tagVals, from
    } = this.props;
    const reviewList = product ? product.review_data : [];
    if (!product) {
      return <div>no product</div>;
    }
    // TODO: Use better brand info if implemented to product
    // Disable Membership Price for all Ebe products
    const disableMembershipPrice = membershipPriceDisabled || product.attr.brand[0] === "Eve by Eve's";

    let couponCode = null;
    let rateReview = null;
    if (reviewList) {
      const five_star_num_list = [1, 2, 3, 4, 5];
      const num = Math.round(reviewList.average_rate);
      rateReview = five_star_num_list.map((key, index) => (
        <i
          key={index}
          className={
            key > num
              ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
              : `ion-android-star ${styles["ion-android-star"]}`
          }
        />
      ));
    }
    // get it from the account information
    const groupId = this.props.groupId ? this.props.groupId : 0;
    let priceBox;
    const tier_prices = product.tier_prices;
    let priceToPush;
    const isKit = this.props.product.sub_products && this.props.product.sub_products.length > 0;
    if (!tier_prices || Object.keys(tier_prices).length === 0) {
      priceBox = (
        <div className={styles.price_box}>{mergePrice(product.price_range)}</div>
      );
      const priceList = priceBox.props.children.split(/~|\$/);
      priceToPush = priceList.length < 4
        ? parseInt(priceList[1])
        : (parseInt(priceList[1]) + parseInt(priceList[3])) / 2;
    } else {
      const map = convertMap(product.tier_prices);
      const priceToShow = renderPrice(
        map,
        groupId,
        {
          min: product.original_price_range[0],
          max: product.original_price_range[1]
        },
        isKit
      );
      const membershipPriceProp = {
        tier_prices: product.tier_prices,
        list_id: product.list_id,
        direction: "up",
        showSigninLinkOutside: false,
        display_id: product.display_id,
        membershipPriceFullName: false,
        mp_special:
          this.props && this.props.product ? this.props.product.mp_special : false
      };

      priceBox = (
        <div className={styles.price_box}>
          {priceToShow}
          {renderPriceMap(this.props.tiers, map, product.sku)}
          {disableMembershipPrice || from ? null : (
            <MembershipPrice {...membershipPriceProp} />
          )}
        </div>
      );
      priceToPush = Array.isArray(priceToShow.props.children)
        ? parseInt(priceToShow.props.children[1].props.children.split("$")[1])
        : parseInt(priceToShow.props.children.split("$")[1]);
    }

    if (product.prom && product.prom.short && product.prom.short !== "") {
      couponCode = (
        <div className={styles.coupon_code}>
          {" "}
          <div dangerouslySetInnerHTML={{ __html: marked(product.prom.short) }} />
          {" "}
        </div>
      );
    }

    const mainImage = _.get(product, "images.main.images.md")
      ? product.images.main.images.md.url
      : null;
    const hoverImage = _.get(product, "images.hover.images.md")
      ? product.images.hover.images.md.url
      : null;
    const mainImage_name = _.get(product, "images.main.title")
      ? product.images.main.title
      : null;
    const hoverImage_name = _.get(product, "images.hover.title")
      ? product.images.hover.title
      : null;
    const defaultConfig = product && product.images && product.images.config ? product.images.config : null;
    const tagImg = tagVals && tagVals.length > 0 && tagVals[0].includes("HOT")
      ? "https://storage.googleapis.com/evesetus/email/CMS-CHANNEL/HotTag.svg"
      : tagVals && tagVals.length > 0 && tagVals[0].includes("NEW")
        ? "https://storage.googleapis.com/evesetus/email/CMS-CHANNEL/NewTag.svg"
        : null;
    let res = null;
    switch (from) {
      case "menu_desktop":
        res = (
          <div style={{ display: "inline-flex" }}>
            <div className={styles.menuProductCard_container}>
              <Link
                to={`/product/${product.display_id}${constructConfigQuery(
                  defaultConfig
                )}`}
                onClick={() => {
                  this.onClick(priceToPush);
                }}
              >
                <div className={styles.menuProductCard_img}>
                  <img
                    src={mainImage}
                    onLoad={() => {
                      this.setState({ startView: true });
                    }}
                    alt={mainImage_name}
                    title={mainImage_name}
                  />
                </div>
              </Link>
              <div className={styles.menuProductCard_name}>
                <Link to={`/product/${product.display_id}`}>{product.name}</Link>
                {priceBox}
              </div>
            </div>
          </div>
        );
        break;
      case "newArrivalMobile":
        res = (
          <div style={{ display: "inline-flex" }}>
            <div className={styles.mobileProductCard_container}>
              <Link
                to={`/product/${product.display_id}${constructConfigQuery(
                  defaultConfig
                )}`}
                onClick={() => {
                  this.onClick(priceToPush);
                }}
              >
                <div className={styles.mobileProductCard_img}>
                  <img
                    src={mainImage}
                    onLoad={() => {
                      this.setState({ startView: true });
                    }}
                    alt={mainImage_name}
                    title={mainImage_name}
                  />
                </div>
              </Link>
              <div className={styles.mobileProductCard_name}>
                <Link to={`/product/${product.display_id}`}>{product.name}</Link>
                {priceBox}
              </div>
            </div>
          </div>
        );
        break;
      case "topBarDeskTop":
        // console.log ('this is top bar');
        res = (
          <div
            className={styles.topBar_card}
            style={{ marginLeft: this.props.index === 0 ? "0px" : "" }}
          >
            <div className={styles.topBar_img}>
              <Link
                to={`/product/${product.display_id}${constructConfigQuery(
                  defaultConfig
                )}`}
                onClick={() => {
                  this.onClick(priceToPush);
                }}
              >
                <img
                  src={mainImage}
                  onLoad={() => {
                    this.setState({ startView: true });
                  }}
                  alt={mainImage_name}
                  title={mainImage_name}
                />
              </Link>
            </div>
            <div className={styles.topBar_info}>
              <div className={styles.topBar_rate}>
                {`#${this.props.index
                + 1} Best Seller`}
              </div>
              <div className={styles.topBar_productName}>
                <Link to={`/product/${product.display_id}`}>{product.name}</Link>
              </div>
              {priceBox}
            </div>
          </div>
        );
        break;
      default:
        res = (
          <div>
            <div
              className={styles.media_section}
              onMouseOver={() => {
                this.handleMouseOver();
              }}
              onMouseOut={() => {
                this.handleMouseOut();
              }}
            >
              <Link
                to={`/product/${product.display_id}${constructConfigQuery(
                  defaultConfig
                )}`}
                onClick={() => {
                  this.onClick(priceToPush);
                }}
              >
                {this.props.showDiscountLabel === undefined
                || this.props.showDiscountLabel === false
                || this.props.product.calculated_discount === undefined
                || this.props.product.calculated_discount === "0" ? null : (
                  <div className={styles.discountCard}>
                    <img
                      style={{ zIndex: "-1" }}
                      src="https://hiddenfigure.evestemptation.com/email/Component/discountLabel.svg"
                      alt="Discount Label"
                    />
                    <span
                      style={{
                        position: "absolute",
                        fontSize: "12px",
                        marginTop: "2px",
                        marginLeft: "-55px"
                      }}
                    >
                      {`${this.props.product.calculated_discount}%`}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        fontSize: "7px",
                        marginTop: "3px",
                        marginLeft: "-25px"
                      }}
                    >
                      OFF
                    </span>
                  </div>
                  )}
                <div className={styles.imageContainer}>
                  <div
                    className={styles.tagContainer}
                    style={
                      tagVals && tagVals.length > 0
                        ? { backgroundImage: `url(${tagImg})` }
                        : null
                    }
                  >
                    <span>{tagVals ? tagVals[0] : null}</span>
                  </div>
                  <img
                    src={mainImage}
                    onLoad={() => {
                      this.setState({ startView: true });
                    }}
                    alt={mainImage_name}
                    title={mainImage_name}
                  />
                  <img
                    className={styles.hoverImage}
                    src={
                      this.state.showPrimaryImg || !hoverImage ? mainImage : hoverImage
                    }
                    alt={hoverImage_name}
                    title={hoverImage_name}
                  />
                </div>
                {product.stock.in_stock === false ? (
                  <div className={styles.soldOut}>
                    <span>SOLD OUT</span>
                  </div>
                ) : product.stock.online_available === false ? (
                  <div className={styles.soldOut}>
                    <span>
                      <img
                        src="https://storage.googleapis.com/evesetus/email/product/store.svg"
                        alt="email"
                        style={{
                          width: "16px",
                          marginRight: "8px",
                          marginBottom: "2px"
                        }}
                      />
                      STORE ONLY
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </Link>
            </div>
            {this.state.startView && !this.state.viewed && !this.props.notVisible ? (
              <Waypoint
                onEnter={() => {
                  viewTimer = window.setTimeout(() => {
                    this.onEnter(priceToPush);
                  }, 1000);
                }}
                onLeave={() => {
                  if (typeof viewTimer !== "undefined" && viewTimer) {
                    window.clearTimeout(viewTimer);
                  }
                }}
                scrollableAncestor={this.props.scrollableAncestor || window}
                topOffset={
                  this.props.scrollDirection === "horizontal"
                    ? "0"
                    : window.document.documentElement.clientWidth <= 992
                      ? "75px"
                      : "158px"
                }
              />
            ) : (
              ""
            )}
            <div className={styles.info_section}>
              {priceBox}
              {reviewList ? (
                <div className={styles.starList_mainProduct}>
                  {rateReview}
                  <span>{`( ${reviewList.review_number} )`}</span>
                </div>
              ) : null}
              <div className={styles.product_name}>
                <Link to={`/product/${product.display_id}`}>
                  <h3>{product.name}</h3>
                </Link>
              </div>
              {couponCode}
            </div>
          </div>
        );
        break;
    }
    return res;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ProductCard);
