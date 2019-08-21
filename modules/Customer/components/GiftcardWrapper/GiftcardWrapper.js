/**
 * Created by warren on 6/26/17.
 */
import React from "react";

import Giftcard from "../Giftcard/Giftcard";

import styles from "./GiftcardWrapper.css";

export default ({ customer }) => {
  return (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.title}> Account Balance & Gift Card </h2>
      <div className={styles.accountBalance}>
        {" "}
        Your account balance: $
        {" "}
        {`${customer ? customer.account_balance / 100 : 0}`}
        {" "}
      </div>
      <div className={styles.giftCard}>
        <Giftcard />
      </div>
    </div>
  );
};
