/**
 * Created by warrenchen on 4/8/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";

// import styles
import styles from "./ProductBoard/ProductBoard.css";

class GiftCardCustomerInfo extends Component {
  render() {
    const { changGiftCardInfo, giftCardInfo, errMsg } = this.props;
    return (
      <div>
        <div className={styles.formItem}>
          <label>Recepient's email: *</label>
          <input
            name="email"
            type="text"
            placeholder="Recepient's email"
            value={giftCardInfo.email}
            onChange={event => changGiftCardInfo(event, "email")}
          />
          {errMsg ? <div className={styles.errMsg}>{errMsg}</div> : null}
        </div>
        <div className={styles.formItem}>
          <label>Confirm Recepient's email: *</label>
          <input
            name="email_confirmation"
            type="text"
            placeholder="Confirm Recepient's email"
            value={giftCardInfo.email_confirmation}
            onChange={event => changGiftCardInfo(event, "email_confirmation")}
          />
          {errMsg ? <div className={styles.errMsg}>{errMsg}</div> : null}
        </div>
        <div className={styles.formItem}>
          <label>To(Optional):</label>
          <input
            name="toname"
            type="text"
            placeholder="Recepient's name"
            value={giftCardInfo.to}
            onChange={event => changGiftCardInfo(event, "to")}
          />
        </div>
        <div className={styles.formItem}>
          <label>From(Optional):</label>
          <input
            name="fromname"
            type="text"
            placeholder="Giver's name"
            value={giftCardInfo.from}
            onChange={event => changGiftCardInfo(event, "from")}
          />
        </div>
        <div className={styles.formItem}>
          <label>Message(Optional):</label>
          <input
            name="message"
            type="text"
            placeholder="Leave Your Message here"
            value={giftCardInfo.message}
            onChange={event => changGiftCardInfo(event, "message")}
          />
        </div>
      </div>
    );
  }
}

export default connect()(GiftCardCustomerInfo);
