/**
 * Created by warrenchen on 4/11/17.
 */
import axios from "axios";
import { Cookies } from "react-cookie";
import history from "../../history";
import { HFCODE, HIDDEN_FIGURE_URL } from "../../config/config";
import { setUser, addError } from "../App/AppActions";
// const LOB_API_KEY = "test_372aa5f184ab6aa5d74198c001e2d55c3fc";
export const SET_ACCOUNT_INFORMATION_TAB = "SET_ACCOUNT_INFORMATION_TAB";
export const SET_ORDER_HISTORY = "SET_ORDER_HISTORY";
export const SET_RETURN_HISTORY = "SET_RETURN_HISTORY";
export const SET_ADDRESS_BOOK = "SET_ADDRESS_BOOK";
export const SET_EDIT_FORM = "SET_EDIT_FORM";
export const SET_UPDATED_FORM = "SET_UPDATED_FORM";
export const SET_NEW_BILLING_ADDRESS = "SET_NEW_BILLING_ADDRESS";
export const SET_NEW_FORM = "SET_NEW_FORM";
export const SET_ADD_NEW = "SET_ADD_NEW";
export const SET_DELETE_ADDRESS = "SET_DELETE_ADDRESS";
export const SET_PAYMENT_METHOD = "SET_PAYMENT_METHOD";
export const SET_DELETE_PAYMENTMETHOD = "SET_DELETE_PAYMENTMETHOD";
export const SET_GIFTCARD_BALANCE = "SET_GIFTCARD_BALANCE";
export const CLEAR_GIFTCARD_BALANCE = "CLEAR_GIFTCARD_BALANCE";
export const SET_REWARD_POINTS = "SET_REWARD_POINTS";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_RETURN_ORDER_ID = "SET_RETURN_ORDER_ID";
export const SET_RETURN_FROM_ADDRESS = "SET_RETURN_FROM_ADDRESS";
export const SET_REFUND_ESTIMATE = "SET_REFUND_ESTIMATE";
export const SET_GUEST_ORDER = "SET_GUEST_ORDER";
export const SET_SHIP_TO_NEW = "SET_SHIP_TO_NEW";
export const SET_REVIEW_ITEMS = "SET_REVIEW_ITEMS";
export const SET_REVIEW_DATA = "SET_REVIEW_DATA";
export const RESET_RETURN_HISTORY = "RESET_RETURN_HISTORY";

const dummy_payment_method = {
  code: "0",
  msg: "",
  data: {
    braintree_credit_card: [
      {
        token: "bnykp4",
        bin: "411111",
        last4: "1111",
        cardType: "Visa",
        expirationMonth: "10",
        expirationYear: "2019",
        customerLocation: "US",
        cardholderName: "YIFAN ZHOU",
        imageUrl:
          "https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox",
        prepaid: "Unknown",
        healthcare: "Unknown",
        debit: "Unknown",
        durbinRegulated: "Unknown",
        commercial: "Unknown",
        payroll: "Unknown",
        issuingBank: "Unknown",
        countryOfIssuance: "Unknown",
        productId: "Unknown",
        uniqueNumberIdentifier: "a2ff1949d3b9c75e82153971512688b0",
        venmoSdk: false,
        maskedNumber: "411111******1111",
        expirationDate: "10/2019",
        is_default: false,
        is_expired: false,
      },
    ],
    braintree_paypal_account: [
      {
        token: "8jwnsj",
        payerEmail: "fzszliurj-buyer@gmail.com",
        paymentId: "PAY-82A40249DM253940ALELFNDI",
        authorizationId: "1X58357122281381B",
        imageUrl:
          "https://assets.braintreegateway.com/payment_method_logo/paypal.png?environment=sandbox",
        debugId: "ec3165a28f0d6",
        payeeEmail: null,
        customField: null,
        payerId: "MEZWXP66GWG4U",
        payerFirstName: "YIFAN",
        payerLastName: "ZHOU",
        payerStatus: "VERIFIED",
        sellerProtectionStatus: "ELIGIBLE",
        captureId: "1X58357122281381B",
        refundId: null,
        transactionFeeAmount: "0.93",
        transactionFeeCurrencyIsoCode: "USD",
        description: null,
        is_default: true,
        is_expired: false,
      },
    ],
  },
};

