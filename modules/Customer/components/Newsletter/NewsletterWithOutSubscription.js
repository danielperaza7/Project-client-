import React, { Component } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import history from "../../../../history";
import styles from "./Newsletter.css";
import CustomModal from "../../../../components/Modal/CustomModal";
import { getNewsletter, getClientMD } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { PushDL_Newsletter_Popup_behavior } from "../../../Analytics/components/GA";


class NewsletterWithOutSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal,
      // showModal: true,
      close_for_mobile: this.props.showModal
      // close_for_mobile: true,
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
    PushDL_Newsletter_Popup_behavior(params);
  }

  closeForMobile(params) {
    this.setState({ close_for_mobile: false });
    PushDL_Newsletter_Popup_behavior(params);
  }

  renderJoinList() {
    return (
      <div
        onClick={() => {
          history.push("/signup");
          this.close("sign up from newsletter");
        }}
        className={styles.windowButton}
      >
        <h2 className={styles.h2_page1_V2}>Wait! Before you go...</h2>
        <h className={styles.subscriptionText}>
          {" "}
          Start earning reward points towards your purchases
        </h>
        <button className={styles.emailButton} style={{ marginTop: "30px" }}>
          SIGN UP NOW
        </button>
        <div className={styles.note}>
          *Every 100 reward points equals $1 in redemption value
        </div>
      </div>
    );
  }

  renderMobileSubscription() {
    return (
      <div
        id="disappear"
        className={styles.mobileSubscription}
        style={{ bottom: "-258px", zIndex: "2" }}
      >
        <button
          className={styles.closeBtn_mobile}
          onClick={() => this.closeForMobile("click cross to close")}
        >
          <i className="ion-android-close" />
        </button>
        <div>
          <h2 className={styles.h2_mobile_page1}>Wait! Before you go...</h2>
          <div className={styles.subscriptionText_mobile}>
            Start earning reward points towards your purchases
          </div>
        </div>
        <div>
          <button
            className={styles.emailButton_mobile_v2}
            onClick={() => {
              history.push("/signup");
              this.closeForMobile("sign up from newsletter");
            }}
          >
            SIGN UP NOW
          </button>
        </div>
        <div className={styles.note_mobile}>
          *Every 100 reward points equals $1 in redemption value
        </div>
      </div>
    );
  }

  render() {
    const { clientMD } = this.props;
    let notShowModalCase = true;
    try {
      notShowModalCase = window.location.pathname.split("/")[1] === "cms";
    } catch (err) {
      console.log(err);
    }
    const modalProps = {
      height: "380px",
      width: "650px",
      showModal: notShowModalCase ? false : this.state.showModal,
      onHide: this.close,
      close_behavior: "click cross to close",
      no_blank_close: true,
      close_button_style: true
    };

    return (
      <div className={styles.popup}>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <CustomModal {...modalProps}>
            <div>
              <img
                src="https://hiddenfigure.evestemptation.com/email/popup_new_img.png"
                className={styles.popupImg}
                alt="subscribe our newsletter & get a coupon! Eve by Eve's / Eve's Temptation"
                title="subscribe our newsletter & get a coupon! Eve by Eve's / Eve's Temptation"
              />
              <div className={styles.popup_text}>{this.renderJoinList()}</div>
            </div>
          </CustomModal>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div style={{ display: this.state.close_for_mobile ? "" : "none" }}>
            {this.renderMobileSubscription()}
          </div>
        </MediaQuery>
      </div>

    // <div className={styles.popup}>
    //   <MediaQuery minWidth={768} values={{width: clientMD &&  clientMD.fakeDeviceWidth}}>
    //     <CustomModal
    //       {...modalProps}
    //     >
    //       <iframe
    //         src="https://files.uxpin.com/uxpin_com_movies/uxpin-bg-design-systems.webm"
    //         style={{ width: '680px', height: '410px' }}
    //       />
    //     </CustomModal>
    //   </MediaQuery>
    //   <MediaQuery maxWidth={767} values={{width: clientMD &&  clientMD.fakeDeviceWidth}}>
    //         <div style={{display: this.state.close_for_mobile?"":"none"}}>
    //           {this.renderMobileSubscription()}
    //         </div>
    //   </MediaQuery>
    // </div>
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

export default connect(mapStateToProps)(NewsletterWithOutSubscription);
