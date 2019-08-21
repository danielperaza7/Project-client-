import axios from "axios";

// import actions
import { Cookies } from "react-cookie";
import history from "../../history";
import {
  setCartNum, setCartJustAdded, showMask, removeMask, addError, setUser,
} from "../App/AppActions";
import { getIdentityResponse, authUser } from "../Authentication/AuthActions";
import { HIDDEN_FIGURE_URL, MASKS } from "../../config/config";

import { PushDL_FB_Lead, PushDL_FB_CustomerInfo } from "../Analytics/components/FB";


// import action
import {
  PushDL_AddToCart, PushDL_RemoveFromCart, constructCartStatusData, PushDL_LoggedInUser, constructUserData, onCheckout, constructCheckoutData,
} from "../Analytics/components/GA";

const LOB_API_KEY = "test_372aa5f184ab6aa5d74198c001e2d55c3fc";

// define constants for actions
export const POST_CART_ADDRESS = "POST_CART_ADDRESS";
export const SET_CART = "SET_CART";
export const SET_ACCOUNT_EXIST = "SET_ACCOUNT_EXIST";
export const SET_SHIPPING_ADDRESS_FORM = "SET_SHIPPING_ADDRESS_FORM";
export const SET_SHIPPING_ADDRESS = "SET_SHIPPING_ADDRESS";
export const SET_BILLING_ADDRESS = "SET_BILLING_ADDRESS";
export const SET_BILLING_ADDRESS_FORM = "SET_BILLING_ADDRESS_FORM";
export const SET_NEW_BILLING_ADDRESS = "SET_NEW_BILLING_ADDRESS";
export const SET_EMPTY_CART = "SET_EMPTY_CART";
export const SET_CAN_CHECKOUT = "SET_CAN_CHECKOUT";
export const SET_GUEST_EMAIL = "SET_GUEST_EMAIL";
export const SET_SIGNUP_FORM = "SET_SIGNUP_FORM";
export const GET_ORDER_INFO = "GET_ORDER_INFO";
export const RECORD_CHECKOUTSTEP = "RECORD_CHECKOUTSTEP";


export function addToWishList(qty, sku, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    console.log("move to wishList called!");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL_TEST}/v1/test_wishlist?detail=1`,
      data: {
        product: {
    		sku,
    		qty,
    	  },
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
        // error
        } else {
        // if success
          if (response.data.code === "0000") {
            console.log("move to wishList successfully!");
            if (cb) cb(true);
          } else {
            console.log("move to wishList failed!", response.data.msg);
            if (cb) cb(false);
          }
        }
      })
      .catch(() => {
      // do something
      });
  };
}

export function postCartAddress(shippingAddress, billingAddress, tryNextStep) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/carts/addresses`,
      data: {
        shipping_address: shippingAddress,
        billing_address: (billingAddress || shippingAddress),
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
        // error
        } else {
        // if success
          if (response.data.code === "0000") {
            dispatch(setCart(response.data));
            if (tryNextStep) {
              tryNextStep();
            }
          }
        }
      })
      .catch(() => {
      // do something
      });
  };
}

export function moveToCart(sku, qty, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "put",
      url: `${HIDDEN_FIGURE_URL_TEST}/v1/test_wishlist/cart?detail=1`,
      data: {
        product: {
    		sku,
    		qty,
    	  },
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
        // error
        } else {
        // if success
          if (response.data.code === "0000") {
            console.log("move to cart successfully!");
            if (cb) cb(true);
          } else {
            console.log("move to cart failed!");
            if (cb) cb(false);
          }
        }
      })
      .catch(() => {
      // do something
      });
  };
}


export function setCart(data) {
  console.log("setCart called", data);
  return {
    type: SET_CART,
    payload: data,
  };
}

export function setEmptyCart(isEmpty) {
  return {
    type: SET_EMPTY_CART,
    payload: isEmpty,
  };
}

