import React from "react";
import history from "../../../../history";

import ItemButtons from "../ItemButtons/ItemButtons";

import styles from "./UndoCard.css";

export default ({
  itemKey, productData, forceDeleteProduct, mode, id, pos
}) => {
  return (
    <div className={styles.undoWrapper} key={itemKey}>
      <div className={styles.undoColClose}>
        <button
          className={styles.close}
          onClick={() => {
            forceDeleteProduct(
              productData.sku,
              mode,
              productData.eGiftcard ? productData.eGiftcard.giftCardOption._id : null
            );
          }}
        >
          <i className="ion-android-close" />
        </button>
      </div>
      <div className={styles.undoColText}>
        <span className={styles.text}>
          <span
            className={styles.prodName}
            onClick={() => {
              history.push(`/product/${productData.display_id}`);
            }}
          >
            {productData.name}
          </span>
          {` has been removed from your ${mode === "wishlist" ? "wishlist" : "bag"}`}
        </span>
      </div>
      <div className={styles.undoColUndo}>
        {mode === "wishlist" ? (
          <ItemButtons productData={productData} mode="wishlist_undo" />
        ) : (
          <ItemButtons productData={productData} mode="cart_undo" pos={pos} id={id} />
        )}
      </div>
    </div>
  );
};
