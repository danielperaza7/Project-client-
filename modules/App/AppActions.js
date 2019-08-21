/* eslint-disable no-use-before-define */
import axios from "axios";

import { batch } from "react-redux";
import { Cookies } from "react-cookie";
import history from "../../history";
import { HIDDEN_FIGURE_URL } from "../../config/config";
import {
  setAccountInformationTab,
  setSubscription,
  setReturnFromAddress,
} from "../Customer/CustomerActions";
// import other actions
import { authUser, getIdentityResponse, logout } from "../Authentication/AuthActions";

// Export Constants
export const TOGGLE_ADD_POST = "TOGGLE_ADD_POST";
export const CHANGE_STORE_NAME = "CHANGE_STORE_NAME";
export const CHANGE_HEADER = "CHANGE_HEADER";
export const SET_USER = "SET_USER";
export const SET_CART_NUM = "SET_CART_NUM";
export const SET_CART_JUST_ADDED = "SET_CART_JUST_ADDED";
export const CLEAR_CART_JUST_ADDED = "CLEAR_CART_JUST_ADDED";
export const SET_SHOW_HEADER = "SET_SHOW_HEADER";
export const SET_SHOW_FOOTER = "SET_SHOW_FOOTER";
export const ADD_ERROR = "ADD_ERROR";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_SHOW_HEADER_FOOTER = "SET_SHOW_HEADER_FOOTER";
export const SHOW_MASK = "SHOW_MASK";
export const REMOVE_MASK = "REMOVE_MASK";
export const PUSH_CUSTOM_HISTORY = "PUSH_CUSTOM_HISTORY";
export const POP_CUSTOM_HISTORY = "POP_CUSTOM_HISTORY";
export const POP_NEWSLETTER_SUBSCRIPTION = "POP_NEWSLETTER_SUBSCRIPTION ";
export const SET_COLLAPSE_HEADER = "SET_COLLAPSE_HEADER";
export const SET_CLIENT_MD = "SET_CLIENT_MD";
export const SET_SERVER_LOCATION = "SET_SERVER_LOCATION";
export const SET_NEW_HEADER = "SET_NEW_HEADER";
export const ADD_RECENT_SEARCH = "ADD_RECENT_SEARCH";
export const CLEAR_RECENT_SEARCH = "CLEAR_RECENT_SEARCH";
export const SET_SEARCH_HISTORY = "SET_SEARCH_HISTORY";
export const SET_ACCOUNT_INFORMATION_EMAIL = "SET_ACCOUNT_INFORMATION_EMAIL";
export const SET_ACCOUNT_INFORMATION_NAME = "SET_ACCOUNT_INFORMATION_NAME";
export const SET_ACCOUNT_INFORMATION_PHONE = "SET_ACCOUNT_INFORMATION_PHONE";
export const RESET_MEMBERSHIP_UPGRADE_AND_DEGRADE_INFO = "RESET_MEMBERSHIP_UPGRADE_AND_DEGRADE_INFO";
export const SET_MOBILE_STORE = "SET_MOBILE_STORE";
export const COLLAPSE_HEADER_MENU = "COLLAPSE_HEADER_MENU";
export const HANDLE_NAV_STATUS = "HANDLE_NAV_STATUS";

