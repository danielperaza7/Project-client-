/* eslint-disable no-tabs */
import _ from "lodash";
import { Cookies } from "react-cookie";
import ReactGA from "react-ga";

export function logPageView(pageIndex) {
  if (typeof window === "undefined") {
    return;
  }
  const path = window.location.pathname + window.location.search;
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
  let UTM_Source = "";
  if (path.indexOf("utm_source") != -1) {
    const start = path.indexOf("utm_source");
    let end = path.indexOf("&", start);
    end = end == -1 ? path.length : end;
    UTM_Source = path.substring(start + 11, end);
    const cookie = new Cookies();
    const d = new Date();
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
    cookie.set("affilitation_EBEET", UTM_Source, { expires: d });
  }
  let clickId = "";
  if (path.indexOf("clickId") != -1) {
    const start = path.indexOf("clickId");
    let end = path.indexOf("&", start);
    end = end == -1 ? path.length : end;
    clickId = path.substring(start + 8, end);
    const cookie = new Cookies();
    const d = new Date();
    d.setTime(d.getTime() + 14 * 24 * 60 * 60 * 1000);
    const cookieBag = cookie.getAll();
    let maxN = -1;
    Object.keys(cookieBag).forEach((key) => {
      if (key.indexOf("clickId") != -1 && cookieBag[key] != clickId) {
        const ci = key.split("_");
        maxN = ci.length == 2 ? Math.max(maxN, ci[1]) : maxN;
      }
    });
    maxN++;
    cookie.set(`clickId_${maxN.toString()}`, clickId, { expires: d });
  }
}

export function InitializeGA() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  ReactGA.initialize(
    "UA-73765151-1"
    // {
    // debug: true,
    // titleCase: false,
    // gaOptions: { userId: 123} }
  );
  ReactGA.plugin.require("ec"); // create tracker
}

export function InitializeETEBEData() {
  let prevPath = "";
  try {
    prevPath = window.location.href;
  } catch (err) {
    return "";
  }
  window.ETEBEData = {
    prevPath,
    GAData: {
      viewedData: {
        products: {
          criteoThree: {},
          viewedProducts: {}
        },
        promotions: []
      },
      filterData: []
    }
  };

  window.onbeforeunload = function (e) {
    let actionField = "";
    for (actionField in ETEBEData.GAData.viewedData.products.criteoThree) {
      if (
        actionField
        && ETEBEData.GAData.viewedData.products.criteoThree[`${actionField}`]
        && ETEBEData.GAData.viewedData.products.criteoThree[`${actionField}`].length > 0
      ) {
        PushDL_criteoListThree({
          actionField: { list: actionField },
          products: ETEBEData.GAData.viewedData.products.criteoThree[`${actionField}`]
        });
      }
    }
    ETEBEData.GAData.viewedData.products.criteoThree = {};

    PushDL_allViewedProducts();
    PushDL_ViewPromotion();
    PushDL_FilterData();
  };
}

export const ACTION_FIELD_LIST = {
  SEARCH_RESULTS: "Search Results",
  DETAIL_PAGE_DEFAULT_MAIN: "Detail Page - Default - Main Product",
  DETAIL_PAGE_DEFAULT_COMPLETELOOK: "Detail Page - Default - Complete Look",
  DETAIL_PAGE_DEFAULT_ALSOLIKE: "Detail Page - Default - Alsolike",
  CART_PAGE_ITEMS_LIST: "Cart Page - Items List",
  CATEGORY_PAGE_DEFAULT_CATEGORY: "Category Page - Default - Category List"
};

