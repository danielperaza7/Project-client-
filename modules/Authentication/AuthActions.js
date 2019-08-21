import { Cookies } from "react-cookie";
import { batch } from "react-redux";
import axios from "axios";
import history from "../../history";
import { HIDDEN_FIGURE_URL } from "../../config/config";
import { /* postNewsLetter, */ setOrderHistory } from "../Customer/CustomerActions";
import { resetCheckoutState, setCart } from "../CheckoutV2/CheckoutActions";
// import { PushDL_FB_Registration } from "../Analytics/components/FB";
import { PushDL_LoggedInUser } from "../Analytics/components/GA";

import {
  setUser,
  addError,
  // checkSubscription,
  // checkSubscriptionStatusForNewsletter
} from "../App/AppActions";

export const AUTH_USER = "AUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const SET_CARTID = "SET_CARTID";
export const REMOVE_AUTH = "REMOVE_AUTH";
export const GET_IDENTITY_RESPONSE = "GET_IDENTITY_RESPONSE";
export const SET_RESET_PAGE_INFO = "SET_RESET_PAGE_INFO";

export function authUser() {
  return {
    type: AUTH_USER,
  };
}

export function getIdentityResponse() {
  return {
    type: GET_IDENTITY_RESPONSE,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function getCartId() {
  // FERV2  ???
  // ajax request with token to get user cart id
  return {
    type: SET_CARTID,
    payload: "cart52cx",
  };
}

export function removeAuth() {
  return {
    type: REMOVE_AUTH,
    payload: null,
  };
}

export function setResetPageInfo(data) {
  // console.log("setResetPageInfo success", data);
  return {
    type: SET_RESET_PAGE_INFO,
    payload: data,
  };
}

export function getUserByToken(customerIdToken, cb) {
  return (dispatch) => {
    // get the token for user
    const cookie = new Cookies();
    const token = cookie.get("x-auth") || customerIdToken;
    let authHeader = null;
    if (token) {
      authHeader = {
        Authorization: token,
      };
    }
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/`,
      headers: authHeader,
    })
      .then(response => batch(() => {
        if (
          response.status !== 200
          || response.data.code !== "0000"
          || !response.data.data
        ) {
          dispatch(authError(response.data.msg));
          if (cb) {
            cb(true, response.data.msg);
          }
          dispatch(addError({ code: response.data.code, msg: response.data.msg }));
        } else {
          cookie.set("x-auth", token, { path: "/" });
          const { customer } = response.data.data;
          const { email, group_id } = customer;
          PushDL_LoggedInUser({ email, tier: group_id });
          dispatch(setUser(customer));
          dispatch(authUser()); // authUser MUST be called after user SIGNED IN with token set
          dispatch(resetCheckoutState()); // FERV2 clear checkout reducer when user signed in
          if (cb) {
            cb(false, "Success");
          }
        }
      }))
      .catch((err) => {
        console.error("----log in error---", err);
        dispatch(authError("Login error. Please try again."));
        if (cb) {
          cb(true, "Login error. Please try again.");
        }
      });
  };
}

/**
 * @param first_name
 * @param last_name
 * @param email
 * @param password
 * @param sign_up_for_newsletter
 * @param phone is in the format of +12345678910
 * @param country_code => US, country iso2 code
 * @param cb
 * @param method
 * @param recaptcha_token
 */
export function signupUser(
  {
    first_name, last_name, email, password, sign_up_for_newsletter,
  },
  phone,
  country_code,
  cb,
  method,
  recaptcha_token,
) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    let authHeader = null;
    if (token) {
      authHeader = {
        Authorization: token,
      };
    }
    // Can signup with either email or phone
    const methodField = method === "phone" ? phone : email;
    const data = {
      [method]: methodField,
      country_code,
      password,
      firstname: first_name,
      lastname: last_name,
      sign_up_for_newsletter,
      recaptcha_token,
    };
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/signup`,
      data,
      headers: authHeader,
    })
      .then((response) => {
        if (response.status !== 200 || response.data.code !== "0000") {
          dispatch(authError(response.data.msg));
          if (cb) cb();
        } else {
          dispatch(authUser());
          cookie.set("x-auth", response.data.data.token, { path: "/" });
          dispatch(setUser(response.data.data.customer));
          dispatch(resetCheckoutState()); // FERV2 clear checkout reducer when user signed in
          // if(sign_up_for_newsletter){dispatch(postNewsLetter(email))} FERV2
          history.push("/"); // better be previous location in history FERV2
          // PushDL_FB_Registration(); FERV2
        }
      })
      .catch((err) => {
        dispatch(authError("Sign up error, please try again later."));
        console.error("Sign up error", err);
      });
  };
}

