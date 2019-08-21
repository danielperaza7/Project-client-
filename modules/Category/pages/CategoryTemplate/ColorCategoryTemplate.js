/*
  Created by YZ

  This category container contains:
  1. get a list of products
  2. set one from many listing templates according server response
  3. render
*/

import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Popover,
  OverlayTrigger,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import marked from "marked";
import MediaQuery from "react-responsive";
import history from "../../../../history";
import ColorCategoryList from "../../components/CategoryList/ColorCategoryList";
import PageIndicator from "../../components/PageIndicator/PageIndicator";

import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import styles from "../CategoryContainer/CategoryContainer.css";
// import state getter from reducer
import {
  getProductList,
  getOrderBy,
  getFilters,
  getBreadcrumbs,
  getPeers,
  getPageNum,
  getFetchingCategoryProducts,
  getFetchingCategory,
  getCategoryMetaInfo,
  getCategoryName,
  getCategoryChildrenMenu
} from "../../CategoryReducer";
import {
  getStoreName, getTiers,
  getCustomerGroupId,
  getClientMD,
  getServerLocation
} from "../../../App/AppReducer";

class ColorCategoryTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active:
        this.props.breadcrumbs && this.props.breadcrumbs.length >= 1
          ? this.props.breadcrumbs[this.props.breadcrumbs.length - 1].name
          : ""
    };
    this.changeOptions = this.changeOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.breadcrumbs) {
      this.setState({
        active:
          nextProps.breadcrumbs.length >= 1
            ? nextProps.breadcrumbs[nextProps.breadcrumbs.length - 1].name
            : ""
      });
    }
  }

  changeOptions(val, url) {
    this.setState({
      active: val
    });
    history.push(url);
  }

  render() {
    const {
      clientMD,
      productList,
      breadcrumbs,
      peers,
      children
    } = this.props;
    if (!productList) return null;
    if (!breadcrumbs || !peers) return null;
    let couponCode = null;
    let finalSale = null;
    let allFinalSale = true;
    let finalSaleDescription = null;
    productList.forEach((product) => {
      if (!product.final_sale) {
        allFinalSale = false;
      } else if (!finalSaleDescription) {
        finalSaleDescription = product.final_sale;
      }
    });

    const boxHeightwithFinalSale = allFinalSale ? { height: "60px" } : { height: "30px" };

    const getMarkeddownText = (src) => {
      const rawMarkup = marked(src);
      return { __html: rawMarkup };
    };

    const finalSaleDescriptionBox = (
      <Popover id="popover-trigger-click-root-close">
        <span
          dangerouslySetInnerHTML={getMarkeddownText(
            finalSaleDescription || ""
          )}
        />
      </Popover>
    );

    if (
      productList
      && productList[0].prom
      && productList[0].prom.short
      && productList[0].prom.short !== ""
    ) {
      couponCode = (
        <div style={{ display: "inline-flex" }}>
          <div
            dangerouslySetInnerHTML={{ __html: marked(productList[0].prom.short) }}
          />
        </div>
      );
    }

    if (allFinalSale) {
      finalSale = (
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={finalSaleDescriptionBox}
        >
          <div style={{ cursor: "pointer" }} className={styles["attr-list-item"]}>
            FINAL SALE
            {" "}
            <i style={{ color: "#C1B497" }} className="ion-help-circled" />
          </div>
        </OverlayTrigger>
      );
    }

    let upperMenu = breadcrumbs.length >= 1 ? breadcrumbs[breadcrumbs.length - 2] : null;
    if (breadcrumbs.length === 1) upperMenu = breadcrumbs[0];
    const curMenu = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1] : null;
    const breadcrumbUpperNode = upperMenu ? (
      <Link to={upperMenu.url} className={styles.breadcrumbUpperNode}>
        {upperMenu.name}
      </Link>
    ) : null;
    let breadcrumbPeerNodes = null;
    let breadcrumbPeerNodesMobile = null;
    if (children && children.length > 0) {
      breadcrumbPeerNodesMobile = children && children.length
        ? children.map(p => (
          <MenuItem
            value={p.url}
            key={p.label}
            onClick={() => this.changeOptions(p.label, p.url)}
          >
            {p.label}
          </MenuItem>
        ))
        : null;

      breadcrumbPeerNodes = children && children.length
        ? children.map(p => (
          <Link
            to={p.url}
            key={p.label}
            className={`${styles.breadcrumbPeerNodes} ${
              curMenu.url === p.url ? styles.currentNode : ""
            }`}
          >
            {p.label}
          </Link>
        ))
        : null;
    } else {
      breadcrumbPeerNodesMobile = peers && peers.length
        ? peers.map(p => (
          <MenuItem
            value={p.url}
            key={p.label}
            onClick={() => this.changeOptions(p.label, p.url)}
          >
            {p.label}
          </MenuItem>
        ))
        : null;

      breadcrumbPeerNodes = peers && peers.length
        ? peers.map(p => (
          <Link
            to={p.url}
            key={p.label}
            className={`${styles.breadcrumbPeerNodes} ${
              curMenu.url === p.url ? styles.currentNode : ""
            }`}
          >
            {p.label}
          </Link>
        ))
        : null;
    }

    const cms_id = `${curMenu.name.replace(/\s+/g, "")}-ColorCategory-id`;
    return (
      <div>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <CMSBlock {...{ cmsid: cms_id, colorCategory: true }} />
          <div className={styles.topColorBar}>
            {breadcrumbUpperNode}
            <i className="ion-android-arrow-dropright" />
            {breadcrumbPeerNodes}
          </div>
          <ColorCategoryList
            productList={this.props.productList}
            tiers={this.props.tiers}
            customer_group_id={this.props.customer_group_id}
            fetchingCategoryProducts={this.props.fetchingCategoryProducts}
            clientMD={clientMD}
          />
          <PageIndicator
            changePage={this.props.changePage}
            pageNum={this.props.pageNum}
          />
        </MediaQuery>

        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div className={styles.topColorBar}>
            <div className={styles.topColorBar}>
              <div
                style={{
                  width: "30%",
                  display: "inline-flex",
                  float: "left",
                  marginTop: "2px"
                }}
              >
                {breadcrumbUpperNode}
                <i className="ion-android-arrow-dropright" />
              </div>
              <div style={{ width: "70%", display: "inline-flex" }}>
                <DropdownButton
                  className={styles["menu-option"]}
                  bsStyle="link"
                  title={this.state.active ? this.state.active : "Mystical"}
                  id="menu-by"
                >
                  {breadcrumbPeerNodesMobile}
                </DropdownButton>
              </div>
            </div>
          </div>
          <CMSBlock {...{ cmsid: cms_id, colorCategory: true }} />
          <div className={styles.PromotionSection} style={boxHeightwithFinalSale}>
            Sale for this page:
            {" "}
            {couponCode}
            {finalSale}
          </div>
          <ColorCategoryList
            productList={this.props.productList}
            tiers={this.props.tiers}
            customer_group_id={this.props.customer_group_id}
            fetchingCategoryProducts={this.props.fetchingCategoryProducts}
            clientMD={clientMD}
          />
          <PageIndicator
            changePage={this.props.changePage}
            pageNum={this.props.pageNum}
          />
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    storeName: getStoreName(store),
    productList: getProductList(store),
    filters: getFilters(store),
    orderby: getOrderBy(store),
    breadcrumbs: getBreadcrumbs(store),
    peers: getPeers(store),
    categoryName: getCategoryName(store),
    pageNum: getPageNum(store),
    intl: store.intl,
    tiers: getTiers(store),
    customer_group_id: getCustomerGroupId(store),
    fetchingCategory: getFetchingCategory(store),
    fetchingCategoryProducts: getFetchingCategoryProducts(store),
    categoryMeta: getCategoryMetaInfo(store),
    clientMD: getClientMD(store),
    serverLocation: getServerLocation(store),
    children: getCategoryChildrenMenu(store)
  };
}

export default connect(mapStateToProps)(ColorCategoryTemplate);
