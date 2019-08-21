import React, { Component } from "react";
import styles from "./ItemAdded.css";

class ItemAdded extends Component {
  render() {
    const { item } = this.props;

    const priceNode = item.redeem_points > 0 ? (
      <div className={styles["item-price"]}>
        {`${item.redeem_points} points x ${
          item.qty
        }`}
      </div>
    ) : !item.price.current && !item.price.original ? (
      <div className={styles["item-price"]}>
        {`${item.price} points x ${
          item.qty
        }`}
      </div>
    ) : item.price.current && item.price.current !== item.price.original ? (
      <div className={styles["item-price"]}>
        <span className={styles["ori-price"]}>
          {`${
            item.price.current === item.price.original
              ? ""
              : `$${item.price.original}`
          }`}
        </span>
        {`$${item.price.current} x ${item.qty}`}
      </div>
    ) : (
      <div className={styles["item-price"]}>
        {`$${item.price.original} x ${item.qty}`}
      </div>
    );

    const details = (
      <div className={styles["item-detail"]}>
        <div className={styles["item-name"]}>{item.name}</div>
        <div className={styles["item-attr"]}>
          {item.size.map((size) => {
            return ` ${size.name}`;
          })}
          {item.color.map((color) => {
            return ` ${color.name}`;
          })}
        </div>
        {priceNode}
      </div>
    );

    return (
      <div className={styles["dropdown-item"]}>
        <div className={styles.title}>
          {" "}
          {"Item(s) just added:"}
          {" "}
        </div>
        <div className={styles.panel}>
          <div className={styles["item-img"]}>
            <img src={item.image} alt={item.name} />
          </div>
          {details}
        </div>
      </div>
    );
  }
}

export default ItemAdded;
