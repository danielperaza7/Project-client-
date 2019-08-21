import React from "react";
import { mapValues, isEmpty, orderBy } from "lodash";
import styles from "./PriceRange.css";
// import { /* OverlayTrigger, Popover */} from "react-bootstrap";

// this function is to convert the map at the category page into the format same as that from the function calculatePriceRange
export const convertMap = (originMap) => {
  return mapValues(originMap, (obj) => {
    return {
      min: obj[0],
      max: obj[1]
    };
  });
};

// this function is to render the price range
export const mergePrice = (price) => {
  let min;
  let max;
  if (Array.isArray(price)) {
    min = price[0];
    max = price[1];
  } else {
    min = price.min;
    max = price.max;
  }
  if (min === max) {
    return `$${min}`;
  }
  return `$${min} ~ $${max}`;
};

// this function is to render prices for all the tiers
// input: map created by calculatePriceRange, sku or productId(sth unique is fine)
// output: a button with a tooltip to show the prices
export const renderPriceMap = (tiers, map) => {
  // if tiers prices have prices for group id 1,2,3... then show,
  // not show it if it's empty or it only has price for tier 0
  const keys = Object.keys(map);
  if (!map || _.isEmpty(map) || keys.length < 1) {
    // no map
    return null;
  }
  if (keys.length === 1 && keys[0] === "0") {
    // only has price for tier 0
    return null;
  }
  // const popoverPrices = (
  //   <Popover id={id} title="Membership prices">
  //     {keys.map(key => {
  //       return (
  //         <li key={key} style={{ listStyle: "none" }}>
  //           {`${tiers[key]} : ${mergePrice(map[key])}`}
  //         </li>
  //       );
  //     })}
  //   </Popover>
  // );
  // return (
  //   <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverPrices}>
  //     <span>Membership Price <i className="ion-help-circled"/></span>
  //   </OverlayTrigger>
  // )
  return null;
};

// this function is to render the current price and (price from the next tier or the old price)
// input: map created by calculatePriceRange, groupId
// output: the price box
export const renderPrice = (tier_prices, groupId, origin_prices) => {
  if (isEmpty(origin_prices) && isEmpty(map)) return "to be calculated";
  if (!(groupId === parseInt(groupId, 10))) {
    return "GroupId not a integer";
  }
  // use original price as default price
  let {min} = origin_prices;
  let {max} = origin_prices;
  // try to match tier price
  let match = false;
  for (let g_id = groupId; g_id >= 0 && !match; g_id--) {
    if (tier_prices && g_id in tier_prices) {
      match = true;
      min = tier_prices[g_id].min;
      max = tier_prices[g_id].max;
    }
  }
  if (match && (origin_prices.min !== min && origin_prices.max !== max)) {
    // show orignal price and current price
    return (
      <span>
        <span className={styles.old_price}>
          {mergePrice([origin_prices.min, origin_prices.max])}
        </span>
        <span className={styles.current_price}>{mergePrice([min, max])}</span>
      </span>
    );
  }
  // just show original price
  return (
    <span className={styles.current_price}>
      {mergePrice([origin_prices.min, origin_prices.max])}
    </span>
  );
};

// this function is to create a map whose key is the groupId, the value is the price list
// input: product array, which contains the attribute tier_price
// output: a map group by GroupID
export const groupByGroupId = (productList) => {
  const groupMap = {};
  const uniformPrice = [];

  for (const product of productList) {
    const priceList = {};

    // if the simple product has tier prices

    if (Array.isArray(product.tier_prices) && product.tier_prices.length > 0) {
      for (const price of product.tier_prices) {
        if (!priceList[price.group_id]) priceList[price.group_id] = [];
        priceList[price.group_id].push(price);
      }
      // console.log("priceList is", priceList);
      for (const key in priceList) {
        // group_id as key
        if (!groupMap[key]) groupMap[key] = [];
        groupMap[key].push(priceList[key]);
      }
    } else {
      // if not, use the general price
      uniformPrice.push(product.price);
    }
  }
  // console.log("group map in the middle is", groupMap);
  for (const price of uniformPrice) {
    if (Object.keys(groupMap).length > 0) {
      // if the sibling simple products have tier_price
      for (const key in groupMap) {
        // group_id as key
        const obj = { customer_group_id: key, value: price, qty: 1 };
        groupMap[key].push(new Array(obj));
      }
    } else {
      const obj = { customer_group_id: key, value: price, qty: 1 };
      if (!groupMap["0"]) groupMap["0"] = [];
      groupMap["0"].push(new Array(obj));
    }
  }
  return groupMap;
};

// this function is to create a map whose key is the groupId, the value is the min price and max price of this group
// input: product array, which contains the attribute tier_price, the qty bought
// output: a map containing each groupId and its price range with certain quantity
export const calculatePriceRange = (productList, qty) => {
  // console.log()
  const groupMap = groupByGroupId(productList);
  // console.log("groupMAp is", groupMap);
  const resultMap = {};
  for (const groupId in groupMap) {
    const products = groupMap[groupId];
    let min = Number.MAX_VALUE;
    let max = 0;
    for (const arr of products) {
      const sort = orderBy(arr, "qty", "desc");
      for (const prod of sort) {
        if (prod.qty <= qty) {
          if (prod.value > max) {
            max = prod.value;
          }
          if (prod.value < min) {
            min = prod.value;
          }
          break;
        }
      }
    }

    resultMap[groupId] = {};
    resultMap[groupId].min = min;
    resultMap[groupId].max = max;
  }
  return resultMap;
};

export const calculateOriginPriceRange = (productList) => {
  if (!productList || productList.length < 1) {
    console.log("calculateOriginPriceRange error input, empty product list");
    return {};
  }
  let max = productList[0].price;
  let min = max;
  productList.forEach((product) => {
    if (max < product.price) {
      max = product.price;
    }
    if (min > product.price) {
      min = product.price;
    }
  });
  return {
    min,
    max
  };
};

// this function is to get the peer price
// ( given a groupId, if there is a price belonging to another tier lower than that of this tier, the peer price would be that lower price,
// if the current price is the lowest, the peer price would be the price of the group 0 )
// input: map created by calculatePriceRange, current groupId
// output: a peer price object{min, max,nextLevel} if nextLevel is true , it means the peer price has higher tier
export const getPeerPriceRange = (map, groupId) => {
  const priceObj = map[groupId] ? map[groupId] : map["0"];
  let currentMin = priceObj.min;
  let currentMax = priceObj.max;
  let nextLevel = false;
  for (const id in map) {
    if (id > groupId) {
      if (map[id].max < currentMax || map[id].min < currentMin) {
        currentMax = map[id].max;
        currentMin = map[id].min;
        nextLevel = true;
        break;
      }
    }
  }
  const peer = {};
  if (nextLevel) {
    peer.min = currentMin;
    peer.max = currentMax;
  } else {
    peer.min = map["0"].min;
    peer.max = map["0"].max;
  }
  peer.nextLevel = nextLevel;
  return peer;
};
