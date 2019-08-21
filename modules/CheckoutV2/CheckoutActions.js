import axios from "axios";
import { Cookies } from "react-cookie";
import _ from "lodash";
import history from "../../history";

// === Import Constants ===
import { HIDDEN_FIGURE_URL, HFCODE } from "../../config/config";

// === Import Actions ===
import { setUser, setCartJustAdded, addError } from "../App/AppActions";
import { getIdentityResponse, authUser, logout } from "../Authentication/AuthActions";
import { PushDL_FB_Lead } from "../Analytics/components/FB";
import {
  PushDL_AddToCart,
  constructCartStatusData,
  PushDL_RemoveFromCart,
  onCheckout,
  constructCheckoutData,
  onCheckoutOption,
} from "../Analytics/components/GA";

// === Define Constants for Actions ===
export const SET_CART = "SET_CART";
export const SET_LOADING_CART = "SET_LOADING_CART";
export const SET_WISHLIST = "SET_WISHLIST";
export const SET_REDEEMABLE_PRODUCT_LIST = "SET_REDEEMABLE_PRODUCT_LIST";
export const SET_RPRPLIST = "SET_RPRPLIST";
export const SET_REDEEMED_POINTS_IN_CART = "SET_REDEEMED_POINTS_IN_CART";
export const SET_CHECKOUT_STEP = "SET_CHECKOUT_STEP";
export const NEXT_CHECKOUT_STEP = "NEXT_CHECKOUT_STEP";
export const SET_ORDER_EMAIL = "SET_ORDER_EMAIL";
// export const SET_APPLIED_COUPON= "SET_APPLIED_COUPON";

// for payments
export const SET_BRAINTREE_TOKEN = "SET_BRAINTREE_TOKEN";
export const SET_PAYMENT_METHOD = "SET_PAYMENT_METHOD";
export const SET_BRAINTREE_SAVED_SELECTED = "SET_BRAINTREE_SAVED_SELECTED";
export const SET_BRAINTREE_CARD_INSTANCE = "SET_BRAINTREE_CARD_INSTANCE";
export const SET_PAYPAL_NONCE = "SET_PAYPAL_NONCE";
export const SET_CREDIT_CARD_NONCE = "SET_CREDIT_CARD_NONCE";
export const SET_PAYMENT_SAVED_DETAIL = "SET_SAVED_DETAIL";
export const SET_CREDIT_CARD_DETAIL = "SET_CREDIT_CARD_DETAIL";
export const SET_PAYPAL_DETAIL = "SET_PAYPAL_DETAIL";
export const SET_SAVE_NEW_PAYMENT = "SET_SAVE_NEW_PAYMENT";
export const RESET_PAYMENT = "RESET_PAYMENT";

// for shipping address
export const SET_SHIPPING_METHOD = "SET_SHIPPING_METHOD";
export const SET_SHIP_EXIST_ID = "SET_SHIP_EXIST_ID";
export const SET_SHIP_NEW = "SET_SHIP_NEW";
export const SET_SHIPPING_ADDRESS = "SET_SHIPPING_ADDRESS";
export const SET_SAVE_SHIPPINGADDRESS = "SET_SAVE_SHIPPINGADDRESS";

// for billing address
export const SET_USE_AS_BILLING = "SET_USE_AS_BILLING";
export const SET_BILL_EXIST_ID = "SET_BILL_EXIST_ID";
export const SET_BILL_NEW = "SET_BILL_NEW";
export const SET_BILLING_ADDRESS = "SET_BILLING_ADDRESS";
export const SET_SAVE_BILLINGADDRESS = "SET_SAVE_BILLINGADDRESS";
export const SET_SUBSCRIBE_EMAIL = "SET_SUBSCRIBE_EMAIL";
export const SET_BILLING_FORM_STATUS = "SET_BILLING_FORM_STATUS";
export const SET_ORDER_SUCCESS_DATA = "SET_ORDER_SUCCESS_DATA";
export const RESET_CHECKOUT_STATE = "RESET_CHECKOUT_STATE";
export const SET_SHIPPINGMETHOD_STATUS = "SET_SHIPPINGMETHOD_STATUS";
export const RESET_CHECKOUT_PART_STATE = "RESET_CHECKOUT_PART_STATE";
export const SET_PAY_WITH_NEW = "SET_PAY_WITH_NEW";
// for refer
export const SET_REFER_SOURCE = "SET_REFER_SOURCE";
export const SET_ORDER_PHONE = "SET_ORDER_PHONE";