export function fetchCart(checkoutstep2) {
  console.log("fetchCart called");

  // dispatch fetch cart
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the fucking customer doesn't have token, push him to empty cart page.
    if (!token) {
      if (checkoutstep2 == "checkout") history.push("/cart");
      return {
        type: SET_EMPTY_CART,
        payload: true,
      };
    }
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/test_cart/get_cart`,
      params: {
        detail: 1,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status != 200 || response.data.code !== "0000") {
        // display error
        } else {
        // success
        // if the response is correct
          const { customer } = response.data.data;
          if (response.data.data.customer.group_id && response.data.data.customer.group_id !== 0) {
          // registered user
            console.log("registered user");
            dispatch(authUser());
            dispatch(setUser(customer));
            // NOTICE!! This get Identity response must be called after authUser action, because
            // the app loading can only start after we set isAuthenticated to be true
            // this will address the first loading error
            dispatch(getIdentityResponse());
          } else {
          // guest user
            console.log("guest user");
            dispatch(getIdentityResponse());
            dispatch(setUser(customer));
          // 1 check Newsletter
          }
          const { product_list } = response.data.data;
          const { priceCalcResult } = response.data.data;
          console.log("fetch cart", product_list, priceCalcResult);
          if (product_list.items_qty === 0) {
          // has 0 items, push to empty cart
            console.log("empty cart");
            if (checkoutstep2 == "checkout") history.push("/cart");
          } else {
            console.log("unempty cart");
            // if(checkoutstep2=="not-sign-in") onCheckout(constructCheckoutData(2,"not-sign-in",productList));
            // if(checkoutstep2=="sign-in") onCheckout(constructCheckoutData(2,"sign-in",productList));
            // if(checkoutstep2=="initialization") onCheckout(constructCheckoutData(1,"initialization",productList));
            // if everything is in stock, we set the can_checkout to be true, else we set it to false
            // let isInStock = checkIsInStock(productList); FERV2
            // dispatch(setCanCheckout(isInStock)); FERV2
            dispatch(setCart({ product_list, priceCalcResult }));
          }
        }
      })
      .catch(() => {
      // do something
      });
  };
}

export function setAccountExist(data) {
  return {
    type: SET_ACCOUNT_EXIST,
    payload: data,
  };
}

export function checkAccountExist({ email }, callback) {
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/account/exist`,
      data: {
        data: email,
        data_type: "email",
      },
    })
      .then((response) => {
        if (response.status != 200) {
        // error
        } else {
        // success
          if (response.data.code === "0000") {
            dispatch(setGuestEmail(email));
            dispatch(setAccountExist(response.data.data.exist));
            // PushDL_LoggedInUser(constructUserData({email},true)) // only need to push customer once, FB one has firstname and lastname
            PushDL_FB_CustomerInfo(constructUserData({ email }, true));
            callback();
          } else {
          // handle error code
          }
        }
      })
      .catch(() => {
      // do something
      });
  };
}

export function setGuestEmail(data) {
  return {
    type: SET_GUEST_EMAIL,
    payload: data,
  };
}

export function getOrderInfo(data) {
  console.log("this is order INFO:", data);

  return {
    type: GET_ORDER_INFO,
    payload: data,
  };
}

export function validateAddress({
  firstname, lastname, street1, street2, country_id, postcode, region_code, city,
}, callback) {
  return (dispatch) => {
    // make Ajax request
    const inputAddressData = `&address_line1=${street1
    }&address_line2=${street2 || ""
    }&address_city=${city
    }&address_state=${region_code
    }&address_zip=${postcode
    }&address_country=${country_id}`;
    axios({
      method: "post",
      url: "https://api.lob.com/v1/verify",
      headers: { Authorization: `Basic ${btoa(`${LOB_API_KEY}:`)}` },
      data: inputAddressData,
    })
      .then((response) => {
        if (response.status !== 200) {
        // error , ?? why 404 cannot fall to this code but catch ?
        } else {
        // success
          callback(response.data);
        }
      })
      .catch((err) => {
      // do something
        if (err.response && err.response.data.error.status_code === 404) {
          callback({ error: "error" });
        }
      });
  };
}

export function setShippingAddress(data) {
  console.log("setShippingAddress called");
  return {
    type: SET_SHIPPING_ADDRESS,
    payload: data,
  };
}

export function setShippingAddressForm(data) {
  console.log("setShippingAddressForm fired");
  return {
    type: SET_SHIPPING_ADDRESS_FORM,
    payload: data,
  };
}

export function setBillingAddress(data) {
  console.log("setBillingAddress called");
  return {
    type: SET_BILLING_ADDRESS,
    payload: data,
  };
}

export function setBillingAddressForm(data) {
  console.log("setBillingAddressForm fired");
  return {
    type: SET_BILLING_ADDRESS_FORM,
    payload: data,
  };
}

export function fetchGiftCardValue(data, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the fucking customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }

    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/account/giftcard`,
      data: {
        giftcard: data,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
        // error
          cb(response.data);
        } else {
        // if success
          if (response.data.code === "0000") {
            cb(response.data);
          } else {
            cb(response.data);
          }
        }
      })
      .catch((err) => {
      // do something
        cb({ code: "error", msg: "Gift Card Apply Exception" });
      });
  };
}

export function fetchBraintreeToken(cb) {
  console.log("getBraintreeToken callled");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {
      type: SET_EMPTY_CART,
      payload: true,
    };
  }
  return (dispatch) => {
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/braintree/token`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status != 200) {
          // error
          console.log("fetchBraintreeToken not 200");
        } else {
          // success
          if (response.data.code == "0000") {
            console.log("braintree token fetched");// + response.data.data);
            cb(response.data.data);
          } else {
            console.log("response code not 0");
          }
        }
      })
      .catch(() => {
        // do something
        console.log("catch fetchBraintreeToken error");
      });
  };
}