export function getAddedSimplePrice(simple, qty, group_id) {
  // check input
  if (
    !_.isEmpty(simple)
    && group_id === parseInt(group_id, 10)
    && qty === parseInt(qty, 10)
  ) {
    // 0. default price
    let unitPrice = simple.price ? simple.price : 0;
    // 1. search in tier price
    if (simple.tier_prices && simple.tier_prices.length > 0) {
      let match = false;
      for (let g_id = group_id; g_id >= 0 && !match; g_id--) {
        if (simple.tier_prices) {
          for (let qty_match = qty; qty_match >= 1 && !match; qty_match--) {
            const matchIndex = _.findIndex(
              simple.tier_prices,
              o => o.group_id == g_id && o.qty == qty_match
            );
            if (matchIndex > -1 && !match) {
              unitPrice = simple.tier_prices[matchIndex].value;
              match = true;
            }
          }
        }
      }
    }
    return unitPrice;
  }
  console.log("getAddedSimplePrice error input", simple, group_id, qty);
  return 0;
}

/* Cart related, add to cart, remove from cart, */
export function constructAddToCartData(
  {
    display_id, simple, product, qty, customerGroupId, DL
  },
  data
) {
  const has_band_cup = !data
    ? simple.config
      && simple.config.band_size
      && simple.config.band_size[0]
      && simple.config.cup_size
      && simple.config.cup_size[0]
    : "";
  return {
    currencyCode: "USD", // here we hard code this first... HARDCODE hard code
    add: !data
      ? {
        actionField: {
          list: DL && DL.list ? DL.list : ""
        },
        products: [
          {
            id: simple.sku,
            display_id,
            name: product.name,
            category: "", //  do it later
            brand: simple.config.brand.map(item => item.id).toString(),
            variant: simple.config.color.map(item => item.id).toString(), // color ??
            coupon: "",
            position: DL && DL.position ? DL.position : 0,
            size: has_band_cup
              ? ""
              : simple.config.size.map(item => item.id).toString(), // size ??
            band_size: has_band_cup
              ? simple.config.band_size.map(item => item.id).toString()
              : "",
            cup_size: has_band_cup
              ? simple.config.cup_size.map(item => item.id).toString()
              : "",
            price: getAddedSimplePrice(simple, qty, customerGroupId),
            quantity: qty
          }
        ]
      }
      : data
  };
}

export function constructUpdateCartItemData({
  display_id, simple, qty, DL
}, wishlist) {
  const has_band_cup = simple.attr.band_size
    && simple.attr.band_size[0]
    && simple.attr.cup_size
    && simple.attr.cup_size[0];
  const index = simple.tier_prices.length != 0
    ? _.findIndex(simple.tier_prices, o => o.group_id == 0)
    : -1;
  const price = !wishlist
    ? simple.tier_prices.length == 0 || index == -1
      ? simple.price
      : simple.tier_prices[index].value
    : simple.price;
  return {
    actionField: { list: DL && DL.list ? DL.list : "" },
    products: [
      {
        id: simple.sku,
        display_id,
        name: simple.name,
        category: "", //  do it later
        brand: simple.attr.brand.map(item => item.id).toString(),
        variant: simple.attr.color.map(item => item.id).toString(), // color ??
        coupon: "",
        position: DL && DL.position ? DL.position : 0,
        size: has_band_cup ? "" : simple.attr.size.map(item => item.id).toString(), // size ??
        band_size: has_band_cup
          ? simple.attr.band_size.map(item => item.id).toString()
          : "",
        cup_size: has_band_cup
          ? simple.attr.cup_size.map(item => item.id).toString()
          : "",
        price,
        quantity: qty
      }
    ]
  };
}

export function constructCartStatusData(items) {
  return {
    products: items.map((simple) => {
      const has_band_cup = simple.attr.band_size
        && simple.attr.band_size[0]
        && simple.attr.cup_size
        && simple.attr.cup_size[0];
      const index2 = simple.tier_prices.length != 0
        ? _.findIndex(simple.tier_prices, o => o.group_id == 0)
        : -1;
      const price = simple.tier_prices.length == 0 || index2 == -1
        ? simple.price
        : simple.tier_prices[index2].value;
      return {
        id: simple.sku || simple.display_id || simple.list_id,
        display_id: simple.display_id || simple.list_id,
        name: simple.name,
        category: simple.category,
        brand: simple.attr.brand.map(item => item.id).toString(),
        variant: simple.attr.color.map(item => item.id).toString(),
        coupon: "",
        size: has_band_cup ? "" : simple.attr.size.map(item => item.id).toString(),
        band_size: has_band_cup
          ? simple.attr.band_size.map(item => item.id).toString()
          : "",
        cup_size: has_band_cup
          ? simple.attr.cup_size.map(item => item.id).toString()
          : "",
        price,
        quantity: simple.qty
      };
    })
  };
}

