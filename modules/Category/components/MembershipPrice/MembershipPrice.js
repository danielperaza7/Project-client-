import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Modal } from "react-bootstrap";
import history from "../../../../history";
import styles from "./MembershipPrice.css";
import { getClientMD, getCustomerGroupId, getUserData } from "../../../App/AppReducer";
import {
  MEMBERSHIP_NAME_LIST,
  MEMBERSHIP_NAME_DISCOUNT_MAPPING
} from "../../../../config/Membership/membershipConfig";

class MembershipPrice extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false, login: false };
  }

  componentDidMount() {
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

  componentDidUpdate(prevProps) {
    const login = this.props.userData !== undefined &&
      this.props.userData !== null &&
      Object.keys(this.props.userData).length !== 0 &&
      this.props.userData.group_id !== 0;
    const prevLogin = prevProps.userData !== undefined &&
      prevProps.userData !== null &&
      Object.keys(prevProps.userData).length !== 0 &&
      prevProps.userData.group_id !== 0;
    if (login !== prevLogin) {
      this.setState({ login });
    }
  }

  render() {
    const { tier_prices, list_id } = this.props;
    const base64Pic = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSI5cHgiIHZpZXdCb3g9IjAgMCAxNiA5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4xICg1NzUwMSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+UGF0aCAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkNhdGVnb3J5LWFuZC1EZXRhaWwtUGFnZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjE0NDAvcHJpY2UvbGlzdF9wYWdlLWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTcuMDAwMDAwLCAtNzk0LjAwMDAwMCkiIGZpbGw9IiNGOEY2RjAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjRERDRUFGIiBzdHJva2Utd2lkdGg9IjAuNSI+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0yIiBwb2ludHM9IjY1OCA3OTUgNjY1LjE5MDQ3NiA4MDIuMiA2NzIuNSA3OTUiPjwvcG9seWxpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
    const membershipName = MEMBERSHIP_NAME_LIST;
    const membershipPrice = membershipName.map((name) => {
      return tier_prices[0][0] === tier_prices[0][1]
        ? `$${(parseFloat(tier_prices[0][0]) * MEMBERSHIP_NAME_DISCOUNT_MAPPING[name])
          .toFixed(2)
          .toString()}`
        : `$${(parseFloat(tier_prices[0][0]) * MEMBERSHIP_NAME_DISCOUNT_MAPPING[name])
          .toFixed(2)
          .toString()}-$${(parseFloat(tier_prices[0][1]) * MEMBERSHIP_NAME_DISCOUNT_MAPPING[name])
          .toFixed(2)
          .toString()}`;
    });
    const membershipPriceComponent = membershipPrice.map((key, ind) => {
      if (ind !== 0) {
        return (
          <div
            key={list_id + ind.toString()}
            className={
              this.props.customerGroupID >= 2
                ? this.props.customerGroupID === ind
                  ? styles.membershipPriceHighlight
                  : styles.membershipPrice
                : ind === membershipPrice.length - 1
                  ? styles.membershipPriceHighlight
                  : styles.membershipPrice
            }
          >
            <div
              className={styles.membershipPriceTitle}
              key={`${list_id}_${ind.toString()}_title`}
            >
              {`${membershipName[ind]}: `}
            </div>
            {membershipPrice[ind]}
          </div>
        );
      }
    });
    membershipPriceComponent.reverse();
    const menbershipInfoPanelStyle_down = { marginTop: 30 };
    const menbershipInfoPanelTriContainerStyle_down = { marginTop: 10 };
    const menbershipInfoPanelTriStyle_down = { transform: "rotate(180deg)" };
    const membershipInfo = (
      <div>
        <MediaQuery
          minWidth={992}
          values={{ width: this.props.clientMD.fakeDeviceWidth }}
        >
          <div
            className={
              this.state.login || this.props.showSigninLinkOutside
                ? styles.menbershipInfoPanelLogedIn
                : styles.menbershipInfoPanel
            }
            style={this.props.direction === "down" ? menbershipInfoPanelStyle_down : null}
          >
            <div className={styles.menbershipInfoTitle}>Membership Price</div>
            {membershipPriceComponent}
            <a className={styles.membershipDetails} href="/membershipRule">
              {"Membership details >"}
            </a>
            {this.state.login || this.props.showSigninLinkOutside ? null : (
              <div className={styles.membershipPriceInfoSignin}>
                <span
                  className={styles.membershipPriceInfoSigninLink}
                  onClick={() => {
                    history.push("/signin");
                  }}
                >
                  Sign In
                </span>
                {" "}
                to see your price.
              </div>
            )}
          </div>
          <div
            className={styles.menbershipInfoPanelTriContainer}
            style={
              this.props.direction === "down"
                ? menbershipInfoPanelTriContainerStyle_down
                : {}
            }
          >
            <div>
              <img
                src={base64Pic}
                className={styles.menbershipInfoPanelTri}
                alt="Tri"
                style={
                  this.props.direction === "down" ? menbershipInfoPanelTriStyle_down : {}
                }
              />
            </div>
          </div>
        </MediaQuery>
        <MediaQuery
          maxWidth={991}
          values={{ width: this.props.clientMD.fakeDeviceWidth }}
        >
          <Modal
            show={this.state.expand}
            onHide={() => {
              this.setState({ expand: false });
            }}
            dialogClassName={styles.membershipInfoDialog}
          >
            <div style={{ width: "98%" }}>
              <div className={styles.menbershipInfoTitle}>Membership Price</div>
              {membershipPriceComponent}
              <a className={styles.membershipDetails} href="/membershipRule">
                {"Membership details >"}
              </a>
              {this.state.login || this.props.showSigninLinkOutside ? null : (
                <div className={styles.membershipPriceInfoSignin}>
                  <span
                    className={styles.membershipPriceInfoSigninLink}
                    onClick={() => {
                      history.push("/signin");
                    }}
                  >
                    Sign In
                  </span>
                  {" "}
                  to see your price.
                </div>
              )}
            </div>
            <div
              className={styles.dialogCross}
              onClick={() => {
                this.setState({ expand: false });
              }}
            >
              <i className="ion-android-close" />
            </div>
          </Modal>
        </MediaQuery>
      </div>
    );
    return this.props
      && this.props.customerGroupID < 10
      && this.props.mp_special === false ? (
        <div className={styles.membershipPriceInfoContainer}>
          <MediaQuery
            minWidth={992}
            values={{ width: this.props.clientMD.fakeDeviceWidth }}
          >
            <div style={{ display: "flex" }}>
              {this.props.showSigninLinkOutside && !this.state.login ? (
                <div
                  className={styles.membershipPriceInfoSignin}
                  style={{ marginRight: 5 }}
                >
                  <span
                    className={styles.membershipPriceInfoSigninLink}
                    onClick={() => {
                      history.push("/signin");
                    }}
                  >
                  Sign In
                  </span>
                  {" "}
                to see your price.
              </div>
            ) : null}
            <div className={styles.membershipPriceBox} onMouseEnter={() => { this.setState({ expand: true }); }} onMouseLeave={() => { this.setState({ expand: false }); }}>
              {this.state.expand ? membershipInfo : null}
              <div className={styles.membershipPriceLabel}>
                {this.props.customerGroupID <= 1 ?
                  "Want it for " + membershipPrice[membershipPrice.length - 1] + "?" :
                  this.props.userData && this.props.membershipPriceFullName === true ?
                    "Your " + MEMBERSHIP_NAME_LIST[this.props.userData.group_id] + " membership price: " + membershipPrice[this.props.customerGroupID] :
                    "Your Price: " + membershipPrice[this.props.customerGroupID]}
              </div>
            </div>
          </div>
        </MediaQuery>

          <MediaQuery
            maxWidth={991}
            values={{ width: this.props.clientMD.fakeDeviceWidth }}
          >
            <div style={{ display: "flex" }}>
              {this.props.showSigninLinkOutside && !this.state.login ? (
                <div
                  className={styles.membershipPriceInfoSignin}
                  style={{ marginRight: 5 }}
                >
                  <span
                    className={styles.membershipPriceInfoSigninLink}
                    onClick={() => {
                      history.push("/signin");
                    }}
                  >
                  Sign In
                  </span>
                  {" "}
                to see your price.
              </div>
            ) : null}
            <div className={styles.membershipPriceLabel} onClick={() => { this.setState({ expand: true }); }}>
                {this.props.customerGroupID <= 1 ?
                  "Want it for "+ membershipPrice[membershipPrice.length - 1] + "?" :
                  "Your Price: " + membershipPrice[this.props.customerGroupID]}
            </div>
            {this.state.expand ? membershipInfo : null}
          </div>
        </MediaQuery>
      </div>
    ) : null;
  }
}

function mapStateToProps(store) {
  return {
    customerGroupID: getCustomerGroupId(store),
    clientMD: getClientMD(store),
    userData: getUserData(store)
  };
}

export default connect(mapStateToProps)(MembershipPrice);
