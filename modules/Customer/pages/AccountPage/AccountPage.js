/*
  account page
*/
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import _ from "lodash";
// import { Cookies } from "react-cookie";
import Helmet from "react-helmet";
import MediaQuery from "react-responsive";
import history from "../../../../history";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import {
  getUserData, getClientMD, getCollapseHeader, getUserPayments
} from "../../../App/AppReducer";
import { getPaymentMethod } from "../../../CheckoutV2/CheckoutReducer";
import styles from "./AccountPage.css";
import {
  MEMBERSHIP_NAME_LIST,
  MEMBERSHIP_NAME_PRICE_MAPPING,
  MEMBERSHIP_NAME_BENEFIT_MAPPING,
  MEMBERSHIP_LEVELUP_NAME_CONDITION_MAPPING,
  MEMBERSHIP_CODE_NAME_MAPPING,
  HOW_TO_EARN_REWARD_POINTS
} from "../../../../config/Membership/membershipConfig";
import MembershipProgressBar from "../../../Category/components/MembershipProgressBar/MembershipProgressBar";
import {
  setAccountInformationTab,
  setSubscription,
  setAddressBookTab,
  setPaymentMethod,
  setRewardPoints,
  fetchOrderHistory
} from "../../CustomerActions";
import StickySideBar from "../../components/StickySideBar/StickySideBar";
import StickySideBarMobile from "../../components/StickySideBar/StickySideBarMobile";
import TabContentContainer from "../../components/TabContentContainer/TabContentContainer";
import { CUSTOMER_LIST_ITEMS } from "../../../../config/Customer/customerConfig";