/**
 *  This is the main function for fetching the account info
 *  We dispatch this function only when we firstly enter the account page
 *
 * @returns {function(*)}
 */
// export function fetchAccountInfo() {
//   console.log('fetchAccountInfo called')
//   // get the token for user
//   const cookie = new Cookies();
//   if(!cookie) return;
//   const token = cookie.get("x-auth");
//   return (dispatch) => {
//     axios({
//       method: 'GET',
//       url: `${HIDDEN_FIGURE_URL}/v1/test_customer`,
//       headers: {
//         'Authorization': token
//       },
//     }).then(response => {
//       const responseData = response.data.data.customer;
//
//       // FERV2
//       // set account information tab, address book tab, payment methods tab, reward point
//       dispatch(setAccountInformationTab(responseData));
//       dispatch(setSubscription(responseData));
//
//       // set the address book tab data
//       dispatch(setAddressBookTab(responseData));
//
//       // set the order history data
//       let {email} = responseData;
//       dispatch(fetchOrderHistory(email));
//
//       // set the payment methods data
//       dispatch(setPaymentMethod(responseData.payments))
//
//       // set the reward point data
//       let {reward_points} = responseData;
//       dispatch(setRewardPoints(reward_points));
//
//     }).catch(err => {
//       if (err.response && err.response.data.error.status_code === 404) {
//         console.log("404 error from address book get");
//       }
//     });
//   }
// }
/**
 * This one set the user information
 * NOTICE: reducer does not located inside CustomerReducer, rather located inside FormReducer
 * @param raw data response from customer API
 * @returns {{type: string, payload: *}}
 */
export function setAccountInformationTab(data) {
  // extracting all related fields from the response data
  const {
    email = "",
    phone = "",
    firstname = "",
    lastname = "",
    nickname = "",
    gender = "",
    street1 = "",
    street2 = "",
    countries = "US",
    zip = "",
    states = "CA",
    city = "",
  } = data;
  const evesEmailList = !!(data.extension_attributes
    && data.extension_attributes.subscription
    && data.extension_attributes.subscription["Eve's Email List"]);
  const phoneNotification = data.notify_methods
    ? data.notify_methods.includes("phone")
    : false;
  const emailNotification = data.notify_methods
    ? data.notify_methods.includes("email")
    : false;
  // form all extracted data into another object
  const accountInformationTabData = {
    email,
    phone,
    firstname,
    lastname,
    nickname,
    gender,
    street1,
    street2,
    countries,
    zip,
    states,
    city,
    evesEmailList,
    phoneNotification,
    emailNotification,
  };

  return {
    type: SET_ACCOUNT_INFORMATION_TAB,
    payload: accountInformationTabData,
  };
}

/**
 * This function updates the customer information
 * @returns {function(*)}
 */
export function postAccountInfo(newAccountInfo, method) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  const notify_methods = [];
  if (
    (!newAccountInfo.phoneNotification && method === "phone")
    || (newAccountInfo.phoneNotification && method !== "phone")
  ) {
    notify_methods.push("phone");
  }
  if (
    (!newAccountInfo.emailNotification && method === "email")
    || (newAccountInfo.emailNotification && method !== "email")
  ) {
    notify_methods.push("email");
  }
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/updateCustomer`,
      // url: "http://192.168.0.23:3001/api/v1/customers",
      headers: {
        Authorization: token,
      },
      data: {
        firstname: newAccountInfo.firstname,
        lastname: newAccountInfo.lastname,
        notify_methods,
      },
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          const error = response.data;
          dispatch(addError(error));
        } else {
          console.log("save sucess");
        }
      })
      .catch((err) => {
        console.error("there is an error occurs", err);
      });
  };
}

export function postReviewInfo(data, cb) {
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/review/submit_review`,
      // url: "http://192.168.0.23:3001/api/v1/customers",
      data,
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          const error = response.data;
          dispatch(addError(error));
          if (cb) cb(false);
        } else if (cb) cb(true);
      })
      .catch((err) => {
        console.error("there is an error occurs", err);
      });
  };
}

