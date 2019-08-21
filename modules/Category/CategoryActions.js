import axios from "axios";
import { batch } from "react-redux";
import { HIDDEN_FIGURE_URL, CURRENT_COUNTRY } from "../../config/config";
// Exports Constants

export const RESET_MAIN_PRODUCT = "RESET_MAIN_PRODUCT";
export const SET_MAIN_PRODUCT = "SET_MAIN_PRODUCT";
export const SET_FETCHING_MAIN_PRODUCT = "SET_FETCHING_MAIN_PRODUCT";

export const SET_SEARCH_CATEGORY = "SET_SEARCH_CATEGORY";

export const GET_CATEGORY_PRODUCT_LIST = "GET_CATEGORY_PRODUCT_LIST";

export const GET_CATEGORY = "GET_CATEGORY";
export const RESET_CATEGORY = "RESET_CATEGORY";
export const SET_FETCHING_CATEGORY = "SET_FETCHING_CATEGORY";

export const SET_FETCHING_CATEGORY_PRODUCTS = "SET_FETCHING_CATEGORY_PRODUCTS";
export const RESET_CATEGORY_PRODUCTS = "RESET_CATEGORY_PRODUCTS";

export const RESET_RELATED_PRODUCT = "RESET_RELATED_PRODUCT";

export const SET_FETCHING_COMPLETE_LOOK_PRODUCTS = "SET_FETCHING_COMPLETE_LOOK_PRODUCTS";
export const SET_COMPLETE_LOOK_PRODUCTS = "SET_COMPLETE_LOOK_PRODUCTS";
export const SET_COMPLETE_LOOK_PRODUCTS_REVIEW_DATA = "SET_COMPLETE_LOOK_PRODUCTS_REVIEW_DATA";

// export const SET_FETCHING_KIT_DETAIL_PRODUCTS = 'SET_FETCHING_KIT_DETAIL_PRODUCTS';
// export const SET_KIT_DETAIL_PRODUCTS = 'SET_KIT_DETAIL_PRODUCTS';

export const SET_ALSOLIKE_PRODUCTS = "SET_ALSOLIKE_PRODUCTS";
export const SET_FETCHING_ALSOLIKE_PRODUCTS = "SET_FETCHING_ALSOLIKE_PRODUCTS";
export const HAS_ACTIVE_FILTER = "HAS_ACTIVE_FILTER";
export const SET_REVIEW_LIST_DATA = "SET_REVIEW_LIST_DATA";
export const SET_CUSTOMER_REVIEWS = "SET_CUSTOMER_REVIEWS";
export const SET_REVIEW_RATE = "SET_REVIEW_RATE";
export const RESET_CUSTOMER_REVIEWS = "RESET_CUSTOMER_REVIEWS";
// Exports Actions
export function hasActiveFilter(hasFilter) {
  return {
    type: HAS_ACTIVE_FILTER,
    payload: hasFilter,
  };
}

export function setReviewRate(data) {
  return {
    type: SET_REVIEW_RATE,
    payload: data,
  };
}

export function resetCategoryProducts() {
  return {
    type: RESET_CATEGORY_PRODUCTS,
    payload: null,
  };
}

export function setFetchingCategory(isFetching) {
  console.log("setFetchingCategory", isFetching);
  return {
    type: SET_FETCHING_CATEGORY,
    payload: isFetching,
  };
}

export function setFetchingCategoryProducts(isFetching) {
  console.log("setFetchingCategory", isFetching);
  return {
    type: SET_FETCHING_CATEGORY_PRODUCTS,
    payload: isFetching,
  };
}

export function getCategory(response) {
  // console.log('get category', response)
  return {
    type: GET_CATEGORY,
    payload: response,
  };
}

export function getCategoryProductList(response) {
  return {
    type: GET_CATEGORY_PRODUCT_LIST,
    payload: response,
  };
}

export function resetCategory() {
  return {
    type: RESET_CATEGORY,
    payload: null,
  };
}

export function resetCustomerReviews() {
  return {
    type: RESET_CUSTOMER_REVIEWS,
    payload: null,
  };
}

