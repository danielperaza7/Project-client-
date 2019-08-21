import React from "react";

import ProductCard from "../../../Category/components/ProductCard/ProductCard";

export const ProductCardListInfo = {
  id: "product_card_list",
  description: "show a list of a product cards",
  props: {
    location_menu: "GalleryCarousel"
  },
  PRODUCT_DATA: {
    list_ids: [
      // meaningless list, only render the first product
      "1001406"
    ],
    data_fetch_mode: "clientOnLoad",
    product_id_type: "list_ids"
  },
  responsive: {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  }
};

const ProductCardList = ({
  products, promData, creative, location_menu
}) => {
  if (!products || products.length < 1) {
    return null;
  }
  const tiers = {
    0: "guest",
    1: "VIP",
    2: "VVIP"
  };
  const list = products.map((item, index) => (
    <ProductCard
      tiers={tiers}
      product={item}
      promData={promData}
      creative={creative}
      from={location_menu}
      key={index}
      index={index}
    />
  ));
  return <div>{list}</div>;
};

export default ProductCardList;
