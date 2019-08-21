import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Sticky } from "react-sticky";
import { Link } from "react-router-dom";
import ShoppingCart from "../../../App/components/ShoppingCart/ShoppingCart";
import LiveChatTrigger from "../../../../components/LiveChatTrigger";
// Import Style
import styles from "./PCHeader.css";

class PCHeader extends Component {
  // renderBackToShooping_mobile(){
  //    return(
  //      <div className={styles.backToshopping}><i className={`ion-android-arrow-dropleft ${styles["dropleft-icon"]}`} />
  //         <Link to={`/${this.props.storeName}`}>
  //           Back to Shopping
  //         </Link>
  //      </div>
  //    );
  // }

  // renderBackToShooping_PC(){
  //    return(
  //      <div className={styles.backToshopping}><i className={`ion-android-arrow-dropleft ${styles["dropleft-icon"]}`} />
  //         <Link to={`/${this.props.storeName}`}>
  //           Back to Shopping
  //         </Link>
  //      </div>
  //    );
  // }

  renderLogo() {
    const logo_src = this.props.storeName === "et"
      ? "https://hiddenfigure.evestemptation.com/email/LOGO/ET%20Logo%2020px_H.svg"
      : "https://hiddenfigure.evestemptation.com/email/LOGO/EBE%20Logo%2020px_H.svg";
    const altText = this.props.storeName === "et" ? "Eve's Temptation" : "Eve by Eve's";
    return (
      <div className={styles.logo}>
        <Link to={`/${this.props.storeName}`}>
          <img
            className={styles[`logo-${this.props.storeName}`]}
            src={logo_src}
            alt={altText}
            title={altText}
          />
        </Link>
      </div>
    );
  }

  renderShoppingBag_lg() {
    return (
      <div className={styles.shoppingBag}>
        <ShoppingCart
          className={styles["mobile-nav-row-item"]}
          productNum={this.props.productNum}
          productAdded={this.props.productAdded}
          type="mobile"
          no_animation="true"
        />
      </div>
    );
  }

  renderShoppingBag_xs() {
    return (
      <div className={styles.shoppingBag}>
        <ShoppingCart
          className={styles["mobile-nav-row-item"]}
          productNum={this.props.productNum}
          productAdded={this.props.productAdded}
          type="mobile"
          no_animation="true"
        />
      </div>
    );
  }

  renderShoppingBag_xl() {
    return (
      <div style={{ display: "inline-flex", width: "100%" }}>
        <div className={styles.assistance}> Need assistance?</div>
        <div className={styles.assistance_phone}> +1 855-844-0545</div>
        <div className={styles.LiveChat}>
          <LiveChatTrigger>
            <span className="icon ion-chatbubble" />
            <span className={styles.title}>Live Chat</span>
          </LiveChatTrigger>
        </div>
        <div className={styles.shoppingBag}>
          <ShoppingCart
            className={styles["mobile-nav-row-item"]}
            productNum={this.props.productNum}
            productAdded={this.props.productAdded}
            type="mobile"
          />
        </div>
      </div>
    );
  }

  render() {
    const { fakeDeviceWidth } = this.props;

    return (
      <Sticky
        topOffset={-80}
        stickyStyle={{ marginTop: 0, zIndex: 3 }}
        style={{ height: "10px" }}
      >
        <MediaQuery minWidth={1200} values={{ width: fakeDeviceWidth }}>
          <header className={styles["header-container"]}>
            <div className={styles.medium}>{this.renderLogo()}</div>
            <div className={styles.right}>{this.renderShoppingBag_xl()}</div>
          </header>
        </MediaQuery>
        <MediaQuery minWidth={768} maxWidth={1199} values={{ width: fakeDeviceWidth }}>
          <header className={`${styles["header-container"]}`}>
            <div className={styles.medium}>{this.renderLogo()}</div>
            <div className={styles.right}>{this.renderShoppingBag_lg()}</div>
          </header>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: fakeDeviceWidth }}>
          <header className={`${styles["header-container"]}`}>
            <div className={styles.medium}>{this.renderLogo()}</div>
            <div className={styles.right}>{this.renderShoppingBag_xs()}</div>
          </header>
        </MediaQuery>
      </Sticky>
    );
  }
}

export default connect()(PCHeader);
