/* eslint-disable no-use-before-define */
import axios from "axios";
import { Cookies } from "react-cookie";
import { HIDDEN_FIGURE_URL } from "../../config/config";
import history from "../../history";

export const SET_CMS_BLOCK = "SET_CMS_BLOCK";
export const SET_CMS_ADMIN_AUTH = "SET_CMS_ADMIN_AUTH";
export const SET_CMS_PAGE = "SET_CMS_PAGE";
export const SET_CMS_LIST = "SET_CMS_LIST";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_CMS_ADMIN_USER = "SET_CMS_ADMIN_USER";
export const SET_SHOW_MOBILE_HEADER_PROMOTION = "SET_SHOW_MOBILE_HEADER_PROMOTION";
export const SET_PRODUCT_TYPE = "SET_PRODUCT_TYPE";

export function fetchCMSIdContent({ id, country, lan }, user, cb) {
  return (dispatch) => {
    let cookie;
    let headers;
    // server side render try
    try {
      cookie = new Cookies();
      let token;
      if (user === "admin") {
        token = cookie.get("x-auth-admin");
      } else {
        token = cookie.get("x-auth");
      }
      if (token) {
        headers = {
          Authorization: token,
        };
      }
    } catch (err) {
      console.error("fetchCMSIdContent cookie error", err);
    }
    return axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/content/${id}?country=${country}&lan=${lan}`,
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.debug("fetchCMS ID content not 200 status");
          if (cb) {
            cb(false, "fetchCMS ID content not 200 status");
          }
        } else if (response.data.code != "0000") {
          console.log("fetch CMS ID content code error");
          if (cb) {
            cb(false, "fetch CMS ID content code error");
          }
        } else {
          console.log("fetchCMS ID content success");
          dispatch(setCMSBlock(id, response.data.data));
          if (cb) {
            cb(false, response.data.data);
          }
        }
      })
      .catch((err) => {
        console.error("fetchCMS ID content error caught", err);
      });
  };
}

export function fetchCMSPage({ id, country, lan }, user, cb) {
  return (dispatch) => {
    let cookie;
    let headers;
    // server side render try
    try {
      cookie = new Cookies();
      let token;
      if (user === "admin") {
        token = cookie.get("x-auth-admin");
      } else {
        token = cookie.get("x-auth");
      }
      if (token) {
        headers = {
          Authorization: token,
        };
      }
    } catch (err) {
      console.error("fetchCMSPage cookie error", err);
    }
    dispatch(setCMSPage({}));
    return axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/content/${id}?country=${country}&lan=${lan}`,
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          console.debug("fetchCMS ID content not 200 status");
          if (cb) {
            cb(false, "fetchCMS ID content not 200 status");
          }
        } else if (response.data.code != "0000") {
          console.log("fetch CMS ID content code error");
          if (cb) {
            cb(false, "fetch CMS ID content code error");
          }
        } else {
          console.log("fetchCMS ID content success");
          dispatch(setCMSPage(response.data.data));
          if (cb) {
            cb(false, response.data.data);
          }
        }
      })
      .catch((err) => {
        console.error("fetchCMS ID content error caught", err);
      });
  };
}

export function saveNewCMSIdContent({ id, country, lan }, data, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth-admin");
    if (!token) {
      return {};
    }
    return axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/content/${id}/?country=${country}&lan=${lan}`,
      headers: {
        Authorization: token,
      },
      data: {
        data,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          console.log("create CMSIdContent not 200 status");
          cb(true, "not 200 status");
        } else if (response.data.code !== "0000") {
          console.log("create CMSIdContent code error");
          cb(true, response.data.msg);
        } else {
          console.log("create CMSIdContent success");
          cb(false, "success");
        }
      })
      .catch((err) => {
        console.error("create CMSIdContent error caught", err);
        cb(true, "exception caught");
      });
  };
}

export function archiveCMSIdContent({
  id, country, store, lan,
}, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth-admin");
    if (!token) {
      return {};
    }
    return axios({
      method: "delete",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/content/${id}/?country=${country}&store=${store}&lan=${lan}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          console.log("delete CMS content by id not 200 status");
        } else if (response.data.code !== "0000") {
          console.log("delete CMSIdContent code error");
        } else {
          console.log("delete CMSIdContent success");
          cb();
        }
      })
      .catch((err) => {
        console.error("delete CMSIdContent error caught", err);
      });
  };
}

export function updateExistCMSIdContent({ id, country, lan }, data, cb) {
  console.log("updateExistCMSIdContent data:", data);
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth-admin");
    if (!token) {
      return {};
    }
    return axios({
      method: "put",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/content/${id}/?country=${country}&lan=${lan}`, // hard code url for test
      headers: {
        Authorization: token,
      },
      data: {
        data,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          console.debug("updateExistCMSIdContent not 200 status");
          cb(true, "not 200 status");
        } else if (response.data.code !== "0000") {
          console.log("updateExistCMSIdContent code error");
          cb(true, response.data.msg);
        } else {
          console.log("updateExistCMSIdContent success");
          cb(false, "success");
        }
      })
      .catch((err) => {
        console.error("updateExistCMSIdContent error caught", err);
        cb(true, "exception caught");
      });
  };
}