class AccountPage extends React.PureComponent {
  static contextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      curTab: "order_history",
      mpExpand: false,
      rpExpand: false,
      membershipInfo_mobile: false
    };
    this.backgroundColorMapping = {
      0: "#f8f6f0",
      1: "#f8f6f0",
      2: "#f7fcff",
      3: "#fffcf5",
      10: "#E3F7EB",
      11: "#E3F7EB"
    };
    this.membershipCode = 0;
    this.mp = 0;
    this.expireDay = "01/00";
    this.membership = "";
    this.nextMembership = "";
    this.nextprice = 0;
    this.renderAvatar = this.renderAvatar.bind(this);
    this.renderBasicInfo = this.renderBasicInfo.bind(this);
    this.renderMembershipInfo = this.renderMembershipInfo.bind(this);
    this.renderMembershipBenefit = this.renderMembershipBenefit.bind(this);
    this.renderMembershipInfoBox_mobile = this.renderMembershipInfoBox_mobile.bind(this);
    this.renderPopupWindow = this.renderPopupWindow.bind(this);
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) history.push("/account/dashboard/");

    if (this.props.match.params.subId) {
      this.setState({ curTab: this.props.match.params.subId });
    }
    // initilize redux forms // FERV2 should move some of these in to individual components due to their unmounting issue
    if (this.props.customer) {
      const responseData = this.props.customer;
      // set account information tab, address book tab, payment methods tab, reward point
      this.props.dispatch(setAccountInformationTab(responseData));
      this.props.dispatch(setSubscription(responseData));

      // set the address book tab data
      this.props.dispatch(setAddressBookTab(responseData));

      // set the order history data
      const { email } = responseData;
      this.props.dispatch(fetchOrderHistory(email)); // FERV2

      // set the payment methods data
      this.props.dispatch(setPaymentMethod(responseData.payments));

      // set the reward point data
      const { reward_points } = responseData;
      this.props.dispatch(setRewardPoints(reward_points));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated === false) history.push("/signin");

    // initilize redux forms // FERV2 should move some of these in to individual components due to their unmounting issue
    if (nextProps.customer) {
      const responseData = nextProps.customer;
      if (nextProps.match.params.subId !== this.props.match.params.subId) {
        if (this.state.curTab !== nextProps.match.params.subId) {
          this.setState({ curTab: nextProps.match.params.subId });
        }
      }
      // // set account information tab, address book tab, payment methods tab, reward point
      // nextProps.dispatch(setAccountInformationTab(responseData));
      // nextProps.dispatch(setSubscription(responseData));
      //
      // // set the address book tab data
      // nextProps.dispatch(setAddressBookTab(responseData));
      //
      // // set the order history data
      // // let {email} = responseData;
      // // nextProps.dispatch(fetchOrderHistory(email)); // FERV2
      //
      // // set the payment methods data
      if (!_.isEqual(nextProps.paymentMethod, responseData.payments)) {
        nextProps.dispatch(setPaymentMethod(responseData.payments));
      }
      //
      // // set the reward point data
      // let {reward_points} = responseData;
      // nextProps.dispatch(setRewardPoints(reward_points));
    }
  }

  // componentDidMount() {
  //    let cookie = new Cookies();
  //    if(cookie){
  //      this.props.dispatch(fetchAccountInfo());
  //    }
  // }

  renderAvatar() {
    return (
      <div className={styles.avatarBox}>
        <div className={styles.avatar}>
          {this.props.customer
          && this.props.customer.firstname
          && this.props.customer.lastname ? (
            <div className={styles.nameAbbreviation}>
              <span>
                {this.props.customer.firstname.substr(0, 1).toUpperCase()
                  + this.props.customer.lastname.substr(0, 1).toUpperCase()}
              </span>
            </div>
            ) : null}
        </div>
        <div className={styles.kawaiCamera}>
          <img
            src="https://storage.googleapis.com/evesetus/email/MyAccount/kawaicamera.svg"
            alt="Kawai Camera Pic"
            style={{ marginLeft: 3, marginTop: 2 }}
          />
        </div>
      </div>
    );
  }

  renderBasicInfo() {
    const firstName = this.props.customer && this.props.customer.firstname
      ? this.props.customer.firstname.substr(0, 1).toUpperCase()
          + this.props.customer.firstname.substr(1)
      : "";
    const lastName = this.props.customer && this.props.customer.lastname
      ? this.props.customer.lastname.substr(0, 1).toUpperCase()
          + this.props.customer.lastname.substr(1)
      : "";
    const rpValue = HOW_TO_EARN_REWARD_POINTS;
    return this.props.customer ? (
      <div className={styles.basicInfoBox}>
        <MediaQuery
          minWidth={992}
          values={{ width: this.props.clientMD.fakeDeviceWidth }}
        >
          {this.renderAvatar()}
        </MediaQuery>
        <div style={{ alignSelf: "center" }}>
          <div className={styles.userName}>
            <strong>{`Hi, ${firstName} ${lastName}`}</strong>
          </div>
          <div className={styles.field}>
            {"Account Balance"}
            <strong style={{ marginLeft: 15 }}>
              $
              {this.props.customer.account_balance
                ? (this.props.customer.account_balance / 100).toString()
                : "0"}
            </strong>
          </div>
          <div className={styles.field}>
            {"Reward Points"}
            <img
              className={styles.question}
              src="https://storage.googleapis.com/evesetus/email/MyAccount/question.svg"
              alt="membershipMedal"
              style={{ marginLeft: 3, marginTop: -3 }}
              onClick={() => {
                this.setState({ rpExpand: !this.state.rpExpand });
              }}
            />
            {this.state.rpExpand ? this.renderPopupWindow(rpValue, "rpExpand") : null}
            <strong style={{ marginLeft: 15 }}>
              {this.props.customer.reward_points
                ? this.props.customer.reward_points.toString()
                : "0"}
            </strong>
            {/* entrance for RPRP */}
            <span className={styles.membershipRuleDetail}>
              <a href="/page/reward-points-redeem"> Redeem ></a>
            </span>
          </div>
        </div>
      </div>
    ) : null;
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
        <div style={{ width: "98%" }}>
          {typeof value !== "object"
            ? value
            : Object.keys(value).map((key, ind) => (
              <p key={`p_${ind}`}>
                <strong>{key}</strong>
                <br />
                {value[key]}
              </p>
            ))}
        </div>
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

  renderMembershipInfo() {
    const mpValue = MEMBERSHIP_LEVELUP_NAME_CONDITION_MAPPING[this.membership];
    const base64Pic = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSI4cHgiIHZpZXdCb3g9IjAgMCAxNSA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4xICg1NzUwMSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+UGF0aCAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkNhdGVnb3J5LWFuZC1EZXRhaWwtUGFnZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjE0NDAvcHJpY2UvbGlzdF9wYWdlLWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTguMDAwMDAwLCAtNzk1LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0yIiBwb2ludHM9IjY1OCA3OTUgNjY1LjE5MDQ3NiA4MDIuMiA2NzIuNSA3OTUiPjwvcG9seWxpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
    return this.props.customer ? (
      <div className={styles.membershipDetailInfoBox}>
        {this.membershipCode < 10 ? (
          <div className={styles.membershipMedal}>
            <img
              src={`https://storage.googleapis.com/evesetus/email/MyAccount/medal-${this.membership.toLowerCase()}.svg`}
              alt="membershipMedal"
            />
          </div>
        ) : null}
        <div className={styles.membershipDetailInfoBar}>
          <div className={styles.membershipName}>
            {`${this.membership} Member`}
            {this.membershipCode < 10 ? (
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 10,
                  fontFamily: "GothamBook"
                }}
              >
                {`Since ${this.expireDay}`}
              </span>
            ) : null}
          </div>

          {this.membershipCode < 10 ? (
            <div>
              <div className={styles.field}>
                <MediaQuery
                  minWidth={992}
                  values={{ width: this.props.clientMD.fakeDeviceWidth }}
                >
                  {`Progress to ${
                    this.membership === this.nextMembership ? "next " : ""
                  }${this.nextMembership.toUpperCase()}`}
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
                  {`Progress to ${this.nextMembership.toUpperCase()}`}
                  <img
                    className={styles.question}
                    src="https://storage.googleapis.com/evesetus/email/MyAccount/question.svg"
                    alt="question"
                    style={{ marginLeft: 10, marginTop: -3 }}
                    onClick={() => {
                      this.setState({ mpExpand: !this.state.mpExpand });
                    }}
                  />
                  {this.state.mpExpand
                    ? this.renderPopupWindow(mpValue, "mpExpand")
                    : null}
                </MediaQuery>
              </div>
              <div style={{ width: "100%" }}>
                <MembershipProgressBar son={this.mp} father={this.nextprice} />
              </div>
            </div>
          ) : this.membershipCode > 10 ? (
            <img
              className={styles.question}
              src={`https://storage.googleapis.com/evesetus/email/MyAccount/${MEMBERSHIP_CODE_NAME_MAPPING[
                this.membershipCode
              ].toLowerCase()}.png`}
              alt="logo"
              style={{ marginTop: 10 }}
            />
          ) : null}
          <div className={styles.membershipRuleDetail}>
            <a href="/membershipRule">Membership Rule Details ></a>
          </div>
        </div>
      </div>
    ) : null;
  }

  renderMembershipBenefit() {
    return this.props.customer ? (
      <div className={styles.membershipBenefitBox}>
        Your Benefits Highlights
        <div className={styles.membershipBenefitContentBox}>
          {MEMBERSHIP_NAME_BENEFIT_MAPPING[this.membership]
            ? MEMBERSHIP_NAME_BENEFIT_MAPPING[this.membership].map((ben, ind) => {
              // The box has a third line
              if (ben.is_et_products === true) {
                return (
                  <div
                    className={[
                      styles.singleBenefit,
                      styles.singleBenefitThreeLine
                    ].join(" ")}
                    key={`benefit${ind.toString()}`}
                  >
                    <div
                      className={styles.singleBenefitContent}
                      key={`benefitContent${ind.toString()}`}
                    >
                      <div
                        className={[
                          styles.singleBenefitTitle,
                          styles.singleBenefitValueFirstLine
                        ].join(" ")}
                        key={`benefitTitle${ind.toString()}`}
                      >
                        {ben.title.toLowerCase()}
                      </div>
                      <div
                        className={[
                          styles.singleBenefitValue,
                          styles.singleBenefitValueSecondLine
                        ].join(" ")}
                        key={`benefitValue${ind.toString()}`}
                      >
                        {ben.value}
                      </div>
                      <div
                        className={[
                          styles.singleBenefitTitle,
                          styles.singleBenefitValueThirdLine
                        ].join(" ")}
                        key={`benefitProducts${ind.toString()}`}
                      >
                          Eve's Temptation full-price products
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div className={styles.singleBenefit} key={`benefit${ind.toString()}`}>
                  <div
                    className={styles.singleBenefitContent}
                    key={`benefitContent${ind.toString()}`}
                  >
                    <div
                      className={styles.singleBenefitTitle}
                      key={`benefitTitle${ind.toString()}`}
                    >
                      {ben.title.toLowerCase()}
                    </div>
                    <div
                      className={styles.singleBenefitValue}
                      key={`benefitValue${ind.toString()}`}
                    >
                      {ben.value}
                    </div>
                  </div>
                </div>
              );
            })
            : null}
        </div>
      </div>
    ) : null;
  }

  renderMembershipInfoBox_mobile() {
    return (
      <div className={styles.membershipInfoBox_mobile}>
        {this.renderMembershipInfo()}
        {this.renderMembershipBenefit()}
      </div>
    );
  }

  render() {
    this.membershipCode = this.props.customer ? this.props.customer.group_id : 0;
    this.mp = this.props.customer && this.props.customer.MP_balance
      ? this.props.customer.MP_balance
      : 0;
    const ed = this.props.customer
      && this.props.customer.MP_valid_time_range
      && this.props.customer.MP_valid_time_range.length == 2
      ? this.props.customer.MP_valid_time_range[0]
      : "1900-01-01T00:00:00.000Z";
    const date = new Date(ed);
    this.expireDay = `${(date.getMonth() + 1).toString()}/${date
      .getFullYear()
      .toString()
      .substr(2, 4)}`;
    // recieve data from data pipeline here

    this.membership = MEMBERSHIP_CODE_NAME_MAPPING[this.membershipCode];
    this.nextMembership = MEMBERSHIP_NAME_LIST.indexOf(this.membership) === MEMBERSHIP_NAME_LIST.length - 1
      ? this.membership
      : MEMBERSHIP_NAME_LIST[MEMBERSHIP_NAME_LIST.indexOf(this.membership) + 1];
    this.nextprice = MEMBERSHIP_NAME_PRICE_MAPPING[this.membership];
    return (
      <div>
        <Helmet
          title="Account"
          script={[
            {
              src:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyBe_KXwdc-mBeWQa8Js4T2htfbmJtzeuek&libraries=places"
            }
          ]}
        />
        <div
          className={styles.membershipInfoContainer}
          style={{
            backgroundColor: this.backgroundColorMapping[this.membershipCode]
          }}
        >
          <div className={styles.membershipInfoBox}>
            {this.renderBasicInfo()}
            <MediaQuery
              minWidth={992}
              values={{ width: this.props.clientMD.fakeDeviceWidth }}
            >
              {this.renderMembershipInfo()}
            </MediaQuery>
            <MediaQuery
              minWidth={992}
              values={{ width: this.props.clientMD.fakeDeviceWidth }}
            >
              {this.renderMembershipBenefit()}
            </MediaQuery>
            <MediaQuery
              maxWidth={991}
              values={{ width: this.props.clientMD.fakeDeviceWidth }}
            >
              <div className={styles.temporaryBox}>
                <div style={{ height: "65%" }}>
                  {this.state.membershipInfo_mobile ? null : (
                    <div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#a2a2a2",
                          marginRight: 0,
                          marginLeft: "auto"
                        }}
                      >
                        {`${MEMBERSHIP_CODE_NAME_MAPPING[this.membershipCode]} Member`}
                      </span>
                      <MembershipProgressBar son={this.mp} father={this.nextprice} />
                    </div>
                  )}
                </div>
                <div
                  className={styles.membershipButtonContainer}
                  onClick={() => {
                    this.setState({
                      membershipInfo_mobile: !this.state.membershipInfo_mobile
                    });
                  }}
                >
                  <span style={{ marginRight: 10, marginLeft: "auto" }}>Details</span>
                  <i
                    className={
                      this.state.membershipInfo_mobile
                        ? "ion-chevron-up"
                        : "ion-chevron-down"
                    }
                    style={{ marginRight: 0 }}
                  />
                </div>
              </div>
            </MediaQuery>
          </div>
          <MediaQuery
            maxWidth={991}
            values={{ width: this.props.clientMD.fakeDeviceWidth }}
          >
            {this.state.membershipInfo_mobile
              ? this.renderMembershipInfoBox_mobile()
              : null}
            <StickySideBarMobile
              customerList={CUSTOMER_LIST_ITEMS}
              changeTab={(newTab) => {
                this.setState({ curTab: newTab });
              }}
            />
          </MediaQuery>
        </div>
        <div className={styles.contentContainer}>
          <Col smHidden xsHidden md={3}>
            <StickySideBar
              customerList={CUSTOMER_LIST_ITEMS}
              changeTab={(newTab) => {
                this.setState({ curTab: newTab });
              }}
            />
          </Col>
          <Col sm={12} md={9}>
            <TabContentContainer
              curTab={this.state.curTab}
              customer={this.props.customer}
            />
          </Col>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    collapseHeader: getCollapseHeader(store),
    isAuthenticated: getAuthStatus(store),
    customer: getUserData(store),
    clientMD: getClientMD(store),
    paymentList: getUserPayments(store),
    paymentMethod: getPaymentMethod(store)
  };
}

export default connect(mapStateToProps)(AccountPage);