export function setShowHeader(shouldShow) {
  return {
    type: SET_SHOW_HEADER,
    payload: shouldShow,
  };
}

export function moveItemToWishList() {
  return (dispatch) => {
    console.log("move item to wish list");
  };
}

export function addToCart(data, DL_Data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  let header = null;
  if (token) {
    header = {
      headers: {
        Authorization: token,
      },
    };
  }
  return (dispatch) => {
    console.log("add to cart called ", qty, sku);
    // 1. firstly push the new cart changed item to the remote
    if (qty >= 0) {
      axios({
        method: "post",
        url: `${HIDDEN_FIGURE_URL}/v1/test_cart`,
        params: {
          detail: 0, // ???
        },
        ...header,
        data: {
          product: data,
        },
      })
      // 2. once we get the product, we update the customer object
        .then((response) => {
          if (response.status != 200) {
            // display error
          } else if (response.data.code === "0000" && response.data.data && response.data.data.customer && response.data.data.product_list) {
            // success
            const { customer, product_list, priceCalcResult } = response.data.data;
            const receivedToken = response.data.data.token;
            // PushDL_AddToCart({ ...DL_Data, cartStatus: constructCartStatusData(response.data.data.product_list.items) }); FERV2
            if (cb) { cb(true); } // cb(success)
            // 0. guest user set token
            if (!token && receivedToken) {
              cookie.set("x-auth", response.data.data.token, { path: "/" });
            }
            // 1. update data
            if (customer) { dispatch(setUser(customer)); }
            // if (product_list && priceCalcResult) { dispatch(setCart({ product_list, priceCalcResult })); } FERV2

            // if (product_list.items_qty === 0){
            //   // has 0 items, push to empty cart
            //   //dispatch(setEmptyCart(true));
            //   //dispatch(setCartNum(0));
            // }else{
            //   //let productList = response.data.data.product_list.items_qty;
            //   // set cart
            //   dispatch(setEmptyCart(false));
            //   const num = response.data.data.product_list.items_qty;
            //   dispatch(setCartNum(num));
            //= ==== show items just added panel =====
            const myitem = product_list.items.filter(item => item.sku == sku)[0];
            console.log("add to cart, myitem", myitem);
            const itemToAdd = {
              name: myitem.name,
              image: myitem.images.main.images.xs.url,
              color: myitem.attr.color, // []
              size: myitem.attr.size, // []
              price: myitem.price, // {current, original}
              qty: data.qty,
            };
            dispatch(setCartJustAdded(itemToAdd));
            //
            //
            //   // if everything is in stock, we set the can_checkout to be true, else we set it to false
            //   //let isInStock = checkIsInStock(productList);
            //   //dispatch(setCanCheckout(isInStock));
            //
            //   //dispatch(setCart(response.data));
            // }
          } else {
            // code error
            if (cb) { cb(false); } // cb(success)
            const err = {
              code: response.data.code,
              msg: response.data.msg,
            };
            dispatch(addError(err));
          }
        })
      // 3. if there is an error
        .catch(() => {
          console.log("There is an error with the cart object.");
        });
    }
  };
}

export function changeCartItem(qty, sku, DL_Data, qtyChanged, currencyCode) {
  // qty is the updated qty
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }

  return (dispatch) => {
    console.log("In action changeCartItem, we changed cart item number to ", qty);
    // 1. firstly push the new cart changed item to the remote
    if (qty >= 0) {
      axios({
        method: "put",
        url: `${HIDDEN_FIGURE_URL}/v1/test_cart/items`,
        params: {
          detail: 1,
        },
        headers: {
          Authorization: token,
        },
        data: {
          product: [
            {
              sku,
              qty,
            },
          ],
        },
      })
      // 2. once we get the product, we update the cart object
        .then((response) => {
          if (response.status != 200) {
          // display error
          } else if (response.data.code === "0000" && response.data.data && response.data.data.customer && response.data.data.product_list) {
            // if( qtyChanged > 0 ){ FERV2
            //   PushDL_AddToCart({ currencyCode:currencyCode, add: DL_Data, cartStatus: constructCartStatusData(response.data.data.product_list.items) })
            // }else if( qtyChanged< 0 ){
            //   PushDL_RemoveFromCart({ remove: DL_Data, cartStatus: constructCartStatusData(response.data.data.product_list.items) })
            // }
            // success
            const { customer, product_list, priceCalcResult } = response.data.data;
            if (customer) { dispatch(setUser(customer)); }
            if (product_list.items_qty === 0) {
              console.log("empty cart");
              if (checkoutstep2 == "checkout") history.push("/cart");
            } else {
              console.log("unempty cart");
              // if(checkoutstep2=="not-sign-in") onCheckout(constructCheckoutData(2,"not-sign-in",productList));
              // if(checkoutstep2=="sign-in") onCheckout(constructCheckoutData(2,"sign-in",productList));
              // if(checkoutstep2=="initialization") onCheckout(constructCheckoutData(1,"initialization",productList));
              // if everything is in stock, we set the can_checkout to be true, else we set it to false
              // let isInStock = checkIsInStock(productList); FERV2
              // dispatch(setCanCheckout(isInStock)); FERV2
              dispatch(setCart({ product_list, priceCalcResult }));
            }
            // 1. if token invalid
            //    delete local token then push to "/signin"
            // if( response.data.data.product_list.items.length === 0 ){
            //   // has 0 items, push to empty cart
            //   dispatch(setEmptyCart(true));
            //   dispatch(setCartNum(0));
            // }else{
            //   let productList = response.data.data.product_list;
            //   // set cart
            //   //console.log(response.data.data);
            //   dispatch(setEmptyCart(false));
            //   dispatch(setCartNum(productList.items_qty));
            //
            //   // if everything is in stock, we set the can_checkout to be true, else we set it to false
            //   let isInStock = checkIsInStock(productList);
            //   dispatch(setCanCheckout(isInStock));
            //
            //   dispatch(setCart(response.data));
            // }
          } else {
            // code error
          }
        })
      // 3. if there is an error
        .catch(() => {
          console.log("There is an error with the cart object.");
        });
    }
  };
}

