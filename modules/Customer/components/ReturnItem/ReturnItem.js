import React from "react";
import { FormControl } from "react-bootstrap";
import styles from "./ReturnItem.css";
import { returnReasons } from "./constants";

export default ({
  item, status, changeItem, index, reviewMode, input
}) => {
  const {
    sku,
    name,
    attr,
    images,
    price,
    deal_price,
    refund_amount,
    qty,
    refund_status,
    _id,
    shipping_status
  } = item;
  let localStatus = status;
  // console.log('status', status);
  // console.log('Return Item reviewMode', reviewMode)
  if (!localStatus) {
    localStatus = { selected: false, qty: 1, reason: null };
  }
  const iconName = localStatus.selected
    ? "ion-android-checkbox-outline"
    : "ion-android-checkbox-outline-blank";
  const qtyArray = [];
  for (let i = 0; i < qty; i++) {
    qtyArray.push(i + 1);
  }
  const optionNodes = qtyArray.map(number => <option value={number}>{number}</option>); // need onClick Action if 2 or more qty for one item entry
  const reasonNode = (
    <div className={localStatus.selected && !reviewMode ? "" : "hidden"}>
      <FormControl
        componentClass="select"
        placeholder="select reason"
        onChange={(e) => {
          changeItem(
            index,
            localStatus.selected,
            localStatus.qty,
            e.target.value === "others" && input[index] ? input[index] : e.target.value,
            _id
          );
        }}
      >
        {returnReasons.map((_item) => {
          return (
            <option key={_item.id} value={_item.id}>
              {_item.name}
            </option>
          );
        })}
      </FormControl>
      <span
        className={
          !localStatus.reason
          || !localStatus.reason.toLowerCase().startsWith("others")
          || reviewMode
            ? "hidden"
            : ""
        }
      >
        <FormControl
          required
          style={{ marginTop: 5 }}
          type="text"
          placeholder="Enter reason"
          onChange={(e) => {
            changeItem(
              index,
              localStatus.selected,
              localStatus.qty,
              e.target.value !== "" ? `others: ${e.target.value}` : "others",
              _id
            );
          }}
        />
      </span>
    </div>
  );
  const actionNode = (
    <span className={styles.actionWrapper}>
      <span className={reviewMode || refund_status || item.final_sale ? "hidden" : ""}>
        <span
          className={`${iconName} ${styles.select}`}
          onClick={() => {
            changeItem(
              index,
              localStatus.selected ? !localStatus.selected : true,
              localStatus.qty,
              localStatus.reason,
              _id
            );
          }}
        />
        <span className={localStatus.selected && qtyArray.length > 1 ? "" : "hidden"}>
          <FormControl componentClass="select" placeholder="1">
            {optionNodes}
          </FormControl>
        </span>
      </span>
      <span className={refund_status ? "" : "hidden"}>returned</span>
      <span className={item.final_sale ? "" : "hidden"}>
        Sorry! Final Sale Products cannot be returned.
      </span>
    </span>
  );

  // onChange={(e) => { changeItem(index, localStatus.selected, e.target.value); }}
  const reviewNode = (
    <span className={styles.actionWrapper}>
Return qty:
      {status ? status.qty : 0}
    </span>
  );
  if (reviewMode && localStatus.selected === false) return null;
  return (
    <div className={styles.itemWrapper}>
      <span className={styles.imageWrapper}>
        <img
          src={
            images && images.main && images.main.images ? images.main.images.xs.url : ""
          }
          alt={images && images.main ? images.main.title : ""}
        />
      </span>
      <span className={styles.detailWrapper}>
        <span>{name}</span>
        <span>
Price $
          {price.current || deal_price}
        </span>
        {price.refund_amount || refund_amount ? (
          <span>
Refund price $
            {price.refund_amount || refund_amount}
          </span>
        ) : null}
        <span>
Sku:
          {sku}
        </span>
        <span>{attr && attr.size ? attr.size.map(o => o.name) : ""}</span>
        <span>{attr && attr.color ? attr.color.map(o => o.name) : ""}</span>
        <span>
Qty:
          {localStatus && localStatus.qty ? localStatus.qty : ""}
        </span>
        <span>
          Shipping status:
          {" "}
          {typeof shipping_status !== "string"
            ? shipping_status
              ? "Yes"
              : "No"
            : shipping_status}
        </span>
        {refund_status ? (
          <span>
            Refund status:
            {" "}
            {typeof refund_status !== "string"
              ? refund_status
                ? "Yes"
                : "No"
              : refund_status}
          </span>
        ) : null}
      </span>
      {reviewMode ? reviewNode : null}
      {actionNode}
      <div className={styles.reasonWrapper}>
        <div className={styles.reason}>
          {reasonNode}
          {reviewMode ? (
            <div>
              <span>Reason: </span>
              <span>
                {localStatus.reason.indexOf("others: ") === -1
                  ? localStatus.reason
                  : localStatus.reason.replace("others: ", "")}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
