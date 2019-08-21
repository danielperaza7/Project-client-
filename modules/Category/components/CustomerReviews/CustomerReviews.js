import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { getClientMD } from "../../../App/AppReducer";
import { getCustomerReviews } from "../../CategoryReducer";
import ReviewDisplayCard from "../ReviewDisplayCard/ReviewDisplayCard";
import FitBar from "../FitBar/FitBar";
// import style
import styles from "./CustomerReviews.css";

class CustomerReviews extends React.PureComponent {
  renderFitandKeyWords() {
    const { customerReviews } = this.props;
    const { people_think_fit, people_think_fit_percent, key_words } = customerReviews;
    const fit_list = ["tooSmall", "small", "fit", "large", "tooLarge"];
    const label_list = ["Too Small", "Fit", "Too Large"];
    let sum = 0;
    let fit_num = 0;
    fit_list.forEach((key) => {
      sum += people_think_fit[key];
      if (key === "fit") fit_num = people_think_fit[key];
    });
    const key_words_list = key_words.map(key => (
      <div className={styles.key_words_card}>{key}</div>
    ));
    return (
      <div className={styles["review-display-fitKeyWords-container"]}>
        <div className={styles.top}>
          <div className={styles.fitTitle}>
            {" "}
            Overall Fit:
            {" "}
            <span>
Fit as expected (
              {`${fit_num} out of ${sum}`}
)
            </span>
          </div>
          <div className={styles.fitBar}>
            <FitBar
              keyList={fit_list}
              percentage={people_think_fit_percent}
              labels={label_list}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.pw_title}> People Write: </div>
          <div className={styles.pw}>{key_words_list}</div>
        </div>
      </div>
    );
  }

  renderStarBars() {
    const { customerReviews } = this.props;
    const average_rate = customerReviews ? customerReviews.average_rate : null;
    const review_number = customerReviews ? customerReviews.review_number : 0;
    const num = Math.round(average_rate);
    const five_star_num_list = [1, 2, 3, 4, 5];
    const starList = customerReviews ? customerReviews.stars : null;
    let sum = 0;
    for (let i = 1; i <= 5; i++) sum += starList[i];
    const five_star_list = five_star_num_list.map(key => (
      <i
        className={
          key > num
            ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
            : `ion-android-star ${styles["ion-android-star"]}`
        }
      />
    ));
    const star_distribution_list = five_star_num_list.map((key) => {
      const ind = 6 - key;
      const width = (starList[ind] * 100) / sum;
      return (
        <div className={styles.star_bar}>
          <div className={styles.rowData}>
            <span>{6 - key}</span>
            {" "}
star
          </div>
          <div className={styles.rowBar}>
            <div className={styles.realData} style={{ width: `${width}%` }} />
          </div>
          <div className={styles.rowRight}>{starList[ind]}</div>
        </div>
      );
    });
    return (
      <div className={styles["review-display-starRate-container"]}>
        <div className={styles.left}>
          <div className={styles.average_rate}>{average_rate}</div>
          <div className={styles.starList}>{five_star_list}</div>
          <div className={styles.review_number}>{`${review_number} Reviews`}</div>
        </div>
        <div className={styles.right}>{star_distribution_list}</div>
      </div>
    );
  }

  render() {
    const { clientMD, customerReviews } = this.props;
    if (!customerReviews) return null;
    const reviewDetails = customerReviews ? customerReviews.reviews : null;
    const review_number = customerReviews ? customerReviews.review_number : 0;
    const ColSettings = {
      left: {
        lg: 6, md: 7, sm: 7, xs: 12
      },
      right: {
        lg: 6, md: 5, sm: 5, xs: 12
      }
    };
    let ind = 0;
    const reviewCard_list = reviewDetails
      ? reviewDetails.map(item => (
        <ReviewDisplayCard
          key={item._id}
          details={item}
          clientMD={clientMD}
          bg={ind++ % 2 === 0 ? "#FAFAFA" : "white"}
        />
      ))
      : null;

    return (
      <div>
        <div className={styles["review-display-title"]}> Customer reviews </div>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div className={styles["review-display-container"]}>
            <Col {...ColSettings.left}>{this.renderStarBars()}</Col>
            <Col {...ColSettings.right}>{this.renderFitandKeyWords()}</Col>
          </div>
          <div className={styles["review-list-display-content"]}>
            <div className={styles["review-list-display-title"]}>
              {" "}
              {`${review_number} ${review_number > 1 ? "Reviews" : "Review"}`}
              {" "}
            </div>
            {reviewCard_list}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Col {...ColSettings.left}>{this.renderStarBars()}</Col>
          <Col {...ColSettings.right}>{this.renderFitandKeyWords()}</Col>
          <div>
            <div className={styles["review-list-display-title"]}>
              {`${review_number} ${
                review_number > 1 ? "Reviews" : "Review"
              }`}
            </div>
            {reviewCard_list}
          </div>
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store),
    customerReviews: getCustomerReviews(store)
  };
}

export default connect(mapStateToProps)(CustomerReviews);
