// import dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";

// import css
import styles from "./RPRP.css";

class RedeemablePoints extends Component {
  render() {
    let currentLocation = "";
    try {
      currentLocation = window.location.pathname ? window.location.pathname : "";
    } catch (err) {
      currentLocation = "";
    }
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div className={styles.redeemablePointsContainer}>
            <div className={styles.redeemablePointsText}>Redeemable Points</div>
            <div className={styles.redeemablePoints}>
              {(this.props.rewardPoints || this.props.rewardPoints === 0)
              && (this.props.redeemedPointsInCart || this.props.redeemedPointsInCart === 0)
                ? this.props.rewardPoints - this.props.redeemedPointsInCart > 0
                  ? this.props.rewardPoints - this.props.redeemedPointsInCart
                  : 0
                : "Loading"}
            </div>
          </div>
        ) : (
          <div className={styles.signInContainer}>
            <Link
              to={{
                pathname: "/signin",
                state: { wherefrom: currentLocation }
              }}
              className={styles.signin}
            >
              SIGN IN
            </Link>
            <div className={styles.redeemablePointsText}>
              to see your redeemable points
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RedeemablePoints;
