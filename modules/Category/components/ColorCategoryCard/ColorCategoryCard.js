import React, { Component } from "react";
import { Link } from "react-router-dom";
import marked from "marked";
import { Col, Popover, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import _ from "lodash";

import {
  convertMap, renderPrice, renderPriceMap, mergePrice
} from "../Price/PriceRange";
import {
  constructProductClickData,
  PushDL_ClickProduct,
  constructPromData,
  PushDL_ClickPromotion
} from "../../../Analytics/components/GA";

import { addToCart } from "../../../CheckoutV2/CheckoutActions";

import styles from "./ColorCategoryCard.css";

class ColorCategoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCartResponse: ""
    };
    this.onClick = this.onClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddToCartResponse = this.handleAddToCartResponse.bind(this);
    this.categoryCardFontColorSelect = this.categoryCardFontColorSelect.bind(this);
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentWillUnmount() {}

  categoryCardFontColorSelect(hexValue) {
    const color = [];
    const rgb = [];
    let greyScale = 0.0;
    let hex = hexValue.replace(/#/, "");

    if (hex.length === 3) {
      // change "#abc" to "#aabbcc"
      const tmp = [];
      for (let i = 0; i < 3; i++) {
        tmp.push(hex.charAt(i) + hex.charAt(i));
      }
      hex = tmp.join("");
    }

    for (let i = 0; i < 3; i++) {
      color[i] = `0x${hex.substr(i * 2, 2)}`;
      rgb.push(parseInt(Number(color[i])));
    }
    greyScale += rgb[0] * 0.2126;
    greyScale += rgb[1] * 0.7152;
    greyScale += rgb[2] * 0.0722;
    return greyScale > 180 ? "black" : "white";
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

  handleAddToCart() {
    console.log("handle Add to cart called", this.props);
    const sku = this.props.product && this.props.product.filteredSkus[0]
      ? this.props.product.filteredSkus[0]
      : "";
    // if(this.props.location&&this.props.location.pathname) display_id= this.props.location.pathname.replace(`/product/`,'');
    // else if(this.props.product&&this.props.product.display_id) display_id= this.props.product.display_id;
    // dispatch add to cart
    // construct DL_Data
    // const DL_DataProps = {
    //   display_id: display_id,
    //   simple:this.props.product&&this.props.product.simples[0]?this.props.product.simples[0]:null,
    //   product:this.props.product,
    //   qty:1,
    //   customerGroupId:this.props.groupId?this.props.groupId:0,
    //   DL:this.props.DL
    // }
    // const DL_Data = constructAddToCartData( DL_DataProps);
    this.props.dispatch(addToCart({ qty: 1, sku }, null, this.handleAddToCartResponse));
  }

  handleAddToCartResponse(response) {
    if (response) {
      this.setState({
        addToCartResponse: "add to cart successfully!"
      });
    }
  }

  renderItemsInfo() {
    const { product } = this.props;
    const black_svg = "https://hiddenfigure.evestemptation.com/email/Dark_24.svg";
    const white_svg = "https://hiddenfigure.evestemptation.com/email/White_24.svg";
    const color = product.attr && product.attr.color_hex && product.attr.color_hex.length > 0
      ? this.categoryCardFontColorSelect(product.attr.color_hex[0])
      : "black";
    let couponCode = null;
    // get it from the account information
    const groupId = this.props.groupId ? this.props.groupId : 0;
    let priceBox;
    const tier_prices = product.tier_prices;

    let priceToPush;

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
      const priceToShow = renderPrice(map, groupId, {
        min: product.original_price_range[0],
        max: product.original_price_range[1]
      });
      priceBox = (
        <div className={styles.price_box}>
          <div>{priceToShow}</div>
          <div>{renderPriceMap(this.props.tiers, map, product.sku)}</div>
        </div>
      );
      priceToPush = Array.isArray(priceToShow.props.children)
        ? parseInt(priceToShow.props.children[1].props.children.split("$")[1])
        : parseInt(priceToShow.props.children.split("$")[1]);
    }

    const getMarkeddownText = (src) => {
      const rawMarkup = marked(src);
      return { __html: rawMarkup };
    };

    const finalSaleDescription = (
      <Popover id="popover-trigger-click-root-close">
        <span
          dangerouslySetInnerHTML={getMarkeddownText(
            product.final_sale ? product.final_sale : ""
          )}
        />
      </Popover>
    );

    if (
      product.prom
      && product.prom.short
      && product.prom.short !== ""
      && product.final_sale
    ) {
      couponCode = (
        <div
          className={styles.coupon_code}
          style={{ borderColor: color, lineHeight: "1.2" }}
        >
          <div dangerouslySetInnerHTML={{ __html: marked(product.prom.short) }} />
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={finalSaleDescription}
          >
            <div
              style={{ cursor: "pointer", paddingTop: "5px" }}
              className={styles["attr-list-item"]}
            >
              FINAL SALE, NO RETURNS
              {" "}
              <img src={color === "black" ? black_svg : white_svg} alt="" width={15} />
            </div>
          </OverlayTrigger>
        </div>
      );
    } else if (product.prom && product.prom.short && product.prom.short !== "") {
      couponCode = (
        <div className={styles.coupon_code}>
          <div
            dangerouslySetInnerHTML={{ __html: marked(product.prom.short) }}
            style={{ borderColor: color }}
          />
        </div>
      );
    } else if (product.final_sale) {
      couponCode = (
        <div className={styles.coupon_code}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={finalSaleDescription}
          >
            <div
              style={{ cursor: "pointer", paddingTop: "5px" }}
              className={styles["attr-list-item"]}
            >
              FINAL SALE, NO RETURNS
              {" "}
              <img src={color === "black" ? black_svg : white_svg} alt="" width={15} />
            </div>
          </OverlayTrigger>
        </div>
      );
    }

    return (
      <div className={styles.info_section} style={{ color }}>
        <div className={styles.product_name} style={{ color: `${color} !important` }}>
          <Link to={`/product/${product.display_id}`}>
            <h3>{product.name}</h3>
          </Link>
        </div>
        {priceBox}
        {couponCode}
      </div>
    );
  }

  renderAddToBagAndInfo() {
    const { product } = this.props;
    const color = product.attr && product.attr.color_hex && product.attr.color_hex.length > 0
      ? this.categoryCardFontColorSelect(product.attr.color_hex[0])
      : "black";
    const in_stock = product.stock.in_stock;
    // get it from the account information
    const groupId = this.props.groupId ? this.props.groupId : 0;
    let priceBox;
    const tier_prices = product.tier_prices;

    let priceToPush;

    if (!tier_prices || Object.keys(tier_prices).length === 0) {
      priceBox = (
        <div className={styles.price_box_mobile}>{mergePrice(product.price_range)}</div>
      );
      const priceList = priceBox.props.children.split(/~|\$/);
      priceToPush = priceList.length < 4
        ? parseInt(priceList[1])
        : (parseInt(priceList[1]) + parseInt(priceList[3])) / 2;
    } else {
      const map = convertMap(product.tier_prices);
      const priceToShow = renderPrice(map, groupId, {
        min: product.original_price_range[0],
        max: product.original_price_range[1]
      });
      priceBox = (
        <div className={styles.price_box_mobile}>
          <div>{priceToShow}</div>
          <div>{renderPriceMap(this.props.tiers, map, product.sku)}</div>
        </div>
      );
      priceToPush = Array.isArray(priceToShow.props.children)
        ? parseInt(priceToShow.props.children[1].props.children.split("$")[1])
        : parseInt(priceToShow.props.children.split("$")[1]);
    }

    return (
      <div style={{ marginLeft: "15px", marginTop: "20px", color }}>
        <div style={{ height: "85px" }}>
          <div className={styles.product_name_mobile}>
            <Link to={`/product/${product.display_id}`}>
              <h3>{product.name}</h3>
            </Link>
          </div>
          {priceBox}
        </div>
        <div
          className={styles.addToCartBTN_mobile}
          onClick={this.handleAddToCart}
          disabled={!in_stock}
          style={{ opacity: in_stock ? "1" : ".5" }}
        >
          {in_stock ? "ADD TO BAG" : "OUT OF STOCK"}
        </div>
      </div>
    );
  }

  renderAddToBag() {
    const { product } = this.props;
    const in_stock = product.stock.in_stock;
    const smallImage = _.get(product, "images.color_page_transparent[1].images.md")
      ? product.images.color_page_transparent[1].images.md.url
      : null;
    const smallImage_name = _.get(product, "images.color_page_transparent[1].title")
      ? product.images.color_page_transparent[1].title
      : null;
    return (
      <div className={styles.addToBag_section}>
        <div className={styles.rightImg} />
        <Link to={`/product/${product.display_id}`}>
          <img
            src={smallImage}
            alt={smallImage_name}
            title={smallImage_name}
            className={styles.roundImg}
          />
        </Link>
        <div
          className={styles.addToCartBTN}
          onClick={this.handleAddToCart}
          disabled={!in_stock}
          style={{ opacity: in_stock ? "1" : ".4" }}
        >
          {in_stock ? "ADD TO BAG" : "OUT OF STOCK"}
        </div>
      </div>
    );
  }

  render() {
    const { product, colorGroup, clientMD } = this.props;
    if (!product) {
      return <div>no products</div>;
    }
    const bigImage = _.get(product, "images.color_page_transparent[0].images.md")
      ? product.images.color_page_transparent[0].images.md.url
      : null;
    const bigImage_name = _.get(product, "images.color_page_transparent[0].title")
      ? product.images.color_page_transparent[0].title
      : null;
    const smallImage = _.get(product, "images.color_page_transparent[1].images.md")
      ? product.images.color_page_transparent[1].images.md.url
      : null;
    const smallImage_name = _.get(product, "images.color_page_transparent[1].title")
      ? product.images.color_page_transparent[1].title
      : null;
    const bg_color = product.attr && product.attr.color_hex ? product.attr.color_hex[0] : colorGroup;
    const ColSettings = {
      left: { sm: 5, xs: 7 },
      medium: { sm: 3, xs: 0 },
      right: { sm: 4, xs: 5 }
    };
    return (
      <div
        className={styles.categoryCard_container}
        style={{ backgroundColor: `#${bg_color}` }}
      >
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div className={styles.categoryCard}>
            <div className={styles.left}>
              <Link to={`/product/${product.display_id}`}>
                <img
                  src={bigImage}
                  className={styles.leftImg}
                  alt={bigImage_name}
                  title={bigImage_name}
                />
              </Link>
            </div>
            <div className={styles.medium}>{this.renderItemsInfo()}</div>
            <div
              className={styles.right}
              style={{ paddingRight: "10px", marginRight: "5%" }}
            >
              {this.renderAddToBag()}
            </div>
          </div>
          <div className={styles.categoryCard_shadow} />
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div
            className={styles.categoryCard_mobile}
            style={{ backgroundColor: `#${bg_color}` }}
          >
            <Col {...ColSettings.left}>
              <Link to={`/product/${product.display_id}`}>
                <img
                  src={bigImage}
                  alt={bigImage_name}
                  title={bigImage_name}
                  className={styles.leftImgMobile}
                />
              </Link>
              <div className={styles.smallImg} />
              <Link to={`/product/${product.display_id}`}>
                <img
                  src={smallImage}
                  alt={smallImage_name}
                  title={smallImage_name}
                  className={styles.roundImgMobile}
                />
              </Link>
            </Col>
            <Col {...ColSettings.right}>{this.renderAddToBagAndInfo()}</Col>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default connect()(ColorCategoryCard);