// === Export Actions ===
export function removeWishListItem(sku, qty, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      // format empty wishlist to display in new empty cart page
      dispatch(setWishList({ items: [], items_count: 0, items_qty: 0 }));
      return;
    }
    axios({
      method: "put",
      url: `${HIDDEN_FIGURE_URL}/v2/wishlist/item?detail=1`,
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
            console.log("remove to cart successfully!");
            dispatch(setWishList(response.data.data.wishList_product_list));
            if (cb) cb(true);
          } else {
            console.log("remove to cart failed!", response.data.msg);
            if (cb) cb(false, response.data.msg);
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("removeWishListItem error", err);
      });
  };
}

export function removeRPRPListItem(sku, qty, cb) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/redeem/remove`,
      data: {
        product: {
          qty,
          sku,
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
            console.log("remove from rprplist successfully!");
            dispatch(setRPRPList(response.data.data.redeem_product_list));
            if (cb) cb(true);
          } else {
            console.log("remove from rprplist failed!", response.data.msg);
            if (cb) cb(false, response.data.msg);
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("removeRPRPListItem error", err);
      });
  };
}

export function fetchCart(yorozuyaToken, isCheckOutPage, checkoutStep2) {
  console.log("Checkout V2 actions: fetchCart called");

  return (dispatch) => {
    const cookie = new Cookies();
    let token = cookie.get("x-auth");
    if (yorozuyaToken) {
      // in fetch customer and fetch cart, will check token from 'yorozuya_ct', yorozuya admin login as customer
      token = yorozuyaToken;
      cookie.set("x-auth", token, { path: "/" });
      dispatch(addError({ code: "LWCT", msg: "Log in as customer" }));
    }
    // If customer doesn't have token, push him to empty cart page. FERV2
    if (!token) {
      // if(checkoutstep2=="checkout") history.push('/cart');
      if (isCheckOutPage) history.push("/cart");
      return dispatch(setLoadingCart(false));
    }
    dispatch(setLoadingCart(true));
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v2/cart/cart`,
      params: {
        detail: 1,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200 || response.data.code !== "0000") {
          dispatch(setLoadingCart(false));
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
                  cookie.set("x-auth", response.data.data.token, { path: "/" });
                }
                break;
              default:
                console.log("error defailt handler");
                break;
            }
          }
          // display error
          console.log("fetchCart status not 200 or code not 0000");
        } else {
          // success
          // if the response is correct
          const { customer } = response.data.data;
          if (
            response.data.data.customer.group_id
            && response.data.data.customer.group_id !== 0
          ) {
            // registered user
            console.log("registered user");
            dispatch(authUser());
            dispatch(setLoadingCart(false));
            dispatch(setUser(customer));
            // NOTICE!! This get Identity response must be called after authUser action, because
            // the app loading can only start after we set isAuthenticated to be true
            // this will address the first loading error
            dispatch(getIdentityResponse());
          } else {
            // guest user
            console.log("guest user");
            dispatch(setLoadingCart(false));
            dispatch(getIdentityResponse());
            dispatch(setUser(customer));
            // 1 check Newsletter
          }
          const { priceCalcResult } = response.data.data;
          const { products } = priceCalcResult.value;
          console.log("fetch cart", priceCalcResult);
          if (!products || !Array.isArray(products) || products.length < 1) {
            // has 0 items, push to empty cart
            console.log("empty cart");
            // if(checkoutstep2=="checkout")
            dispatch(setCart({ priceCalcResult }));
          } else {
            console.log("unempty cart");
            if (checkoutStep2 === "not-sign-in") {
              const checkoutOption = {
                actionField: {
                  step: 2,
                  option: "not-sign-in",
                },
              };
              onCheckoutOption(checkoutOption);
            }
            if (checkoutStep2 === "sign-in") {
              const checkoutOption = {
                actionField: {
                  step: 2,
                  option: "sign-in",
                },
              };
              onCheckoutOption(checkoutOption);
            }
            if (checkoutStep2 === "initialization") { onCheckout(constructCheckoutData(1, "initialization", products)); }
            // if everything is in stock, we set the can_checkout to be true, else we set it to false
            // let isInStock = checkIsInStock(productList); FERV2
            // dispatch(setCanCheckout(isInStock)); FERV2
            dispatch(setCart({ priceCalcResult }));
            dispatch(setLoadingCart(false));
          }
        }
      })
      .catch((err) => {
        console.error("fetchCart error", err);
        dispatch(setLoadingCart(false));
        dispatch(addError({ code: "CTER", msg: "Fetch cart error" }));
        // do something
      });
  };
}