export function PushDL_AddToCart({ currencyCode, add, cartStatus }) {
  // record all the products that are added to the cart
  dataLayer.push({
    event: "addToCart",
    ecommerce: {
      currencyCode, // 'USD'
      add
    },
    cartStatus
  });
}

// export function StepOfCheckOutPage_TriggerExiting({currencyCode, add, cartStatus }){

export function PushDL_RemoveFromCart({ remove, cartStatus }) {
  dataLayer.push({
    event: "removeFromCart",
    ecommerce: {
      remove
      // {
      //   'actionField': {'list': 'Search Results'},
      //     'products': [{
      //         'id': 'P12345',
      //     'name': 'Android Warhol T-Shirt',
      //     'category': 'Apparel/Shirts/T-Shirts',
      //     'brand': 'Google',
      //     'variant': 'Black',
      //     'coupon': '3 for 99 dollars',
      //     'position': 1,
      //     'dimension1': 'M',
      //     'price': 23.99,
      //     'quantity': 1
      //     }]
      // }
    },
    cartStatus
  });
}

export function PushDL_EventData(event, data) {
  dataLayer.push({
    event,
    ecommerce: {
      eventData: data
    }
  });
}

/* Order Unused, now we use constructOrderSuccessDataV2 */
export function constructOrderSuccessData({
  total_segments,
  product_list,
  revenue,
  currentShippingMethod,
  orderID,
  rewardPointsValue,
  giftCardValue
}) {
  let coupon = "";
  const couponExtraIndex = _.findIndex(total_segments.extras, {
    code: "coupon"
  });
  if (couponExtraIndex > -1) {
    coupon = total_segments.extras[couponExtraIndex].title.replace("Coupon: ", "");
  }
  let discount = "";
  const discountExtraIndex = _.findIndex(total_segments.extras, {
    code: "discount"
  });
  if (discountExtraIndex > -1) {
    discount = total_segments.extras[discountExtraIndex].value;
  }
  const cookie = new Cookies();
  const affilitation = cookie.get("affilitation_EBEET") !== undefined
    ? cookie.get("affilitation_EBEET")
    : "";
  const products = product_list.items.map((item, index) => {
    const has_band_cup = item.attr.band_size
      && item.attr.band_size[0]
      && item.attr.cup_size
      && item.attr.cup_size[0];
    return {
      name: item.name,
      id: item.sku,
      display_id: item.display_id ? item.display_id : "",
      price: item.price.current,
      priceWithDiscount: item.total_price,
      quantity: item.qty,
      brand: item.attr.brand.map(ele => ele.id).toString(),
      category: "",
      variant: item.attr.color.map(ele => ele.id).toString(),
      coupon: "",
      size: has_band_cup ? "" : item.attr.size.map(ele => ele.id).toString(),
      band_size: has_band_cup ? item.attr.band_size.map(ele => ele.id).toString() : "",
      cup_size: has_band_cup ? item.attr.cup_size.map(ele => ele.id).toString() : "",
      position: index + 1
    };
  });
  const DL_Data = {
    actionField: {
      id: orderID,
      affiliation: affilitation,
      revenue,
      tax: total_segments.tax.value,
      shipping: currentShippingMethod.amount,
      coupon,
      discount,
      currency: "USD",
      rewardPointsValue,
      giftCardValue
    },
    products
  };

  return DL_Data;
}