export function fetchReviewsByDisplayId(data) {
  return (dispatch) => {
    const url = `${HIDDEN_FIGURE_URL}/v2/review/get_reviews_by_display_id`;
    return axios.get(url, {
      params: {
        display_id: data,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("fetchReviewsByDisplayId error");
        } else if (response.data.code === "0000") {
          console.log("fetchReviewsByDisplayId success");
          dispatch(setReviewRate(response.data.data));
        } else {
          console.log("fetchCategory error");
        }
      })
      .catch((err) => {
        console.error("fetchReviewsByDisplayIderror caught", err);
      });
  };
}

export function fetchCategory(category, query, reqCookie) {
  return dispatch => batch(() => {
    dispatch(resetCategory());
    dispatch(setFetchingCategory(true));
    const headers = {};
    if (reqCookie) headers.Cookie = reqCookie;

    const url = `${HIDDEN_FIGURE_URL}/v1/category${query}category=category/${category}&country=${CURRENT_COUNTRY.toLowerCase()}`;
    return axios({
      method: "get",
      url,
      headers,
    })
      .then((response) => {
        console.log("setFetchingCategory");
        dispatch(setFetchingCategory(false));
        console.log("setFetchingCategoryProducts");
        dispatch(setFetchingCategoryProducts(false));
        console.log("will check response status");
        if (response.status !== 200) {
          console.log("error");
        } else if (response.data.code === "0000") {
          console.log("fetchCategory success");
          dispatch(getCategory(response.data));
        } else {
          console.log("fetchCategory error");
        }
      })
      .catch((err) => {
        console.error("fetchCategory error caught", err);
      });
  });
}

export function fetchCategoryProducts(category, query) {
  console.log("fetchCategoryProducts called");
  return dispatch => batch(() => {
    dispatch(resetCategoryProducts());
    dispatch(setFetchingCategoryProducts(true));
    const url = `${HIDDEN_FIGURE_URL}/v1/category${query}category=category/${category}&country=${CURRENT_COUNTRY.toLowerCase()}`;
    axios
      .get(url)
      .then((response) => {
        dispatch(setFetchingCategoryProducts(false));
        if (response.status !== 200) {
          console.log("error");
        } else if (response.data.code === "0000") {
          console.log("fetchCategory success");
          dispatch(getCategory(response.data));
        } else {
          console.log("fetchCategory error");
        }
      })
      .catch((err) => {
        console.error("-----------------fetchCategoryProducts error------", err);
      });
  });
}

export function fetchCategoryProductList() {
  return (dispatch) => {
    // make Ajax request and
    axios.get(`${HIDDEN_FIGURE_URL}/v1/products`).then((response) => {
      if (response.status !== 200) {
        console.log("error");
      } else {
        dispatch(getCategoryProductList(response.data));
      }
    });
  };
}

export function resetMainProduct() {
  return {
    type: RESET_MAIN_PRODUCT,
    payload: null,
  };
}

export function resetRelatedProduct() {
  return {
    type: RESET_RELATED_PRODUCT,
    payload: null,
  };
}

export function setMainProduct(data) {
  return {
    type: SET_MAIN_PRODUCT,
    payload: data,
  };
}

export function setFetchingMainProduct(isFetching) {
  return {
    type: SET_FETCHING_MAIN_PRODUCT,
    payload: isFetching,
  };
}

export function fetchMainProduct(product, reqCookie) {
  return dispatch => batch(() => {
    dispatch(resetMainProduct());
    dispatch(resetRelatedProduct());
    dispatch(setFetchingMainProduct(true));
    dispatch(resetCustomerReviews());
    const headers = {};
    if (reqCookie) headers.Cookie = reqCookie;
    const url = `${HIDDEN_FIGURE_URL}/v1/products?display_ids=${product}&country=${CURRENT_COUNTRY.toLowerCase()}`;
    return axios({
      method: "get",
      url,
      headers,
    }).then((response) => {
      // console.log('response received');
      dispatch(setFetchingMainProduct(false));
      // console.log('gonna check status');
      if (response.status !== 200) {
        console.log("error");
      } else if (response.data.code === "0000") {
        console.log("fetch main product success", response.data);
        dispatch(setMainProduct(response.data));
      }
    });
    // .catch((err)=>{
    //   console.log('fetchMainProduct error caught')
    //   console.log(err)
    //   dispatch(setFetchingMainProduct(false))
    // })
  });
}

