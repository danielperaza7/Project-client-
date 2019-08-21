/*
  Created by YZ

  This category container contains:
  1. get a list of products
  2. set one from many listing templates according server response
  3. render
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import Helmet from "react-helmet";
import { Sticky } from "react-sticky";
import MediaQuery from "react-responsive";
import ReactDOM from "react-dom";
import CategoryList from "../../components/CategoryList/CategoryList";
import ColorCategoryList from "../../components/CategoryList/ColorCategoryList";
import FilterGroup from "../../components/Filter/FilterGroup";
import MobileFilterGroup from "../../components/Filter/Mobile/MobileFilterGroup";
import StateGroup from "../../components/Filter/State/StateGroup";
import OrderBy from "../../components/Sort/OrderBy";
import Breadcrumb from "../../components/Breadcrumb/default/BreadcrumbDefault";
import PageIndicator from "../../components/PageIndicator/PageIndicator";
import {
  getStoreName, getTiers, getCustomerGroupId, getClientMD, getServerLocation
} from "../../../App/AppReducer";
import DefaultMask from "../../../../components/masks/DefaultMask";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";
import { hasFilterInfo } from "../../CategoryReducer.js";

import { PushDL_EventData } from "../../../Analytics/components/GA";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";

import styles from "../CategoryContainer/CategoryContainer.css";
import SingleFilter_2 from "../../components/Filter/SingleFilter_2.js";


// import actions
// , fetchCategoryProductList
import { fetchCategory, resetCategory, fetchCategoryProducts } from "../../CategoryActions";
import { setShowMobileHeaderPromotion } from "../../../CMS/CMSActions";

// import state getter from reducer
import {
  getProductList, getOrderBy, getFilters, getBreadcrumbs, getPageNum, getFetchingCategoryProducts, getFetchingCategory, getCategoryMetaInfo, getCategoryName
} from "../../CategoryReducer";

import Clearance from "../../../CMS/components/Clearance/Clearance";


class DefaultCategoryTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { checkbox: false, showSticky: false, stickyBoundary: 650 };
    this.changeStickyStyle = _.debounce(this.changeStickyStyle, 100).bind(this);
    this.checkThisBox = this.checkThisBox.bind(this);
  }

  componentDidMount() {
    if (!window) return; // Stop here if SSR
    window.addEventListener("scroll", this.changeStickyStyle);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeStickyStyle);
  }

  changeStickyStyle(event) {
    if (this.refs.ToolBox != undefined && this.refs.TopBar != undefined) {
      this.setState({
        stickyBoundary: this.refs.ToolBox.clientHeight + this.refs.TopBar.clientHeight + 80
      });
    }
    if (event && event.target && event.target.body && event.target.scrollingElement) {
      if (event.target.scrollingElement.scrollTop >= this.state.stickyBoundary) {
        this.setState({ showSticky: true });
      } else {
        this.setState({ showSticky: false });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters && prevProps.filters != this.props.filters) {
      if (this.props.specialField && this.props.filters) {
        const specialFilter = this.props.filters.find(filter => filter.id === this.props.specialField);
        const optionsCount = specialFilter && specialFilter.options ? specialFilter.options.reduce((prevSum, option) => { return prevSum + option.status; }, 0) : 0;
        if (optionsCount >= 2) {
          this.setState({ checkbox: true });
        }
      }
    }
  }

  checkThisBox() {
    if (this.state.checkbox) {
      this.setState({ checkbox: !this.state.checkbox });
      this.props.clearAllSpecialFilters();
      const Eventdata = {
        eventCategory: "New Filter Events",
        eventAction: "Click",
        eventLabel: "Multi-categories clicked",
      };
      PushDL_EventData("normalComponentClicked", Eventdata);
    } else {
      this.setState({ checkbox: !this.state.checkbox });
    }
  }

  render() {
    const {
      location, categoryName, clientMD, serverLocation, breadcrumbs, storeName
    } = this.props;
    const topBarColSettings = {
      left: {
        lg: 10, md: 10, sm: 10, xs: 8
      },
      right: {
        lg: 2, md: 2, sm: 2, xs: 4
      }
    };

    let clearButton = null;
    const mode = this.props.filterCategory;
    const specialFiltersItem = this.props.specialField;
    if (this.props.hasFilter) {
      clearButton = (
        <span key="clearAll" onClick={(event) => { this.props.clearAllFilters(); event.currentTarget.setAttribute("style", "display:none"); }}>Clear All</span>
      );
    }

    let bannerHeaderCmsId;
    let bannerFooterCmsId;
    let upperMenu;
    let urls = [];

    if (breadcrumbs && breadcrumbs.length > 0) {
      upperMenu = breadcrumbs[0];
      urls = breadcrumbs.map(crumb => crumb.url);
    }

    if (upperMenu) {
      // Cover to a string with no space; replace & and with; to all camel case
      const upperMenuNoSpace = upperMenu.name.replace(/\s+/g, "").replace(/&/g, "and").toLowerCase();
      bannerHeaderCmsId = `${storeName}-${upperMenuNoSpace}-category-banner-header`;
      bannerFooterCmsId = `${storeName}-${upperMenuNoSpace}-category-banner-footer`;
    }

    switch (mode) {
      case 0: {
        const showDiscountLabel = false;
        return (
          <Grid>
            {bannerHeaderCmsId ? <CMSBlock {...{ cmsid: bannerHeaderCmsId, urls }} /> : null}
            <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <div className={styles.topBar}>
                <Breadcrumb breadcrumbs={this.props.breadcrumbs} storeName={this.props.storeName} />
                <div className={styles.CategoryName}>
                  <h3>{categoryName}</h3>
                </div>
              </div>
              <div className={styles.toolbar}>
                <FilterGroup filters={this.props.filters} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} changeFilter={this.props.changeFilter} mode={1} />
                <div style={{
                  alignSelf: "center", marginLeft: "auto", fontFamily: "GothamMedium", marginRight: "2%"
                }}
                >
Sort by
                </div>
                <OrderBy orderby={this.props.orderby} intl={this.props.intl} changeSortOrder={this.props.changeSortOrder} mode={1} />
              </div>
              {this.props.optionStatus && this.props.optionStatus.sum != 0 ? (
                <div className={styles.stateContainer}>
                  <StateGroup filters={this.props.filters} removeFilter={this.props.removeFilter} optionStatus={this.props.optionStatus} mode={2} />
                  <div className={styles.clearAll}>{clearButton}</div>
                </div>
              ) : null}
            </MediaQuery>

            <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <div className={styles.categoryName}>
                <h3>{categoryName}</h3>
              </div>
              <div className={styles.mobileToolBoxContainer}>
                <MobileFilterGroup optionStatus={this.props.optionStatus} filters={this.props.filters} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} changeFilter={this.props.changeFilter} clearAllFilters={this.props.clearAllFilters} mode={1} />
                <div className={styles.mobileSortByLabel}>Sort by</div>
                <OrderBy orderby={this.props.orderby} intl={this.props.intl} changeSortOrder={this.props.changeSortOrder} mode={1} />
              </div>
              {this.props.optionStatus && this.props.optionStatus.sum != 0 ? (
                <div className={styles.stateArea}>
                  <StateGroup filters={this.props.filters} removeFilter={this.props.removeFilter} optionStatus={this.props.optionStatus} mode={1} />
                </div>
              ) : null}
            </MediaQuery>

            <CategoryList
              productList={this.props.productList}
              tiers={this.props.tiers}
              customer_group_id={this.props.customer_group_id}
              fetchingCategoryProducts={this.props.fetchingCategoryProducts}
              showDiscountLabel={showDiscountLabel}
            />
            <PageIndicator changePage={this.props.changePage} pageNum={this.props.pageNum} />
            {bannerFooterCmsId ? <CMSBlock {...{ cmsid: bannerFooterCmsId, urls }} /> : null}
          </Grid>
        );
        break;
      }
      case 1: {
        const showDiscountLabel = true;
        let specialFilter = null;
        const newFilters = [];
        for (const k in this.props.filters) {
          if (this.props.filters && this.props.filters[k] && specialFiltersItem == this.props.filters[k].id) {
            specialFilter = this.props.filters[k];
          } else {
            newFilters.push(this.props.filters[k]);
          }
        }
        return (
          <div>
            {bannerHeaderCmsId ? <CMSBlock {...{ cmsid: bannerHeaderCmsId, urls }} /> : null}
            <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              {/* sticky bar */}
              {this.props.optionStatus && (this.props.optionStatus.sum - (this.props.optionStatus[specialFiltersItem] ? this.props.optionStatus[specialFiltersItem] : 0) == 0) ? null : (
                <div className={styles.stickyContainer} style={{ transition: "height 0.3s", height: this.state.showSticky ? "45px" : "0px" }}>
                  <div style={{ display: "flex", paddingRight: "3%", overflow: "hidden" }}>
                    <div className={styles.StateAndSortBarTitle} style={{ marginRight: "16px" }}>Filter by</div>
                    <StateGroup filters={newFilters} removeFilter={this.props.removeFilter} optionStatus={this.props.optionStatus} mode={2} />
                    <div className={styles.clearAll}>{clearButton}</div>
                  </div>
                  <div style={{
                    display: "flex", marginLeft: "auto", marginRight: "0", visibility: this.state.showSticky ? "visible" : "hidden"
                  }}
                  >
                    <div className={styles.StateAndSortBarTitle} style={{ marginRight: "-20px" }}>Sort by</div>
                    <OrderBy orderby={this.props.orderby} intl={this.props.intl} changeSortOrder={this.props.changeSortOrder} mode={1} />
                  </div>
                </div>
              )}
              {/* top bar containing category name and bread crumb */}
              <div className={styles.topBar_2} ref="TopBar">
                <Breadcrumb breadcrumbs={this.props.breadcrumbs} storeName={this.props.storeName} />
                <div className={styles.CategoryName}>
                  <h3>{categoryName}</h3>
                  {/* todo: when in mode 1?? */}
                </div>
                {specialFilter != null ? (
                  <div>
                    <div className={styles.MultiSelectionContainer}>
                      <div className={styles.MultiSelectionBar} onClick={this.checkThisBox}>
                        {this.state.checkbox ? (
                          <div className={styles.checkedCheckBox}>
                            <img style={{ height: "100%", width: "100%", marginBottom: "5px" }} src="https://hiddenfigure.evestemptation.com/email/Component/checkedCheckBox.svg" alt="Checked CheckBox Picture" />
                          </div>
                        ) : (<div className={styles.checkBox} />)}
                        <div style={{
                          display: "inline-block", marginLeft: "10px", alignSelf: "center", height: "15px"
                        }}
                        >
Multi-categories
                        </div>
                      </div>
                    </div>
                    <SingleFilter_2
                      filter={specialFilter}
                      addFilter={this.props.addFilter}
                      addSpecialFilter={this.props.addSpecialFilter}
                      removeFilter={this.props.removeFilter}
                      removeSpecialFilter={this.props.removeSpecialFilter}
                      specialFilters
                      multiSelection={this.state.checkbox}
                      clearAllFilters={this.props.clearAllFilters}
                      clearAllSpecialFilters={this.props.clearAllSpecialFilters}
                      changeFilter={this.props.changeFilter}
                      mode={1}
                    />
                  </div>
                ) : null}
              </div>
              <div className={styles.ToolBoxContainer}>
                <div className={styles.ToolBox} ref="ToolBox">
                  <div className={styles.StateBarContainer}>
                    <div className={styles.StateBar}>
                      <div className={styles.StateAndSortBarTitle}>Filter by</div>
                      <StateGroup filters={newFilters} removeFilter={this.props.removeFilter} optionStatus={this.props.optionStatus} mode={2} />
                      <div className={styles.clearAll}>{clearButton}</div>
                    </div>
                  </div>
                  <div className={styles.FilterBoxContainer}>
                    <FilterGroup filters={newFilters} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} changeFilter={this.props.changeFilter} specialFilters={false} mode={2} />
                  </div>
                  <div className={styles.SortBar}>
                    <div className={styles.StateAndSortBarTitle}>Sort by</div>
                    <OrderBy orderby={this.props.orderby} intl={this.props.intl} changeSortOrder={this.props.changeSortOrder} mode={2} />
                  </div>
                </div>
              </div>
            </MediaQuery>


            <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <div className={styles.categoryName} style={{ marginBottom: "0px" }}>
                <h3>{categoryName}</h3>
              </div>
              {specialFilter ? (
                <div style={{
                  marginBottom: "0px", paddingLeft: "20px", paddingRight: "3px", marginTop: "-20px"
                }}
                >
                  <div className={styles.MultiSelectionContainer}>
                    <div className={styles.MultiSelectionBar} style={{ marginTop: "32px", marginBottom: "8px" }} onClick={this.checkThisBox}>
                      {this.state.checkbox ? (
                        <div className={styles.checkedCheckBox}>
                          <img style={{ height: "100%", width: "100%", marginBottom: "5px" }} src="https://hiddenfigure.evestemptation.com/email/Component/checkedCheckBox.svg" alt="Checked CheckBox Picture" />
                        </div>
                      ) : (<div className={styles.checkBox} />)}
                      <div style={{
                        display: "inline-block", marginLeft: "10px", alignSelf: "center", height: "15px"
                      }}
                      >
Multi-categories
                      </div>
                    </div>
                  </div>
                  <SingleFilter_2
                    filter={specialFilter}
                    addFilter={this.props.addFilter}
                    addSpecialFilter={this.props.addSpecialFilter}
                    removeFilter={this.props.removeFilter}
                    removeSpecialFilter={this.props.removeSpecialFilter}
                    specialFilters
                    multiSelection={this.state.checkbox}
                    clearAllFilters={this.props.clearAllFilters}
                    clearAllSpecialFilters={this.props.clearAllSpecialFilters}
                    changeFilter={this.props.changeFilter}
                    mode={2}
                  />
                </div>
              ) : null}

              <Sticky topOffset={-49} stickyStyle={{ zIndex: "10", marginTop: "45px" }} style={{ transform: "none" }}>
                <div className={styles.mobileToolBoxContainer_2}>
                  <MobileFilterGroup optionStatus={this.props.optionStatus} filters={newFilters} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} changeFilter={this.props.changeFilter} clearAllFilters={this.props.clearAllFilters} specialFiltersItem={specialFiltersItem} mode={1} />
                  <div className={styles.mobileSortByLabel}>Sort by</div>
                  <OrderBy orderby={this.props.orderby} intl={this.props.intl} changeSortOrder={this.props.changeSortOrder} mode={1} />
                </div>
              </Sticky>
              {this.props.optionStatus.sum - (this.props.optionStatus[specialFiltersItem] === undefined ? 0 : this.props.optionStatus[specialFiltersItem]) != 0 ? (
                <div className={styles.stateArea_2}>
                  <StateGroup filters={newFilters} removeFilter={this.props.removeFilter} optionStatus={this.props.optionStatus} mode={1} />
                </div>
              ) : null}
            </MediaQuery>
            <Grid>
              <CategoryList
                productList={this.props.productList}
                tiers={this.props.tiers}
                customer_group_id={this.props.customer_group_id}
                fetchingCategoryProducts={this.props.fetchingCategoryProducts}
                showDiscountLabel={showDiscountLabel}
              />
              <PageIndicator changePage={this.props.changePage} pageNum={this.props.pageNum} />
              {bannerFooterCmsId ? <CMSBlock {...{ cmsid: bannerFooterCmsId, urls }} /> : null}
            </Grid>
          </div>
        );
        break;
      }
      default: return null;
    }
  }
}


function mapStateToProps(store) {
  return {
    storeName: getStoreName(store),
    productList: getProductList(store),
    filters: getFilters(store),
    orderby: getOrderBy(store),
    breadcrumbs: getBreadcrumbs(store),
    categoryName: getCategoryName(store),
    pageNum: getPageNum(store),
    intl: store.intl,
    tiers: getTiers(store),
    customer_group_id: getCustomerGroupId(store),
    fetchingCategory: getFetchingCategory(store),
    fetchingCategoryProducts: getFetchingCategoryProducts(store),
    hasFilter: hasFilterInfo(store),
    categoryMeta: getCategoryMetaInfo(store),
    clientMD: getClientMD(store),
    serverLocation: getServerLocation(store)
  };
}

export default connect(mapStateToProps)(DefaultCategoryTemplate);