export function constructOrderSuccessDataV2(orderID, priceCalcResult, products) {
  if (!priceCalcResult || !orderID || !priceCalcResult.value) return null;
  const { value } = priceCalcResult;
  const {
    grand_total,
    tax,
    shipping,
    reward_point_usage,
    gift_card_usage,
    subtotal,
    discount_amount,
    coupon_info
  } = value;
  const cookie = new Cookies();
  const affilitation = cookie.get("affilitation_EBEET") !== undefined
    ? cookie.get("affilitation_EBEET")
    : "";
  const productsData = products.map((item, index) => {
    const product = value.products.find(el => el.sku === item.sku);
    return {
      name: item.name,
      id: item.sku,
      display_id: _.get(product, "display_id") || item.sku || "",
      price: item.refund_amount,
      quantity: 1,
      brand: item.brand,
      category: "",
      coupon: "",
      size: "",
      band_size: "",
      cup_size: "",
      variant: "",
      position: index + 1
    };
  });
  const activeCoupon = coupon_info.filter(coupon => coupon.active);
  const DL_Data = {
    actionField: {
      id: orderID,
      affiliation: affilitation,
      revenue: grand_total,
      tax: tax.tax,
      shipping: shipping.shipping_fee,
      coupon: activeCoupon.map(el => el.coupon_code).join(","),
      discount: discount_amount, // to do
      currency: "USD",
      rewardPointsValue: reward_point_usage,
      giftCardValue: gift_card_usage,
      subtotal
    },
    products: productsData
  };
  return DL_Data;
}

export function PushDL_OnCheckout({ checkout, cb }) {
  dataLayer.push({
    event: "checkout",
    ecommerce: {
      checkout,
      eventCallback: cb
    }
    // {
    // 		'checkout': {
    //   		'actionField': {'step': 1, 'option': 'Visa'},
    //       'products': [{
    //           'id': 'P12345',
    // 	    'name': 'Android Warhol T-Shirt',
    // 	    'category': 'Apparel/Shirts/T-Shirts',
    // 	    'brand': 'Google',
    // 	    'variant': 'Black',
    // 	    'coupon': '3 for 99 dollars',
    // 	    'position': 1,
    // 	    'dimension1': 'M',
    // 	    'price': 23.99,
    // 	    'quantity': 2
    //      }]
    // 		}
    // 	},
    // 	'eventCallback': function() {
    // 		document.location = 'checkout.html';
    // 	}
  });
}

export function PushDL_OrderSuccess({ actionField, products }) {
  console.log("PushDL_OrderSuccess called");
  dataLayer.push({
    ecommerce: {
      purchase: {
        products: undefined
      }
    }
  });
  dataLayer.push({
    event: "orderSuccess",
    ecommerce: {
      purchase: {
        actionField,
        products
        //   'actionField': {
        //     'id': 'T12345',
        //     'affiliation': 'Online Store',
        //     'revenue': '35.43',
        //     'tax': '4.90',
        //     'shipping': '5.99',
        //     'coupon': 'SUMMER_SALE',
        //     'discount': '10.00',
        //     'currency': 'USD'
        //   },
        //   'products': [{
        //     'name': 'Triblend Android T-Shirt',
        //     'id': '12345',
        //     'price': '15.25',
        //     'priceWithDiscount': '10.25',
        //     'quantity': 1,
        //     'brand': 'Google',
        //     'category': 'Apparel',
        //     'variant': 'Gray',
        //     'coupon': 'summer2017',
        //     'dimension1': 'M',
        //     'position': 1
        //   },
        //   {
        //     'name': 'Triblend Android T-Shirt',
        //     'id': '12345',
        //     'price': '15.25',
        //     'priceWithDiscount': '10.25',
        //     'quantity': 1,
        //     'brand': 'Google',
        //     'category': 'Apparel',
        //     'variant': 'Gray',
        //     'coupon': 'summer2017',
        //     'dimension1': 'M',
        //     'position': 1
        //  }]
      }
    }
  });
}