export function postCustomerInfo(data, cb) {
  console.error("there is postCustomerInfo", data);
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/review/submit_customer_survey`,
      // url: "http://192.168.0.23:3001/api/v1/customers",
      data,
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          const error = response.data;
          dispatch(addError(error));
          if (cb) cb(false);
        } else if (cb) cb(true);
      })
      .catch((err) => {
        console.error("there is an error occurs", err);
      });
  };
}

export function postGroupInfo(customer_token) {
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/verify_special_group`,
      // url: "http://192.168.0.23:3001/api/v1/customers",
      data: {
        token: customer_token,
      },
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          const error = response.data;
          dispatch(addError(error));
          if (response.data.code !== HFCODE.DATA_RETRIVAL_ERROR) {
            history.push("/account/dashboard");
          }
        } else {
          console.log("get success");
        }
      })
      .catch((err) => {
        console.error("there is an error occurs", err);
      });
  };
}

export function postVerifiedEmail(data, cb) {
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/resend_special_group_verify`,
      // url: "http://192.168.0.23:3001/api/v1/customers",
      data,
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          const error = response.data;
          dispatch(addError(error));
        } else if (cb) cb(response.data.msg);
      })
      .catch((err) => {
        console.error("there is an error occurs", err);
      });
  };
}

export function setAddressBook(data) {
  console.log("Set address book action");
  return {
    type: SET_ADDRESS_BOOK,
    payload: data,
  };
}

/**
 * This function extract data from the response and set the address book data
 * @param data the response object, who knows why the backend team puts the data
 * into a fucking customer field. Sucks.
 * @returns {function(*)}
 */
export function setAddressBookTab(data) {
  // extract the data from the object
  const addressData = data.addresses;

  return (dispatch) => {
    dispatch(setAddressBook(addressData));
  };
}

export function setOrderHistory(data) {
  return {
    type: SET_ORDER_HISTORY,
    payload: data,
  };
}

export function fetchOrderHistory() {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    if (!token) {
      dispatch(
        addError({
          code: "NOTK", // No token
          msg: "No token for fetching orders",
        }),
      );
    } else {
      axios({
        method: "GET",
        url: `${HIDDEN_FIGURE_URL}/v2/customer/orders`,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.data.code === HFCODE.ALLGOOD) {
            const orderList = response.data.data
              && response.data.data.orders
              && response.data.data.orders.order_list
              ? response.data.data.orders.order_list
              : null;
            if (orderList) {
              dispatch(setOrderHistory(orderList));
            } else {
              dispatch(
                addError({
                  code: "",
                  msg: "No order history received",
                }),
              );
            }
          } else {
            const error = response.data;
            dispatch(addError(error));
          }
        })
        .catch(err => console.error("Internal Error", err));
    }
  };
}

export function setReviewData(data) {
  return {
    type: SET_REVIEW_DATA,
    payload: data,
  };
}

export function setReviewItems(data) {
  return {
    type: SET_REVIEW_ITEMS,
    payload: data,
  };
}

export function fetchReviewItems(order_id, token) {
  return (dispatch) => {
    const cookie = new Cookies();
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/review/review_items`,
      headers: {
        Authorization: cookie.get("x-auth"),
      },
      data: {
        order_id,
        token,
      },
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD) {
          const reviewItems = response.data.data && response.data.data.items
            ? response.data.data.items
            : null;
          if (reviewItems) {
            dispatch(setReviewData(response.data.data));
            dispatch(setReviewItems(reviewItems));
          } else {
            dispatch(
              addError({
                code: "",
                msg: "No order history received",
              }),
            );
          }
        } else {
          const error = response.data;
          dispatch(addError(error));
        }
      })
      .catch(err => console.error("Internal Error", err));
  };
}

export function setSubscription(data) {
  return {
    type: SET_DESCRIPTION,
    payload: data,
  };
}

export function setPaymentMethod(data) {
  return {
    type: SET_PAYMENT_METHOD,
    payload: data,
  };
}

export function fetchPaymentMethod() {
  return (dispatch) => {
    dispatch(setPaymentMethod(dummy_payment_method.data));
  };
}

export function setDeletePaymentMethod(data) {
  // should return the new set of payment methods, rather than token
  return {
    type: SET_DELETE_PAYMENTMETHOD,
    payload: data,
  };
}

