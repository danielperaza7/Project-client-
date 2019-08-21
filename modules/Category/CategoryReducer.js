import {
  GET_CATEGORY,
  SET_MAIN_PRODUCT,
  SET_FETCHING_MAIN_PRODUCT,
  SET_COMPLETE_LOOK_PRODUCTS,
  SET_ALSOLIKE_PRODUCTS,
  // SET_KIT_DETAIL_PRODUCTS,
  RESET_MAIN_PRODUCT,
  RESET_RELATED_PRODUCT,
  RESET_CATEGORY,
  RESET_CATEGORY_PRODUCTS,
  SET_FETCHING_CATEGORY,
  SET_FETCHING_CATEGORY_PRODUCTS,
  SET_FETCHING_COMPLETE_LOOK_PRODUCTS,
  SET_FETCHING_ALSOLIKE_PRODUCTS,
  // SET_FETCHING_KIT_DETAIL_PRODUCTS,
  HAS_ACTIVE_FILTER,
  SET_REVIEW_LIST_DATA,
  SET_CUSTOMER_REVIEWS,
  SET_REVIEW_RATE,
  SET_COMPLETE_LOOK_PRODUCTS_REVIEW_DATA,
  RESET_CUSTOMER_REVIEWS,
} from "./CategoryActions";

const initialState = {
  // productList: ,
  // filters:[],
  // orderby:[],
  // breadcrumbs:[],
  // currentProduct:{},
  // completeLookProducts:[],
  // alsolikeProducts:[],
  // pageNum:{},
  fetchingCategory: true,
  fetchingCategoryProducts: true,
  fetchingMainProduct: true,
  fetchingCompleteTheLookProducts: true,
  fetchingAlsoLikeProducts: true,
  fetchingKitDetailProducts: true,
  reviewList: null,
  customerReviews: null,
  reviewRate: null,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        filters: action.payload.data.filters,
        orderby: action.payload.data.orderby,
        breadcrumbs: action.payload.data.breadcrumb,
        pageNum: {
          current_page: action.payload.data.current_page,
          total_page: action.payload.data.total_pages,
        },
        productNum: action.payload.data.total_filtered,
        productList: action.payload.data.products,
        categoryName: action.payload.data.name,
        fetchingCategory: false,
        fetchingCategoryProducts: false,
        categoryMeta: action.payload.data.meta,
        peers: action.payload.data.peers,
        template: action.payload.data.template_id,
        childrenMenu: action.payload.data.children,
        // filterCategory:1,
        // specialField:'categoryFilter',
        // specialField:'brand',
        // specialField:'',
        filterCategory: action.payload.data.if_support_strong_filter ? 1 : 0,
        specialField: action.payload.data.special_filter
          ? action.payload.data.special_filter
          : "",
      };
    case RESET_CATEGORY:
      return {
        ...state,
        filters: null,
        orderby: null,
        breadcrumbs: null,
        pageNum: null,
        productList: null,
      };
    case RESET_CATEGORY_PRODUCTS:
      return {
        ...state,
        pageNum: null,
        productList: null,
      };
    case SET_FETCHING_CATEGORY_PRODUCTS:
      console.log("reducer received SET_FETCHING_CATEGORY_PRODUCTS");
      return {
        ...state,
        fetchingCategoryProducts: action.payload,
      };
    case SET_FETCHING_CATEGORY:
      console.log("reducer received SET_FETCHING_CATEGORY");
      return {
        ...state,
        fetchingCategory: action.payload,
        fetchingCategoryProducts: action.payload,
      };

    case SET_MAIN_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload.data.products[0],
      };

    case SET_FETCHING_MAIN_PRODUCT:
      console.log("reducer received SET_FETCHING_MAIN_PRODUCT", action.payload);
      return {
        ...state,
        fetchingMainProduct: action.payload,
      };

    case RESET_MAIN_PRODUCT:
      return {
        ...state,
        currentProduct: null,
      };

    case RESET_CUSTOMER_REVIEWS:
      return {
        ...state,
        customerReviews: null,
      };

    case RESET_RELATED_PRODUCT:
      return {
        ...state,
        completeLookProducts: null,
        alsolikeProducts: null,
      };

    case SET_ALSOLIKE_PRODUCTS:
      return {
        ...state,
        alsolikeProducts: action.payload.data.products,
      };

    case SET_COMPLETE_LOOK_PRODUCTS:
      return {
        ...state,
        completeLookProducts: action.payload.data.products,
      };

    case SET_COMPLETE_LOOK_PRODUCTS_REVIEW_DATA:
      return {
        ...state,
        completeLookProductsReviewData: action.payload,
      };

      // case SET_KIT_DETAIL_PRODUCTS:
      //   console.log('SET_KIT_DETAIL_PRODUCTS', action.payload);
      //   return {
      //     ...state,
      //     kitDetailProducts: action.payload.products,
      //   };

    case SET_FETCHING_COMPLETE_LOOK_PRODUCTS:
      return {
        ...state,
        fetchingCompleteTheLookProducts: action.payload,
      };

    case SET_FETCHING_ALSOLIKE_PRODUCTS:
      return {
        ...state,
        fetchingAlsoLikeProducts: action.payload,
      };

      // case SET_FETCHING_KIT_DETAIL_PRODUCTS:
      //   return {
      //     ...state,
      //     fetchingKitDetailProducts: action.payload,
      //   };

    case HAS_ACTIVE_FILTER:
      return {
        ...state,
        hasFilter: action.payload,
      };

    case SET_REVIEW_LIST_DATA:
      return {
        ...state,
        reviewList: action.payload,
      };

    case SET_CUSTOMER_REVIEWS:
      return {
        ...state,
        customerReviews: action.payload,
      };

    case SET_REVIEW_RATE:
      return {
        ...state,
        reviewRate: action.payload,
      };

    default:
      return state;
  }
};

