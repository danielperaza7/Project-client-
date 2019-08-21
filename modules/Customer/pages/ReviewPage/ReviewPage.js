import React, { Component } from "react";
import { Row, DropdownButton, MenuItem } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./ReviewPage.css";
import ReviewCard from "../../components/ReviewCard/ReviewCard.js";
import {
  fetchReviewItems,
  // postCustomerInfo,
  setReviewData,
  setReviewItems
} from "../../CustomerActions";

// import getter
import { getReviewItems, getReviewData } from "../../CustomerReducer";
import { getUserData } from "../../../App/AppReducer";
import CustomModal from "../../../../components/Modal/CustomModal";
import { SURVEY_LIST } from "../../../../config/config";

class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      Age: "Select",
      Gender: "Select",
      Nickname: "",
      Skin_type: "Select",
      Skin_concern: "Select",
      Style_type: "Select",
      Band_Size: "Select",
      Cup_Size: "Select",
      Panty_Size: "Select",
      showModal_already: false
    };
    this.close = this.close.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
    // this.saveCustomerInfo= this.saveCustomerInfo.bind(this);
    this.onchange = this.onchange.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidMount() {
    let currentLocation = "";
    try {
      currentLocation = window.location.pathname ? window.location.pathname : "";
    } catch (err) {
      currentLocation = "";
    }
    if (!window) {
      return; // do not render this part while SSR
    }
    // review link from order history
    if (currentLocation.includes("order_id=")) {
      const {
        params: { orderID }
      } = this.props;
      // Get rid of the extra params from affiliate link
      const orderId = orderID.split("&")[0];
      this.props.dispatch(fetchReviewItems(orderId, null));
    }
    // review link from email
    else {
      const token = currentLocation
        ? currentLocation.substring(currentLocation.lastIndexOf(":") + 1)
        : null;
      this.props.dispatch(fetchReviewItems(null, token));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setReviewItems(null));
    this.props.dispatch(setReviewData(null));
  }

  // saveCustomerInfo(){
  //   const { reviewData }= this.props;
  //   const { Age, Gender, Nickname, Skin_type, Skin_concern, Style_type, Band_Size, Cup_Size, Panty_Size }= this.state;
  //   const data={
  //   	"customer_id": reviewData.customer.customer_id,
  //   	"survey_info" : {
  //   		"nickname": !Nickname?null:Nickname,
  //   		"gender": Gender=="Select"?null:Gender,
  //   		"age": Age=="Select"?null:Age,
  //   		"skinType": Skin_type=="Select"?null:Skin_type,
  //   		"skinConcern": Skin_concern=="Select"?null:Skin_concern,
  //   		"style": Style_type=="Select"?null:Style_type,
  //   		"band_size": Band_Size=="Select"?null:Band_Size,
  //   		"cup_size": Cup_Size=="Select"?null:Cup_Size,
  //   		"panty_size": Panty_Size=="Select"?null:Panty_Size
  //   	}
  //   }
  //   this.props.dispatch(postCustomerInfo(data,this.saveCustomerInfoResponse.bind(this)));
  // }

  onchange(value) {
    this.setState({
      Nickname: value
    });
  }

  saveCustomerInfoResponse(res) {
    if (res) {
      this.setState({
        showModal: false,
        showModal_already: true
      });
    }
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  changeOptions(type, val) {
    this.setState({
      [type]: val
    });
  }

  show() {
    this.setState({
      showModal: true
    });
  }

  render() {
    const { reviewItems, reviewData } = this.props;
    if (!reviewData) return null;
    const { order_id } = reviewData;
    const modalProps = {
      showModal: this.state.showModal && !this.state.showModal_already,
      onHide: this.close,
      size: "medium"
    };
    console.log("00000", SURVEY_LIST);
    const survey_list = [
      "Age",
      "Gender",
      "Nickname",
      "Skin_type",
      "Skin_concern",
      "Style_type",
      "Band_Size",
      "Cup_Size",
      "Panty_Size"
    ];

    // const age_list = ["under 18", "18-24", "25-34", "35-44", "45-54", "over 54"];

    return (
      <div className={styles.container}>
        <div>
          <div className={styles.reviewTitle}>Your Review</div>
          <div className={styles.orderNumber}>
            {" "}
Order Number:
            {order_id}
            {" "}

          </div>
        </div>
        <div>
          {reviewItems
            ? reviewItems.map(item => (
              <Row className={styles.reviewItem}>
                <ReviewCard
                  key={item.sku}
                  reviewData={reviewData}
                  item={item}
                  showModal={this.show}
                />
              </Row>
            ))
            : "Sorry, no orders found."}
        </div>
        <CustomModal {...modalProps}>
          <div className={styles.surveyContainer}>
            <div className={styles.surveyTitle}> About you </div>
            <div className={styles.surveyNote}>
              Your review will get more trusts if you tell more about yourself.
              {" "}
            </div>
            <div className={styles.surveyList}>
              {survey_list.map(item => (
                <div style={{ width: "100%" }}>
                  <div className={styles.surveyItem}>
                    {item.replace(/_/, " ")}
:
                    {" "}
                  </div>
                  <div className={styles.item}>
                    {item !== "Nickname" ? (
                      <DropdownButton
                        className={styles["menu-option"]}
                        bsStyle="link"
                        id="menu-by"
                        title={this.state[item] ? this.state[item] : "Mystical"}
                      >
                        {SURVEY_LIST[item].map(key => (
                          <MenuItem
                            value={key}
                            key={key}
                            onClick={() => this.changeOptions(item, key)}
                          >
                            {key}
                          </MenuItem>
                        ))}
                      </DropdownButton>
                    ) : (
                      <input
                        type="text"
                        className={styles.surveyInput}
                        value={this.state.Nickname}
                        onChange={e => this.onchange(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.surveyBTN} onClick={this.saveCustomerInfo}>
              SAVE
            </div>
          </div>
        </CustomModal>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    reviewItems: getReviewItems(store),
    reviewData: getReviewData(store),
    customer: getUserData(store)
  };
}

export default connect(mapStateToProps)(ReviewPage);
