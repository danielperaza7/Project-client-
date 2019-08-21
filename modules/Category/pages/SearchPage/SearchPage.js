import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import _ from "lodash";
import MediaQuery from "react-responsive";
import history from "../../../../history";
import CategoryList from "../../components/CategoryList/CategoryList";
import FilterGroup from "../../components/Filter/FilterGroup";
import MobileFilterGroup from "../../components/Filter/Mobile/MobileFilterGroup";
import StateGroup from "../../components/Filter/State/StateGroup";
import OrderBy from "../../components/Sort/OrderBy";
import Breadcrumb from "../../components/Breadcrumb/default/BreadcrumbDefault";
import PageIndicator from "../../components/PageIndicator/PageIndicator";
import DefaultMask from "../../../../components/masks/DefaultMask";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";
import { PushDL_FB_Search } from "../../../Analytics/components/FB";
import styles from "../CategoryContainer/CategoryContainer.css";
import { fetchSearchProducts, resetCategory } from "../../CategoryActions";
import {
  getProductList,
  getOrderBy,
  getFilters,
  getBreadcrumbs,
  getPageNum,
  getFetchingCategoryProducts,
  getFetchingCategory,
  getSearchProductNum
} from "../../CategoryReducer";
import {
  getStoreName,
  getTiers,
  getCustomerGroupId,
  getClientMD
} from "../../../App/AppReducer";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionStatus: { sum: 0 }
    };
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.changeFilter = _.debounce(this.changeFilter, 500);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeUrl = _.debounce(this.changeUrl, 500);
  }

  componentDidMount() {
    this.fireActionFetchData(this.props, "all");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location && nextProps.location.search && nextProps.filters) {
      const tmp = { sum: 0 };
      let cnt = 0;
      const params = this.getParams();
      const { query } = params;
      const obj = this.queryToObj(query);
      nextProps.filters.forEach((filter) => {
        if (obj[filter.id]) {
          if (tmp[filter.id]) tmp[filter.id] = [];
          tmp[filter.id] = obj[filter.id].length;
          cnt += obj[filter.id].length;
        }
      });
      tmp.sum = cnt;
      this.setState({ optionStatus: tmp });
    }

    if (_.isEqual(this.props.location, nextProps.location)) {
      // do nothing
    } else {
      let mode = "all";
      // if pathname changes fire get Category
      if (
        this.props.location.pathname === nextProps.location.pathname
        && this.props.location.query !== nextProps.location.query
      ) {
        mode = "products";
      }
      this.fireActionFetchData(nextProps, mode);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetCategory());
  }

  getParams() {
    return {
      storeName: this.props.storeName,
      path: this.props.location.pathname,
      query: this.props.location.query,
      category: this.props.match.params.splat
    };
  }

  fireActionFetchData(props, mode) {
    // dispatch fetch category
    // const term = props.location.query.q;
    let psize = 36;
    try {
      const width = window.document.documentElement.clientWidth;
      if (width >= 1440) {
        psize = 40;
      }
    } catch (err) {}
    // dispatch fetch category
    const group_id = this.props.customer_group_id ? this.props.customer_group_id : 0;
    let { search } = props.location;
    if (!search || search === "") {
      search = "?";
    } else {
      search = `${search}&`;
    }
    // get customer group id
    search = `${search}customer_group_id=${group_id}&psize=${psize}&store=${
      this.props.storeName
    }`;

    const searchTerm = props.location.query.q;
    const newSearch = searchTerm !== this.props.location.query.q || mode === "all";
    props.dispatch(
      fetchSearchProducts(search, mode, () => {
        if (newSearch) {
          PushDL_FB_Search({
            search_string: searchTerm,
            content_ids: this.props.productList
              .slice(0, 8)
              .map(product => product.display_id)
          });
        }
      })
    );
  }

  queryToObj(query) {
    const obj = {};
    for (const key in query) {
      if (Array.isArray(query[key])) {
        obj[key] = query[key];
      } else {
        obj[key] = query[key].split(",");
      }
    }
    return obj;
  }

  objToQuery(obj) {
    let query = "";
    for (const key in obj) {
      const arr = obj[key];
      let str = "";
      for (const op of arr) str += `${op},`;
      if (str) query += `${key}=${str.substring(0, str.length - 1)}&`;
    }
    return query.substring(0, query.length - 1);
  }

  addFilter(filterName, option) {
    // console.log("add " + option.name + ' to filter ' + filterName);
    let cur = this.state.optionStatus[filterName];
    cur = cur === undefined ? 0 : cur;
    const status = JSON.parse(JSON.stringify(this.state.optionStatus));
    status[filterName] = cur + 1;
    status.sum += 1;
    this.setState({ optionStatus: status });
    this.changeUrl("addFilter", filterName, option);
  }

  changeUrl(param, filterName, option) {
    if (param === "addFilter") {
      const params = this.getParams();
      const { query } = params;
      const { path } = params;
      const obj = this.queryToObj(query);
      if (!obj[filterName]) obj[filterName] = [];
      obj[filterName].push(option.id);
      const queryStr = this.objToQuery(obj);
      history.push(`${path}?${queryStr}`);
    } else if (param === "removeFilter") {
      const params = this.getParams();
      const { query } = params;
      const { path } = params;
      const obj = this.queryToObj(query);
      obj[filterName].splice(obj[filterName].indexOf(option.id), 1);
      if (obj[filterName].length === 0) delete obj[filterName];
      const queryStr = this.objToQuery(obj);
      history.push(path + (queryStr ? `?${queryStr}` : ""));
    }
  }

  changeFilter(filterName, option) {
    // console.log('filter ' + filterName +" change to " + option.name);
    const params = this.getParams();
    const { query } = params;
    const { path } = params;
    const obj = this.queryToObj(query);
    obj[filterName] = new Array(option.id);
    const queryStr = this.objToQuery(obj);
    history.push(`${path}?${queryStr}`);
  }

  removeFilter(filterName, option) {
    // console.log("remove "+option.name+" to filter "+filterName);
    const cur = this.state.optionStatus[filterName];
    const status = JSON.parse(JSON.stringify(this.state.optionStatus));
    status[filterName] = cur - 1;
    status.sum -= 1;
    this.setState({ optionStatus: status });
    this.changeUrl("removeFilter", filterName, option);
  }

  changeSortOrder(order) {
    const params = this.getParams();
    const { query } = params;
    const { path } = params;
    const obj = this.queryToObj(query);
    obj.orderby = new Array(order.id);
    const queryStr = this.objToQuery(obj);
    history.push(`${path}?${queryStr}`);
  }

  changePage(pageNum) {
    const params = this.getParams();
    const { query } = params;
    const { path } = params;
    const obj = this.queryToObj(query);
    obj.p = [pageNum];
    const queryStr = this.objToQuery(obj);
    history.push(`${path}?${queryStr}`);
  }

  clearAllFilters() {
    this.setState({ optionStatus: { sum: 0 } });
    const { path } = this.getParams();
    const { q } = this.getParams().query;
    history.push(`${path}?q=${q}`);
  }

  renderItemsPageInfo() {
    if (
      this.props.pageNum
      && this.props.pageNum.current_page
      && this.props.pageNum.total_page
    ) {
      return (
        <div className={styles.itemsNum}>
          Page
          {" "}
          {this.props.pageNum.current_page}
          {" "}
of
          {" "}
          {this.props.pageNum.total_page}
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.props.fetchingCategory) {
      return <DefaultMask />;
    }
    const topBarColSettings = {
      left: {
        lg: 10, md: 10, sm: 10, xs: 8
      },
      right: {
        lg: 2, md: 2, sm: 2, xs: 4
      }
    };
    const historyProps = {
      pathname: this.props.location.pathname,
      search: this.props.location.search,
      name: ""
    };
    const { clientMD, productList, searchProductNum } = this.props;
    const product_num = searchProductNum ? `${searchProductNum} results` : "No result";
    const search_query = this.props.location && this.props.location.query && this.props.location.query.q
      ? this.props.location.query.q
      : "";
    return (
      <Grid>
        <Row className={styles.topBar}>
          <Col {...topBarColSettings.left} />
          <Col {...topBarColSettings.right}>{this.renderItemsPageInfo()}</Col>
        </Row>
        <Row>
          <div
            className={styles.categorySearchTitle_pc}
          >
            {`${product_num} found for "${search_query}"`}
          </div>
        </Row>
        <Row>
          <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div
              className={styles.toolbar}
              style={{ marginLeft: "0px", marginRight: "0px", height: "auto" }}
            >
              <FilterGroup
                filters={this.props.filters}
                addFilter={this.addFilter}
                removeFilter={this.removeFilter}
                changeFilter={this.changeFilter}
                mode={1}
              />
              {productList && productList.length ? (
                <div
                  style={{
                    alignSelf: "center",
                    marginLeft: "auto",
                    fontFamily: "GothamMedium",
                    marginRight: 10
                  }}
                >
                  Sort by
                </div>
              ) : null}
              {productList && productList.length ? (
                <OrderBy
                  orderby={this.props.orderby}
                  intl={this.props.intl}
                  changeSortOrder={this.changeSortOrder}
                  mode={1}
                />
              ) : null}
            </div>
            {this.state.optionStatus.sum !== 0 ? (
              <div
                className={styles.stateContainer}
                style={{ marginLeft: "0px", marginRight: "0px" }}
              >
                <StateGroup
                  filters={this.props.filters}
                  removeFilter={this.removeFilter}
                  clearAllFilters={this.clearAllFilters}
                  mode={1}
                />
              </div>
            ) : null}
          </MediaQuery>

          <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div className={styles.mobileToolBoxContainer}>
              <MobileFilterGroup
                optionStatus={this.state.optionStatus}
                filters={this.props.filters}
                addFilter={this.addFilter}
                removeFilter={this.removeFilter}
                changeFilter={this.changeFilter}
                clearAllFilters={this.clearAllFilters}
              />
              <div className={styles.mobileSortByLabel}>Sort by</div>
              <OrderBy
                orderby={this.props.orderby}
                intl={this.props.intl}
                changeSortOrder={this.props.changeSortOrder}
                mode={1}
              />
              {productList && productList.length ? (
                <OrderBy
                  orderby={this.props.orderby}
                  intl={this.props.intl}
                  changeSortOrder={this.changeSortOrder}
                />
              ) : null}
            </div>
          </MediaQuery>

          <CategoryList
            productList={this.props.productList}
            tiers={this.props.tiers}
            customer_group_id={this.props.customer_group_id}
            fetchingCategoryProducts={this.props.fetchingCategoryProducts}
          />
          <PageIndicator changePage={this.changePage} pageNum={this.props.pageNum} />
        </Row>
        <CustomHistory record={historyProps} />
      </Grid>
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
    pageNum: getPageNum(store),
    intl: store.intl,
    tiers: getTiers(store),
    customer_group_id: getCustomerGroupId(store),
    fetchingCategory: getFetchingCategory(store),
    fetchingCategoryProducts: getFetchingCategoryProducts(store),
    clientMD: getClientMD(store),
    searchProductNum: getSearchProductNum(store)
  };
}

export default connect(mapStateToProps)(SearchContainer);