export function signinUser(
  { email, password, sign_up_for_newsletter },
  phone,
  country_code,
  cb,
  reacapturecb,
  method,
  recaptcha_token,
) {
  return (dispatch) => {
    // get the token for user
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    let authHeader = null;
    if (token) {
      authHeader = {
        Authorization: token,
      };
    }
    const methodField = method === "phone" ? phone : email;

    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/signin`,
      data: {
        [method]: methodField,
        country_code,
        password,
        recaptcha_token,
      },
      headers: authHeader,
    })
      .then((response) => {
        if (
          response.status !== 200
          || response.data.code !== "0000"
          || !response.data.data
          || !response.data.data.token
        ) {
          dispatch(authError(response.data.msg));
          if (cb) {
            cb(true, response.data.msg);
          }
          dispatch(addError({ code: response.data.code, msg: response.data.msg }));
          if (reacapturecb) {
            reacapturecb();
          }
        } else {
          cookie.set("x-auth", response.data.data.token, { path: "/" });
          // const token1 = response.data.data.token;
          // dispatch(checkSubscriptionStatusForNewsletter(token1,cookie));
          const { customer } = response.data.data;
          const { email: _email, group_id } = customer;
          PushDL_LoggedInUser({ _email, tier: group_id });
          dispatch(setUser(customer));
          dispatch(authUser()); // authUser MUST be called after user SIGNED IN with token set
          dispatch(resetCheckoutState()); // FERV2 clear checkout reducer when user signed in
          // dispatch(fetchCart(1,checkoutstep2));
          // if(sign_up_for_newsletter){dispatch(postNewsLetter(email))} FERV2
          if (cb) {
            cb(false, "Success");
          }
        }
      })
      .catch((err) => {
        console.error("----log in error---", err);
        dispatch(
          authError("Login error. Please check your email and password an try again."),
        );
        if (cb) {
          cb(true, "Login error. Please check your email and password an try again.");
        }
      });
  };
}

export function signinFacebookUser(data, cb) {
  console.log("signinFacebookUser called", data);
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    let authHeader = null;
    if (token) {
      authHeader = {
        Authorization: token,
      };
    }
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/socialLogin`,
      data,
      headers: authHeader,
    })
      .then((response) => {
        if (
          response.status != 200
          || response.data.code !== "0000"
          || !response.data.data
          || !response.data.data.token
        ) {
          if (cb) {
            cb(true, response.data.msg);
          }
          dispatch(addError({ code: response.data.code, msg: response.data.msg }));
        } else {
          dispatch(authUser());
          cookie.set("x-auth", response.data.data.token, { path: "/" });
          const { customer } = response.data.data;
          dispatch(setUser(customer));
          // if(sign_up_for_newsletter){dispatch(postNewsLetter(email))} FERV2
          if (cb) {
            cb(false, "Success");
          }
        }
      })
      .catch((err) => {
        console.error("Login error, please try again later.", err);
        dispatch(authError("Login error, please try again later."));
        if (cb) {
          cb(true, "Login error, please try again later.");
        }
      });
  };
}

export function logout() {
  console.log("i am leaving");
  const cookie = new Cookies();
  return (dispatch) => {
    // dispatch(checkSubscription(cookie));
    cookie.remove("x-auth", { path: "/" });
    dispatch(removeAuth());
    dispatch(setUser({}));
    dispatch(setCart({}));
    dispatch(setOrderHistory(null));
  };
}

export function verifyPhone({ phone, code }, cb) {
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/verify_phone`,
      data: {
        phone,
        code,
      },
    })
      .then((response) => {
        if (response.status !== 200 || response.data.code !== "0000") {
          cb(false, response.data.msg);
        } else {
          console.log("verifyPhone called success");
          cb(
            true,
            response.data.msg,
            response.data.data ? response.data.data.token : null,
          );
        }
      })
      .catch((err) => {
        console.error("verifyPhone called catch error", err);
        cb(false, "Oops, please check your email and try again");
      });
  };
}

export function resendVerifyCode({ phone }, cb) {
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/resend_verify_code`,
      data: {
        phone,
      },
    })
      .then((response) => {
        if (response.status != 200 || response.data.code !== "0000") {
          cb(false, response.data.msg);
        } else {
          // console.log('forgetPassword called success', email, response)
          cb(true, response.data.msg);
        }
      })
      .catch((err) => {
        console.error("resendVerifyCode called catch error", err);
        cb(false, "Oops, please check your phone and try again");
      });
  };
}

export function forgetPassword({ email }, cb) {
  // cb(success, msg) success=true if success
  // console.log('forgetPassword called ', email)
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/forget`,
      data: {
        email,
      },
    })
      .then((response) => {
        if (response.status !== 200 || response.data.code !== "0000") {
          cb(false, response.data.msg);
        } else {
          // console.log('forgetPassword called success', email, response)
          cb(true, response.data.msg);
        }
      })
      .catch((err) => {
        console.error("forgetPassword called catch error", err);
        cb(false, "Oops, please check your email and try again");
      });
  };
}

export function resetPassword(data, cb, method) {
  // cb(err, msg) err=false if success // should change all cbs to identical format -.-
  // console.log("====reset pw called =====", email, password, token);
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/reset`,
      data: {
        [method]: data.email ? data.email : data.phone,
        password: data.password,
        token: data.token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // cb(true, "Reset Password Not 200", response);
        } else if (response.data.code !== "0000") {
          // console.log("Reset Password Invalid, Not 0000", response);
          cb(true, response.data.msg);
        } else {
          // console.log("Reset Password Success!", response);
          cb(false, response.data.msg);
        }
      })
      .catch((err) => {
        console.error("Reset Password Caught Error!", err);
        cb(true, "Reset Password Caught Error!");
      });
  };
}

export function validateResetToken({ token }, cb) {
  // cb(err, msg) err=false if success // should change all cbs to identical format -.-
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/customers/reset/token`,
      data: {
        token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("Reset Password Not 200");
          if (cb) cb(true, "Sorry, the link is expired. Please try again.");
        } else if (response.data.code !== "0000") {
          console.log("Validate Token Invalid, Not 0000"); // msg: Token expired 1110 / Invalid token 1111
          if (cb) cb(true, "Sorry, the link is expired. Please try again.");
        } else {
          dispatch(setResetPageInfo(response.data.data));
          console.log("Validate Token Success!"); // msg: Success
          if (cb) cb(false, response.data.msg);
        }
      })
      .catch((err) => {
        console.error("Validate Token Caught Error!", err);
        cb(true, "Sorry, the link is expired. Please try again.");
      });
  };
}