export function fetchDeletePaymentMethod(id, cb) {
  // ajax request to delete the specified payment methods and return a new set
  const cookie = new Cookies();
  const token = cookie.get("x-auth");

  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/savedpayment`,
      headers: {
        Authorization: token,
      },
      data: {
        _id: id,
      },
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          if (cb) {
            cb(`Please try again later. ${response.code}: ${response.message}`, true);
          }
        } else {
          // success
          dispatch(setDeletePaymentMethod(response.data.data.payments));
          dispatch(setUser(response.data.data));
          if (cb) cb("Success", false);
        }
      })
      .catch((err) => {
        if (cb) cb(`${err.data.code}: ${err.data.msg}`, true);
        console.error("fetchDeletePaymentMethod error", err);
      });
  };
}

export function fetchEditForm(id) {
  // ajax request for all addresses
  return (dispatch) => {
    dispatch(setEditForm(id));
  };
}

export function setEditForm(id) {
  return {
    type: SET_EDIT_FORM,
    id,
  };
}

export function setNewForm(address) {
  return {
    type: SET_NEW_FORM,
    payload: address,
  };
}

export function fetchNewForm(newform) {
  return (dispatch) => {
    dispatch(setNewForm(newform));
  };
}

export function setAddNew(form) {
  return {
    type: SET_ADD_NEW,
    payload: form,
  };
}

export function fetchAddNew(newform, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/address`,
      headers: {
        Authorization: token,
      },
      data: newform,
    })
      .then((response) => {
        console.log(response);
        if (response.data.code !== HFCODE.ALLGOOD) {
          // if (cb) cb(true, response.data.msg);
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
          if (cb) cb("Failed", true);
        } else {
          const { customer } = response.data.data;
          dispatch(setAddNew(customer.addresses));
          if (customer) dispatch(setUser(customer));
          if (cb) cb("Success", false);
        }
      })
      .catch((err) => {
        if (cb) cb(`Please try later. ${err.code}: ${err.message}`, true);
        console.error("fetchAddNew error", err.message);
      });
  };
}

export function unsubscribeNewsletter(cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }
  return () => {
    axios({
      method: "DELETE",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/newsletter`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          if (cb) cb(false, response.data.msg);
        } else {
          // success
          // console.log(response);
          if (cb) cb(true, "unsubscribe successfully!");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (cb) cb(true, err.response.data.msg);
        }
        console.error("unsubscribeNewsletter error", err);
      });
  };
}

export function setUpdatedForm(address) {
  return {
    type: SET_UPDATED_FORM,
    payload: address,
  };
}

export function fetchUpdatedForm(newform, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/address`,
      headers: {
        Authorization: token,
      },
      data: newform,
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          if (cb) cb("", true);
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
        } else {
          if (response.data.data.customer.addresses) {
            dispatch(setUpdatedForm(response.data.data.customer.addresses));
          }
          if (response.data.data.customer) dispatch(setUser(response.data.data.customer));
          if (cb) cb("Success", false);
        }
      })
      .catch((err) => {
        if (err.data) {
          if (cb) cb(`${err.data.code}: ${err.data.msg}`, true);
        }
        console.error("fetchUpdatedForm error", err);
      });
  };
}

export function setDeleteAddress(address) {
  return {
    type: SET_DELETE_ADDRESS,
    payload: address,
  };
}

export function fetchDeleteAddress(id, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/address`,
      headers: {
        Authorization: token,
      },
      data: { _id: id },
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          if (cb) cb(false);
          console.log(`fetchDeleteAddress Error: ${response.data.message}`);
        } else {
          // success
          console.log("delete address success", response.data.data);
          // console.log(response);
          if (cb) cb(true);
          dispatch(setDeleteAddress(response.data.data.customer.addresses));
          if (response.data.data.customer) dispatch(setUser(response.data.data.customer));
        }
      })
      .catch((err) => {
        if (err.data) {
          if (cb) cb(`${err.data.code}: ${err.data.msg}`, false);
        }
        console.error("fetchDeleteAddress error", err);
      });
  };
}

export function setShipToNew(data) {
  return {
    type: SET_SHIP_TO_NEW,
    payload: data,
  };
}

export function postNewsLetter(email, cb) {
  const headers = {
    "Content-Type": "application/json",
  };
  return (dispatch) => {
    // dispatch(changeHeader(dummy_et_header));
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/newsletter`,
      headers,
      data: { email },
    })
      .then((response) => {
        if (response.data.code !== HFCODE.ALLGOOD) {
          if (cb) cb(true, response.data.msg);
        } else {
          // success
          console.log("subscribe successfully");
          if (cb) cb(false, "subscribe successfully");
        }
      })
      .catch((err) => {
        console.error("postNewsLetter error happened", err);
      });
  };
}

