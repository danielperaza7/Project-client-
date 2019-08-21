import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import styles from "./CheckoutSuccessPage.css";
import SignupForm from "../../../Authentication/components/SignupForm/SignupForm";
// import { setSignupForm } from "../../CheckoutActions.js";
import history from "../../../../history";
import { resetCheckoutState } from "../../CheckoutActions";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import CustomModal from "../../../../components/Modal/CustomModal";

import {
  getOrderSuccessData,
  getOrderEmail,
  getCurrentShippingAddress
} from "../../CheckoutReducer";
import { getUserData } from "../../../App/AppReducer";

class CheckoutSuccessPage extends Component {
  constructor(props) {
    super(props);
    const { orderEmail, shippingAddress, orderSuccessData } = this.props;
    // console.log(orderSuccessData.customer.tags);
    this.state = {
      form_show: true,
      notEnoughGiftcard:
        this.props.orderSuccessData && this.props.orderSuccessData.notEnoughGiftcard,
      email: orderEmail,
      first_name: shippingAddress ? shippingAddress.firstname : "",
      last_name: shippingAddress ? shippingAddress.lastname : "",
      upgrade: false,
      login: false,
      fiveDollarCoupon: _.get(orderSuccessData, "customer.tags.length", 0) > 0
    };
  }

  componentDidMount() {
    // const { orderEmail, shippingAddress } = this.props;
    // this.refs.signUp.changeDefaultValue(shippingAddress.firstname, shippingAddress.lastname, orderEmail);
    const { orderSuccessData } = this.props;
    if (
      orderSuccessData
      && orderSuccessData.customer
      && orderSuccessData.customer.MP_snapshot
      && orderSuccessData.customer.MP_snapshot
      && orderSuccessData.customer.MP_snapshot.length === 2
      && orderSuccessData.customer.MP_snapshot[0]
        !== orderSuccessData.customer.MP_snapshot[1]
    ) {
      window.setTimeout(() => {
        this.setState({ upgrade: true });
      }, 2000);
    }
    if (
      this.props.userData
      && Object.keys(this.props.userData) !== 0
      && this.props.userData.group_id !== 0
    ) {
      this.setState({ login: true });
    } else {
      this.setState({ login: false });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetCheckoutState());
  }