export function setCustomerReviews(data) {
  return {
    type: SET_CUSTOMER_REVIEWS,
    payload: data,
  };
}

export function fetchCustomerReviews(display_id) {
  return (dispatch) => {
    const url = `${HIDDEN_FIGURE_URL}/v2/review/get_reviews?display_id=${display_id}`;
    return axios({
      method: "get",
      url,
    }).then((response) => {
      console.log("fetchCustomerReviews response received");
      if (response.status !== 200) {
        console.log("fetchCustomerReviews error");
      } else if (response.data.code === "0000") {
        console.log("fetch fetchCustomerReviews success");
        dispatch(setCustomerReviews(response.data.data));
      }
    });
    // .catch((err)=>{
    //   console.log('fetchMainProduct error caught')
    //   console.log(err)
    //   dispatch(setFetchingMainProduct(false))
    // })
  };
}

export function postReviewResponse(data, cb) {
  return () => {
    const url = `${HIDDEN_FIGURE_URL}/v2/review/like_dislike_review`;
    return axios({
      method: "post",
      url,
      data,
    }).then((response) => {
      console.log("postReviewResponse response received");
      if (response.status !== 200) {
        if (cb) cb(false);
        console.log("postReviewResponse error");
      } else if (response.data.code === "0000") {
        if (cb) cb(true, response.data.data);
        console.log("postReviewResponse success");
      } else {
        if (cb) cb(false);
        console.log("postReviewResponse error");
      }
    });
    // .catch((err)=>{
    //   console.log('fetchMainProduct error caught')
    //   console.log(err)
    //   dispatch(setFetchingMainProduct(false))
    // })
  };
}

export function fetchProductBoardData(product, cb) {
  return () => {
    const url = `${HIDDEN_FIGURE_URL}/v1/products?display_ids=${product}&country=${CURRENT_COUNTRY.toLowerCase()}`;
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          console.log("error");
        } else if (response.data.code === "0000") {
          if (cb) {
            cb(response.data.data);
          }
        }
      })
      .catch((err) => {
        console.error("fetchProductBoardData error", err);
      });
  };
}

export function fetchProductsWithListIds(products, cb) {
  return () => {
    if (!products) {
      console.log("error");
      return;
    }
    const url = `${HIDDEN_FIGURE_URL}/v1/products?list_ids=${products
      && products.toString()}&country=${CURRENT_COUNTRY.toLowerCase()}`;
    axios.get(url).then((response) => {
      if (response.status !== 200) {
        console.log("error");
      } else if (cb) {
        cb(response.data.data);
      }
    });
  };
}

export function fetchProductsWithRewardPoints(products, callback) {
  return () => {
    const url = `${HIDDEN_FIGURE_URL}/v1/products?skus=${products.toString()}&redeem_points=1&country=${CURRENT_COUNTRY.toLowerCase()}`;
    console.log("fetchProductsWithRewardPoints", url);
    axios.get(url).then((response) => {
      if (response.status !== 200) {
        console.log("error");
      } else if (callback) {
        callback(response.data.data);
      }
    });
  };
}

export function setCompleteLookProducts(data) {
  return {
    type: SET_COMPLETE_LOOK_PRODUCTS,
    payload: data,
  };
}

export function setAlsolikeProducts(data) {
  return {
    type: SET_ALSOLIKE_PRODUCTS,
    payload: data,
  };
}

export function setFetchingCompleteLookProducts(isFetching) {
  return {
    type: SET_FETCHING_COMPLETE_LOOK_PRODUCTS,
    payload: isFetching,
  };
}

export function fetchCompleteLookProducts(product) {
  // API request product.related skus
  return dispatch => batch(() => {
    dispatch(setFetchingCompleteLookProducts(true));
    const url = `${HIDDEN_FIGURE_URL}/v1/products?display_ids=${product.toString()}&country=${CURRENT_COUNTRY.toLowerCase()}`;
    axios
      .get(url)
      .then((response) => {
        dispatch(setFetchingCompleteLookProducts(false));
        if (response.status !== 200) {
          console.log("error");
        } else {
          console.log("fetch main CompleteLookProducts success", response);
          dispatch(setCompleteLookProducts(response.data));
        }
      })
      .catch(() => {
        dispatch(setFetchingCompleteLookProducts(false));
        // console.error('fetchCompleteLookProducts error', err);
      });
  });
}