// /**
//  * This function fetches the giftcard balance
//  * @param cardCode
//  * @returns {function(*)}
//  */
// export function fetchGiftCardBalance(cardCode) {
//   // TODO
//
//   console.log(cardCode);
//   return (dispatch) => {
//     axios({
//       method:'post',
//       url: `${HIDDEN_FIGURE_URL}/v1/account/giftcard`,
//       data: {"giftcard": cardCode}
//     }).then((response) => {
//       if(response.data.code === HFCODE.ALLGOOD) {
//         dispatch(setGiftCardBalance(response.data.data));
//       } else {
//         // if the gift card is invalid
//         console.log("invalid giftcard");
//         let error = response.data;
//
//         const {code, msg} = error;
//
//         dispatch(addError({code, msg}));
//       }
//     }).catch(err => console.log(err));
//   }
// }
//
// export function setGiftCardBalance(balance) {
//   return {
//     type: SET_GIFTCARD_BALANCE,
//     payload: balance
//   }
// }

/**
 * This function clear the gift card information for next search
 * @returns {{type: string, payload: string}}
 */
// export function clearGiftCardBalance() {
//   return {
//     type: SET_GIFTCARD_BALANCE,
//     payload: ''
//   }
// }

export function setReturnOrderID(data) {
  return {
    type: SET_RETURN_ORDER_ID,
    payload: data,
  };
}
export function setRewardPoints(rewardPoints) {
  return {
    type: SET_REWARD_POINTS,
    payload: rewardPoints,
  };
}

// FERV2 gift card get amount and redeem:
export function checkGiftCardAmount(cardNumber, cb) {
  // cb(error, data)
  console.log("--- checkGiftCardAmount called ---");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/giftcard?card_number=${cardNumber}`,
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD) {
          console.log("--- checkGiftCardAmount success ---", response);
          if (cb) cb(false, response.data.data.giftcard_amount);
        } else {
          // if the gift card is invalid
          console.log("Invalid giftcard");
          const { code, msg } = response.data;
          if (cb) cb(true, msg);
          dispatch(addError({ code, msg }));
        }
      })
      .catch((err) => {
        console.error("checkGiftCardAmount error", err);
        if (cb) cb(true, "Invalid giftcard");
      });
  };
}

export function redeemGiftcard(cardNumber, cb) {
  console.log("--- redeemGiftcard called ---");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/redeemGiftcard`,
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      data: { card_number: cardNumber },
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD) {
          console.log("--- redeemGiftcard success ---", response);
          dispatch(setUser(response.data.data.customer));
          if (cb) cb(false, response.data.data.customer.account_balance);
        } else {
          // if the gift card is invalid
          console.log("redeemGiftcard invalid giftcard");
          const { code, msg } = response.data;
          if (cb) cb(true, msg);
          dispatch(addError({ code, msg }));
        }
      })
      .catch((err) => {
        console.error("redeemGiftcard error", err);
        if (cb) cb(true, "Invalid giftcard");
      });
  };
}

export function setReturnFromAddress(address) {
  console.log("setReturnFromAddress called in action");
  // console.log('debug setReturnFromAddress: ', address);
  return {
    type: SET_RETURN_FROM_ADDRESS,
    payload: address,
  };
}

export function getReturnQuote() {
  console.log("getReturnQuote called");
}

export function setRefundEstimate(data) {
  console.log("setRefundEstimate called", data);
  return {
    type: SET_REFUND_ESTIMATE,
    payload: data,
  };
}