  // componentWillMount(){
  //   if(this.props.userInfo){
  //     if(!this.props.userInfo.email) this.setState({form_show: false});
  //     this.setState({
  //       first_name: this.props.userInfo.first_name,
  //       order_number:this.props.userInfo.order_number,
  //       last_name:this.props.userInfo.last_name,
  //       email:this.props.userInfo.email
  //     });
  //     let initialData = {
  //           first_name: this.props.userInfo.first_name,
  //           last_name: this.props.userInfo.last_name,
  //           email: this.props.userInfo.email
  //         }
  //     this.props.dispatch(setSignupForm(initialData));
  //   }
  //
  //   else{
  //     history.push('/');
  //   }
  // }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert alert-danger">{this.props.errorMessage}</div>;
    }

    return null;
  }

  renderThankyouSection() {
    const { order_success_info } = this.props.orderSuccessData
      ? this.props.orderSuccessData
      : this.props;
    return (
      <div className={!this.props.authStatus ? styles.orderShow : styles.orderShow_auth}>
        <div className={styles.successtitle}>
          <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
          <div className={styles.header1}>Your order has been successfully placed.</div>
        </div>
        <div className={styles.info_row}>
          <div className={styles.info_columns}>
            <p style={{ color: "grey" }}>An email confirmation will be sent to: </p>
            <p>{this.props.orderEmail ? this.props.orderEmail : ""}</p>
          </div>
          <div className={styles.info_columns}>
            <p style={{ color: "grey" }}>Your order number: </p>
            <p>{order_success_info ? order_success_info.order_number : ""}</p>
          </div>
        </div>

        {/* maybe problem here */}
        {!this.props.authStatus && !order_success_info.discount ? null : (
          <div className={styles.saving_info}>
            <ul className={styles.liststyle}>
              {this.props.authStatus ? (
                <Fragment>
                  {order_success_info.gift_card_amount ? (
                    <li>
                      <i
                        className="ion-android-done"
                        style={{ color: "green", margin: "10px 10px 0 0" }}
                      />
                      <span>
                        {"You've "}
                        <span style={{ fontWeight: 700 }}>
                          {`earned $${
                            order_success_info && order_success_info.gift_card_amount
                              ? order_success_info.gift_card_amount
                              : "0"
                          } Gift Card`}
                        </span>
                        {" with this order!"}
                      </span>
                    </li>
                  ) : null}
                </Fragment>
              ) : null}
              {order_success_info && order_success_info.discount ? (
                <li>
                  <i
                    className="ion-android-done"
                    style={{ color: "green", margin: "10px 10px 0 0" }}
                  />
                  <span>
                    {"You've "}
                    <span style={{ fontWeight: 700 }}>
                      {`saved $${order_success_info.discount}`}
                    </span>
                    {" with this order!"}
                  </span>
                </li>
              ) : null}
              {this.props.authStatus ? (
                <li>
                  <i
                    className="ion-android-done"
                    style={{ color: "green", margin: "10px 10px 0 0" }}
                  />
                  <span>
                    {"You've "}
                    <span style={{ fontWeight: 700 }}>
                      {`earned ${
                        order_success_info && order_success_info.reward_points_earn
                          ? order_success_info.reward_points_earn
                          : "0"
                      } Reward Points`}
                    </span>
                    {" with this order!"}
                  </span>
                </li>
              ) : null}

              {/* maybe problem here */}
              {order_success_info && order_success_info.MP_total ? (
                <li>
                  <i
                    className="ion-android-done"
                    style={{ color: "green", margin: "10px 10px 0 0" }}
                  />
                  <span>
                    {"You've "}
                    <span style={{ fontWeight: 700 }}>
                      {`earned ${
                        order_success_info && order_success_info.MP_total
                          ? order_success_info.MP_total
                          : "0"
                      } Membership Stars`}
                    </span>
                    {" with this order!"}
                  </span>
                </li>
              ) : null}
              <li>
                <div className={styles.seeMemebershipProgress}>
                  <a href="/account/dashboard">
                    {this.state.login ? "Check Membership Stars" : ""}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  renderConnectingWechatSection() {
    return (
      <div>
        <div className={styles.connectingText}>
          Stay connected with us on
          {" "}
          <strong>Wechat</strong>
          {" "}
or
          {" "}
          <strong>Instagram</strong>
          {" "}
          for your chance to enter our
          {" "}
          <strong>monthly giveaways</strong>
          {" "}
valued up to
          {" "}
          <strong>$200</strong>
. Giveaway prizes may include lingerie, beauty, skincare
          and more!
        </div>
        <div className={styles.connectingInfo}>
          <img
            alt=""
            className={styles.wechatIcon}
            src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/WeChat-Grey%402x.png"
          />
          <p style={{ width: "110px", color: "grey" }}>ID: EVEBYEVES</p>
          <img
            alt=""
            className={styles.wechatIcon}
            src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/IG-Grey%402x.png"
          />
          <p style={{ width: "145px", color: "grey" }}>@evestemptationus</p>
        </div>
      </div>
    );
  }

  renderNextStepSection() {
    return (
      <div className={styles.next_section}>
        <ul className={styles.liststyle2}>
          <li style={{ fontSize: "15px" }}>What do you want to do next? </li>
          {this.props.authStatus ? (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/account/dashboard/order_history")}
            >
              <img
                src="https://storage.googleapis.com/evesetus/email/MyAccount/yourorders_b.svg"
                className={styles.navPic}
                alt="View your order details pic"
              />
              View your order details
            </li>
          ) : null}
          {this.props.authStatus ? (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/account/dashboard")}
            >
              <img
                src="https://storage.googleapis.com/evesetus/email/Component/youraccount.svg"
                className={styles.navPic}
                alt="View your order details pic"
              />
              Go to your account
            </li>
          ) : null}
          <li
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/page/return")}
          >
            <img
              src="https://storage.googleapis.com/evesetus/email/Component/returnpolicy.svg"
              className={styles.navPic}
              alt="View your order details pic"
            />
            View Return Policy
          </li>
          <li style={{ cursor: "pointer" }} onClick={() => history.push("/et")}>
            <img
              src="https://storage.googleapis.com/evesetus/email/Component/homepage.svg"
              className={styles.navPic}
              alt="View your order details pic"
            />
            Go to Homepage
          </li>
        </ul>
      </div>
    );
  }

  renderGiftCodeSection() {
    return (
      <div className={styles.followingDetails}>
        <div className={styles.bigTitle}>
          Follow us for a $5 gift code for your next purchase
        </div>
        <div className={styles.followDetailsContainer}>
          <div className={styles.wechatProcessContainer}>
            <div className={styles.icon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/WeChat-Icon-Big%402x.png"
                className={styles.iconStyles}
                alt="wechatImg"
              />
            </div>
            <div className={styles.processContainer}>
              <div className={styles.mediaTitle}>Follow our official WeChat account:</div>
              <div className={styles.stepsText}>
                <div className={styles.orderList}>
                  <div>
                    <strong>1.</strong>&nbsp;
                  </div>
                  <div>Open the WeChat App</div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>2.</strong>&nbsp;
                  </div>
                  <div>
                    <strong>Scan the QR code</strong>
                    {" "}
or enter our official account ID
                    {" "}
                    <strong>@EVEBYEVES</strong>
                    {" "}
in the search bar
                  </div>
                </div>
              </div>
              <div className={styles.icon}>
                <img
                  alt=""
                  className={styles.qrcode}
                  src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/QR-Code%402x.png"
                />
              </div>
              <div className={styles.stepsText}>
                <div className={styles.orderList}>
                  <div>
                    <strong>3.</strong>&nbsp;
                  </div>
                  <div>
                    Follow our official account and reply
                    {" "}
                    <strong>"EBE"</strong>
                  </div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>4.</strong>&nbsp;
                  </div>
                  <div> An exclusive gift code will automatically be given when done</div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>5.</strong>&nbsp;
                  </div>
                  <div>Enter the code at our checkout page to get $5 off</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.instagramProcessContainer}>
            <div className={styles.icon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/IG-Icon-Big%402x.png"
                className={styles.iconStyles}
                alt="instagramImg"
              />
            </div>
            <div className={styles.processContainer}>
              <div className={styles.mediaTitle}>Follow our Instagram:</div>
              <div className={styles.stepsText}>
                <div className={styles.orderList}>
                  <div>
                    <strong>1.</strong>&nbsp;&nbsp;
                  </div>
                  <div>
                    Follow us on Instagram
                    {" "}
                    <strong>@evestemptationus</strong>
                  </div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>2.</strong>&nbsp;
                  </div>
                  <div>
                    Take a screenshot and email to
                    {" "}
                    <strong>social@evestemptation.com</strong>
                  </div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>3.</strong>&nbsp;
                  </div>
                  <div>An exclusive gift code will be given when done</div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>4.</strong>&nbsp;
                  </div>
                  <div>Enter the code at our checkout page to get $5 off</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderShareGiftCardSection() {
    return (
      <div className={styles.shareGiftCard}>
        <div className={styles.shareTitle}>Share on social media & earn up to $10</div>
        <div className={styles.shareGiftCardContainer}>
          <div className={styles.shareListContainer}>
            <div className={styles.dollaricon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/$5.png"
                className={styles.dollarIcon}
                alt="$5"
              />
            </div>
            <div className={styles.shareText}>
              <div>
                Share your finds with us on Facebook, Instagram, Twitter, Weibo or Wechat,
                using #evebyeves or #evestemptation and we’ll send you a $5 gift card.
              </div>
            </div>
          </div>
          <div className={styles.shareListContainer}>
            <div className={styles.dollaricon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/$10.png"
                className={styles.dollarIcon}
                alt="$10"
              />
            </div>
            <div className={styles.shareText}>
              <div>Tag additional 3 friends and we’ll send you a $10 gift card.</div>
            </div>
          </div>
          <div className={styles.shareListContainer}>
            <div className={styles.dollaricon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/email.png"
                className={styles.dollarIcon}
                alt="email"
              />
            </div>
            <div className={styles.shareText}>
              <div>
                DM us @evebyeves on Instagram, Facebook or Twitter, or send your
                screenshot to socialshare@evestemptation.com. We can’t wait to hear from
                you!
              </div>
            </div>
          </div>
          <div className={styles.shareListContainer}>
            <div className={styles.limitText}>
              <div>
                *Limit 1 gift code per month. Eve by Eve's reserves the right to change
                these Terms and Conditions of Use.
              </div>
            </div>
          </div>
          <div className={styles.linkIconList}>
            <span className={styles.linkIcon}>
              <a href="http://instagram.com/evebyeves">
                <img
                  src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/Ins_GreyBg.png"
                  alt="Instagram"
                />
              </a>
            </span>
            <span className={styles.linkIcon}>
              <a href="https://www.facebook.com/evebyeves">
                <img
                  src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/Fb_GreyBg.png"
                  alt="Facebook"
                />
              </a>
            </span>
            <span className={styles.linkIcon}>
              <a href="https://twitter.com/evebyeves">
                <img
                  src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/Twitter_GreyBg.png"
                  alt="Twitter"
                />
              </a>
            </span>
            <span className={styles.linkIcon}>
              <a href="https://www.weibo.com/evebyeves">
                <img
                  src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/Weibo_GreyBg.png"
                  alt="Weibo"
                />
              </a>
            </span>
            <span className={styles.linkIcon}>
              <a href="https://www.evestemptation.com/followingUsDetails">
                <img
                  src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/Wechat_GreyBg.png"
                  alt="Wechat"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // renderExplanation(){
  //   return (
  //     <div className={styles.right}>
  //       <div className={styles.title}> Become our member, you can:</div>
  //       <ol>
  //         <li>Create an account and <span className={styles.list}>earn 100 REWARD POINTS</span>.</li>
  //         <li>Earn 1 REWARD POINT on every $1 you spend.</li>
  //         <li>Track your orders</li>
  //         <li>View Order History</li>
  //         <li>Use Wishlist</li>
  //         <li>Quick checkout with your saved shipping and billing information in the future.</li>
  //       </ol>
  //     </div>
  //   )
  // }

  renderRegistSection() {
    return (
      <div className={styles.signUp}>
        <p
          style={{
            fontSize: "14px",
            fontFamily: "GothamBook",
            margin: "0 0 0 0",
            fontWeight: "bold"
          }}
        >
          Save your information for next time
        </p>
        <p style={{ fontSize: "12px", fontFamily: "GothamBook", marginTop: "0" }}>
          Create an account and start earning Reward Points!
        </p>
        <SignupForm
          checkoutSuccessMode
          autoFilledEmail={this.state.email}
          autoFilledFirstName={this.state.first_name}
          autoFilledLastName={this.state.last_name}
        />
      </div>
    );
  }

  renderPopupWindow() {
    const expireTime = this.props.orderSuccessData
      && this.props.orderSuccessData.customer
      && this.props.orderSuccessData.customer.MP_valid_time_range
      ? this.props.orderSuccessData.customer.MP_valid_time_range[1]
      : null;
    const et = new Date(expireTime);
    const expireDate = `${(
      et.getMonth() + 1
    ).toString()}/${et.getDate().toString()}/${et.getFullYear()}`;

    return this.props.orderSuccessData
      && this.props.orderSuccessData.customer.MP_level
      && this.props.orderSuccessData.customer.MP_valid_time_range
      && this.props.orderSuccessData.customer.group_id ? (
        <Modal
          show={this.state.upgrade}
          onHide={() => {
            this.setState({ upgrade: false });
          }}
          dialogClassName={styles.upgradePopupWindow}
        >
          <div style={{ width: "98%" }}>
            <p>
              <strong>Congratulations!</strong>
            </p>
            <p>
            You are now a
              {" "}
              {this.props.orderSuccessData.customer.MP_level}
              {" "}
Star Member!
            Your benefits include current website promotion and an extra
              {" "}
              {this.props.orderSuccessData.customer.group_id === 2 ? "5%" : "12%"}
              {" "}
off Eve’s
            Temptation full-price products for every order. Membership valid through
              {" "}
              {expireDate}
.
            </p>
          </div>
          <div
            className={styles.dialogCross}
            onClick={() => {
              this.setState({ upgrade: false });
            }}
          >
            <i className="ion-android-close" />
          </div>
        </Modal>
      ) : null;
  }

  render() {
    const { orderSuccessData } = this.props;
    if (!orderSuccessData) return null;
    const { notEnoughGiftcard } = orderSuccessData;

    const modalProps = {
      size: "medium",
      showModal: this.state.notEnoughGiftcard,
      onHide: () => {
        this.setState({ notEnoughGiftcard: false });
      },
      padding: "20px"
    };

    const ColSettings = {
      left: {
        xl: 9, lg: 8, md: 8, sm: 12, xs: 12
      },
      right: {
        xl: 3, lg: 4, md: 4, sm: 12, xs: 12
      }
    };

    return (
      <div className="container">
        <Helmet title="Order Success" />
        {this.renderPopupWindow()}
        <Row className={styles.success_section}>
          <Col {...ColSettings.left}>
            {this.renderThankyouSection()}
            {!this.props.authStatus ? this.renderRegistSection() : null}
            {this.renderConnectingWechatSection()}
          </Col>
          <Col {...ColSettings.right}>{this.renderNextStepSection()}</Col>
        </Row>
        <Row>
          <Col {...ColSettings.left}>
            {/* if user used $5 coupon, show another event (share to get gift card) */}
            {this.state.fiveDollarCoupon === true
              ? this.renderShareGiftCardSection()
              : this.renderGiftCodeSection()}
          </Col>
        </Row>
        {notEnoughGiftcard ? (
          <CustomModal {...modalProps}>
            Your e-Gift Cards will be sent to your email in 3 business days.
          </CustomModal>
        ) : null}
      </div>
    );
  }
}

// function validate(values){
//     // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
//     const errors = {};
//     let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
//
//     // Validate the inputs from 'values'
//     if (!values.firstname) {
//       errors.firstname = "Please enter a firstname";
//     }
//     if (!values.lastname) {
//       errors.lastname = 'Please enter a lastname';
//     }
//     if (!values.password) {
//       errors.password = "Please enter a password";
//     }
//     if (!values.confirm) {
//       errors.confirm = "Please confirm your password";
//     }
//     if (!(values.confirm===values.password)) {
//       errors.password = "Please input the same password";
//     }
//     if(!myreg.test(values.email)) {
//       if (!values.email) {
//         errors.email = "Please enter an email";
//       }
//       else errors.email = "Please input a valid email address";
//     }
//     // If errors is empty, the form is fine to submit
//     // If errors has *any* properties, redux form assumes form is invalid
//     return errors;
// }

function mapStateToProps(store) {
  return {
    orderSuccessData: getOrderSuccessData(store),
    authStatus: getAuthStatus(store),
    shippingAddress: getCurrentShippingAddress(store),
    orderEmail: getOrderEmail(store),
    userData: getUserData(store)
  };
}

export default connect(mapStateToProps)(CheckoutSuccessPage);