export function fetchRedeemedList(callback) {
  console.log("Checkout V2 actions: fetchRedeemedList called");
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v2/redeem/redeem_list`,
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
            if (callback) {
              console.log("redeemed list: ", response.data.data);
              callback(response.data.data);
            }
            console.log("get from redeemedList successfully!");
            dispatch(setRPRPList(response.data.data.redeem_product_list));
            dispatch(
              setTotalRedeemedPointsInCart(response.data.data.total_redeem_points),
            );
          } else {
            console.log("get from redeemedList failed!", response.data.msg);
            if (callback) callback(false, response.data.msg);
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("getRedeemedList error", err);
      });
  };
}

export function removeCoupon(couponCode, extraData) {
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
      url: `${HIDDEN_FIGURE_URL}/v2/cart/delete_coupon/${couponCode}`,
      headers: {
        Authorization: token,
      },
      data: extraData,
    })
      .then((response) => {
        if (response.status != 200) {
          // display error
        } else {
          // success11
          console.log("status 200", response.data.data);
          dispatch(setCart(response.data.data));
        }
      })
      .catch((err) => {
        // do something
        console.error("removeCoupon error", err);
      });
  };
}

export function applyCoupon(coupon, detail, cb, extraData) {
  console.log("applyCoupon action called");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  // If the fucking customer doesn't have token, push him to empty cart page.
  if (!token) {
    return {};
  }
  return (dispatch) => {
    axios({
      method: "put",
      url: `${HIDDEN_FIGURE_URL}/v2/cart/apply_coupon/${coupon}?detail=${detail}`,
      headers: {
        Authorization: token,
      },
      data: extraData,
    })
      .then((response) => {
        if (response.status !== 200) {
          // display error
          console.log("response not 200");
          cb(true, "sorry, please try later");
        } else {
          console.log("status 200");
          if (response.data && response.data.code === "0000") {
            dispatch(setCart(response.data.data));
            cb(
              false,
              response.data.msg ? response.data.msg : "Coupon applied successfully",
            );
          } else {
            // error happened
            cb(true, response.data.msg ? response.data.msg : "Coupon may not applied");
          }
          PushDL_FB_Lead(response.data.data.priceCalcResult.value.grand_total);
        }
      })
      .catch((err) => {
        // do something
        console.error("applyCoupon error", err);
        cb(true, "Coupon may not applied");
      });
  };
}

export function addToCart(data, DL_Data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  console.log(token);
  let header = null;
  if (token) {
    header = {
      headers: {
        Authorization: token,
      },
    };
  }
  return (dispatch) => {
    console.log("add to cart called ", data);
    // 1. firstly push the new cart changed item to the remote

    // if (product_list.items_qty === 0) {
    //   // has 0 items, push to empty cart
    //   //dispatch(setEmptyCart(true));
    //   //dispatch(setCartNum(0));
    // } else {
    //   //let productList = response.data.data.product_list.items_qty;
    //   // set cart
    //   dispatch(setEmptyCart(false));
    //   const num = response.data.data.product_list.items_qty;
    //   dispatch(setCartNum(num));
    // ===== show items just added panel =====
    // const myitem = product_list.items.filter(function(item){return item.sku==sku})[0];
    // console.log('add to cart, myitem', myitem)
    // const itemToAdd = {
    //   name: myitem.name,
    //   image: myitem.images.main.images.xs.url,
    //   color: myitem.attr.color, // []
    //   size: myitem.attr.size, //[]
    //   price: myitem.price, //{current, original}
    //   qty
    // }
    // dispatch(setCartJustAdded(itemToAdd));
    //
    if (data.qty >= 0) {
      axios({
        method: "post",
        url: `${HIDDEN_FIGURE_URL}/v2/cart/add`,
        params: {
          detail: 1, // ???
        },
        ...header,
        data: {
          product: data,
        },
      })
        // 2. once we get the product, we update the customer object
        .then((response) => {
          if (response.status !== 200) {
            // display error
          } else if (
            response.data.code === "0000"
              && response.data.data
              && response.data.data.customer
              && response.data.data.priceCalcResult
          ) {
            // success
            const { customer, priceCalcResult, stock_info } = response.data.data;
            const receivedToken = response.data.data.token;
            if (DL_Data) {
              PushDL_AddToCart({
                ...DL_Data,
                cartStatus: constructCartStatusData(priceCalcResult.value.products),
              });
            }
            if (cb) {
              cb(true);
            } // cb(success)
            // 0. guest user set token
            if (!token && receivedToken) {
              cookie.set("x-auth", response.data.data.token, { path: "/" });
            }
            // 1. update data
            if (customer) {
              dispatch(setUser(customer));
            }
            if (priceCalcResult) {
              dispatch(setCart({ priceCalcResult }));
            }

            // 2. show items just added panel
            const myitem = priceCalcResult.value.products.filter(
              item => item.sku === data.sku,
            )[0];
            console.log("add to cart, myitem", myitem, data.qty);
            const itemToAdd = {
              name: myitem.name,
              image: myitem.images.main.images.xs.url,
              color: myitem.attr.color, // []
              size: myitem.attr.size, // []
              price: !stock_info.redeem_points
                ? { current: myitem.deal_price, original: myitem.price }
                : stock_info.redeem_points, // {current, original}
              qty: data.qty,
            };
            dispatch(setCartJustAdded(itemToAdd));

            // following code seems not necessary, we can handle can_checkout somewhere else
            //   // if everything is in stock, we set the can_checkout to be true, else we set it to false
            //   //let isInStock = checkIsInStock(productList);
            //   //dispatch(setCanCheckout(isInStock));
            //
            //   //dispatch(setCart(response.data));
            // }
            if (cb) {
              cb(true, stock_info);
            }
          } else {
            // code error
            const err = {
              code: response.data.code,
              msg: response.data.msg,
            };
            if (
              response
                && response.data
                && response.data.data
                && response.data.data.stock_info
            ) {
              const {
                // item_sku,
                qty_to_add,
                stock_qty,
                qty_in_cart,
              } = response.data.data.stock_info;
              if (qty_in_cart && qty_to_add + qty_in_cart > stock_qty) {
                const newMsg = `You can only add ${stock_qty
                    - qty_in_cart} more items, with ${qty_in_cart} items already in your cart.`;
                if (response.data.code === "4QAC") {
                  err.msg = newMsg;
                }
              }
              if (cb) {
                cb(false, response.data.data.stock_info);
              } // cb(success)
            }

            dispatch(addError(err));
          }
        })
        // 3. if there is an error
        .catch((err) => {
          console.error("There is an error with the cart object2", err);
        });
    }
  };
}

export function redeemToCart(data, DL_Data, cb) {
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  console.log("token: ", token);
  let header = null;
  if (token) {
    header = {
      headers: {
        Authorization: token,
      },
    };
  }
  return (dispatch) => {
    if (data.qty >= 0) {
      axios({
        method: "post",
        url: `${HIDDEN_FIGURE_URL}/v2/redeem/add`,
        params: {
          detail: 1, // ???
        },
        ...header,
        data: {
          product: data,
        },
      })
        // 2. once we get the product, we update the customer object
        .then((response) => {
          if (response.status !== 200) {
            // display error
          } else if (
            response.data.code === "0000"
              && response.data.data
              && response.data.data.customer
          ) {
            // success
            const { customer } = response.data.data;
            const redeem_product_list = customer.redeemSchema.items;
            // 1. update data
            if (customer) {
              dispatch(setUser(customer));
            }
            if (redeem_product_list) {
              dispatch(setRPRPList(redeem_product_list));
            }

            // 2. show items just added panel
            const { itemToAdd } = response.data.data;
            itemToAdd.qty = data.qty;
            dispatch(setCartJustAdded(itemToAdd));
            if (cb) {
              cb(true);
            }
          } else {
            // code error
            const err = {
              code: response.data.code,
              msg: response.data.msg,
            };
            dispatch(addError(err));
          }
        })
        // 3. if there is an error
        .catch((err) => {
          console.error("There is an error with the cart object2", err);
        });
    }
  };
}

export function getWishList() {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v2/wishlist/wishlist`,
      headers: {
        Authorization: token,
      },
      params: {
        detail: 0,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
        } else {
          // if success
          if (response.data.code === "0000") {
            console.log("get WishList successfully!", response.data.data);
            dispatch(setWishList(response.data.data.wishList_product_list));
          } else {
            console.log("get WishList failed!", response.data.msg);
            if (cb) {
              cb(false);
            }
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("getwishlist error", err);
      });
  };
}

