import React, { Component } from "react";

import styles from "./EmptyCart.css";

import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";

class EmptyCart extends Component {
  render() {
    const bannerProps = {
      cmsid: "cart-banner"
    };

    const recommendProps = {
      cmsid: "cart-recommend"
    };

    const empty_bag_img_url = "https://hiddenfigure.evestemptation.com/email/empty-cart/shopping-bag.jpg"; // from legacy website

    return (
      <div className={styles["empty-cart"]}>
        <CMSBlock {...bannerProps} />
        <div className={styles["middle-img"]}>
          <img src={empty_bag_img_url} alt="" />
          <button onClick={this.props.goBack} className={styles["goback-btn"]}>
            CONTINUE SHOPPING
          </button>
        </div>
        <div className={styles.recommend}>
          {" "}
          {"Picks For You"}
          {" "}
        </div>
        <CMSBlock {...recommendProps} />
      </div>
    );
  }
}

export default EmptyCart;
