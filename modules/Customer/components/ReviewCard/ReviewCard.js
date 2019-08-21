import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { getClientMD } from "../../../App/AppReducer";
import { postReviewInfo } from "../../CustomerActions";
import FieldFormControlTextArea from "../../../../componentsV2/formComponents/FieldFormControlTextArea/FieldFormControlTextArea.js";
import SelectButton from "../../../../componentsV2/formComponents/SelectButton/SelectButton.js";
import styles from "./ReviewCard.css";

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star_rate:
        this.props.item && this.props.item.reviews
          ? this.props.item.reviews.review.rate
          : 0,
      fit:
        this.props.item && this.props.item.reviews
          ? this.props.item.reviews.review.fit
          : "",
      recommend:
        this.props.item && this.props.item.reviews
          ? this.props.item.reviews.review.recommend
            ? "Yes!"
            : "No"
          : "Yes!",
      review_title:
        this.props.item && this.props.item.reviews
          ? this.props.item.reviews.review.title
          : "",
      review_detail:
        this.props.item && this.props.item.reviews
          ? this.props.item.reviews.review.details
          : "",
      keywords:
        this.props.item && this.props.item.reviews
          ? this.props.item.reviews.review.key_words
          : [],
      keywords_input: "",
      submitReview_response: "",
      collapse: true,
      clicked: false
    };
    this.handleRateClick = this.handleRateClick.bind(this);
    this.handleFitClickSelect = this.handleFitClickSelect.bind(this);
    this.handleRecommendationClickSelect = this.handleRecommendationClickSelect.bind(
      this
    );
    this.getCorrectFit = this.getCorrectFit.bind(this);
  }

  componentWillMount() {
    if (this.props.item && this.props.item.reviews) {
      const fit_show = this.getCorrectFit(this.props.item.reviews.review.fit);
      this.setState({
        star_rate: this.props.item.reviews.review.rate,
        fit: fit_show,
        recommend: this.props.item.reviews.review.recommend ? "Yes!" : "No",
        review_title: this.props.item.reviews.review.title,
        review_detail: this.props.item.reviews.review.details,
        keywords: this.props.item.reviews.review.key_words,
        clicked: true
      });
    }
  }

  getCorrectFit(fit) {
    let res = "";
    switch (fit) {
      case "tooSmall":
        res = "Too small";
        break;
      case "tooLarge":
        res = "Too large";
        break;
      case "fit":
        res = "Fits well";
        break;
      case "small":
        res = "Small";
        break;
      case "large":
        res = "Large";
        break;
      default:
        break;
    }
    return res;
  }

  handleCollapsePanel() {
    const cur = this.state.collapse;
    this.setState({
      collapse: !cur
    });
  }

  handleFitClickSelect(option) {
    this.setState({
      fit: option
    });
  }

  handleRecommendationClickSelect(option) {
    this.setState({
      recommend: option
    });
  }

  handleRateClick(starNum) {
    this.setState({
      star_rate: starNum
    });
  }

  handleTitlenputChange(value) {
    this.setState({
      review_title: value
    });
  }

  handleDetailnputChange(value) {
    this.setState({
      review_detail: value
    });
  }

  handleKeyWordsClickSelect(option) {
    const cur = this.state.keywords;
    if (cur.indexOf(option) !== -1) cur.splice(cur.indexOf(option), 1);
    else cur.push(option);
    this.setState({
      keywords: cur
    });
  }

  handleKeyWordsInputChange(e) {
    this.setState({
      keywords_input: e
    });
  }

  handleSubmitForm() {
    const { item, reviewData } = this.props;
    const list = this.state.keywords_input;
    const keyWords_List = list.split(";");
    const cur = this.state.keywords;
    for (let i = 0; i < keyWords_List.length; i++) {
      if (keyWords_List[i]) cur.push(keyWords_List[i].trim());
    }
    this.setState({
      keywords: cur
    });

    let submit_fit = "";
    let submit_recommend = true;
    switch (this.state.fit) {
      case "Too small":
        submit_fit = "tooSmall";
        break;
      case "Too large":
        submit_fit = "tooLarge";
        break;
      case "Fits well":
        submit_fit = "fit";
        break;
      case "Small":
        submit_fit = "small";
        break;
      case "Large":
        submit_fit = "large";
        break;
      default:
        break;
    }

    if (this.state.recommend === "No") submit_recommend = false;
    else submit_recommend = true;

    const data = {
      order_id: reviewData.order_id,
      item_sku: item.sku,
      item_display_id: item.display_id,
      item_color: item.color,
      item_size: item.size ? item.size : null,
      item_band_size: item.band_size ? item.band_size : null,
      item_cup_size: item.cup_size ? item.cup_size : null,
      customer_address: reviewData.customer_address,
      purchase_date: reviewData.purchase_time,
      item_image: item.image,
      customer_email: reviewData.customer_email,
      review: {
        title: this.state.review_title,
        rate: this.state.star_rate,
        fit: submit_fit,
        key_words: this.state.keywords,
        recommend: submit_recommend,
        details: this.state.review_detail
      }
    };
    this.props.dispatch(postReviewInfo(data, this.submitReviewResponse.bind(this)));
    this.setState({
      clicked: true
    });
  }

  submitReviewResponse(response) {
    // const { reviewData, showModal } = this.props;
    // const { customer }= reviewData;
    // const { gender, nickname, age, band_size, cup_size, panty_size, skinConcern, skinType, style }= customer;
    if (response === true) {
      this.setState({
        submitReview_response: "Thank you!",
        clicked: true,
        collapse: true
      });
    } else if (response === false) {
      this.setState({
        submitReview_response: "Please submit again!",
        clicked: false
      });
    }
    // if(!gender||!nickname||!age||!band_size||!cup_size||!panty_size||!skinConcern||!skinType||!style) {
    //
    //   showModal();
    // }
  }

  renderProductInfo() {
    const { item } = this.props;
    const {
      name, image, color, band_size, cup_size, size, qty
    } = item;
    const ColSettings = {
      left: {
        lg: 4, md: 4, sm: 4, xs: 4
      },
      right: {
        lg: 8, md: 8, sm: 8, xs: 8
      }
    };
    return (
      <div className={styles["review-items-productInfo-container"]}>
        <Col {...ColSettings.left}>
          {image ? <img width={80} src={image} alt="Pic" /> : null}
        </Col>
        <Col {...ColSettings.right}>
          <div
            className={styles["review-items-name-attr"]}
            style={{ marginTop: band_size ? "5px" : "" }}
          >
            {name}
          </div>
          <div className={styles["review-items-attr"]}>
Color:
            {color}
          </div>
          {band_size ? (
            <div>
              <div className={styles["review-items-attr"]}>
Band Size:
                {band_size}
              </div>
              <div className={styles["review-items-attr"]}>
Cup size:
                {cup_size}
              </div>
            </div>
          ) : (
            <div className={styles["review-items-attr"]}>
Size:
              {size}
            </div>
          )}
          <div className={styles["review-items-attr"]}>
Quantity:
            {qty}
          </div>
        </Col>
      </div>
    );
  }

  renderStarRate() {
    const { clicked, star_rate } = this.state;
    // const { item } = this.props;
    // const { reviews } = item;
    let num = 0;
    if (clicked) {
      num = star_rate;
    }
    const five_star_num_list = [1, 2, 3, 4, 5];
    const five_star_list = five_star_num_list.map(key => (
      <button onClick={() => this.handleRateClick(key)}>
        <i
          className={
            key > this.state.star_rate
              ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
              : `ion-android-star ${styles["ion-android-star"]}`
          }
        />
      </button>
    ));
    const five_star_list_reviewed = five_star_num_list.map(key => (
      <i
        className={
          key > num
            ? `ion-android-star-outline ${styles["ion-android-star-outline"]}`
            : `ion-android-star ${styles["ion-android-star"]}`
        }
      />
    ));
    return (
      <div className={styles["review-items-starRate-container"]}>
        <div>
          {" "}
Your Rate*:
          {!clicked ? five_star_list : five_star_list_reviewed}
        </div>
      </div>
    );
  }

  renderFitPart() {
    const { clicked, fit } = this.state;
    const { clientMD } = this.props;
    const selections_fit = ["Too small", "Small", "Fits well", "Large", "Too large"];

    return (
      <div className={styles["review-items-fitIt-container"]}>
        <div className={styles.title}>Does it fit:</div>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          {!clicked ? (
            <SelectButton
              selected={fit}
              selections={selections_fit}
              handleClickSelect={this.handleFitClickSelect}
            />
          ) : (
            <div className={styles["review-items-reviewed"]}>{fit}</div>
          )}
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div style={{ marginRight: "30px" }}>
            <SelectButton
              selected={fit}
              selections={selections_fit}
              handleClickSelect={this.handleFitClickSelect}
              width="auto"
            />
          </div>
        </MediaQuery>
      </div>
    );
  }

  renderRecommendation() {
    const { clicked, recommend } = this.state;
    const selections_recommendation = ["Yes!", "No"];
    return (
      <div className={styles["review-items-recommendation-container"]}>
        <div className={styles.title}>I recommend this product:</div>
        {!clicked ? (
          <SelectButton
            selected={recommend}
            selections={selections_recommendation}
            handleClickSelect={this.handleRecommendationClickSelect}
            inline
          />
        ) : (
          <div className={styles["review-items-reviewed"]}>
            {recommend === "Yes!" ? "Yes!" : "No"}
          </div>
        )}
      </div>
    );
  }

  renderTextEvaluation() {
    const { item } = this.props;
    const {
      star_rate,
      review_title,
      review_detail,
      clicked,
      keywords,
      keywords_input
    } = this.state;
    const selections_keyWords = item.key_words
      ? item.key_words
      : ["Kwww 1", "Kwww 2", "Kwww 3", "Kwww 4"];
    const disable = !star_rate || !review_title || !review_detail || clicked;
    const style_textArea = {
      border: "1px solid #E0E0E0",
      color: "#9B9B9B"
    };
    return (
      <div>
        {!clicked ? (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <FieldFormControlTextArea
                placeholder="Example: My best purchase ever!"
                title="Review Title"
                type="text"
                handleConfigInputChange={this.handleTitlenputChange.bind(this)}
                description={review_title}
                rows="1"
                style_textArea={style_textArea}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <FieldFormControlTextArea
                placeholder="Example: This item is exactly what I have been looking for."
                title="Review Details"
                type="text"
                handleConfigInputChange={this.handleDetailnputChange.bind(this)}
                description={review_detail}
                rows="6"
                style_textArea={style_textArea}
              />
            </div>
            <div>
              <div className={styles.keywords}>
                {" "}
                Keywords
                {" "}
                <span>(Multiple Selection)</span>
              </div>
              <div style={{ marginLeft: "-15px", marginBottom: "15px" }}>
                <SelectButton
                  selected={keywords}
                  selections={selections_keyWords}
                  handleClickSelect={this.handleKeyWordsClickSelect.bind(this)}
                  width="auto"
                />
              </div>
              <FieldFormControlTextArea
                placeholder="Your own keywords. Use “;” to separate."
                style_textArea={style_textArea}
                type="text"
                handleConfigInputChange={this.handleKeyWordsInputChange.bind(this)}
                description={keywords_input}
                rows="3"
              />
            </div>
            <button
              className={styles.submission}
              onClick={this.handleSubmitForm.bind(this)}
              disabled={disable}
            >
              SUBMIT
            </button>
          </div>
        ) : (
          <div className={styles["review-items-text-container"]}>
            <div
              className={styles["review-items-text-reviewed-header"]}
              style={{ marginBottom: "50px" }}
            >
              Review Title* :
              <span style={{ fontSize: "16px" }}>
                {" "}
                {review_title}
              </span>
            </div>
            <div className={styles["review-items-text-reviewed-header"]}>
              Review Details* :
              <div className={styles["review-items-text-reviewed"]}>
                {" "}
                {review_detail}
              </div>
            </div>
            <div
              className={styles["review-items-text-reviewed-header"]}
              style={{ marginTop: "50px" }}
            >
              Keywords (Multiple Selection)* :
              <span>
                {" "}
                {keywords
                  ? keywords.map(_item => (
                    <span style={{ marginRight: "5px" }}>{_item}</span>
                  ))
                  : null}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  renderReviewedInfo() {
    const {
      fit,
      recommend,
      review_title,
      review_detail,
      star_rate,
      keywords
    } = this.state;
    const five_star_num_list = [1, 2, 3, 4, 5];

    const num = star_rate;
    const rateReview = five_star_num_list.map(key => (
      <i
        className={
          key > num
            ? `ion-android-star-outline ${styles["ion-android-star-outline-reviewed"]}`
            : `ion-android-star ${styles["ion-android-star-reviewed"]}`
        }
      />
    ));
    const keyWords_List = [];
    for (let i = 0; i < keywords.length; i++) {
      if (i !== keywords.length - 1) keyWords_List.push(<span>{`${keywords[i]} ;`}</span>);
      else keyWords_List.push(<span>{keywords[i]}</span>);
    }
    return (
      <div>
        <div style={{ marginTop: "20px", marginLeft: "5px" }}>{rateReview}</div>
        <div className={styles.reviews_attr}>
          <span>Fit:</span>
          {fit}
        </div>
        <div className={styles.reviews_attr}>
          <span>I recommend this product:</span>
          {recommend ? "Yes!" : "No"}
        </div>
        <div className={styles.reviews_title}>{review_title}</div>
        <div className={styles.reviews_details}>{review_detail}</div>
        <div className={styles.reviews_keywords}>
          <span className={styles.keywords}>Keywords:</span>
          {keyWords_List}
        </div>
      </div>
    );
  }

  renderOpenedPanel() {
    const { clicked } = this.state;
    return (
      <div className={styles["review-items-openedPanel-container"]}>
        {!clicked ? (
          <div>
            {this.renderStarRate()}
            {this.props.item.fit ? this.renderFitPart() : null}
            {this.renderRecommendation()}
            {this.renderTextEvaluation()}
          </div>
        ) : (
          this.renderReviewedInfo()
        )}
      </div>
    );
  }

  renderCollapsedPanel() {
    const { clicked, star_rate } = this.state;
    const { item } = this.props;
    const {
      name, image, color, band_size, cup_size, size
    } = item;
    const ColSettings = {
      left: {
        lg: 0, md: 0, sm: 4, xs: 4
      },
      medium: {
        lg: 0, md: 0, sm: 5, xs: 5
      },
      right: {
        lg: 0, md: 0, sm: 3, xs: 3
      }
    };
    const five_star_num_list = [1, 2, 3, 4, 5];
    const num = clicked && star_rate ? star_rate : 0;
    const rateReview = five_star_num_list.map(key => (
      <i
        className={
          key > num
            ? `ion-android-star-outline ${styles["ion-android-star-outline-reviewed"]}`
            : `ion-android-star ${styles["ion-android-star-reviewed"]}`
        }
      />
    ));
    return (
      <div>
        <div
          className={styles["review-items-collapsedPanel-container"]}
          onClick={this.handleCollapsePanel.bind(this)}
        >
          <Col {...ColSettings.left}>
            {image ? <img width={80} src={image} alt="Pic" /> : null}
          </Col>
          <Col {...ColSettings.medium}>
            <div
              className={styles["review-items-name-attr-mobile"]}
              style={{ marginTop: !size ? "5px" : "" }}
            >
              {name}
            </div>
            {!this.state.clicked || !this.state.collapse ? (
              <div>
                <div className={styles["review-items-attr"]}>
Color:
                  {color}
                </div>
                {band_size ? (
                  <div>
                    <div className={styles["review-items-attr"]}>
                      Band Size:
                      {" "}
                      {band_size}
                    </div>
                    <div className={styles["review-items-attr"]}>
                      Cup size:
                      {" "}
                      {cup_size}
                    </div>
                  </div>
                ) : (
                  <div className={styles["review-items-attr"]}>
Size:
                    {size}
                  </div>
                )}
                <div className={styles["review-items-attr"]}>Quantity: 1</div>
              </div>
            ) : (
              <div>
                <div style={{ marginLeft: "-5px", marginBottom: "5px" }}>
                  {rateReview}
                </div>
              </div>
            )}
          </Col>
          <Col {...ColSettings.right} style={{ marginTop: !size ? "5px" : "10px" }}>
            <div>
              <i
                className={
                  this.state.collapse
                    ? `ion-ios-arrow-down ${styles["ios-arrow-down"]}`
                    : `ion-ios-arrow-up ${styles["ios-arrow-up"]}`
                }
              />
            </div>
            {this.state.clicked ? (
              <div style={{ paddingLeft: "12px" }}>
                <i
                  className={`ion-checkmark-circled ${styles["ion-checkmark-circled"]}`}
                  style={{ fontSize: "40px", color: "#63D270" }}
                />
              </div>
            ) : (
              <div
                className={styles.reviewStatus}
                style={{ display: !this.state.collapse ? "none" : "" }}
              >
                Incomplete
              </div>
            )}
          </Col>
        </div>
        {!this.state.collapse ? this.renderOpenedPanel() : null}
      </div>
    );
  }

  render() {
    const { clientMD } = this.props;
    const ColSettings = {
      left: {
        lg: 5, md: 5, sm: 12, xs: 12
      },
      right: {
        lg: 7, md: 7, sm: 12, xs: 12
      }
    };
    return (
      <div className={styles["image-col"]}>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Col {...ColSettings.left}>
            {this.renderProductInfo()}
            {this.renderStarRate()}
            {this.props.item.fit ? this.renderFitPart() : null}
            {this.renderRecommendation()}
          </Col>
          <Col {...ColSettings.right}>{this.renderTextEvaluation()}</Col>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          {this.renderCollapsedPanel()}
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(ReviewCard);