export function getRedeemableProductList({ id, country, lan }, user, cb) {
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
      console.error("fetch redeemable product list cookie error", err);
    }
    return axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/cms/content/${id}?country=${country}&lan=${lan}`,
      headers,
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
          console.log("fetch redeemable product list not 200 status");
          if (cb) {
            cb(false, "fetch redeemable product list not 200 status");
          }
        } else if (response.data.code != "0000") {
          console.log("fetch redeemable product list code error");
          if (cb) {
            cb(false, "fetch redeemable product list code error");
          }
        } else {
          console.log("fetch redeemable product list success");
          dispatch(
            setRedeemableProductList(
              response.data.data.modules[2].configs.positions[1].components["0"]
                .PRODUCT_DATA.list_ids,
            ),
          );

          if (cb) {
            cb(false, response.data.data);
          }
        }
      })
      .catch((err) => {
        console.error("fetch redeemable product list error caught", err);
      });
  };
}
// export function setAppliedCoupon(data) {
//   console.log('setAppliedCoupon called v2', data)
//   return {
//     type: SET_APPLIED_COUPON,
//     payload: data
//   }
// }

export function setWishList(data) {
  console.log("--- setWishList called v2 ---", data);
  return {
    type: SET_WISHLIST,
    payload: data,
  };
}

export function setRedeemableProductList(data) {
  console.log("--- setRedeemableProductList called v2 ---", data);
  return {
    type: SET_REDEEMABLE_PRODUCT_LIST,
    payload: data,
  };
}

export function setRPRPList(data) {
  console.log("--- setRPRPList called v2 ---", data);
  return {
    type: SET_RPRPLIST,
    payload: data,
  };
}

export function setTotalRedeemedPointsInCart(data) {
  console.log("--- setTotalRedeemedPointsInCart called v2 ---", data);
  return {
    type: SET_REDEEMED_POINTS_IN_CART,
    payload: data,
  };
}

export function setBillingFormStatus(data) {
  console.log("setBillingFormStatus called v2", data);
  return {
    type: SET_BILLING_FORM_STATUS,
    payload: data,
  };
}

export function setSubscription(data) {
  console.log("setSubscription called v2", data);
  const status = !!data;
  return {
    type: SET_SUBSCRIBE_EMAIL,
    payload: status,
  };
}

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
      url: `${HIDDEN_FIGURE_URL}/v2/wishlist/add?detail=1`,
      data: {
        product: {
          sku,
          qty,
        },
      },
      params: {
        detail: 1,
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
            console.log("move to wishList successfully!", response);
            const { customer, wishList_product_list } = response.data.data;
            dispatch(setUser(customer));
            dispatch(setWishList(wishList_product_list));
            if (cb) cb(true);
          } else {
            console.log("move to wishList failed!", response.data.msg);
            if (cb) cb(false);
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("addToWishList error", err);
      });
  };
}

export function moveToCart(sku, qty, cb, DL_Data, giftCard) {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "put",
      url: `${HIDDEN_FIGURE_URL}/v2/wishlist/cart?detail=1`,
      data: {
        product: {
          sku,
          qty,
          giftCardOption: giftCard,
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
          if (
            response.data.code === "0000"
            && response.data.data
            && response.data.data.customer
            && response.data.data.priceCalcResult
          ) {
            console.log("move to cart successfully!");
            const {
              customer,
              priceCalcResult,
              wishList_product_list,
            } = response.data.data;
            PushDL_AddToCart({
              ...DL_Data,
              cartStatus: constructCartStatusData(priceCalcResult.value.products),
            });
            dispatch(setCart({ priceCalcResult }));
            dispatch(setUser(customer));
            dispatch(setWishList(wishList_product_list));
            if (cb) cb(true);
          } else {
            console.log("move to cart failed!", response.data.msg);
            if (cb) cb(false);
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("moveToCart error", err);
      });
  };
}

export function saveNewAddress(address) {
  console.log("sdflssl", address);
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("x-auth");
    // If the customer doesn't have token, push him to empty cart page.
    if (!token) {
      return {};
    }
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/customer/address`,
      data: address,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // error
        } else {
          // if success
          if (
            response.data.code === "0000"
            && response.data.data
            && response.data.data.customer
          ) {
            console.log("save new address successfully!");
            dispatch(setUser(customer));
            if (cb) {
              cb(true);
            }
          } else {
            console.log("save new address failed!", response.data.msg);
            if (cb) {
              cb(false);
            }
          }
        }
      })
      .catch((err) => {
        // do something
        console.error("saveNewAddress error", err);
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

export function setShippingMethod(data) {
  console.log("setShippingMethod called", data);
  return {
    type: SET_SHIPPING_METHOD,
    payload: data,
  };
}

export function setLoadingCart(data) {
  console.log("setLoadingCart called", data);
  return {
    type: SET_LOADING_CART,
    payload: data,
  };
}

// --- change qty in cart (include remove)
export function changeQty(qty, sku, DL_Data, cb, dif, _id, finalSale) {
  // cb(err, data)
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  let product_data = null;
  if (_id) {
    product_data = {
      sku,
      qty,
      _id,
    };
  } else {
    product_data = {
      sku,
      qty,
      final_sale: finalSale,
    };
  }

  let header = null;
  if (token) {
    header = {
      headers: {
        Authorization: token,
      },
    };
  }
  return (dispatch) => {
    console.log("change qty called ", qty, sku);
    // 1. firstly push the new cart changed item to the remote
    if (qty >= 0) {
      axios({
        method: "put",
        url: `${HIDDEN_FIGURE_URL}/v2/cart/item`,
        params: {
          detail: 1,
        },
        ...header,
        data: {
          product: product_data,
        },
      })
        // 2. once we get the product, we update the customer object
        .then((response) => {
          if (response.status != 200) {
            // display error
          } else if (
            response.data.code === "0000"
              && response.data.data
              && response.data.data.customer
              && response.data.data.priceCalcResult
          ) {
            // success
            const { customer, priceCalcResult } = response.data.data;
            const receivedToken = response.data.data.token;
            console.log("PushDL_RemoveFromCart2", DL_Data);
            if (dif < 0 && DL_Data) {
              PushDL_RemoveFromCart({
                remove: DL_Data,
                cartStatus: constructCartStatusData(priceCalcResult.value.products),
              });
            } else if (DL_Data) {
              PushDL_AddToCart({
                ...DL_Data,
                cartStatus: constructCartStatusData(priceCalcResult.value.products),
              });
            }
            if (cb) {
              cb(false);
            } // cb(err)
            // 0. guest user set token
            if (!token && receivedToken) {
              cookie.set("x-auth", response.data.data.token, { path: "/" });
            }
            // 1. update data
            // if (customer) { dispatch(setUser(customer)); }
            if (priceCalcResult) {
              dispatch(setCart({ priceCalcResult }));
            }
            if (customer) {
              dispatch(setUser(customer));
            }
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
            // ===== show items just added panel =====
            // const myitem = product_list.items.filter(function(item){return item.sku==sku})[0];
            // console.log('add to cart, myitem', myitem)
            // const itemToAdd = {
            //   name: myitem.name,
            //   image: myitem.images.main.images.xs.url,
            //   color: myitem.attr.color, // []
            //   size: myitem.attr.size, //[]
            //   price: myitem.price, //{current, original}
            //   qty
            // }
            // dispatch(setCartJustAdded(itemToAdd));
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
            const { customer, priceCalcResult } = response.data.data;
            if (response.data.code == "4QAC" && priceCalcResult) {
              dispatch(setCart({ priceCalcResult }));
              if (cb) {
                cb(false);
              } // cb(err)
            }
            if (cb) {
              cb(true);
            }
            const err = {
              code: response.data.code,
              msg: response.data.msg,
            };
            dispatch(addError(err));
          }
        })
        // 3. if there is an error
        .catch((err) => {
          console.error("There is an error with the cart object3.", err);
        });
    }
  };
}

// --- checkout steps ---
export function setCheckoutStep(data) {
  console.log("setCheckoutStep called", data);
  return {
    type: SET_CHECKOUT_STEP,
    payload: data,
  };
}

export function setShipExistID(data) {
  console.log("--- setShipExistID called ---", data);
  return {
    type: SET_SHIP_EXIST_ID,
    payload: data,
  };
}

export function setShipNew(data) {
  console.log("--- setShipNew called ---");
  return {
    type: SET_SHIP_NEW,
    payload: data,
  };
}

export function setPayWithNew(data) {
  console.log("--- setPayWithNew called ---");
  return {
    type: SET_PAY_WITH_NEW,
    payload: data,
  };
}

export function setBillExistID(data) {
  console.log("--- setBillExistID called ---", data);
  return {
    type: SET_BILL_EXIST_ID,
    payload: data,
  };
}

export function setBillNew() {
  console.log("--- setBillNew called ---");
  return {
    type: SET_BILL_NEW,
  };
}

export function setUseAsBilling() {
  console.log("--- setUseAsBilling called ---");
  return {
    type: SET_USE_AS_BILLING,
  };
}

export function setBillingAddress(data) {
  console.log("--- setBillingAddress called ---", data);
  return {
    type: SET_BILLING_ADDRESS,
    payload: data,
  };
}

export function setOrderEmail(data) {
  return {
    type: SET_ORDER_EMAIL,
    payload: data,
  };
}

export function setOrderPhone(data) {
  return {
    type: SET_ORDER_PHONE,
    payload: data,
  };
}

export function postUserCheckoutInputs(data, cb, dataPush) {
  // cb takes (success)
  // console.log("--- postUserCheckoutInputs called ---", data)
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  return (dispatch) => {
    let hasError = false;
    if (!token) {
      const err = {
        code: "",
        msg: "No customer token found",
      };
      dispatch(addError(err));
      hasError = true;
    } else {
      // check billling address and shipping address in data push
      if (!data) {
        dispatch(
          addError({
            code: "NODATA",
            msg: "No checkout inputs",
          }),
        );
        if (cb) cb(false);
        hasError = true;
      } else {
        const { billing_address, shipping_address } = data;
        if (shipping_address) {
          const address1 = shipping_address;
          const address2 = billing_address || shipping_address;
          [address1, address2].map((item, index) => {
            if (hasError) {
              return;
            }
            const {
              city,
              firstname,
              lastname,
              postcode,
              street,
              // telephone,
              // region_code,
              country_id,
            } = item;
            let missings = "";
            if (!city) missings += "city ";
            if (!firstname) missings += "firstname ";
            if (!lastname) missings += "lastname ";
            if (!postcode) missings += "postcode ";
            if (!street || !Array.isArray(street) || !street[0]) missings += "street ";
            // if (!telephone) missings += 'telephone ';
            // if (!region_code) missings += 'region_code ';
            if (!country_id) missings += "country_id ";
            if (missings !== "") {
              const addressName = index === 0 ? "Billing address " : "Shipping address ";
              const msg = `${addressName}${missings}missing`;
              dispatch(
                addError({
                  code: "NODATA3",
                  msg,
                }),
              );
              if (cb) cb(false);
              hasError = true;
            }
          });
        } else {
          dispatch(
            addError({
              code: "shipping-address-missing",
              msg: "Shipping address missing",
            }),
          );
          if (cb) cb(false);
          hasError = true;
        }
      }
      if (!hasError) {
        axios({
          method: "post",
          url: `${HIDDEN_FIGURE_URL}/v2/cart/addresses`,
          headers: {
            Authorization: token,
          },
          data,
        })
          // 2. once we get the product, we update the customer object
          .then((response) => {
            if (response.status !== 200) {
              // display error
              dispatch(
                addError({
                  code: response.data.code,
                  msg: response.data.msg,
                }),
              );
            } else if (response.data.code === "0000" && response.data.data) {
              const { priceCalcResult, customer } = response.data.data;
              if (!priceCalcResult || !customer) {
                if (cb) cb(false);
                dispatch(
                  addError({
                    code: "",
                    msg: "Customer or Price Calculation Result object missing",
                  }),
                );
              }
              console.log("success!");
              dispatch(setCart({ priceCalcResult }));
              dispatch(setUser(customer));
              if (cb) {
                cb(true, dataPush);
              }
            } else {
              // code error
              if (cb) {
                cb(false);
              } // cb(success)
              const err = {
                code: response.data.code,
                msg: response.data.msg,
              };
              dispatch(addError(err));
            }
          })
          .catch((err) => {
            console.error("There is an error with the cart object1.", err);
            if (cb) cb(false);
          });
      }
    }
  };
}

export function setShippingAddress(data) {
  console.log("---------------------setShippingAddress called", data);
  return {
    type: SET_SHIPPING_ADDRESS,
    payload: data,
  };
}

export function nextCheckoutStep() {
  console.log("nextCheckoutStep called");
  return {
    type: NEXT_CHECKOUT_STEP,
    payload: null,
  };
}

export function setSaveNewShippingAddress(data) {
  console.log("setSaveNewAddress called");
  return {
    type: SET_SAVE_SHIPPINGADDRESS,
    payload: data,
  };
}

export function setSaveNewBillingAddress(data) {
  console.log("setSaveNewAddress called");
  return {
    type: SET_SAVE_BILLINGADDRESS,
    payload: data,
  };
}

export function setShippingMethodStatus(data) {
  console.log("setShippingMethodStatuss called", data);
  return {
    type: SET_SHIPPINGMETHOD_STATUS,
    payload: data,
  };
}

export function validateAddress(
  {
    firstname,
    lastname,
    street1,
    street2,
    country_id,
    postcode,
    region_code,
    city,
    telephone,
  },
  callback,
) {
  console.log("--- validateAddress called ---");
  return (dispatch) => {
    // make Ajax request
    const formattedAddress = [
      {
        name: `${firstname} ${lastname}`,
        telephone,
        company_name: "",
        address_line1: street1,
        address_line2: street2,
        city_locality: city,
        state_province: region_code,
        postal_code: postcode,
        country_code: country_id,
      },
    ];
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v1/addresses/validate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formattedAddress,
    })
      .then((response) => {
        if (response.status !== 200) {
          // error , ?? why 404 cannot fall to this code but catch ?
          callback({ error: "error not 200" });
          dispatch(addError({ msg: "Internal Error" }));
        } else {
          // invalid field error
          if (response.data.code === HFCODE.INVALID_FIELD) {
            const err = {
              code: response.data.code,
              msg: response.data.msg,
            };
            dispatch(addError(err));
          } else {
            // success
            if (callback) callback(response.data[0]);
          }
        }
      })
      .catch((err) => {
        // do something
        if (err.response && err.response.data.error.status_code === 404) {
          callback({ error: "error caught" });
        }
        console.error("validateAddress error", err);
      });
  };
}