export function setCompleteLookProductsReviewData(data) {
  return {
    type: SET_COMPLETE_LOOK_PRODUCTS_REVIEW_DATA,
    payload: data,
  };
}

export function fetchCompleteLookProductsReviewData(displayIdList) {
  return (dispatch) => {
    const url = `${HIDDEN_FIGURE_URL}/v2/review/get_reviews_list_only_count_and_rate`;
    return axios
      .get(url, {
        params: {
          display_id_list: displayIdList,
        },
      })
      .then((response) => {
        console.log("fetchCompleteLookProductsReviewData response received");
        if (response.status !== 200) {
          console.log("fetchCompleteLookProductsReviewData error");
        } else if (response.data.code === "0000") {
          console.log("fetch fetchCompleteLookProductsReviewData success");
          dispatch(setCompleteLookProductsReviewData(response.data.data));
        }
      });
  };
}

export function setFetchingAlsolikeProducts(isFetching) {
  return {
    type: SET_FETCHING_ALSOLIKE_PRODUCTS,
    payload: isFetching,
  };
}

export function fetchAlsolikeProducts(product) {
  // API request product.related skus
  console.log("fetchAlsolikeProducts called");
  return (dispatch) => {
    dispatch(setFetchingAlsolikeProducts(true));
    const url = `${HIDDEN_FIGURE_URL}/v1/products?display_ids=${product.toString()}&detail=0&country=${CURRENT_COUNTRY.toLowerCase()}`;
    axios
      .get(url)
      .then((response) => {
        dispatch(setFetchingAlsolikeProducts(false));
        if (response.status !== 200) {
          console.log("error");
        } else {
          console.log("fetch AlsolikeProducts success", response);
          dispatch(setAlsolikeProducts(response.data));
        }
      })
      .catch((err) => {
        console.error("fetchAlsolikeProducts error caught", err);
        dispatch(setFetchingAlsolikeProducts(false));
      });
  };
}

// export function setFetchingKitDetailProducts(isFetching) {
//   return {
//     type: SET_FETCHING_KIT_DETAIL_PRODUCTS,
//     payload: isFetching,
//   };
// }

// export function setKitDetailProducts(data) {
//   return {
//     type: SET_KIT_DETAIL_PRODUCTS,
//     payload: data,
//   };
// }

// export function fetchKitDetailProducts(product) {
//   console.log('fetchKitDetailProducts called');
//   return (dispatch) => {
//     dispatch(setFetchingKitDetailProducts(true));
//     const url = `${HIDDEN_FIGURE_URL}/v1/products?list_ids=${product.toString()}&detail=0&country=${CURRENT_COUNTRY.toLowerCase()}`;
//     axios.get(url)
//       .then((response) => {
//         dispatch(setFetchingKitDetailProducts(false));
//         if (response.status !== 200) {
//           console.log('error');
//         } else {
//           console.log('fetch KitDetailProducts success', response);
//           dispatch(setKitDetailProducts(response.data.data));
//         }
//       })
//       .catch((err) => {
//         console.error('fetchKitDetailProducts error caught', err);
//         dispatch(setFetchingKitDetailProducts(false));
//       });
//   };
// }

export function fetchSearchProducts(query, mode, cb) {
  return (dispatch) => {
    if (mode === "all") {
      dispatch(setFetchingCategory(true));
    } else {
      dispatch(setFetchingCategoryProducts(true));
    }
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/search${query}`,
    })
      .then((response) => {
        if (mode === "all") {
          dispatch(setFetchingCategory(false));
        } else {
          dispatch(setFetchingCategoryProducts(false));
        }

        if (response.status !== 200) {
          // error
        } else {
          // if success
          if (response.data.code === "0000") {
            console.log("search result fetched");
            dispatch(getCategory(response.data));
            if (cb) {
              cb();
            }
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("fetchSearchProducts error", err);
      });
  };
}

export function setReviewListData(data) {
  return {
    type: SET_REVIEW_LIST_DATA,
    payload: data,
  };
}
