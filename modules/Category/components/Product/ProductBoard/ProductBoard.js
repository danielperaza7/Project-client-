/*
  self containdx Product board, props in one product,
  only dispatch following actions:
    1. add to cart
    2. add to wishlist
    3. show size guide

  props:
    1. product: object
    2. galleryMode: "GalleryWithThumbnails", "GalleryCarousel"
    3. detail: 1 render detail, 0 not
    4. settings: settings for gallary (NOT required)
*/

import React from "react";
import {
  Row, Col, Button, Panel, PanelGroup
} from "react-bootstrap";
import _ from "lodash";
import { parse } from "query-string";
import { connect } from "react-redux";
import marked from "marked";
import { Link, withRouter } from "react-router-dom";
import Waypoint from "react-waypoint";
import history from "../../../../../history";
import styles from "./ProductBoard.css";
import {
  getCompleteLookProductsReviewData,
  getCustomerReviews
} from "../../../CategoryReducer";
// import custom components
import GalleryWithThumbnails from "../../Galleries/GalleryWithThumbnails/GalleryWithThumbnails";
import GalleryCarousel from "../../Galleries/GalleryCarousel/GalleryCarousel";
import ConfigPanel from "../../ConfigPanel/default/ConfigPanel";
import {
  calculatePriceRange,
  renderPrice,
  renderPriceMap,
  calculateOriginPriceRange
} from "../../Price/PriceRange";

import {
  constructAddToCartData,
  constructProductClickData,
  PushDL_ClickProduct,
  constructProductViewedData,
  PushDL_ViewProduct,
  constructProductDetailViewedData,
  PushDL_ViewProductDetail
} from "../../../../Analytics/components/GA";

import CircleLoader from "../../../../../components/masks/CircleLoader";
import CustomModal from "../../../../../components/Modal/CustomModal";
// import { configsStatusToQuery } from '../../Category_helpers';
import { getCustomerGroupId } from "../../../../App/AppReducer";
import FinalSale from "../../../../CheckoutV2/components/ItemDetail/FinalSale";
import MembershipPrice from "../../MembershipPrice/MembershipPrice";
import { addToCart, addToWishList } from "../../../../CheckoutV2/CheckoutActions";
import { ITEM_QTY_MAX } from "../../../../../config/config";
import { addError } from "../../../../App/AppActions";
import GiftCardCustomerInfo from "../GiftCardCustomerInfo";

let viewTimer;

class ProductBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    // hard coded configsStatus default values
    // the avail actually is a value calculated from props and state, only selected is real state
    // but here for my coding convenience I just put avail in state...
    this.state = {
      configsStatus: {
        color: {
          selected: null
        },
        band_size: {
          selected: null
        },
        cup_size: {
          selected: null
        },
        size: {
          selected: null
        },
        price: {
          selected: null
        }
      },
      giftCardInfo: {
        to: "",
        from: "",
        email: "",
        email_confirmation: "",
        message: ""
      },
      qty: 1,
      expandedDetailIndex: "0",
      addingToCart: false,
      addingToWishList: false,
      showModal: false,
      index: "showModal_returns",
      remind_user: false,
      startView: false,
      viewed: false,
      mount: false,
      press_once: true,
      errMsg_giftCard: ""
    };
    this.selectConfig = this.selectConfig.bind(this);
    this.selectDetailEntry = this.selectDetailEntry.bind(this);
    this.getCurrentGallery = this.getCurrentGallery.bind(this);
    this.changeQty = this.changeQty.bind(this);
    this.validateAbleToAddToCart = this.validateAbleToAddToCart.bind(this);
    this.validateOutOfStock = this.validateOutOfStock.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.handleAddToCartResponse = this.handleAddToCartResponse.bind(this);
    this.onclick_proms = this.onclick_proms.bind(this);
    this.onclick_returns = this.onclick_returns.bind(this);
    this.close = this.close.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.handleAddToWishList = this.handleAddToWishList.bind(this);
    this.handleAddToWishListResponse = this.handleAddToWishListResponse.bind(this);
    this.changGiftCardInfo = this.changGiftCardInfo.bind(this);
  }

  componentDidMount() {
    this.handleState(true);
  }

  componentDidUpdate(prevProps, prevState) {
    this.handleState(false, prevProps, prevState);
  }

  // eslint-disable-next-line
  handleState = (mount, prevProps, prevState) => {
    // if only one option , select it
    const status = JSON.parse(JSON.stringify(this.state.configsStatus));
    let dirty = false;
    const configs = JSON.parse(JSON.stringify(this.props.product.configs));
    if (this.props.product) {
      _.map(configs, ({ options }, config) => {
        if (options.length === 1) {
          dirty = true;
          status[config].selected = options[0].id;
        }
      });
    }

    if (this.props.detail === "1") {
      const { location } = this.props.history;
      const search = parse(location.search);
      Object.assign(location.query, search);

      // console.log('this is location query', location);
      if (location) {
        _.map(location.query, (value, key) => {
          if (configs[key] && configs[key].options) {
            const optionMatched = _.find(configs[key].options, (o) => {
              return o.id === location.query[key];
            });
            if (key in status && optionMatched) {
              dirty = true;
              const intValue = parseInt(value, 10);
              status[key].selected = value === intValue ? Number(intValue) : value;
            }
          }
        });
      }
    }

    // update state
    if (dirty) {
      if (!prevState || (!_.isEqual(prevState.configsStatus, status) && !_.isEqual(prevProps.product, this.props.product))) {
        this.setState(mount ? {
          configsStatus: status,
          mount: true
        } : { configsStatus: status });
      }
    } else if (mount && !this.state.mount) {
      this.setState({ mount: true });
    }
  }

  componentWillUnmount() {
    if (viewTimer) {
      window.clearTimeout(viewTimer);
    }
  }

  onclick_proms() {
    this.setState({
      index: "showModal_proms",
      showModal: true
    });
  }

  onclick_returns() {
    this.setState({
      index: "showModal_returns",
      showModal: true
    });
  }

  onEnter(priceToPush) {
    if (this.state.mount) {
      if (this.props.detail !== "1") {
        PushDL_ViewProduct(
          constructProductViewedData({
            product: this.props.product,
            DL: this.props.DL || {},
            priceToPush
          })
        );
      } else {
        // this.props.detail==="1"
        PushDL_ViewProductDetail(
          constructProductDetailViewedData({
            product: this.props.product,
            DL: this.props.DL || {},
            priceToPush
          })
        );
      }
      this.setState({
        viewed: true
      });
    }
  }

  getCurrentGallery() {
    // according to config status get current gallery, hard code the logic...
    const keyOrder = ["color", "size", "band_size", "cup_size", "price"];
    if (this.props.product) {
      const { configsStatus } = this.state;
      const { configs } = this.props.product;
      for (let i = 0; i < keyOrder.length; i++) {
        const key = keyOrder[i];
        const { selected } = configsStatus[key];
        if (selected !== null) {
          const { options } = configs[key];
          const idx = _.findIndex(options, { id: selected });
          if (options[idx] && options[idx].gallery) {
            return options[idx].gallery;
          }
        }
      }
      return this.props.product.images.gallery;
    }
    return null;
  }

  getPrice() {
    // get filtered simples by selected configs
    // console.log('get Price Called!', this.props);
    const g_id = this.props.customerGroupId; // should fetch customer group_id from somewhere
    const { qty } = this.state;
    // console.log(this.props.product.simples);
    // console.log(_.filter(this.props.product.simples, { 'prices': { "group_id":g_id,"qty":1 }  }));
    const filter = {};
    const { configsStatus } = this.state;
    for (const config in configsStatus) {
      if (configsStatus[config].selected !== null) {
        filter[config] = configsStatus[config].selected;
      }
    }

    const filteredSimples = _.filter(this.props.product.simples, (simple) => {
      let match = true;
      _.forEach(filter, (value, key) => {
        if (match && _.findIndex(simple.config[key], { id: value }) < 0) {
          match = false;
        }
      });
      return match;
    });

    if (filteredSimples.length === 0) {
      return (
        <div className={styles.priceBox}>
          <div className={styles.fakePrice}>
            {`$${this.props.product.simples[0].price
              || this.props.product.simples[0][0].price}`}
          </div>
        </div>
      );
    }

    const tier_prices = calculatePriceRange(filteredSimples, qty);
    const origin_prices = calculateOriginPriceRange(filteredSimples);
    const priceToShow = renderPrice(tier_prices, g_id, origin_prices);

    const priceBox = (
      <div className={styles.priceBox}>
        <div>
          {priceToShow}
          <div>
            {renderPriceMap(this.props.tiers, tier_prices, this.props.product.display_id)}
          </div>
        </div>
      </div>
    );

    return {
      priceBox,
      priceToPush: Array.isArray(priceToShow.props.children)
        ? parseInt(priceToShow.props.children[1].props.children.split("$")[1], 10)
        : parseInt(priceToShow.props.children.split("$")[1], 10)
    };
  }

  getRealPrice() {
    const { product } = this.props;
    if (product && product.simples && product.simples[0]) {
      if (
        product.simples[0].tier_prices
        && product.simples[0].tier_prices[0]
        && product.simples[0].tier_prices[0].value
      ) {
        const realPrice = product.simples[0].tier_prices[0].value;
        return [[realPrice, realPrice]];
      }
      const realPrice = product.simples[0].price ? product.simples[0].price : 0;
      return [[realPrice, realPrice]];
    }
    return [[0, 0]];
  }

  changeQty(dif) {
    // update qty in this.state
    let qty = this.state.qty + dif;
    const validation = this.validateAbleToAddToCart();
    if (qty < 1) {
      qty = 1;
    } else if (
      validation.simple
      && validation.simple.stock
      && validation.simple.stock.qty
    ) {
      if (qty > validation.simple.stock.qty) {
        qty = validation.simple.stock.qty;
      }
    }

    if (qty > ITEM_QTY_MAX) {
      qty = ITEM_QTY_MAX;
    }
    // console.log('changeQty called')
    this.setState({
      qty
    });

    // prepare simples
    // call updatePrice(simples, qty)
  }

  selectConfig(configId, valueId) {
    // action, update state
    // 1. set selected value: if same, set null, otherwise set as valueId
    const status = JSON.parse(JSON.stringify(this.state.configsStatus));
    status[configId].selected = status[configId].selected === valueId ? null : valueId;

    // 2. update state
    this.setState({
      configsStatus: status,
      qty: 1
    });

    // 3. only for main product push configsStatus to console log
    const { location, detail } = this.props;
    if (location) {
      if (detail === "1") {
        // console.log('Product link with configsStatus: ',location.pathname+configsStatusToQuery(status));
      }
    }
  }

  selectDetailEntry(index) {
    this.setState({
      // do not use ===
      expandedDetailIndex: this.state.expandedDetailIndex === index ? null : `${index}`
    });
  }

  changGiftCardInfo(event, key) {
    if (key === "email" || key === "email_confirmation") {
      this.setState({
        errMsg_giftCard: ""
      });
    }
    const info = JSON.parse(JSON.stringify(this.state.giftCardInfo));
    info[key] = event.target.value;
    this.setState({
      giftCardInfo: info
    });
  }

  // Validate if all the colors sizes of the current product is out of stock
  validateOutOfStock(simples) {
    const iteminStock = simples.map(item => item.stock.in_stock);
    const inStock = iteminStock.reduce((a, b) => {
      return a || b;
    });
    return inStock;
  }

  validateAbleToAddToCart(pos) {
    // return objet { canAdd: true, simple: , msg:''}
    // validate configs
    // console.log('validateAbleToAddToCart called', this.props);
    const isKit = this.props.product.sub_products && this.props.product.sub_products.length > 0;
    // check if Sold out for a product's all configs
    if (
      this.props.product.simples
      && this.props.product.simples.length >= 1
      && pos !== "wishlist"
      && !isKit
    ) {
      const inStock = this.validateOutOfStock(this.props.product.simples);
      if (!inStock) {
        return {
          canAdd: false,
          simple,
          msg: "This product is sold out for all styles",
          allSoldOut: true
        };
      }
    }

    // The rest of this function validates a specific config for this product
    let validated = true;
    const giftCard = this.props.product
      && this.props.product.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .indexOf("giftcard") !== -1;
    for (const key in this.props.product.configs) {
      if (
        !(
          this.state.configsStatus[key] && this.state.configsStatus[key].selected !== null
        )
      ) {
        // console.log(key)
        validated = false;
      }
    }
    if (!validated) {
      return {
        canAdd: false,
        simple: null,
        msg: "Please",
        allSoldOut: false
      };
    }

    // get selected simples's sku
    let simple = null;
    if (isKit) {
      // if the product is kit product
      let minIdx = 0;
      let min = this.props.product.sub_products[0].detail_stock[0].qty;
      for (let i = 1; i < this.props.product.sub_products.length; i++) {
        if (this.props.product.sub_products[i].detail_stock[0].qty < min) {
          minIdx = i;
          min = this.props.product.sub_products[i].detail_stock[0].qty;
        }
      }

      // 找到kit中stock最少的sub product来作为kit商品本身的stock信息
      const productSimpleClone = _.cloneDeep(this.props.product.simples[0]);
      productSimpleClone.detail_stock = _.cloneDeep(
        this.props.product.sub_products[minIdx].detail_stock
      );
      productSimpleClone.stock = _.cloneDeep(
        this.props.product.sub_products[minIdx].stock
      );
      simple = productSimpleClone;
      // console.log('vali.simple returned!', simple);
      // console.log('this.state.qty', this.state.qty);
      return {
        canAdd: simple.stock.in_stock && simple.stock.qty >= this.state.qty,
        simple,
        msg: "",
        allSoldOut: false
      };
    } if (
      this.props.product
      && this.props.product.simples
      && this.props.product.simples.length === 1
    ) {
      // if the product is simple product
      simple = this.props.product.simples[0];
    } else {
      // if the product has color size cup-size
      const status = this.state.configsStatus;
      const findIndex = _.findIndex(this.props.product.simples, (simple2) => {
        if (giftCard) return simple2.price === status.price.selected;
        let match = true;
        _.forEach(status, (value, key) => {
          if (
            value.selected
            && match
            && simple2.config[key]
            && _.findIndex(simple2.config[key], { id: value.selected }) < 0
          ) {
            match = false;
          }
        });
        return match;
      });
      if (findIndex < 0) {
        console.log("cannot find product with current configuration");
        return {
          canAdd: false,
          simple: null,
          notExist: true,
          msg: "cannot find product with current configuration",
          allSoldOut: false
        };
      } // cannot find this simple ???
      simple = this.props.product.simples[findIndex];
    }
    // check stock
    if (
      (!simple.stock.in_stock || simple.stock.qty < this.state.qty)
      && pos !== "wishlist"
    ) {
      // console.log('not enough stock')
      return {
        canAdd: false,
        simple,
        msg: `Try to add ${this.state.qty} items, but only ${simple.stock.qty} left`,
        allSoldOut: false
      };
    }

    return {
      canAdd: true,
      simple,
      msg: "",
      allSoldOut: false
    };
  }

  handleAddToWishList() {
    const vali = this.validateAbleToAddToCart("wishlist");
    if (vali.canAdd && vali.simple && vali.simple.sku) {
      this.props.dispatch(
        addToWishList(this.state.qty, vali.simple.sku, this.handleAddToWishListResponse)
      );
      this.setState({
        press_once: false
      });
    } else this.showConfigReminder();
  }

  handleAddToCart() {
    // console.log('handle Add to cart called');
    const { giftCardInfo } = this.state;
    const egiftCard = this.props.product
      && this.props.product.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .indexOf("e-giftcard") !== -1;
    if (this.state.giftCardInfo.email !== this.state.giftCardInfo.email_confirmation) {
      this.setState({
        errMsg_giftCard: "Please confirm Recepient's email"
      });
      return;
    }
    if (
      egiftCard
      && (!this.state.giftCardInfo.email || !this.state.giftCardInfo.email_confirmation)
    ) {
      this.setState({
        errMsg_giftCard: "Please input Recepient's email"
      });
      return;
    }
    if (this.state.addingToCart) {
      return;
    }
    const vali = this.validateAbleToAddToCart("cart");
    // console.log('valie in handleAddToCart', vali);
    // console.log('this.state', this.state);
    const isKit = (this.props.product.sub_products && this.props.product.sub_products.length > 0)
      || false;
    let display_id = "";
    if (this.props.location && this.props.location.pathname) {
      display_id = this.props.location.pathname.replace("/product/", "");
    } else if (this.props.product && this.props.product.display_id) {
      display_id = this.props.product.display_id;
    }

    if (vali.canAdd && vali.simple && vali.simple.sku) {
      // dispatch add to cart
      // construct DL_Data
      const DL_DataProps = {
        display_id,
        simple: vali.simple,
        product: this.props.product,
        qty: this.state.qty,
        customerGroupId: this.props.customerGroupId,
        DL: this.props.DL
      };
      const DL_Data = constructAddToCartData(DL_DataProps);
      this.setState({
        addingToCart: true
      });
      const giftCard_data = {
        sku: vali.simple.sku,
        qty: this.state.qty,
        "E-giftCard": true,
        fromName: giftCardInfo.from,
        toName: giftCardInfo.to,
        receiptEmail: giftCardInfo.email,
        message: giftCardInfo.message,
        price: vali.simple.price
      };
      this.props.dispatch(
        addToCart(
          giftCardInfo.email
            ? giftCard_data
            : {
              qty: this.state.qty,
              sku: vali.simple.sku,
              isKit
            },
          DL_Data,
          this.handleAddToCartResponse
        )
      );
    } else {
      // console.log(vali.msg);
      this.showConfigReminder();
    }
  }

  showConfigReminder() {
    const giftCard = this.props.product
      && this.props.product.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .indexOf("giftcard") !== -1;
    this.props.dispatch(
      addError({
        code: "product page",
        msg: !giftCard ? "Please select color/size" : "Please select gift card value"
      })
    );
    this.setState({
      remind_user: true
    });
    window.setTimeout(() => {
      this.setState({
        remind_user: false
      });
    }, 2500);
  }

  handleAddToCartResponse(success, stock_info) {
    this.setState({ addingToCart: false });
    if (!success && stock_info) {
      const { item_sku, stock_qty } = stock_info;
      const thisSimple = this.props.product.simples.find(p => p.sku === item_sku);
      if (thisSimple && thisSimple.stock && thisSimple.stock.qty !== stock_qty) {
        if (window && window.location) {
          history.push(
            `${window.location.pathname}${window.location.search || ""}`
          );
        }
      }
    }
  }

  handleAddToWishListResponse(success) {
    this.setState({ addingToWishList: success });
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  renderGallery() {
    const props = {
      Gallery: this.getCurrentGallery(),
      settings: this.props.settings || null,
      enableEnlarge: true,
      onLoad: () => {
        this.setState({
          startView: true
        });
      }
    };
    switch (this.props.galleryMode) {
      case "GalleryWithThumbnails": // "GalleryWithThumbnails", "GalleryCarousel"
        return <GalleryWithThumbnails {...props} />;
      case "GalleryCarousel":
        return <GalleryCarousel {...props} />;
      default:
        return <GalleryWithThumbnails {...props} />;
    }
  }

  renderConfigPanel() {
    // console.log('renderConfigPanel', this.props);
    const isKit = this.props.product.sub_products && this.props.product.sub_products.length > 0;
    if (this.props.product.type === "c") {
      // render only for configurable product
      return (
        <ConfigPanel
          remind_user={this.state.remind_user}
          selectConfig={this.selectConfig}
          configs={this.props.product.configs}
          configsStatus={this.state.configsStatus}
          simples={this.props.product.simples}
          selectedCategory={this.props.product.size_guide_cat_id}
          isKit={isKit}
        />
      );
    }
    return null;
  }

  renderDetailPanel(detail) {
    // dangerouslySetInnerHTML !!! is there a better way ???
    if (this.props.detail === "1") {
      const content = this.props.product.details.map((object, index) => {
        if (!object || _.isEmpty(object)) {
          return null;
        }
        const title = (
          <Panel.Heading>
            <Panel.Title toggle>
              <span>{object.title}</span>
              <span className="pull-right">
                <i
                  className={
                    /* do not use === */ `${index}` !== this.state.expandedDetailIndex
            ? "ion-android-add"
            : "ion-android-remove"
                  }
                />
              </span>
            </Panel.Title>
          </Panel.Heading>
        );
        return (
          <Panel
            key={index}
            id={object.title}
            eventKey={`${index}`}
            className={styles["single-panel"]}
          >
            {title}
            <Panel.Body collapsible>
              <div
                className={styles.panelContent}
                dangerouslySetInnerHTML={{ __html: marked(object.html) }}
              />
            </Panel.Body>
          </Panel>
        );
      });
      return (
        <Col {...detail}>
          <PanelGroup
            accordion
            className={styles.panels}
            id="info-panels"
            onSelect={this.selectDetailEntry}
            defaultActiveKey="0"
          >
            {content}
          </PanelGroup>
        </Col>
      );
    }

    return null;
  }

  renderProm(galleryMode) {
    if (
      this.props.product
      && this.props.product.prom
      && this.props.product.prom.long
      && this.props.product.prom.long !== ""
    ) {
      return (
        <div>
          <div
            className={`${styles["promotion-wrapper"]} ${
              this.props.galleryMode === "GalleryWithThumbnails"
                ? styles["align-to-main-img"]
                : ""
            }`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: marked(this.props.product.prom.long)
              }}
            />
          </div>
          <div
            className={styles.return}
            onClick={this.onclick_proms}
            style={{
              display: this.props.product.prom.detail ? "" : "none",
              marginLeft: galleryMode === "GalleryWithThumbnails" ? "16.67%" : ""
            }}
          >
            <i className="ion-ios-arrow-right" />
            Click here for more offer details.
          </div>
        </div>
      );
    }
    return null;
  }

  renderQty(vali) {
    console.log("renderQty", vali);
    if (vali.allSoldOut) {
      return <div className={styles["out-of-stock"]}>Sold Out</div>;
    }
    if (vali.notExist) {
      return <div className={styles["out-of-stock"]}>Not Available</div>;
    }
    // error handling
    if (!vali.simple) {
      return (
        <div>
          <div className={styles.quantity}>
            Quantity:
            {" "}
            <span>In Stock</span>
          </div>
          {this.renderQtyButtons()}
        </div>
      );
    }
    // ckeck all the detail_stock to see if the product is sold out or not
    let total = 0;
    if (vali.simple.detail_stock && vali.simple.detail_stock.length > 0) {
      vali.simple.detail_stock.forEach((stock) => {
        total += stock.qty;
      });
      if (total === 0) {
        return <div className={styles["out-of-stock"]}>Sold Out</div>;
      }
    }
    // if online stock is <= 0
    if (!vali.simple.stock || !vali.simple.stock.qty || vali.simple.stock.qty <= 0) {
      return <div className={styles["out-of-stock"]}>Store Only</div>;
    }

    if (vali.simple.stock.qty < ITEM_QTY_MAX) {
      return (
        <div>
          <div className={styles.quantity}>
            Quantity:
            {" "}
            <span>
              {vali.simple.stock.qty}
              {" "}
left
            </span>
          </div>
          {this.renderQtyButtons(vali.simple.stock.qty)}
        </div>
      );
    }
    return (
      <div>
        <div className={styles.quantity}>
          Quantity:
          {" "}
          <span>In Stock</span>
        </div>
        {this.renderQtyButtons(vali.simple.stock.qty)}
      </div>
    );
  }

  renderQtyButtons(stock_qty) {
    const can_minus = this.state.qty > 1;
    const can_plus = this.state.qty < stock_qty && this.state.qty < ITEM_QTY_MAX;
    return (
      <div className={styles["quantity-btn-wrapper"]}>
        <Button
          onClick={() => {
            if (can_minus) {
              this.changeQty(-1);
            }
          }}
          className={can_minus ? styles["qty-minus"] : styles["disabled-qty"]}
        >
          <i className="ion-android-remove" />
        </Button>
        <Button className={styles["qty-qty"]}>{this.state.qty}</Button>
        <Button
          onClick={() => {
            if (can_plus) {
              this.changeQty(1);
            }
          }}
          className={can_plus ? styles["qty-plus"] : styles["disabled-qty"]}
        >
          <i className="ion-android-add" />
        </Button>
      </div>
    );
  }

  renderFinaSale(vali) {
    return (
      <div className={styles.finalSale}>
        {vali && vali.simple && vali.simple.final_sale ? (
          <FinalSale description={vali.simple.final_sale} />
        ) : null}
      </div>
    );
  }

  renderAddToCart(vali) {
    let allSelected = true;
    console.log("renderAddToCart", vali);
    if (this.props.product && this.props.product.configs) {
      for (const configKey in this.props.product.configs) {
        if (this.state.configsStatus[configKey].selected === null) {
          allSelected = false;
        }
      }
    } else {
      allSelected = false;
    }

    return (
      <div>
        {/* render ADD TO BAG black button */}
        <button
          onClick={() => this.handleAddToCart()}
          className={styles["add-to-bag-btn"]}
          disabled={(!vali.canAdd && allSelected) || vali.allSoldOut ? "disabled" : ""}
        >
          {this.state.addingToCart ? (
            <span>
              <span style={{ marginRight: "10px" }}>ADDING TO BAG</span>
              <CircleLoader />
            </span>
          ) : !((!vali.canAdd && allSelected) || vali.allSoldOut) ? (
            "ADD TO BAG"
          ) : (
            "NOT AVAILABLE"
          )}
        </button>
        {/* render Shipping & Return information */}
        <div className={styles.return} onClick={this.onclick_returns}>
          <i className="ion-ios-arrow-right" />
          Shipping & Return information
        </div>
        {// render add to wishList
        this.props.customerGroupID >= 1 ? (
          <div
            onClick={this.handleAddToWishList}
            className={styles.wishListBTN}
            disabled={!this.state.press_once}
            style={{
              textDecoration: !this.state.addingToWishList ? "underline" : "",
              color: this.state.addingToWishList ? "grey" : ""
            }}
          >
            Add To WishList
          </div>
        ) : null}
      </div>
    );
  }

  renderTitle(index, priceToPush) {
    // this.props.detail:  ==='1' -> main product  |||  !=='1' -> Complete the look, enable link on title
    if (index !== "1") {
      const color = this.state.configsStatus.color.selected;
      const size = this.state.configsStatus.size.selected;
      const band = this.state.configsStatus.band_size.selected;
      const cup = this.state.configsStatus.cup_size.selected;

      const dataToDL = {
        product: this.props.product,
        DL: this.props.DL || {},
        selectedAttr: {
          color: color || "",
          size: `${size || ""}`,
          band_size: `${band || ""}`,
          cup_size: `${cup || ""}`
        },
        priceToPush
      };

      return (
        <Link
          to={`/product/${this.props.product.display_id}`}
          onClick={() => {
            PushDL_ClickProduct(constructProductClickData(dataToDL));
          }}
        >
          <div
            className={
              this.props.enable_link
                ? styles["product-name-link"]
                : styles["product-name"]
            }
          >
            <h2>{this.props.product.name}</h2>
          </div>
        </Link>
      );
    }

    return (
      <div
        className={
          this.props.enable_link ? styles["product-name-link"] : styles["product-name"]
        }
      >
        <h1>{this.props.product.name}</h1>
      </div>
    );
  }

  render() {
    // hard coded Col config object, we may put it in props
    const ColConfigWithDetail = {
      gallery: {
        xs: 12, sm: 6, md: 6, lg: 5
      },
      info: {
        xs: 12, sm: 6, md: 6, lg: 7
      },
      basics: {
        xs: 12, sm: 12, md: 12, lg: 6
      },
      detail: {
        xs: 12, sm: 12, md: 12, lg: 6
      }
    };

    const ColConfigNoDetail = {
      gallery: {
        xs: 12, sm: 6, md: 6, lg: 6
      },
      info: {
        xs: 12, sm: 6, md: 6, lg: 6
      },
      detail: null
    };

    const modalProps = {
      showModal: this.state.showModal,
      onHide: this.close,
      size: "medium"
    };
    const shippingDetail = this.props.product.details[
      _.findIndex(this.props.product.details, (o) => {
        return o && o.title && o.title.toLowerCase().indexOf("shipping") !== -1;
      })
    ];
    const children = this.state.index === "showModal_proms"
      ? this.props.product.prom.detail
      : shippingDetail
        ? shippingDetail.html
        : "";
    const ColConfig = this.props.detail === "1" ? ColConfigWithDetail : ColConfigNoDetail;
    const vali = this.validateAbleToAddToCart();
    const egiftCard = this.props.product
      && this.props.product.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .indexOf("e-giftcard") !== -1;
    const giftCard = this.props.product
      && this.props.product.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .indexOf("giftcard") !== -1;
    const myPrice = this.getPrice();
    const giftCard_price = this.state.configsStatus.price.selected && giftCard
      ? this.state.configsStatus.price.selected
      : null;

    const { customerReviews, completeLookProductsReviewData } = this.props;
    const plur = customerReviews && customerReviews.review_number > 1 ? "s" : "";
    let rateReview = customerReviews ? customerReviews.average_rate : null;
    const five_star_num_list = [1, 2, 3, 4, 5];
    const num = Math.round(rateReview);
    rateReview = five_star_num_list.map(key => (
      <i
        className={
          key > num
            ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
            : `ion-android-star ${styles["ion-android-star"]}`
        }
      />
    ));
    let currentReviewRate = completeLookProductsReviewData !== undefined
      && this.props.product !== null
      && completeLookProductsReviewData[this.props.product.display_id] !== undefined
      ? completeLookProductsReviewData[this.props.product.display_id].average_rate
      : null;
    const newNum = Math.round(currentReviewRate);
    const membershipPriceProps = {
      list_id:
        this.props.product && this.props.product.list_id
          ? this.props.product.list_id
          : "",
      tier_prices: this.getRealPrice(),
      direction: "down",
      showSigninLinkOutside: true,
      display_id:
        this.props.product && this.props.product.display_id
          ? this.props.product.display_id
          : "",
      membershipPriceFullName: true,
      mp_special: this.props && this.props.product ? this.props.product.mp_special : false
    };
    currentReviewRate = five_star_num_list.map(key => (
      <i
        className={
          key > newNum
            ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
            : `ion-android-star ${styles["ion-android-star"]}`
        }
      />
    ));
    return (
      <div className={styles.product}>
        <Col {...ColConfig.gallery} className={`${styles.images} galleryImg`}>
          <Row>
            {this.renderGallery()}
            {this.state.startView && !this.state.viewed ? (
              <Waypoint
                onEnter={() => {
                  viewTimer = window.setTimeout(() => {
                    this.onEnter(myPrice.priceToPush);
                  }, 1000);
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
            )}
          </Row>
          <Row>{this.renderProm(this.props.galleryMode)}</Row>
        </Col>
        <Col {...ColConfig.info}>
          <Col {...ColConfig.basics}>
            {this.renderTitle(this.props.detail)}
            {customerReviews && this.props.detail === "1" ? (
              <a href="#review">
                <div className={styles.starList_mainProduct}>
                  {rateReview}
                  <span>{`${customerReviews.review_number} Review${plur}`}</span>
                </div>
              </a>
            ) : null}

            {this.props.detail === "0"
            && completeLookProductsReviewData !== undefined
            && this.props.product !== null
            && completeLookProductsReviewData[this.props.product.display_id]
              !== undefined ? (
                <div className={styles.starList_mainProduct}>
                  {currentReviewRate}
                  <span>
                    {`(${
                      completeLookProductsReviewData[this.props.product.display_id]
                        .review_number
                    })`}
                  </span>
                </div>
              ) : null}

            {giftCard ? (
              <div className={styles.giftCard_note}>
                {egiftCard
                  ? "Redeem online, or in store. Receive immediately."
                  : "REDEEM ONLINE, OR IN STORE."}
              </div>
            ) : null}

            <div>
              <span className={giftCard_price ? styles.priceBox_giftcard : ""}>
                {giftCard_price ? `$${giftCard_price}` : myPrice.priceBox}
              </span>
            </div>
            <div className={styles.membershipPriceContainer}>
              {this.props.product.brand === "Eve by Eve's" ? null : (
                <MembershipPrice {...membershipPriceProps} />
              )}
            </div>
            {this.renderConfigPanel(vali)}

            {egiftCard ? (
              <GiftCardCustomerInfo
                giftCardInfo={this.state.giftCardInfo}
                changGiftCardInfo={this.changGiftCardInfo}
                errMsg={this.state.errMsg_giftCard}
              />
            ) : null}

            {this.renderQty(vali)}
            {this.renderFinaSale(vali)}
            {this.renderAddToCart(vali)}
          </Col>
          {this.renderDetailPanel(ColConfig.detail)}
        </Col>
        {/* this.renderGalleryModal() */}

        <CustomModal {...modalProps}>
          <div
            className={styles.returnDetail}
            dangerouslySetInnerHTML={{ __html: marked(children) }}
          />
        </CustomModal>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    customerGroupID: getCustomerGroupId(store),
    customerReviews: getCustomerReviews(store),
    completeLookProductsReviewData: getCompleteLookProductsReviewData(store)
  };
}

export default withRouter(connect(mapStateToProps)(ProductBoard));
