import React from "react";
import ProductCard from "../../../Category/components/ProductCard/ProductCard";

export const ProductCard1Info = {
  id: "product_card_1",
  description: "show a card of a product",
  image: "",
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

const ProductCard1 = ({
  products,
  promData,
  creative,
  actionField,
  membershipPriceDisabled
}) => {
  if (!products || products.length < 1) {
    return <div>Product card 1, no product data</div>;
  }
  const tiers = {
    0: "guest",
    1: "VIP",
    2: "VVIP"
  };

  return (
    <div>
      <ProductCard
        tiers={tiers}
        membershipPriceDisabled={membershipPriceDisabled}
        product={products[0]}
        DL={{
          list: `CMS - ProductCard1${actionField ? ` - ${actionField}` : " - Undefined"}`
        }}
        promData={promData}
        creative={creative}
      />
    </div>
  );
};

export default ProductCard1;
