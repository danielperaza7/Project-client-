import React from "react";
import history from "../../../../history";

import ItemButtons from "../ItemButtons/ItemButtons";
import UndoCard from "./UndoCard";
import FinalSale from "./FinalSale";

import styles from "./ItemDetail.css";
// bottomBtns = [{title: 'Move to wishlist', onClick=()=>{}}, {title:'Remove', onClick=()=>{}}]
export default ({
  itemKey,
  productData,
  deleted,
  forceDeleteProduct,
  noButtons,
  mode,
  pos,
  id,
  cartItem,
  clearGiftCardId
}) => {
  if (!productData) return null;
  const egiftCard = productData.name
    .replace(/\s+/g, "")
    .toLowerCase()
    .indexOf("e-giftcard") !== -1;
  if (deleted) {
    if (!egiftCard || mode !== "YOUR ORDER ITEMS") {
      return (
        <div className={styles.itemWrapper}>
          <UndoCard
            key={itemKey}
            productData={productData}
            forceDeleteProduct={forceDeleteProduct}
            mode={mode}
            pos={pos}
            id={id}
          />
        </div>
      );
    }
    return null;
  }
  let imageUrl = "";
  try {
    imageUrl = productData.images.main.images.lg.url;
  } catch (err) {
    console.log(err);
  }
  const attributesToShow = [
    {
      key: "color",
      title: "color"
    },
    {
      key: "size",
      title: "size"
    },
    {
      key: "receiptEmail",
      title: "Email To"
    },
    {
      key: "fromName",
      title: "From"
    }
  ];

  const singleDealPrice = Math.ceil((productData.total_price / productData.qty) * 100) / 100;
  const singleOriPrice = Math.ceil(productData.price * 100) / 100;
  const redeemPoints = productData.redeem_points;
  let expDate;
  if (productData.redeem_expire_date) {
    expDate = new Date(productData.redeem_expire_date.split(" ")[0]); // special case for iOS Safari browser
  } else {
    expDate = new Date();
  }
  const expired = expDate.getTime() - new Date().getTime() < 0;
  const date = expDate.getDate();
  const month = expDate.getMonth() + 1;
  const year = (expDate.getFullYear().toString()).substr(2);
  const priceAndQty = mode === "wishlist" ? (
    <div className={styles.priceAndQty}>
      <span className={styles.price}>
$
        {singleOriPrice}
      </span>
    </div>
  ) : redeemPoints ? (
    <div className={styles.redeemInfo}>
      <div className={styles.redeemedText}>Redeemed</div>
      <div className={styles.redeemPoints}>
        {redeemPoints}
        {" "}
points
      </div>
      {console.log(
        "redeemExpireDate",
        productData.redeem_expire_date,
        "currDate",
        new Date()
      )}
      {expired ? (
        <div className={styles.expDate}>Expired</div>
      ) : (
        <div className={styles.expDate}>
            Valid through
          {" "}
          {month < 10 ? `0${month}` : `${month}`}
/
          {date}
/
          {year}
        </div>
      )}
    </div>
  ) : (
    <div className={styles.priceAndQty}>
      <span className={styles.price}>
        {singleOriPrice > singleDealPrice ? (
          <span className={styles.ori_price}>{`$${singleOriPrice}`}</span>
        ) : null}
        {`$${singleDealPrice}`}
      </span>
      {noButtons || (egiftCard && mode === "YOUR ORDER ITEMS") ? (
        <ItemButtons productData={productData} mode="qty_only" pos={pos} id={id} />
      ) : (
        <ItemButtons productData={productData} mode="qty_config" pos={pos} id={id} />
      )}
    </div>
  );
  const removeRow = mode !== "YOUR ORDER ITEMS" ? (
    <div className={styles.removeRow}>
      <ItemButtons
        productData={productData}
        mode="wishlist_move_to_cart"
        pos={pos}
        id={id}
      />
      <ItemButtons productData={productData} mode="wishlist_remove" pos={pos} id={id} />
    </div>
  ) : !redeemPoints ? (
    <div className={styles.removeRow}>
      <ItemButtons
        productData={productData}
        mode="cart_move_to_wishlist"
        pos={pos}
        id={id}
        clearGiftCardId={clearGiftCardId}
      />
      <ItemButtons
        productData={productData}
        mode="cart_remove"
        pos={pos}
        id={id}
        eGiftCard={egiftCard}
        clearGiftCardId={clearGiftCardId}
      />
    </div>
  ) : (
    <div className={styles.removeRow}>
      <ItemButtons
        productData={productData}
        mode="cart_remove"
        pos={pos}
        id={id}
        eGiftCard={egiftCard}
        clearGiftCardId={clearGiftCardId}
      />
    </div>
  );
  const giftCard = productData.name
    .replace(/\s+/g, "")
    .toLowerCase()
    .indexOf("giftcard") !== -1;

  const item_detail = egiftCard && mode === "YOUR ORDER ITEMS" && productData.eGiftcard
    ? productData.eGiftcard.giftCardOption
    : productData.attr;
  let attr_list = null;
  if (giftCard && mode !== "YOUR ORDER ITEMS") {
    attr_list = (
      <span className={styles.singleAttr}>
        <span className={styles.attrTitle}>Value: </span>
        {productData.price}
      </span>
    );
  } else {
    attr_list = attributesToShow.map((ele) => {
      return item_detail[ele.key] ? (
        <span key={ele.key} className={styles.singleAttr}>
          <span className={styles.attrTitle}>{`${ele.title}: `}</span>
          {egiftCard && mode === "YOUR ORDER ITEMS" && productData.eGiftcard
            ? item_detail[ele.key]
            : item_detail[ele.key][0].name}
        </span>
      ) : null;
    });
  }

  console.log("ItemDetails product", productData);

  return (
    <div className={styles.itemWrapper} key={itemKey}>
      {/* left product image */}
      <img
        className={styles.leftImage}
        src={imageUrl}
        alt={productData.name}
        title={productData.name}
        onClick={() => {
          if (noButtons) return;
          history.push(`/product/${productData.display_id}`);
        }}
      />
      {/* right product info */}
      <div className={styles.rightInfo}>
        <div className={styles.basicInfo}>
          <h5
            className={styles.prodName}
            onClick={() => {
              if (noButtons) return;
              history.push(`/product/${productData.display_id}`);
            }}
          >
            {productData.name}
          </h5>
          <span className={styles.singleAttr}>
            <span className={styles.attrTitle}>item: </span>
            {productData.sku}
          </span>
          {giftCard && !egiftCard ? null : attr_list}
          {cartItem && cartItem.type.indexOf("giftCard") !== -1 ? (
            <span>No Tax</span>
          ) : null}
          {productData.stock.qty > 10 ? (
            <span>In stock</span>
          ) : (
            <span className={styles.stockInfo}>
              {productData.stock.in_stock
                ? `Only ${productData.stock.qty} left`
                : "Out of stock"}
            </span>
          )}
          {/* render finalsale description */}
          {productData.final_sale ? (
            <FinalSale description={productData.final_sale} />
          ) : null}
          <br />
        </div>
        {/* render price and qty */}
        {priceAndQty}
        {/* render move to cart/wishilist, remove button */}
        {noButtons ? null : removeRow}
      </div>
    </div>
  );
};