/* User */
export function constructUserData(customer, isGuest) {
  if (isGuest) {
    return {
      email: customer.email,
      tier: 0,
      firstName: null,
      lastName: null
    };
  }
  return {
    email: customer.email,
    tier: customer.group_id,
    firstName: customer.firstname,
    lastName: customer.lastname
  };
}

export function PushDL_LoggedInUser({ email, tier }) {
  console.log("PushDL_LoggedInUser called", email, tier);
  dataLayer.push({
    customerInfo: {
      email,
      tier
    }
  });
}

// // record all the products in the screen
// dataLayer.push ({
// 'ecommerce': {
//   'impressions': [
//   {
//       'id': 'P12345',
//       'name': 'Android Warhol T-Shirt',
//       'category': 'Apparel/Shirts/T-Shirts',
//       'brand': 'Google',
//       'variant': 'Black',
//       'list': 'Search Results',
//       'position': 1,
//       'dimension1': 'M',
//       'dimension2': 'list id 123',
//       'dimension3': 'display id 123',
//       'dimension4': 23.99,
//       'dimension5': 26.99,
//       'dimension6': 'tier 1'
//   },
//   {
//     'id': 'P12345',
//       'name': 'Android Warhol T-Shirt',
//       'category': 'Apparel/Shirts/T-Shirts',
//       'brand': 'Google',
//       'variant': 'Black',
//       'list': 'Search Results',
//       'position': 1,
//       'dimension1': 'M',
//       'dimension2': 'list id 123',
//       'dimension3': 'display id 123',
//       'dimension4': 23.99,
//       'dimension5': 26.99,
//       'dimension6': 'tier 1'
//   }]
// }
// });
//
//
// record products that are viewed on category level:
export function constructProductViewedData({ product, DL, priceToPush }) {
  return {
    actionField: {
      list: DL && DL.list ? DL.list : ""
    },
    products: [
      {
        id: product.display_id || "",
        list_id: product.list_id || "",
        name: product.name,
        category: "",
        brand: product.attr.brand[0] || product.brand,
        variant:
          product.images && product.images.config && product.images.config.color
            ? product.images.config.color
            : "",
        position: DL && DL.position ? DL.position : 0,
        coupon: "",
        price: priceToPush || null
      }
    ]
  };
}

export function PushDL_ViewProduct(viewData) {
  // push for criteoThree
  if (viewData.products[0].position <= 3) {
    pushViewListData(viewData, "criteoThree");
  }

  // push for all product viewed
  pushViewListData(viewData, "viewedProducts");
}

export function pushViewListData(viewData, type) {
  const viewedList = ETEBEData.GAData.viewedData.products[`${type}`];
  const actionField = viewData.actionField.list;
  const { position } = viewData.products[0];

  if (!viewedList[`${actionField}`]) {
    viewedList[`${actionField}`] = [];
  }

  switch (type) {
    case "criteoThree":
      viewedList[`${actionField}`].push(viewData.products[0].id);
      if (position === 0 || viewedList[`${actionField}`].length === 3) {
        // push dataLayer:
        PushDL_criteoListThree({
          actionField: { list: actionField },
          products: viewedList[`${actionField}`]
        });
        // clear list
        viewedList[`${actionField}`] = [];
      }
      break;
    case "viewedProducts":
      viewedList[`${actionField}`].push(viewData.products[0]);
      // push to GA happens when url changes
      break;
    default:
      viewedList[`${actionField}`].push(viewData.products[0]);
  }
}

export function PushDL_allViewedProducts() {
  const viewedList = ETEBEData.GAData.viewedData.products.viewedProducts;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in viewedList) {
    if (viewedList[`${key}`] && viewedList[`${key}`].length > 0) {
      // push data
      dataLayer.push({
        event: "productViewed",
        ecommerce: {
          listViewed: {
            actionField: { list: key, path: ETEBEData.prevPath },
            products: viewedList[`${key}`]
          }
        }
        // 'eventCallback': function() {
        //     document.location = productObj.url
        //  }
      });

      // clear list
      viewedList[`${key}`] = [];
    }
  }
}