// --- payment relative actions ---
export function setBraintreeToken(data) {
  console.log("---- setBraintreeToken called ----", !!data);
  return {
    type: SET_BRAINTREE_TOKEN,
    payload: data,
  };
}

export function setBraintreeCardInstance(data) {
  console.log("---- setBraintreeCardInstance called ----", data);
  return {
    type: SET_BRAINTREE_CARD_INSTANCE,
    payload: data,
  };
}

export function setPaymentMethod(data) {
  console.log("---- setPaymentMethod called ----", data);
  return {
    type: SET_PAYMENT_METHOD,
    payload: data,
  };
}

export function setTokenBraintreeSavedSelected(data) {
  console.log("---- setTokenBraintreeSavedSelected called ----", data);
  return {
    type: SET_BRAINTREE_SAVED_SELECTED,
    payload: data,
  };
}

export function setPaypalNonce(data) {
  console.log("---- setPaypalNonce called ----", data);
  return {
    type: SET_PAYPAL_NONCE,
    payload: data,
  };
}

export function setCreditCardNonce(data) {
  console.log("---- setCreditCardNonce called ---", data);
  return {
    type: SET_CREDIT_CARD_NONCE,
    payload: data,
  };
}

export function setPaymentSavedDetail(data) {
  console.log("---- setPaymentSavedDetail called ---", data);
  return {
    type: SET_PAYMENT_SAVED_DETAIL,
    payload: data,
  };
}

