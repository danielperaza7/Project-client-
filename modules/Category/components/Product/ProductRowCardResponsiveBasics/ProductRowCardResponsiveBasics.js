/*
  Show basic info,
  Row in pc, card in mobile
*/

import React, { Component } from "react";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Waypoint from "react-waypoint";
import {
  calculatePriceRange,
  renderPrice,
  renderPriceMap,
  calculateOriginPriceRange
} from "../../Price/PriceRange";

import {
  constructProductClickData,
  PushDL_ClickProduct,
  constructProductViewedData,
  PushDL_ViewProduct
} from "../../../../Analytics/components/GA";

import styles from "./ProductRowCardResponsiveBasics.css";

let viewTimer;

class ProductRowCardResponsiveBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      startView: false,
      viewed: false,
      mount: false
    };

    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentWillUnmount() {
    if (viewTimer) {
      window.clearTimeout(viewTimer);
    }
  }

  onEnter() {
    if (this.state.mount) {
      PushDL_ViewProduct(
        constructProductViewedData({
          product: this.props.product,
          DL: this.props.DL || {}
        })
      );
      this.setState({ viewed: true });
    }
  }

  getPrice() {
    const g_id = this.props.customerGroupId; // get from the user information
    const qty = 1;
    const tier_prices = calculatePriceRange(this.props.product.simples, qty);
    const origin_prices = calculateOriginPriceRange(this.props.product.simples);
    const priceBox = (
      <div>
        {renderPrice(tier_prices, g_id, origin_prices)}
        <div>
          {renderPriceMap(this.props.tiers, tier_prices, this.props.product.display_id)}
        </div>
      </div>
    );
    return priceBox;
  }

  render() {
    const { product, DL } = this.props;
    const ColSettings = {
      xs: 6, sm: 12, md: 12, lg: 12
    };
    const mainImage = product
      && product.images
      && product.images.main
      && product.images.main.images
      && product.images.main.images.sm
      ? product.images.main.images.sm
      : null;
    const hoverImage = product
      && product.images
      && product.images.hover
      && product.images.hover.images
      && product.images.hover.images.sm
      ? product.images.hover.images.sm
      : null;
    const mainImage_name = product && product.images && product.images.main && product.images.main.title
      ? product.images.main.title
      : null;
    const hoverImage_name = product && product.images && product.images.hover && product.images.hover.title
      ? product.images.hover.title
      : null;
    const currentImage = this.state.hover && hoverImage ? hoverImage : mainImage;
    const img_alt = this.state.hover && hoverImage ? hoverImage_name : mainImage_name;
    const img_title = this.state.hover && hoverImage ? hoverImage_name : mainImage_name;

    const waypoint = this.state.startView && !this.state.viewed ? (
      <Waypoint
        onEnter={() => {
          viewTimer = window.setTimeout(this.onEnter, 1000);
        }}
        onLeave={() => {
          if (typeof viewTimer !== "undefined" && viewTimer) {
            window.clearTimeout(viewTimer);
          }
        }}
        scrollableAncestor={window}
        topOffset={
            window.document.documentElement.clientWidth <= 992 ? "75px" : "158px"
          }
      />
    ) : (
      ""
    );

    return (
      <div>
        <Col {...ColSettings}>
          <Link
            to={`/product/${product.display_id}`}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            onClick={() => {
              PushDL_ClickProduct(constructProductClickData({ product, DL: DL || {} }));
            }}
          >
            <Image
              className={styles.image}
              src={currentImage ? currentImage.url : "http://via.placeholder.com/150x150"}
              alt={img_alt}
              title={img_title}
              responsive
              onLoad={() => {
                this.setState({ startView: true });
              }}
            />
          </Link>
          {waypoint}
        </Col>
        {/* <Col {...ColSettings} >
          <div>
            {this.getPrice()}
          </div>
        </Col> */}
      </div>
    );
  }
}

export default ProductRowCardResponsiveBasics;