export function PushDL_criteoListThree(viewData) {
  dataLayer.push({
    event: "criteoListThree",
    ecommerce: {
      criteoListViewed: viewData
    }
  });
}

// record products that are viewed in detail (as main product):
export function constructProductDetailViewedData({ product, DL, priceToPush }) {
  return {
    actionField: { list: DL && DL.list ? DL.list : "" },
    products: [
      {
        id: product.display_id || product.list_id,
        name: product.name,
        category: "",
        brand: product.attr.brand[0] || product.brand,
        variant:
          product.images && product.images.config && product.images.config.color
            ? product.images.config.color
            : "",
        position: DL && DL.position ? DL.position : 0,
        coupon: "",
        price: priceToPush || null
      }
    ]
  };
}

export function PushDL_ViewProductDetail(viewData) {
  dataLayer.push({
    event: "productDetailViewed",
    ecommerce: {
      detailViewed: viewData
    }
    // 'eventCallback': function() {
    //     document.location = productObj.url
    //  }
  });
}

// record products that are clicked

export function constructProductClickData({
  product, DL, selectedAttr, priceToPush
}) {
  return {
    actionField: { list: DL && DL.list ? DL.list : "" },
    products: [
      {
        id: product.display_id || "",
        list_id: product.list_id || "",
        name: product.name,
        category: "",
        brand: product.attr.brand[0] || product.brand,
        variant:
          selectedAttr && selectedAttr.color
            ? selectedAttr.color
            : product.images && product.images.config && product.images.config.color
              ? product.images.config.color
              : "",
        position: DL && DL.position ? DL.position : 0,
        coupon: "",
        size: selectedAttr && selectedAttr.size ? selectedAttr.size : "",
        band_size: selectedAttr && selectedAttr.band_size ? selectedAttr.band_size : "",
        cup_size: selectedAttr && selectedAttr.cup_size ? selectedAttr.cup_size : "",
        price: priceToPush
      }
    ]
  };
}

export function PushDL_ClickProduct(clickData) {
  dataLayer.push({
    event: "productClick",
    ecommerce: {
      click: clickData
    }
    // 'eventCallback': function() {
    //     document.location = productObj.url
    //  }
  });
}

// record all promotion impression
export function constructPromData(promData, creative, position) {
  return {
    id: promData.id, // ID or Name is required.
    name: promData.name || "",
    creative: creative || "", // the creative associated with the promotion
    position: position || ""
  };
}

export function pushPromotionList(promData) {
  const list = ETEBEData.GAData.viewedData.promotions;

  if (list.length) {
    const last = list[list.length - 1];
    const keys = ["id", "name", "creative", "position"];
    if (keys.every(key => last[key] === promData[key])) {
      return;
    }
  }
  ETEBEData.GAData.viewedData.promotions.push(promData);
}

export function PushDL_ViewPromotion() {
  if (
    ETEBEData.GAData.viewedData.promotions
    && ETEBEData.GAData.viewedData.promotions.length !== 0
  ) {
    dataLayer.push({
      event: "promotionView",
      ecommerce: {
        promView: {
          actionField: { path: ETEBEData.prevPath },
          promotions: ETEBEData.GAData.viewedData.promotions
        }
      }
    });

    ETEBEData.GAData.viewedData.promotions = [];
  }
}

// record promotion clicks
export function PushDL_ClickPromotion(promData) {
  dataLayer.push({
    event: "promotionClick",
    ecommerce: {
      promClick: {
        promotions: [promData]
      }
    }
    // 'eventCallback': function() {
    //   document.location = promoObj.destinationUrl;
    // }
  });
}