export function setCreditCardDetail(data) {
  console.log("---- setCreditCardDetail called ---", data);
  return {
    type: SET_CREDIT_CARD_DETAIL,
    payload: data,
  };
}

export function setPaypalDetail(data) {
  console.log("---- setPaypalDetail called ---", data);
  return {
    type: SET_PAYPAL_DETAIL,
    payload: data,
  };
}

export function setSaveNewPayment(data) {
  console.log("---- setSaveNewPayment called ----", data);
  return {
    type: SET_SAVE_NEW_PAYMENT,
    payload: data,
  };
}

export function resetPayment() {
  return { type: RESET_PAYMENT };
}

export function fetchBraintreeToken(cb) {
  // cb(err, data)
  console.log("---- getBraintreeToken callled ----");
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  if (!token) {
    // history.push('/cart');
    if (cb) cb(true, "Customer token failed, please sign in.");
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
        if (response.status !== 200) {
          if (cb) cb(true, "Fetch braintree client token failed, please try later.");
          console.log("fetchBraintreeToken not 200");
        } else if (response.data.code === "0000") {
          console.log("fetchBraintreeToken token fetched", !!response.data.data);
          dispatch(setBraintreeToken(response.data.data));
          if (cb) cb(false, response.data.data);
        } else {
          console.log("fetchBraintreeToken token response code not 0");
        }
      })
      .catch((err) => {
        if (cb) cb(true, "Fetch braintree client token error, please try later.");
        console.error("catch fetchBraintreeToken error", err);
      });
  };
}
// --- end of payment relative actions ---

