import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
// import style
import styles from "./ReviewDisplayCard.css";
import { postReviewResponse } from "../../CategoryActions";
import { getUserData } from "../../../App/AppReducer";

class ReviewDisplayCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dislike:
        this.props.details
        && this.props.details.review
        && this.props.details.review.dislike
          ? this.props.details.review.dislike
          : 0,
      like:
        this.props.details && this.props.details.review && this.props.details.review.like
          ? this.props.details.review.like
          : 0,
      liked_response: "",
      like_status: false,
      dislike_status: false,
      review_response: ""
    };
    this.getAgeRange = this.getAgeRange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("this is nextProps", nextProps);
    const cur_dislike = nextProps.details.review.dislike;
    const cur_like = nextProps.details.review.like;
    if (cur_dislike !== this.state.dislike) this.setState({ dislike: cur_dislike });
    if (cur_like !== this.state.like) this.setState({ like: cur_like });
  }

  getAgeRange(age) {
    if (!age) return "";
    const range = [17, 24, 34, 44, 54];
    const res_list = ["under 18 years old", "18 - 24", "25 - 34", "35 - 44", "45 - 54"];
    for (let i = 0; i < 5; i++) {
      if (age <= range[i]) return res_list[i];
    }
    return "above 65 years old";
  }

  clickLikeIt() {
    const { details, customer } = this.props;
    const { item_sku, order_id } = details;
    const status = this.state.like_status;
    const data = {
      order_id,
      item_sku,
      like: !status,
      customer_email: customer.email
    };
    this.setState({
      like_status: !status,
      review_response: "like"
    });
    this.props.dispatch(postReviewResponse(data, this.postReviewResponseCb.bind(this)));
  }

  postReviewResponseCb(response, val) {
    const { review_response } = this.state;
    const cur_like = this.state.like;
    const cur_dislike = this.state.dislike;
    if (response) {
      if (review_response === "like") {
        this.setState({
          like: val ? cur_like + 1 : cur_like <= 0 ? 0 : cur_like - 1
        });
      } else {
        this.setState({
          dislike: val ? cur_dislike + 1 : cur_dislike <= 0 ? 0 : cur_dislike - 1
        });
      }
    }
  }

  clickDislikeIt() {
    const { details, customer } = this.props;
    const state = this.state.dislike_status;
    const { item_sku, order_id } = details;
    const data = {
      order_id,
      item_sku,
      dislike: !state,
      customer_email: customer.email
    };
    this.setState({
      dislike_status: !state,
      review_response: "dislike"
    });
    this.props.dispatch(postReviewResponse(data, this.postReviewResponseCb.bind(this)));
  }

  renderLeftPart() {
    const { details } = this.props;
    const {
      review,
      customer_nickname,
      customer_address,
      created_at,
      customer_age
    } = details;
    const reviewTime = new Date(created_at);
    const now = new Date();
    const daysAgo = Math.round((now - reviewTime) / (1000 * 60 * 60 * 24));
    const num = Math.round(review.rate);
    const age = this.getAgeRange(customer_age);
    const five_star_num_list = [1, 2, 3, 4, 5];
    const five_star_list = five_star_num_list.map(key => (
      <i
        className={
          key > num
            ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
            : `ion-android-star ${styles["ion-android-star"]}`
        }
      />
    ));
    return (
      <div style={{ marginRight: "-15px" }}>
        <div className={styles.starList}>
          {five_star_list}
          <span>
            {daysAgo}
            {" "}
days ago
          </span>
        </div>
        <div className={styles.customerName}>{customer_nickname}</div>
        {age ? <div className={styles.customerAddress}>{age}</div> : null}
        <div className={styles.customerAddress}>{customer_address}</div>
      </div>
    );
  }

  renderMediumPart() {
    const { details } = this.props;
    const {
      review_status,
      item_color,
      item_size,
      item_band_size,
      item_cup_size,
      review
    } = details;

    return (
      <div className={styles["reviewCard-display-medium-container"]}>
        {review_status === "Approved" ? (
          <div className={styles.purchaseStatus}>
            <i className={`ion-android-done ${styles["ion-android-done"]}`} />
            {"Verified Purchase"}
          </div>
        ) : null}
        <div
          className={styles.itemsInfo}
          style={{ marginTop: review_status !== "Approved" ? "10px" : "" }}
        >
          <div className={styles.attr}>
            Color:
            {" "}
            <span>
              {" "}
              {item_color}
            </span>
          </div>
          {item_band_size ? (
            <div className={styles.attr}>
              Band Size:
              {" "}
              <span>
                {" "}
                {item_band_size}
              </span>
            </div>
          ) : null}
          {item_cup_size ? (
            <div className={styles.attr}>
              Size:
              {" "}
              <span>
                {" "}
                {item_cup_size}
              </span>
            </div>
          ) : null}
          {item_size && !item_band_size ? (
            <div className={styles.attr}>
              Size:
              {" "}
              <span>
                {" "}
                {item_size}
              </span>
            </div>
          ) : null}
          {review.recommend ? (
            <div className={styles.recommend}>
              <i className={`ion-checkmark-circled ${styles["ion-checkmark-circled"]}`} />
              {" "}
              I recommend this product.
            </div>
          ) : null}
          {review.fit ? (
            <div
              className={styles.attr}
              style={{ marginTop: !review.recommend ? "20px" : "" }}
            >
              <span>Fit:</span>
              {" "}
              {review.fit}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  renderRightPart() {
    const { details, customer } = this.props;
    const { review } = details;

    return (
      <div className={styles["reviewCard-display-right-container"]}>
        <div className={styles.reviewTitle}>{review.title}</div>
        <div className={styles.reviewDetails}>{review.details}</div>
        <div className={styles.clickResponse}>
          <div
            className={styles.thumb}
            onClick={customer ? this.clickLikeIt.bind(this) : null}
          >
            <i
              className={`ion-thumbsup ${styles["ion-thumbsup"]}`}
              style={{ color: this.state.like && customer ? "#E4D8BF" : "" }}
            />
            {" "}
            {this.state.like}
          </div>
          <div
            className={styles.thumb}
            onClick={customer ? this.clickDislikeIt.bind(this) : null}
          >
            <i
              className={`ion-thumbsdown ${styles["ion-thumbsdown"]}`}
              style={{ color: this.state.dislike && customer ? "#E4D8BF" : "" }}
            />
            {this.state.dislike}
          </div>
          {this.state.liked_response ? (
            <div className={styles.thumb_note}>{this.state.liked_response}</div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const { clientMD, bg } = this.props;

    const ColSettings = {
      left: {
        lg: 3, md: 3, sm: 3, xs: 5
      },
      medium: {
        lg: 4, md: 4, sm: 4, xs: 7
      },
      right: {
        lg: 5, md: 5, sm: 5, xs: 12
      }
    };
    return (
      <div>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div
            className={styles["reviewCard-display-container"]}
            style={{ background: bg }}
          >
            <Col {...ColSettings.left} style={{ paddingRight: "0px" }}>
              {this.renderLeftPart()}
            </Col>
            <Col {...ColSettings.medium}>{this.renderMediumPart()}</Col>
            <Col {...ColSettings.right}>{this.renderRightPart()}</Col>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div
            className={styles["reviewCard-display-container"]}
            style={{ background: bg }}
          >
            <Col {...ColSettings.left}>{this.renderLeftPart()}</Col>
            <Col {...ColSettings.medium}>{this.renderMediumPart()}</Col>
            <Col {...ColSettings.right}>{this.renderRightPart()}</Col>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    customer: getUserData(store)
  };
}

export default connect(mapStateToProps)(ReviewDisplayCard);