// state getter

export const getProductList = state => state.category.productList;

export const getFilters = state => state.category.filters;

export const getCurrentProduct = state => state.category.currentProduct;

export const getCompleteLookProducts = state => state.category.completeLookProducts;

export const getAlsolikeProducts = state => state.category.alsolikeProducts;

export const getKitDetailProducts = state => state.category.kitDetailProducts;

export const getOrderBy = state => state.category.orderby;

export const getBreadcrumbs = state => state.category.breadcrumbs;

export const getPeers = state => state.category.peers;

export const getCategoryName = state => state.category.categoryName;

export const getPageNum = state => state.category.pageNum;

export const getSearchProductNum = state => state.category.productNum;

export const getFetchingMainProduct = state => state.category.fetchingMainProduct;

export const getFetchingCategoryProducts = state => state.category.fetchingCategoryProducts;

export const getFetchingCategory = state => state.category.fetchingCategory;

export const getFetchingAlsoLikeProducts = state => state.category.fetchingAlsoLikeProducts;

export const getFetchingCompleteTheLookProducts = state => state.category.fetchingCompleteTheLookProducts;

export const getFetchingKitDetailProducts = state => state.category.fetchingKitDetailProducts;

export const hasFilterInfo = state => state.category.hasFilter;

export const getCategoryMetaInfo = state => state.category.categoryMeta;

export const getReviewList = state => state.category.reviewList;

export const getCustomerReviews = state => state.category.customerReviews;

export const getCompleteLookProductsReviewData = state => state.category.completeLookProductsReviewData;

export const getCategoryTemplate = state => state.category.template;

export const getFilterCategory = state => state.category.filterCategory;

export const getSpecialField = state => state.category.specialField;

export const getCategoryChildrenMenu = state => state.category.childrenMenu;

export const getReviewRate = state => state.category.reviewRate;

export default CategoryReducer;