export function postOrder(request, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }

  return (dispatch) => {
    console.log("this is request:", request);
    dispatch(showMask(MASKS.global));
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/carts/order?`,
      data: request,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("postOrder response received");
        dispatch(removeMask(MASKS.global));
        if (response.status != 200) {
        // display error
          cb(false, "status not 200");
        } else {
        // success11
          console.log("status 200");
          if (response.data.code == "0000") {
          // success
            const data = {
              first_name: request.billing_address.firstname,
              order_number: response.data.data.order_id,
              last_name: request.billing_address.lastname,
              email: request.email,
            };
            dispatch(getOrderInfo(data));
            cb(true, null, response.data.data.order_id);
            console.log("here is response", response.data.data);
          } else {
            let msg = "";
            if (response.data.code == "4BPF") msg = "Your card is declined. Please check with your card-issuing bank for fraud protection or check your credit balance.";
            else if (response.data.code == "46BT") msg = "Please provide matched CVV code and billing postcode to complete the transaction, or refresh your browser.";
            else if (response.data.code == "49AF") msg = "Billing post code does not match bank record. Please check again.";
            else if (response.data.code == "4ACF") msg = "CVV code does not match bank record. Please check again.";
            else msg = response.data.msg;
            cb(false, msg);
          }
        }
      })
      .catch((err) => {
      // do something
        console.log("err");
        console.log(err);
        dispatch(removeMask(MASKS.global));
        cb(false, "Oops! Bug caught... Your order may succeed or fail.  We suggest you to check your order history in your order history under your account.");
      });
  };
}

export function setCanCheckout(flag) {
  return {
    type: SET_CAN_CHECKOUT,
    payload: flag,
  };
}

export function applyCoupon(coupon, detail, cb) {
  console.log("applyCoupon action called");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }
  return (dispatch) => {
    const detailParam = detail;
    axios({
      method: "put",
      url: `${HIDDEN_FIGURE_URL}/v1/carts/coupons/${coupon}?detail=${detail}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status != 200) {
        // display error
          console.log("response not 200");
        // cb(true, 'sorry, please try later')
        } else {
        // success11
          console.log("status 200");
          if (response.data.code == "0000") {
            console.log("code 0");
            dispatch(setCart(response.data));
            cb(false, "Coupon applied successfully!");
          } else {
          // error happened
          // console.log(response.data)
            cb(false, response.data.msg);
          }
          PushDL_FB_Lead(response.data.data.total_segments.grand_total.value);
        }
      })
      .catch((err) => {
      // do something
        console.log("err");
        console.log(err);
      });
  };
}

export function removeCoupon(detail) {
  console.log("removeCoupon action called");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "delete",
      url: `${HIDDEN_FIGURE_URL}/v1/carts/coupons?detail=${detail}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status != 200) {
        // display error
        } else {
        // success11
          console.log("status 200");
          dispatch(setCart(response.data));
        }
      })
      .catch((err) => {
      // do something
        console.log("err");
        console.log(err);
      });
  };
}

function checkIsInStock(productList) {
  productList.items.forEach((item) => {
    if (item.qty > item.stock.qty) {
      return false;
    }
  });
  return true;
}

export function setSignupForm(data) {
  return {
    type: SET_SIGNUP_FORM,
    payload: data,
  };
}
