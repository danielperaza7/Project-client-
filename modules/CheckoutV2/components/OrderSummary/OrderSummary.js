import React, { Component } from "react";
import { connect } from "react-redux";

import _ from "lodash";
import { Row, Col, Modal } from "react-bootstrap";
import MediaQuery from "react-responsive";
import CouponInput from "../CouponInput/CouponInput";
import ReferInput from "../ReferInput/ReferInput";

// getters
import {
  getPriceCalcResult,
  getCheckoutStep,
  getShippingMethodSelected,
  getCurrentShippingMethod,
  getShipExistID
} from "../../CheckoutReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import styles from "./OrderSummary.css";
import MembershipProgressBar from "../../../Category/components/MembershipProgressBar/MembershipProgressBar";
import { getClientMD, getUserData } from "../../../App/AppReducer";
import {
  MEMBERSHIP_NAME_LIST,
  MEMBERSHIP_NAME_PRICE_MAPPING,
  MEMBERSHIP_NAME_BENEFIT_MAPPING,
  MEMBERSHIP_LEVELUP_NAME_CONDITION_MAPPING,
  MEMBERSHIP_CODE_NAME_MAPPING
} from "../../../../config/Membership/membershipConfig";
import history from "../../../../history";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mpExpand: false,
      login: false,
      showDialogue: false
    };
    this.renderMembershipInfo = this.renderMembershipInfo.bind(this);
    this.renderPopupWindow = this.renderPopupWindow.bind(this);
  }

  componentDidMount() {
    if (
      this.props.userData
      && Object.keys(this.props.userData) !== 0
      && this.props.userData.group_id != 0
    ) {
      this.setState({ login: true });
    } else {
      this.setState({ login: false });
    }
  }

  componentDidUpdate(prevProps) {
    let login;
    let prevLogin;
    if (
      this.props.userData !== undefined
      && this.props.userData !== null
      && Object.keys(this.props.userData).length !== 0
      && this.props.userData.group_id != 0
    ) {
      login = true;
    } else {
      login = false;
    }
    if (
      prevProps.userData !== undefined
      && prevProps.userData !== null
      && Object.keys(prevProps.userData).length !== 0
      && prevProps.userData.group_id != 0
    ) {
      prevLogin = true;
    } else {
      prevLogin = false;
    }
    if (login !== prevLogin) {
      this.setState({ login });
    }
  }

  getIfHideTax() {
    const { inCart, checkoutStep } = this.props;
    return inCart || checkoutStep < 2;
  }

  getIfHideShippingFee() {
    const { inCart, checkoutStep } = this.props;
    return inCart || checkoutStep < 3;
  }

  renderOrderDetail(priceCalcResult, inCart) {
    // let item_number= priceCalcResult.value.products.length;

    const {
      tax,
      discount_amount,
      reward_point_usage,
      gift_card_usage,
      shipping,
      subtotal
    } = priceCalcResult.value;
    const { shippingMethod } = this.props;
    const { available_options } = shipping;
    const ind = _.findIndex(available_options, ["name", shippingMethod]);
    const shipping_price = ind !== -1
      ? available_options[ind].price == 0
        ? "FREE"
        : available_options[ind].price
      : "TBD";

    return (
      <div className={styles.orderSummaryDetail}>
        <Row className={styles["price-detail-bar"]}>
          <Col xs={8} style={{ fonSize: "12px", fontFamily: "GothamBook" }}>
            Merchandise
          </Col>
          <Col
            xs={4}
            className="text-right"
            style={{ fonSize: "12px", fontFamily: "GothamMedium" }}
          >
            {`$${subtotal}`}
          </Col>
        </Row>
        {discount_amount ? (
          <Row className={styles["price-detail-bar"]}>
            <Col xs={8} style={{ fonSize: "12px", fontFamily: "GothamMedium" }}>
              Discount
            </Col>
            <Col
              xs={4}
              className="text-right"
              style={{
                fonSize: "12px",
                fontFamily: "GothamMedium",
                color: "#4C9F67"
              }}
            >
              {`-$${discount_amount}`}
            </Col>
          </Row>
        ) : null}
        <Row className={styles["price-detail-bar"]}>
          <Col xs={8} style={{ fonSize: "12px", fontFamily: "GothamBook" }}>
            Shipping Method
          </Col>
          <Col
            xs={4}
            className="text-right"
            style={{ fonSize: "12px", fontFamily: "GothamMedium" }}
          >
            {this.getIfHideShippingFee()
              ? "TBD"
              : shipping_price !== "TBD" && shipping_price !== "FREE"
                ? `$${shipping_price}`
                : shipping_price}
          </Col>
        </Row>
        {!inCart && this.props.authentication && reward_point_usage ? (
          <Row className={styles["price-detail-bar"]}>
            <Col
              xs={8}
              style={{ fonSize: "12px", fontFamily: "GothamMedium" }}
            >
              {`Reward Points to Use (${reward_point_usage})`}
            </Col>
            <Col
              xs={4}
              className="text-right"
              style={{
                fonSize: "12px",
                fontFamily: "GothamMedium",
                color: "#4C9F67"
              }}
            >
              {`-$${reward_point_usage / 100}`}
            </Col>
          </Row>
        ) : null}
        <Row className={styles["price-detail-bar"]}>
          <Col xs={8} style={{ fonSize: "12px", fontFamily: "GothamBook" }}>
            Tax
          </Col>
          <Col
            xs={4}
            className="text-right"
            style={{ fonSize: "12px", fontFamily: "GothamMedium" }}
          >
            {this.getIfHideTax() ? "TBD" : `$${tax.tax}`}
          </Col>
        </Row>
        {!inCart && this.props.authentication && gift_card_usage ? (
          <Row className={styles["price-detail-bar"]}>
            <Col xs={8} style={{ fonSize: "12px", fontFamily: "GothamMedium" }}>
              Account Balance to Use
            </Col>
            <Col
              xs={4}
              className="text-right"
              style={{
                fonSize: "12px",
                fontFamily: "GothamMedium",
                color: "#4C9F67"
              }}
            >
              {`$${gift_card_usage / 100}`}
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }

  renderOrderSubtotal(priceCalcResult, inCart) {
    const { subtotal_after_discount, left_to_pay } = priceCalcResult.value;
    // let total_price= this.props.inCart||this.props.checkoutStep<=1?subtotal_after_discount:(!shipping_method?subtotal_after_discount_with_tax:grand_total);
    const total_price = this.getIfHideTax() ? subtotal_after_discount : left_to_pay;
    return (
      <div className={styles.OrderSubtotal}>
        <Row
          className={styles["price-detail-bar"]}
          style={{ fontFamily: "GothamMedium" }}
        >
          <Col xs={8} style={{ fontSize: "14px" }}>
            Order Subtotal
          </Col>
          <Col
            xs={4}
            className="text-right"
            style={{ fontSize: "18px", color: "#FC2674" }}
          >
            {`$${total_price}`}
          </Col>
        </Row>
        {inCart ? (
          <Row
            className={styles["price-detail-bar"]}
            style={{
              fontFamily: "GothamBook",
              fontSize: "10px",
              color: "#9B9B9B"
            }}
          >
            <Col xs={12} style={{ marginTop: "-5px", marginLeft: "2px" }}>
              {" "}
              Exact tax/payment will be calculated at checkout
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }

  renderPopupWindow(value, control) {
    return (
      <Modal
        show={this.state[control]}
        onHide={() => {
          this.setState({ [control]: false });
        }}
        dialogClassName={styles.membershipInfoDialog}
      >
        <div style={{ width: "98%" }}>{value}</div>
        <div
          className={styles.dialogCross}
          onClick={() => {
            this.setState({ [control]: false });
          }}
        >
          <i className="ion-android-close" />
        </div>
      </Modal>
    );
  }

  renderDialogue(value) {
    return (
      <div className={styles.modalContainer}>
        <Modal
          show={this.state.showDialogue}
          onHide={() => {
            this.setState({ showDialogue: false });
          }}
          dialogClassName={styles.dialog}
          restoreFocus={false}
        >
          <div className={styles.contentBox}>
            <div className={styles.cross}>
              <span
                onClick={() => {
                  this.setState({ showDialogue: false });
                }}
              >
                &times;
              </span>
            </div>
            <div className={styles.textBox}>
              <p className={styles.textDescription}>{value}</p>
            </div>
            <hr className={styles.hrInModal} />
            <div
              className={styles.buttonBox}
              onClick={() => {
                this.setState({ showDialogue: false });
              }}
            >
              OK, I got it!
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  renderMembershipInfo() {
    const membershipCode = this.props.userData ? this.props.userData.group_id : 0;
    const mp = this.props.userData && this.props.userData.MP_balance
      ? this.props.userData.MP_balance
      : 0;
    const membership = MEMBERSHIP_CODE_NAME_MAPPING[membershipCode];
    const nextMembership = MEMBERSHIP_NAME_LIST.indexOf(membership) === MEMBERSHIP_NAME_LIST.length - 1
      ? membership
      : MEMBERSHIP_NAME_LIST[MEMBERSHIP_NAME_LIST.indexOf(membership) + 1];
    const nextprice = MEMBERSHIP_NAME_PRICE_MAPPING[membership];
    const mpValue = MEMBERSHIP_LEVELUP_NAME_CONDITION_MAPPING[membership];
    const base64Pic = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSI4cHgiIHZpZXdCb3g9IjAgMCAxNSA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4xICg1NzUwMSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+UGF0aCAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkNhdGVnb3J5LWFuZC1EZXRhaWwtUGFnZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjE0NDAvcHJpY2UvbGlzdF9wYWdlLWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTguMDAwMDAwLCAtNzk1LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0yIiBwb2ludHM9IjY1OCA3OTUgNjY1LjE5MDQ3NiA4MDIuMiA2NzIuNSA3OTUiPjwvcG9seWxpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
    return this.state.login || this.props.authentication ? (
      <div className={styles.membershipInfoContainer}>
        {membershipCode < 10 ? (
          <div className={styles.field}>
            <MediaQuery
              minWidth={992}
              values={{ width: this.props.clientMD.fakeDeviceWidth }}
            >
              {`Progress to ${nextMembership.toUpperCase()}`}
              <img
                className={styles.question}
                src="https://storage.googleapis.com/evesetus/email/MyAccount/question.svg"
                alt="question"
                style={{ marginLeft: 10, marginTop: -3 }}
                onMouseEnter={() => {
                  this.setState({ mpExpand: true });
                }}
                onMouseLeave={() => {
                  this.setState({ mpExpand: false });
                }}
              />
              {this.state.mpExpand ? (
                <div className={styles.howToProgress}>
                  <div className={styles.triContainer}>
                    <div>
                      <img
                        style={{ transform: "rotate(180deg)" }}
                        src={base64Pic}
                        className={styles.menbershipInfoPanelTri}
                        alt="Tri"
                      />
                    </div>
                  </div>
                  {mpValue}
                </div>
              ) : null}
            </MediaQuery>

            <MediaQuery
              maxWidth={991}
              values={{ width: this.props.clientMD.fakeDeviceWidth }}
            >
              {`Progress to ${nextMembership.toUpperCase()}`}
              <img
                className={styles.question}
                src="https://storage.googleapis.com/evesetus/email/MyAccount/question.svg"
                alt="question"
                style={{ marginLeft: 10, marginTop: -3 }}
                onClick={() => {
                  this.setState({ mpExpand: !this.state.mpExpand });
                }}
              />
              {this.renderPopupWindow(mpValue, "mpExpand")}
            </MediaQuery>
          </div>
        ) : null}
        {membershipCode < 10 ? (
          <MembershipProgressBar son={mp} father={nextprice} />
        ) : null}
        <div className={styles.membershipRuleDetail}>
          <a href="/membershipRule">Membership Rule Details ></a>
        </div>
      </div>
    ) : (
      <div
        className={styles.membershipInfoContainer}
        style={{ paddingTop: 15, paddingBottom: 15 }}
      >
        <span>
          Join now and enjoy 10% off Eve's Temptation products for your first order!
        </span>
        <div style={{ display: "flex" }}>
          <div className={styles.membershipRuleDetail}>
            <a href="/membershipRule">Membership Rule Details ></a>
          </div>
          <div
            className={styles.membershipRuleDetail}
            style={{
              display: "inline-Block",
              marginRight: 0,
              marginLeft: "auto"
            }}
            onClick={() => {
              history.push("/signup");
            }}
          >
            Become a member >
          </div>
        </div>
      </div>
    );
  }

  render() {
    // cartIsEmpty is from cart page, default to false which means it has products
    const {
      inCart, btnAction, ableToCheckOut, cartIsEmpty = false
    } = this.props;
    // init an empty priceCalcResult
    let priceCalcResult = {
      value: {
        tax: { tax: 0 },
        discount_amount: 0,
        reward_point_usage: 0,
        gift_card_usage: 0,
        subtotal: 0,
        shipping: { available_options: [] },
        subtotal_after_discount: 0,
        left_to_pay: 0
      }
    };
    // Pass the priceCalcResult if we do have one
    if (this.props.priceCalcResult) {
      priceCalcResult = this.props.priceCalcResult;
    }
    return (
      <div className={styles.orderSummary}>
        <div className={styles.title}>ORDER SUMMARY</div>
        {this.renderOrderDetail(priceCalcResult, inCart)}
        {this.renderOrderSubtotal(priceCalcResult, inCart)}
        <div className={styles.couponInput}>
          <CouponInput />
          <ReferInput hidden={inCart} />
        </div>
        <div>
          {this.renderMembershipInfo()}
          <button
            className={styles.checkoutBTN}
            onClick={() => {
              btnAction();
              if (inCart) {
                this.setState({ showDialogue: !this.state.showDialogue });
              }
            }}
            disabled={
              inCart
                ? cartIsEmpty
                : this.props.checkoutStep < 3 || !this.props.shippingMethod_Selected
            }
          >
            {inCart ? "PROCEED TO CHECKOUT" : "PLACE ORDER"}
          </button>
          {/*
              {ableToCheckOut !== null ? (
                <div
                  style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}
                >
                  {ableToCheckOut}
                </div>
              ) : null}
             */}
          {/*
           */}
          {ableToCheckOut !== null ? this.renderDialogue(ableToCheckOut) : null}
        </div>
        <div className={styles.securePayment}>
          <i className={`ion-ios-locked ${styles["ion-ios-locked"]}`} />
          {" "}
Secure Payment
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    priceCalcResult: getPriceCalcResult(store),
    checkoutStep: getCheckoutStep(store),
    authentication: getAuthStatus(store),
    shippingMethod_Selected: getShippingMethodSelected(store),
    shippingMethod: getCurrentShippingMethod(store),
    shipExistID: getShipExistID(store),
    clientMD: getClientMD(store),
    userData: getUserData(store)
  };
}
export default connect(mapStateToProps)(OrderSummary);
