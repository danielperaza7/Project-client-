import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import marked from "marked";
import styles from "./FinalSale.css";

class FinalSale extends Component {
  render() {
    const { closeFinalSale, isOpen, no_popover } = this.props;

    return (
      <div
        className={no_popover === false ? styles.finalSale : styles.finalSale_no_popover}
        style={{ opacity: isOpen ? "" : "0" }}
      >
        <MediaQuery minWidth={768}>
          {no_popover === false ? (
            <div className={styles.popover}>
              <div className={styles.popover_arrow} />
              <span className={styles.closeButton} onClick={closeFinalSale}>
                <i className="ion-android-close" />
              </span>
              <div dangerouslySetInnerHTML={{ __html: marked(this.props.final_sale) }} />
            </div>
          ) : (
            <div
              className={styles.finalSaleForMobile}
              style={{ display: isOpen ? "" : "none" }}
            >
              <div className={styles.arrow_PC} />
              <span className={styles.closeButton} onClick={closeFinalSale}>
                <i className="ion-android-close" />
              </span>
              <div dangerouslySetInnerHTML={{ __html: marked(this.props.final_sale) }} />
            </div>
          )}
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div
            className={styles.finalSaleForMobile}
            style={{ display: isOpen ? "" : "none" }}
          >
            <div
              className={styles.arrow_mobile}
              style={{ marginLeft: no_popover === false ? "173px" : "" }}
            />
            <span className={styles.closeButton} onClick={closeFinalSale}>
              <i className="ion-android-close" />
            </span>
            <div dangerouslySetInnerHTML={{ __html: marked(this.props.final_sale) }} />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default connect()(FinalSale);