let popupTimer_et;
export function checkSubscriptionStatusForNewsletter(token, cookie) {
  return (dispatch) => {
    dispatch(PopUpNewsletter(false));
    axios({
      method: "GET",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/newsletter`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.data.code === "0000") {
          if (!response.data.data.newsletter) {
            dispatch(checkSubscription(cookie));
          } else {
            dispatch(PopUpNewsletter(false));
            clearTimeout(popupTimer_et);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function checkSubscription(cookie) {
  console.debug("checkSubscription", cookie);
  const nt = cookie.get("newtime");
  if (nt === undefined) {
    const now = Date.now();
    const d = new Date();
    d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);
    cookie.set("newtime", now, { path: "/", expires: d });
    return (dispatch) => {
      popupTimer_et = setTimeout(() => dispatch(PopUpNewsletter(true)), 15000);
    };
  }

  return dispatch => dispatch(PopUpNewsletter(false));
}

export function checkWechatPopUpWindow(cookie) {
  const wechatSubscription = cookie.get("wechatSubscription");
  if (wechatSubscription === undefined) {
    const now = Date.now();
    const d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    cookie.set("wechatSubscription", now, { path: "/", expires: d });
    return (dispatch) => {
      popupTimer_et = setTimeout(() => dispatch(PopUpNewsletter(true)), 10000);
    };
  }

  return dispatch => dispatch(PopUpNewsletter(false));
}

export function PopUpNewsletter(check) {
  return {
    type: POP_NEWSLETTER_SUBSCRIPTION,
    payload: check,
  };
}

export function resetMembershipUpgradeAndDegradeInfo(snapshot) {
  return {
    type: RESET_MEMBERSHIP_UPGRADE_AND_DEGRADE_INFO,
    payload: snapshot,
  };
}

export function setNewHeader(data) {
  // console.debug('setNewHeader called')
  return {
    type: SET_NEW_HEADER,
    payload: data,
  };
}

export function collapseHeaderMenu(bool) {
  return {
    type: COLLAPSE_HEADER_MENU,
    payload: bool,
  };
}

export function setAccountInformationEmail(data) {
  return {
    type: SET_ACCOUNT_INFORMATION_EMAIL,
    payload: data,
  };
}

export function setAccountInformationPhone(data) {
  return {
    type: SET_ACCOUNT_INFORMATION_PHONE,
    payload: data,
  };
}

export function setAccountInformationName(data) {
  return {
    type: SET_ACCOUNT_INFORMATION_NAME,
    payload: data,
  };
}

export function addError(err) {
  return {
    type: ADD_ERROR,
    payload: err,
  };
}

export function changePassword(changePasswordRequest, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");

  // form the request to backend
  const req = {
    email: changePasswordRequest.email,
    phone: changePasswordRequest.phone,
    oldPassword: changePasswordRequest.oldPassword,
    newPassword: changePasswordRequest.newPassword,
  };

  return (dispatch) => {
    // console.log("this is the request to back end ", req);
    // here we axios
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/newpassword`,
      headers: {
        Authorization: token,
      },
      data: req,
    })
      .then((response) => {
        if (response.data.code !== "0000") {
          // if there is an error, we dispatch the error
          const error = response.data;
          if (error.msg === "validation failed") {
            dispatch(addError({ code: error.code, msg: "Please check your password!" }));
          } else {
            dispatch(addError(error));
          }
        } else {
          // console.debug("Change password succeed");
          if (cb) {
            cb(false, "Change password succeed");
          }
        }
      })
      .catch((err) => {
        console.error("404 error from change password", err);
      });
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}

export function handleNavStatus(bool) {
  return {
    type: HANDLE_NAV_STATUS,
    payload: bool,
  };
}

export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function changeHeader(data) {
  return {
    type: CHANGE_HEADER,
    payload: data,
  };
}

export function setSearchHistory(res) {
  // console.debug("setSearchHistory", res)
  return {
    type: SET_SEARCH_HISTORY,
    payload: res,
  };
}

export function elasticSearch(val) {
  return dispatch => axios({
    method: "get",
    url: `${HIDDEN_FIGURE_URL}/v1/elastic/complete?q=${val}&size=5`,
  }).then((response) => {
    if (response.status !== 200) {
      // status error
    } else if (response.data.code !== "0000") {
      // code error
    } else {
      // success
      dispatch(setSearchHistory(response.data.data));
    }
  });
}

export function fetchHeader(reqCookie) {
  return (dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    };
    if (reqCookie) headers.Cookie = reqCookie;

    return axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/catalog/app`,
      headers
    }).then((response) => {
      if (response.status !== 200) {
        // status error
      } else if (response.data.code !== "0000") {
        // code error
      } else {
        // success
        dispatch(changeHeader(response.data.data));
      }
    }).catch(err => console.error("Axios request, App", err));
  };
}

export function changeStoreName(storeName) {
  return {
    type: CHANGE_STORE_NAME,
    payload: storeName,
  };
}

export function serverChangeStoreName(storeName) {
  const doNothing = new Promise((resolve) => {
    resolve(storeName);
  });
  return dispatch => doNothing.then((_storeName) => {
    dispatch(changeStoreName(_storeName));
  });
}

export function changeStore(storeName) {
  return (dispatch) => {
    dispatch(changeStoreName(storeName));
  };
}

export function setUser(user) {
  console.debug("setUser called", user);
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setMobileStoreName(store = "et") {
  return {
    type: SET_MOBILE_STORE,
    payload: store,
  };
}

export function setCartNum(itemNum) {
  return {
    type: SET_CART_NUM,
    payload: itemNum,
  };
}

export function setCartJustAdded(item) {
  return {
    type: SET_CART_JUST_ADDED,
    payload: item,
  };
}

export function clearCartJustAdded(cb) {
  if (cb) {
    cb();
  }
  return {
    type: CLEAR_CART_JUST_ADDED,
  };
}

export function fetchCustomer(needCart, needSignin, yorozuyaToken, returnPage) {
  // console.log('fetchCustomer called')
  return dispatch => batch(() => {
    const cookie = new Cookies(); // create a new instance of cookie
    let token = cookie.get("x-auth");
    if (yorozuyaToken) {
      // in fetch customer and fetch cart, will check token from 'yorozuya_ct', yorozuya admin login as customer
      token = yorozuyaToken;
      cookie.set("x-auth", token, { path: "/" });
      dispatch(addError({ code: "LWCT", msg: "Log in as customer" }));
    }
    if (!token && needSignin) {
      history.push("/signin");
    }
    if (!token) {
      return;
    }
    // dispatch(checkSubscriptionStatusForNewsletter(token,cookie));
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v2/customer`,
      headers: {
        Authorization: token,
      },
      params: {
        detail: needCart ? 1 : 0,
      },
    })
      .then(response => batch(() => {
        // console.log('get identity', response)
        if (response.status !== 200) {
          console.log("return code not 200");
        } else if (response.data.code === "0000") {
          // success
          // if the response is correct
          const { customer } = response.data.data;
          if (
            response.data.data.customer.group_id
              && response.data.data.customer.group_id !== 0
          ) {
            // registered user
            // const { email, group_id } = customer;
            // console.log('registered user');

            const shipping_address = customer.cartSchema.shipping_address
                && customer.cartSchema.shipping_address.postcode
              ? customer.cartSchema.shipping_address
              : null;
            if (returnPage === "returnPage") {
              dispatch(setReturnFromAddress(shipping_address));
            }
            dispatch(authUser());
            dispatch(setUser(customer));
            // NOTICE!! This get Identity response must be called after authUser action, because
            // the app loading can only start after we set isAuthenticated to be true
            // this will address the first loading error
            dispatch(getIdentityResponse());
            dispatch(setAccountInformationTab(response.data.data.customer));
            dispatch(setSubscription(response.data.data.customer));
          } else {
            // guest user
            // console.log('guest user');
            dispatch(getIdentityResponse());
            dispatch(setUser(customer));
            if (needSignin) {
              history.push("/signin");
            }
            // 1 check Newsletter
          }
        } else {
          // not success
          if (response.data.code) {
            dispatch(addError({ code: response.data.code, msg: response.data.msg }));
            switch (response.data.code) {
              case "TKER": // wrong token
                dispatch(logout());
                break;
              case "TKEP": // expired token
                dispatch(logout());
                if (response.data.data && response.data.data.token) {
                  console.log("will set new token");
                  cookie.set("x-auth", response.data.data.token, {
                    path: "/",
                  });
                }
                break;
              default:
                console.log("error defailt handler");
                break;
            }
          }
        }
      }))
      .catch((err) => {
        // error
        console.error("fetchCustomer error", err);
        addError({ code: "FCER", msg: "Fetch customer error" });
      });
  });
}

