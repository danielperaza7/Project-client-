/**
 * Created by warren on 6/26/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { getRewardPoints } from "../../../App/AppReducer";
import styles from "./RewardPoint.css";

class RewardPoint extends Component {
  renderRewardPointDetail() {
    return (
      <div className={styles.title}>
        <div>
          <p>
            Current Points Total:
            {" "}
            {this.props.rewardPoints}
            {" "}
POINTS ($
            {this.props.rewardPoints / 100}
)
          </p>
        </div>
      </div>
    );
  }

  renderDiscription() {
    return (
      <div className={styles.description}>
        <div className={styles.title}>HOW TO EARN POINTS</div>
        <div>
          <p>
            Points will be added to your reward balance after you take certain activities.
            For example, every time you make a purchase you will earn points based on the
            price of products purchased. Each
            {" "}
            <bold style={{ fontWeight: "bold" }}>$ 1.00</bold>
            {" "}
spent for your order will
            earn
            <bold style={{ fontWeight: "bold" }}>1 Point</bold>
.
          </p>
        </div>
        <div className={styles.title}>HOW TO SPEND POINTS</div>
        <div>
          <p>
            In order to redeem your points you will need to log into your account. Once
            logged in, you will be able to see your total reward points under your name.
            Next to this select the “Redeem” option and you will be redirected to all the
            items which qualify for the month’s special. Please note, that the item(s) you
            want to redeem will ship along with your purchase order.
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles["reward-point"]}>
        <div className={styles["reward-point-title"]}>Reward Point</div>
        {this.renderRewardPointDetail()}
        {this.renderDiscription()}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    rewardPoints: getRewardPoints(store)
  };
}

export default connect(mapStateToProps)(RewardPoint);
