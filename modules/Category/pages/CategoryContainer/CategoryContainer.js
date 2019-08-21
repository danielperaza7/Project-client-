/*
  Created by YZ

  This category container contains:
  1. get a list of products
  2. set one from many listing templates according server response
  3. render
*/

import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Helmet from "react-helmet";
import history from "../../../../history";
import DefaultCategoryTemplate from "../CategoryTemplate/DefaultCategoryTemplate.js";
import ColorCategoryTemplate from "../CategoryTemplate/ColorCategoryTemplate.js";
import {
  getStoreName,
  getTiers,
  getCustomerGroupId,
  getClientMD,
  getServerLocation
} from "../../../App/AppReducer";
import DefaultMask from "../../../../components/masks/DefaultMask";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";
import { PushLocal_FilterData } from "../../../Analytics/components/GA";
import styles from "./CategoryContainer.css";
import {
  fetchCategory,
  resetCategory,
  fetchCategoryProducts
} from "../../CategoryActions";
import { setShowMobileHeaderPromotion } from "../../../CMS/CMSActions";
import {
  hasFilterInfo,
  getProductList,
  getOrderBy,
  getFilters,
  getBreadcrumbs,
  getPageNum,
  getFetchingCategoryProducts,
  getFetchingCategory,
  getCategoryMetaInfo,
  getCategoryName,
  getCategoryTemplate,
  getFilterCategory,
  getSpecialField
} from "../../CategoryReducer";

import { CURRENT_DOMAIN } from "../../../../config/config";

class CategoryContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      optionStatus: { sum: 0 },
      specialFilterOptionStatus: { sum: 0 },
      specialFilter: null
    };
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.changeFilter = _.debounce(this.changeFilter, 500).bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeUrl = _.debounce(this.changeUrl, 500);
    this.addSpecialFilter = this.addSpecialFilter.bind(this);
    this.removeSpecialFilter = this.removeSpecialFilter.bind(this);
    this.clearAllSpecialFilters = this.clearAllSpecialFilters.bind(this);
    // this.setSpecialFilter=this.setSpecialFilter.bind(this);
  }

  componentWillMount() {
    this.setState({ specialFilter: this.props.specialField });
  }

  componentDidMount() {
    if (this.props.location && this.props.location.search && this.props.filters) {
      const tmp = { sum: 0 };
      let cnt = 0;
      const params = this.getParams();
      const { query } = params;
      const obj = this.queryToObj(query);
      this.props.filters.forEach((filter) => {
        if (obj[filter.id]) {
          if (tmp[filter.id]) tmp[filter.id] = [];
          tmp[filter.id] = obj[filter.id].length;
          cnt += obj[filter.id].length;
        }
      });
      tmp.sum = cnt;
      this.setState({ optionStatus: tmp });
    }
    this.props.dispatch(setShowMobileHeaderPromotion(true));
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

    if (
      nextProps.location
      && this.props.location.pathname !== nextProps.location.pathname
    ) {
      this.setState({ optionStatus: { sum: 0 } });
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
    this.props.dispatch(setShowMobileHeaderPromotion(false));
  }

  getParams() {
    return {
      storeName: this.props.storeName,
      path: this.props.location.pathname,
      query: this.props.location.query,
      category: this.props.match.params.splat
    };
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
      for (const op of arr) {
        str += `${op},`;
      }
      if (str) {
        query += `${key}=${encodeURIComponent(str.substring(0, str.length - 1))}&`;
      }
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
    // console.log("change order to "+order.name);
    const params = this.getParams();
    const { query } = params;
    const { path } = params;
    const obj = this.queryToObj(query);
    obj.orderby = new Array(order.id);
    const queryStr = this.objToQuery(obj);
    history.push(`${path}?${queryStr}`);

    PushLocal_FilterData("orderBy", order.name);
  }

  changePage(pageNum) {
    // console.log("change to page "+pageNum);
    const params = this.getParams();
    const { query } = params;
    const { path } = params;
    const obj = this.queryToObj(query);
    obj.p = [pageNum];
    const queryStr = this.objToQuery(obj);
    history.push(`${path}?${queryStr}`);
    // window.scrollTo(0, 0);
  }

  clearAllFilters() {
    this.setState({ optionStatus: { sum: 0 } });
    const params = this.getParams();
    const { path } = params;
    if (this.state.specialFilter === null) {
      history.push(path);
    } else {
      const { query } = params;
      let specialStr = null;
      for (const k in query) {
        if (k === this.state.specialFilter) {
          specialStr = query[k];
          break;
        }
      }
      let queryStr = "";
      if (specialStr) {
        const obj = this.queryToObj({ [this.state.specialFilter]: [specialStr] });
        queryStr = this.objToQuery(obj);
      }
      history.push(`${path}?${queryStr}`);
    }
  }

  fireActionFetchData(props, mode) {
    console.log("fireActionFetchData called", mode);
    let { storeName } = this.props;
    if (props.location.pathname.indexOf("/ebe/category") > -1) {
      storeName = "ebe";
    }
    let psize = 36;
    if (this.props.template === 1) {
      psize = 100;
    }
    try {
      const width = window.document.documentElement.clientWidth;
      if (width >= 1440 && this.props.template !== 1) {
        psize = 40;
      }
    } catch (err) {
      console.error(err);
    }
    // dispatch fetch category
    const group_id = this.props.customer_group_id ? this.props.customer_group_id : 0;
    console.log("fireActionFetchData fired", this.props.storeName);
    const category = props.location.pathname.replace(`/${storeName}/category/`, "");
    // console.log('category',category);
    // category = category.replace(`/ebe/category/`,'')

    let { search } = props.location;
    if (!search || search === "") {
      search = "?";
    } else {
      search = `${search}&`;
    }
    // get customer group id

    search = `${search}customer_group_id=${group_id}&psize=${psize}&store=${storeName}&`;
    if (mode === "products") {
      console.log("fetch products");
      props.dispatch(fetchCategoryProducts(category, search));
    } else {
      console.log("fetch all");
      props.dispatch(fetchCategory(category, search));
    }
  }

  addSpecialFilter(filterName, option) {
    // console.log("add " + option.name + ' to filter ' + filterName);
    let cur = this.state.specialFilterOptionStatus[filterName];
    cur = cur === undefined ? 0 : cur;
    const status = JSON.parse(JSON.stringify(this.state.specialFilterOptionStatus));
    status[filterName] = cur + 1;
    status.sum += 1;
    this.setState({ specialFilterOptionStatus: status });
    this.changeUrl("addFilter", filterName, option);
  }

  removeSpecialFilter(filterName, option) {
    // console.log("remove "+option.name+" to filter "+filterName);
    const cur = this.state.specialFilterOptionStatus[filterName];
    const status = JSON.parse(JSON.stringify(this.state.specialFilterOptionStatus));
    status[filterName] = cur - 1;
    status.sum -= 1;
    this.setState({ specialFilterOptionStatus: status });
    this.changeUrl("removeFilter", filterName, option);
  }

  clearAllSpecialFilters() {
    this.setState({ optionStatus: { sum: 0 }, specialFilterOptionStatus: { sum: 0 } });
    const { path } = this.getParams();
    history.push(path);
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

    const {
      location, categoryName, serverLocation, template
    } = this.props;
    const historyProps = {
      pathname: location.pathname,
      search: location.search,
      name: categoryName
    };
    const pictureUrl = this.props.productList
      && this.props.productList[0]
      && this.props.productList[0].images
      && this.props.productList[0].images.main
      && this.props.productList[0].images.main.images
      && this.props.productList[0].images.main.images.lg
      && this.props.productList[0].images.main.images.lg.url
      ? this.props.productList[0].images.main.images.lg.url
      : "https://storage.googleapis.com/evesetus/email/LINKEDIN/linkedin-1.jpg";
    const title = this.props.categoryMeta && this.props.categoryMeta.title
      ? this.props.categoryMeta.title
      : "";
    const storeStr = this.props.storeName === "et" ? "Eve's Temptation - " : "Eve by Eve's - ";
    const categoryStr = this.props.categoryName
      ? this.props.categoryName.toLowerCase()
      : "";
    const defaultTitle = storeStr + categoryStr;

    const meta = [
      {
        property: "og:title",
        content:
          this.props.categoryMeta && this.props.categoryMeta.title
            ? this.props.categoryMeta.title
            : defaultTitle
      },
      {
        property: "og:description",
        content:
          this.props.categoryMeta && this.props.categoryMeta.description
            ? this.props.categoryMeta.description
            : ""
      },
      {
        property: "og:url",
        content: `https://www.evestemptation.com${historyProps.pathname}`
      },
      {
        property: "og:image",
        content: pictureUrl
      },
      {
        property: "twitter:url",
        content: `https://www.evestemptation.com${historyProps.pathname}`
      },
      {
        property: "twitter:image",
        content: pictureUrl
      },
      {
        property: "twitter:title",
        content:
          this.props.categoryMeta && this.props.categoryMeta.title
            ? this.props.categoryMeta.title
            : defaultTitle
      },
      {
        property: "twitter:description",
        content:
          this.props.categoryMeta && this.props.categoryMeta.description
            ? this.props.categoryMeta.description
            : ""
      },
      {
        property: "pinterest:description",
        content:
          this.props.categoryMeta && this.props.categoryMeta.description
            ? this.props.categoryMeta.description
            : ""
      },
      {
        property: "pinterest:image",
        content: pictureUrl
      },
      {
        name: "keyword",
        content:
          this.props.categoryMeta && this.props.categoryMeta.keyword
            ? this.props.categoryMeta.keyword
            : ""
      },
      {
        name: "description",
        content:
          this.props.categoryMeta && this.props.categoryMeta.description
            ? this.props.categoryMeta.description
            : ""
      }
    ];
    const canonicalUrl = CURRENT_DOMAIN + serverLocation.pathname;
    const DefaultCategoryTemplate_props = {
      addFilter: this.addFilter,
      removeFilter: this.removeFilter,
      changeFilter: this.changeFilter,
      clearAllFilters: this.clearAllFilters,
      changeSortOrder: this.changeSortOrder,
      changePage: this.changePage,
      changeUrl: this.changeUrl,
      optionStatus: this.state.optionStatus,
      addSpecialFilter: this.addSpecialFilter,
      removeSpecialFilter: this.removeSpecialFilter,
      clearAllSpecialFilters: this.clearAllSpecialFilters,
      setSpecialFilter: this.setSpecialFilter,
      specialFilterOptionStatus: this.state.specialFilterOptionStatus,
      filterCategory: this.props.filterCategory,
      specialField: this.props.specialField
    };
    return (
      <div>
        <Helmet
          title={title}
          meta={meta}
          link={[
            {
              rel: "canonical",
              href: canonicalUrl
            }
          ]}
        />
        {template === 1 ? (
          <ColorCategoryTemplate changePage={this.changePage} />
        ) : (
          <DefaultCategoryTemplate {...DefaultCategoryTemplate_props} />
        )}
        {!this.props.fetchingCategory ? <CustomHistory record={historyProps} /> : null}
      </div>
    );
  }
}

CategoryContainer.need = [
  (props, store) => {
    const psize = props.md.phone() ? 36 : 40;
    let { storeName } = store.app;
    if (props.location.pathname.indexOf("/ebe/category") > -1) {
      storeName = "ebe";
    }
    // dispatch fetch category
    const group_id = 0;
    const category = props.location.pathname.replace(`/${storeName}/category/`, "");
    let { search } = props.location;
    if (!search || search === "") {
      search = "?";
    } else {
      search = `${search}&`;
    }
    // get customer group id
    search = `${search}customer_group_id=${group_id}&psize=${psize}&store=${storeName}&`;
    return fetchCategory(category, search);
  }
];

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
    serverLocation: getServerLocation(store),
    template: getCategoryTemplate(store),
    filterCategory: getFilterCategory(store),
    specialField: getSpecialField(store)
  };
}

export default connect(mapStateToProps)(CategoryContainer);