export function saveClientMD(md) {
  const doNothing = new Promise((resolve) => {
    resolve(md);
  });
  return dispatch => doNothing.then((_md) => {
    dispatch(setClientMD(_md));
  });
}

export function setServerLocation(data) {
  return {
    type: SET_SERVER_LOCATION,
    payload: data,
  };
}

export function saveServerLocation(location) {
  const saveServerLocationPromise = new Promise((resolve) => {
    resolve(location);
  });
  return dispatch => saveServerLocationPromise.then((_location) => {
    dispatch(setServerLocation(_location));
  });
}

export function setShowHeader(bool) {
  return {
    type: SET_SHOW_HEADER,
    payload: bool,
  };
}

export function setCollapseHeader(bool) {
  return {
    type: SET_COLLAPSE_HEADER,
    payload: bool,
  };
}

export function setShowFooter(bool) {
  return {
    type: SET_SHOW_FOOTER,
    payload: bool,
  };
}

export function setShowHeaderFooter(bool) {
  return {
    type: SET_SHOW_HEADER_FOOTER,
    payload: bool,
  };
}

export function showMask(id) {
  return {
    type: SHOW_MASK,
    payload: id,
  };
}

export function removeMask(id) {
  return {
    type: REMOVE_MASK,
    payload: id,
  };
}

export function pushCustomHistory(data) {
  return {
    type: PUSH_CUSTOM_HISTORY,
    payload: data,
  };
}

export function popCustomHistory() {
  return {
    type: POP_CUSTOM_HISTORY,
  };
}

export function setClientMD(data) {
  return {
    type: SET_CLIENT_MD,
    payload: data,
  };
}

export function addRecentSearch(term) {
  return {
    type: ADD_RECENT_SEARCH,
    payload: term,
  };
}

export function clearRecentSearch() {
  return {
    type: CLEAR_RECENT_SEARCH,
  };
}