// --- place order ---
export function postOrder(requestBody, cb) {
  // cb takes (response, msg)
  // console.log('--- postOrder called ---', JSON.stringify(requestBody));
  const cookie = new Cookies();
  const token = cookie.get("x-auth");
  if (!token) {
    history.push("/cart");
  }
  return (dispatch) => {
    axios({
      method: "post",
      url: `${HIDDEN_FIGURE_URL}/v2/checkout/checkout`,
      headers: {
        Authorization: token,
      },
      data: requestBody,
    })
      .then((response) => {
        if (response.status !== 200) {
          // console.log('postOrder not 200');
        } else if (response.data.code === "0000") {
          // console.log('postOrder success', response.data.data); // only the order number
          const { customer, order_id, priceCalcResult } = response.data.data;
          dispatch(setCart({ priceCalcResult }));
          dispatch(setUser(customer));
          if (cb) cb(response.data.data, "success");
        } else {
          // console.log('postOrder response code not 0', response.data);
          dispatch(resetPayment());
          if (response.data.data) {
            const { customer, priceCalcResult } = response.data.data;
            if (priceCalcResult) dispatch(setCart({ priceCalcResult }));
            if (customer) dispatch(setUser(customer));
          }
          if (cb) cb(null, response.data.msg);
        }
      })
      .catch((err) => {
        console.error("catch postOrder error", err);
        if (cb) cb(null, "Error! Please try later");
      });
  };
}

export function setOrderSuccessData(data) {
  return {
    type: SET_ORDER_SUCCESS_DATA,
    payload: data,
  };
}

export function resetCheckoutPartState() {
  return {
    type: RESET_CHECKOUT_PART_STATE,
  };
}

export function resetCheckoutState() {
  return {
    type: RESET_CHECKOUT_STATE,
  };
}

export function setReferData(data) {
  return {
    type: SET_REFER_SOURCE,
    payload: data,
  };
}
