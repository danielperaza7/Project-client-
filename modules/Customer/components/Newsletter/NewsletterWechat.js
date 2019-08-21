import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import styles from "./NewsletterWechat.css";
import CustomModal from "../../../../components/Modal/CustomModal";
import { PopUpNewsletter } from "../../../App/AppActions";
import { getNewsletter, getClientMD } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { PushDL_Newsletter_Popup_behavior } from "../../../Analytics/components/GA";
import history from "../../../../history";

class NewsletterWithOutSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.showModal,
      close_for_mobile: props.showModal
    };
    this.close = this.close.bind(this);
    this.closeForMobile = this.closeForMobile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal) {
      this.setState({
        showModal: nextProps.showModal,
        close_for_mobile: nextProps.showModal
      });
    }
  }

  close(params) {
    this.setState({ showModal: false });
    this.props.closePopUpWindow();
    PushDL_Newsletter_Popup_behavior(params);
  }

  closeForMobile(params) {
    this.setState({ close_for_mobile: false });
    this.props.closePopUpWindow();
    PushDL_Newsletter_Popup_behavior(params);
  }

  renderJoinList() {
    return (
      <div>
        <div className={styles.welcome}>
          Join our membership for
          <br />
          <span className={styles.discountText}>10% off</span>
          {" "}
your first order
        </div>
        <div className={styles.exclude}>
          *Excludes special deal and Eve by Eve’s items.
        </div>
        <button
          className={styles.joinButton}
          onClick={() => {
            history.push("/signup");
            this.close("sign up from newsletter");
          }}
        >
          Sign Up
        </button>
        <button
          className={styles.note}
          onClick={() => {
            history.push("/membershipRule");
            this.close("see membership rule and close");
          }}
        >
          See Membership Rule >
        </button>
      </div>
    );
  }

  renderMobileSubscription() {
    return (
      <div
        id="disappear"
        className={styles.mobileSubscription}
        style={{ bottom: "-258px", zIndex: "1001" }}
      >
        <button
          className={styles.closeBtn_mobile}
          onClick={() => this.closeForMobile("click cross to close")}
        >
          <i className="ion-android-close" />
        </button>
        <div className={styles.welcomeMobile}>
          Join our membership for
          <br />
          <div className={styles.discountMobile}>
            {" "}
            10% off
            {" "}
            <span className={styles.welcomeMobile}>your first order</span>
          </div>
        </div>
        <div className={styles.excludeMobile}>
          *Excludes special deal and Eve by Eve’s items.
        </div>
        <button
          className={styles.emailButtonMobile}
          onClick={() => {
            history.push("/signup");
            this.closeForMobile("sign up from newsletter");
          }}
        >
          Sign Up
        </button>
        <button
          className={styles.noteMobile}
          onClick={() => {
            history.push("/membershipRule");
            this.closeForMobile("see membership rule and close");
          }}
        >
          See Membership Rule >
        </button>
      </div>
    );
  }

  render() {
    const { clientMD } = this.props;

    const notShowModalCase = typeof window === "undefined" ? true : window.location.pathname.endsWith("/cms");

    const modalProps = {
      width: "600px",
      height: "322px",
      showModal: notShowModalCase ? false : this.state.showModal,
      onHide: this.close,
      close_behavior: "click cross to close",
      no_blank_close: true,
      size: "medium",
      close_button_style: {
        top: "42px",
        right: "41px",
        color: "#000000",
        opacity: "0.87"
      }
    };

    return (
      <div className={styles.popup}>
        <MediaQuery minWidth={768} values={{ width: clientMD.fakeDeviceWidth }}>
          <CustomModal {...modalProps}>
            <div>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/Pop-Up-Background%40.png"
                className={styles.popupImgWechat}
                alt="pink background"
                title="pink background"
              />
              <div className={styles.popup_text}>{this.renderJoinList()}</div>
            </div>
          </CustomModal>
        </MediaQuery>
        <MediaQuery
          maxWidth={767}
          values={{ width: clientMD && clientMD.fakeDeviceWidth }}
        >
          <div style={{ display: this.state.close_for_mobile ? "" : "none" }}>
            <div>{this.renderMobileSubscription()}</div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    showModal: getNewsletter(store),
    clientMD: getClientMD(store),
    authenticated: getAuthStatus(store)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopUpWindow: () => dispatch(PopUpNewsletter(false))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsletterWithOutSubscription);
