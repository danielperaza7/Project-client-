import React, { Component } from "react";
import { Link } from "react-router-dom";

import Giftcard from "../../../Customer/components/Giftcard/Giftcard";

import styles from "./RewardPointsAccountBalance.css";

class GiftcardWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { authStatus } = this.props;
    const innerNode = authStatus ? (
      <div className={styles.innerNode}>
        <Giftcard apply_mode />
      </div>
    ) : (
      <div className={styles.innerNode}>
        <div style={{ fontFamily: "GothamMedium" }}>For registered customer only</div>
        <div>
          <Link to="/checkout/signin">Sign in</Link>
          {" "}
to use Gift Card. Or
          {" "}
          <Link to="/checkout/signup">Become a member</Link>
        </div>
      </div>
    );
    return (
      <div className={styles.sectionWrapper}>
        <div className={styles.title} onClick={this.toggleCollapsed}>
          <i
            className={`${styles.collapsedIcon} ${
              this.state.collapsed ? "ion-android-add" : "ion-android-remove"
            }`}
          />
          Use Gift Card
        </div>
        {this.state.collapsed ? null : innerNode}
      </div>
    );
  }
}

export default GiftcardWrapper;
