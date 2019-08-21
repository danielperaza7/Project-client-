import React from "react";

import ProductBoard from "../../../Category/components/Product/ProductBoard/ProductBoard";

export const ProductBoard1Info = {
  id: "product_board_1",
  description: "show the product board of a product",
  props: {
    galleryMode: "GalleryCarousel",
    detail: "0"
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
// galleryMode="GalleryWithThumbnails" detail="1"
const ProductBoard1 = React.memo(({
  products,
  promData,
  galleryMode,
  detail,
  enable_link,
  customerGroupId,
  tiers,
  actionField,
  creative
}) => {
  if (!products || products.length < 1) {
    return <div>Product Board 1, no product data</div>;
  }

  const tiers1 = {
    0: "guest",
    1: "VIP",
    2: "VVIP"
  };

  return (
    <div>
      <ProductBoard
        product={products[0]}
        tiers={tiers || tiers1}
        customerGroupId={customerGroupId}
        DL={{ list: "CMS - ProductBoard1" }}
        galleryMode={galleryMode || "GalleryCarousel"}
        detail={detail || "0"}
        enable_link={enable_link}
        DL={{
          list: `CMS - ProductBord1${actionField ? ` - ${actionField}` : " - Undefined"}`
        }}
        promData={promData}
        creative={creative}
      />
    </div>
  );
});

export default ProductBoard1;