export function PushDL_Newsletter_Popup_behavior(promData) {
  dataLayer.push({
    event: "newsletter_Popup_behavior",
    ecommerce: {
      newsletterPopup: {
        actionField: { action: promData }
      }
    }
  });
}

// record filter options applied:
export function PushLocal_FilterData(name, value) {
  // filterOption:
  // {
  //   'filter_name': 'price',
  //   'filter_value': '$0-50'
  // }
  ETEBEData.GAData.filterData.push({
    filter_name: name,
    filter_value: value
  });
}

// push all filter data to GA datalayer when website unloaded or routed
export function PushDL_FilterData() {
  if (ETEBEData.GAData.filterData && ETEBEData.GAData.filterData.length !== 0) {
    dataLayer.push({
      event: "filter",
      ecommerce: {
        filterApplied: {
          actionField: "",
          filterOptions: ETEBEData.GAData.filterData
        }
      }
    });

    ETEBEData.GAData.filterData = [];
  }
}

// //record all the products that are clicked(with link)
// dataLayer.push({
// 'event': 'productClick',
// 'ecommerce': {
//   'click': {
//     'actionField': {'list': 'Search Results'},
//     'products': [{
//       'id': 'P12345',
//       'name': 'Android Warhol T-Shirt',
//       'category': 'Apparel/Shirts/T-Shirts',
//       'brand': 'Google',
//       'variant': 'Black',
//       'position': 1,
//       'coupon': '3 for 99 dollars',
//       'dimension1': 'M'
//     }]
//   }
// },
// 'eventCallback': function() {
//     document.location = productObj.url
//  }
// });
//
//
// //record all the products whose details are viewed
// dataLayer.push({
//   'ecommerce': {
//     'detail': {
//         'actionField': {'list': 'Apparel Gallery'},
//         'products': [{
//           'id': 'P12345',
//         'name': 'Android Warhol T-Shirt',
//         'category': 'Apparel/Shirts/T-Shirts',
//         'brand': 'Google',
//         'variant': 'Black',
//         'position': 1,
//         'coupon': '3 for 99 dollars',
//         'dimension1': 'M'
//         }]
//     }
//   }
// });
//
//
// //record all the products that are added to the cart
// dataLayer.push({
//   'event': 'addToCart',
//   'ecommerce': {
//     'currencyCode': 'USD',
//     'add': {
//       'actionField': {'list': 'Search Results'},
//       'products': [{
//         'id': 'P12345',
//       'name': 'Android Warhol T-Shirt',
//       'category': 'Apparel/Shirts/T-Shirts',
//       'brand': 'Google',
//       'variant': 'Black',
//       'coupon': '3 for 99 dollars',
//       'position': 1,
//       'dimension1': 'M',
//       'price': 23.99,
//       'quantity': 2
//       }]
//     }
//   }
// });
//
//
// //record all the products that are removed from the cart
// dataLayer.push({
//   'event': 'removeFromCart',
//   'ecommerce': {
//     'remove': {
//       'actionField': {'list': 'Search Results'},
//         'products': [{
//             'id': 'P12345',
//         'name': 'Android Warhol T-Shirt',
//         'category': 'Apparel/Shirts/T-Shirts',
//         'brand': 'Google',
//         'variant': 'Black',
//         'coupon': '3 for 99 dollars',
//         'position': 1,
//         'dimension1': 'M',
//         'price': 23.99,
//         'quantity': 1
//         }]
//     }
// }
// });

// // record all promotion impression
// dataLayer.push({
//   'ecommerce': {
//     'promoView': {
//         'promotions': [
//         {
//           'id': 'JUNE_PROMO13',     // ID or Name is required.
//           'name': 'June Sale',
//           'creative': 'banner1',    //the creative associated with the promotion
//           'position': 'slot1'
//         },
//         {
//           'id': 'FREE_SHIP13',
//           'name': 'Free Shipping Promo',
//           'creative': 'skyscraper1',
//           'position': 'slot2'
//         }]
//     }
//   }
// });
//
//
// //record promotion clicks
// dataLayer.push({
// 'event': 'promotionClick',
// 'ecommerce': {
//     'promoClick': {
//       'promotions': [
//       {
//           'id': 'FREE_SHIP13',
//           'name': 'Free Shipping Promo',
//           'creative': 'skyscraper1',
//           'position': 'slot2'
//       }]
//     }
// },
// 'eventCallback': function() {
//   document.location = promoObj.destinationUrl;
// }
// });
//
//