export function fetchCMSList({ country, lan, archived }) {
  let cookie;
  let headers;
  try {
    cookie = new Cookies();
    const token = cookie.get("x-auth-admin");
    if (token) {
      headers = {
        Authorization: token,
      };
    } else if (history) {
      history.push("/cms/admin/signin/");
    }
  } catch (err) {
    console.error("fetchCMSList cookie error", err);
  }
  return (dispatch) => {
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/list?country=${country}&lan=${lan}&archived=${
        archived ? "1" : "0"
      }`,
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          // for test only:
          // dispatch(setCMSIdContent(id, {'a':'b'}));
          // end of test
          console.log("fetchCMS not 200 status");
        } else if (response.data.code != "0000") {
          console.log("fetch CMS code error");
        } else {
          console.log("fetchCMS success");
          // console.log(response.data.data);
          // cb(response.data.data);
          // dispatch(setCMSIdContent(id, response.data.data));
          dispatch(setCMSList({ archived, data: response.data.data }));
        }
      })
      .catch((err) => {
        console.error("fetchCMS error caught", err);
      });
  };
}

export function CMSAdminSignin({ username, password }) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth-admin");
    // If the fucking customer doesn't have token, push him to empty cart page.
    if (token) {
      history.push("/cms/admin/");
    }

    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/login`,
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          // for test only by pass sign in
          cookie.set("x-auth-admin", "faketoken", { path: "/" });
          dispatch(setAdminAuth(true));
        } else {
          // if success
          if (response.data.code === "0000" && response.data.data.token) {
            // update cookie
            cookie.set("x-auth-admin", response.data.data.token, { path: "/" });
            dispatch(setAdminAuth(true));
            dispatch(setAdminUser(JSON.parse(response.config.data).username));
          }
        }
      })
      .catch((err) => {
        console.error("CMSAdminSignin ERROR", err);
        // err
        // for test only by pass sign in
        // cookie.set('x-auth-admin', 'faketoken', {path: '/'});
        // dispatch(setAdminAuth(true))
      });
  };
}

export function CMSAdminLogout() {
  return (dispatch) => {
    const cookie = new Cookies();
    cookie.remove("x-auth-admin", { path: "/" });
    history.push("/cms/admin/signin");
  };
}

export function setCMSList(data) {
  return {
    type: SET_CMS_LIST,
    payload: data,
  };
}

export function setCMSBlock(id, data) {
  return {
    type: SET_CMS_BLOCK,
    payload: { id, data },
  };
}

export function setCMSPage(data) {
  console.debug("setCMSPage called");
  return {
    type: SET_CMS_PAGE,
    payload: data,
  };
}

export function setAdminAuth(bool) {
  console.debug("setAdminAuth called ");
  return {
    type: SET_CMS_ADMIN_AUTH,
    payload: bool,
  };
}

export function setAdminUser(name) {
  return {
    type: SET_CMS_ADMIN_USER,
    payload: name,
  };
}

export function fetchProductsInfo({
  skus, detail, country, lan,
}, cb) {
  return (dispatch) => {
    console.log("start action to fetch prod");
    const cookie = new Cookies();
    let headers;
    let token;
    if (user === "admin") {
      token = cookie.get("x-auth-admin");
    } else {
      token = cookie.get("x-auth");
    }
    if (token) {
      headers = {
        Authorization: token,
      };
    }
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/products/?skus=h123%2Ch122&detail=1&country=zh&lan=cn`,
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          // for test only:
          // dispatch(setCMSIdContent(id, {'a':'b'}));
          // end of test
          console.debug("fetchProductsInfo not 200 status");
          cb(false, "fetchProductsInfo not 200 status");
        } else if (response.data.code != "0000") {
          console.log("fetchProductsInfo code error");
          cb(false, "fetchProductsInfo code error");
        } else {
          console.log("fetchProductsInfo success");
          // console.log(response.data.data);
          // cb(response.data.data);
          // dispatch(setCMSIdContent(id, response.data.data));
          dispatch(setProducts(response.data.data));
          cb(false, response.data.data);
        }
      })
      .catch((err) => {
        console.error("fetchCMS ID content error caught", err);
        cb(true, "fetchCMS ID content error caught");
      });
  };
}

export function setProducts(data) {
  return {
    type: SET_PRODUCTS,
    payload: data,
  };
}

export function setProductType(data) {
  return {
    type: SET_PRODUCT_TYPE,
    payload: data,
  };
}

export function setShowMobileHeaderPromotion(data) {
  return {
    type: SET_SHOW_MOBILE_HEADER_PROMOTION,
    payload: data,
  };
}