export function requestRefundEstimate(data) {
  console.log("getRefundEstimate called", data);
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    if (!token) {
      dispatch(
        addError({
          code: "NOTK", // No token
          msg: "No token for fetching orders",
        }),
      );
    } else {
      axios({
        method: "POST",
        url: `${HIDDEN_FIGURE_URL}/v2/refund/estimate_amount`,
        headers: {
          Authorization: token,
        },
        data,
      })
        .then((response) => {
          if (response.data.code === HFCODE.ALLGOOD && response.data.data) {
            // cb(false, response.data.data); // err, data
            dispatch(setRefundEstimate(response.data.data));
          } else {
            // cb(true, null);
            const error = {
              code: response.data.code,
              msg: response.data.msg,
            };
            dispatch(addError(error));
          }
        })
        .catch(err => console.error("getRefundEstimate Internal Error", err));
    }
  };
}

export function resetRefundEstimate() {
  return {
    type: SET_REFUND_ESTIMATE,
    payload: null,
  };
}

export function placeReturn(data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/refund/customer`,
      headers: {
        Authorization: token,
      },
      data,
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD) {
          cb(false, response.data.data); // err, data
        } else {
          console.log("this is problem for refund", response);
          cb(true, null);
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
        }
      })
      .catch((err) => {
        console.error("Internal Error", err);
        dispatch(addError({ code: "", msg: "Oops! Request Failed" }));
        cb(true, null);
      });
  };
}

export function setGuestOrder(data) {
  return {
    type: SET_GUEST_ORDER,
    payload: data,
  };
}

export function fetchGuestOrder(data, cb) {
  console.log("fetchGuestOrder called", data);
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/guest_order`,
      data,
    })
      .then((response) => {
        if (
          response.data.code === HFCODE.ALLGOOD
          && response.data.data
          && response.data.data.order_list
        ) {
          const { order_list } = response.data.data;
          // If it's a store purchase, show error message.
          if (["ebe", "et"].includes(order_list[0].store_type)) {
            if (cb) {
              cb(
                true,
                "It looks like this is a store purchase. Please note that store purchases cannot be returned/exchanged online.",
              );
            }
            return;
          }
          if (cb) cb(false, null); // err, msg
          if (order_list[0].shipping_address && order_list[0].shipping_address.postcode) {
            dispatch(setReturnFromAddress(order_list[0].shipping_address));
          }
          dispatch(setGuestOrder(order_list[0]));
        } else {
          if (cb) cb(true, response.data.msg);
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
        }
      })
      .catch((err) => {
        console.error("Internal Error", err);
        dispatch(addError({ code: "", msg: "Oops! Request Failed" }));
        if (cb) cb(true, "Oops! Request Failed");
      });
  };
}

export function changeEmail(data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/changeEmail`,
      headers: {
        Authorization: token,
      },
      data,
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD && response.data.data) {
          if (cb) cb(false, null, "email");
        } else {
          if (cb) cb(true, response.data.msg, "email");
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
        }
      })
      .catch((err) => {
        console.error("Internal Error", err);
        dispatch(addError({ code: "", msg: "Oops! Request Failed" }));
        if (cb) cb(true, "Oops! Request Failed", "email");
      });
  };
}

export function changePhone(data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/changePhone`,
      headers: {
        Authorization: token,
      },
      data,
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD && response.data.data) {
          if (cb) cb(false, null, "phone");
        } else {
          if (cb) cb(true, response.data.msg, "phone");
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
        }
      })
      .catch((err) => {
        console.error("Internal Error", err);
        dispatch(addError({ code: "", msg: "Oops! Request Failed" }));
        if (cb) cb(true, "Oops! Request Failed", "phone");
      });
  };
}

export function updateEmailFB(data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/updateEmail`,
      headers: {
        Authorization: token,
      },
      data,
    })
      .then((response) => {
        if (response.data.code === HFCODE.ALLGOOD && response.data.data) {
          if (cb) cb(false, null);
        } else {
          if (cb) cb(true, response.data.msg);
          const error = {
            code: response.data.code,
            msg: response.data.msg,
          };
          dispatch(addError(error));
        }
      })
      .catch((err) => {
        console.error("Internal Error", err);
        dispatch(addError({ code: "", msg: "Oops! Request Failed" }));
        if (cb) cb(true, "Oops! Request Failed");
      });
  };
}