export function constructCheckoutData(ind, option, data) {
  const products = data.map((item, index) => {
    const has_band_cup = item.attr.band_size
      && item.attr.band_size[0]
      && item.attr.cup_size
      && item.attr.cup_size[0];
    const ind = item.tier_prices.length != 0
      ? _.findIndex(item.tier_prices, o => o.group_id == 0)
      : -1;
    const price = item.tier_prices.length == 0 || ind == -1
      ? item.price
      : item.tier_prices[ind].value;
    return {
      name: item.name,
      id: item.sku,
      price,
      priceWithDiscount: item.total_price,
      quantity: item.qty,
      brand: item.attr.brand.map(ele => ele.id).toString(),
      category: item.category ? item.category : "",
      variant: item.attr.color.map(ele => ele.id).toString(),
      coupon: "",
      size: has_band_cup ? "" : item.attr.size.map(ele => ele.id).toString(),
      band_size: has_band_cup ? item.attr.band_size.map(ele => ele.id).toString() : "",
      cup_size: has_band_cup ? item.attr.cup_size.map(ele => ele.id).toString() : "",
      position: index + 1
    };
  });
  return {
    actionField: { step: ind, option },
    products
  };
}

// //checkout page
export function onCheckout(checkoutData) {
  dataLayer.push({
    event: "checkout",
    ecommerce: {
      checkout: checkoutData
    },
    eventCallback() {}
  });
}

// checkout step
export function onCheckoutOption(checkoutOption) {
  dataLayer.push({
    event: "checkoutOption",
    ecommerce: {
      checkout_option: checkoutOption
    }
  });
}
//
//
// //order success page
// dataLayer.push({
//   'ecommerce': {
//     'purchase': {
//         'actionField': {
//           'id': 'T12345',
//           'affiliation': 'Online Store',
//           'revenue': '35.43',
//           'tax': '4.90',
//           'shipping': '5.99',
//           'coupon': 'SUMMER_SALE',
//           'discount': '10.00',
//           'currency': 'USD'
//         },
//         'products': [{
//           'name': 'Triblend Android T-Shirt',
//           'id': '12345',
//           'price': '15.25',
//           'priceWithDiscount': '10.25',
//           'quantity': 1,
//           'brand': 'Google',
//           'category': 'Apparel',
//           'variant': 'Gray',
//           'coupon': 'summer2017',
//           'dimension1': 'M',
//           'position': 1
//         },
//         {
//           'name': 'Triblend Android T-Shirt',
//           'id': '12345',
//           'price': '15.25',
//           'priceWithDiscount': '10.25',
//           'quantity': 1,
//           'brand': 'Google',
//           'category': 'Apparel',
//           'variant': 'Gray',
//           'coupon': 'summer2017',
//           'dimension1': 'M',
//           'position': 1
//        }]
//     }
//   }
// });
//
//
// //customer infomation
// dataLayer.push({
// 'customerInfo': {
//   'email':  'yifengxie@evestemptation.com',
//   'tier':   1,
// }
// })
//
//
// //fireRemarketingTag event
// dataLayer.push({
// 'event': 'fireRemarketingTag',
// 'google_tag_params': {
//   'ecomm_prodid':     '',
//   'ecomm_pagetype':   '',
//   'ecomm_totalvalue': '',
//   'cartQty':          '',
//   'cartItemString':   ''
// }
// })
//
// //US and China sites switch
// dataLayer.push({
// 'country_code': 'US'
// })
