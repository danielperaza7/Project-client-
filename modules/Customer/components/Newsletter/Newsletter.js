import React, { Component } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import styles from "./Newsletter.css";
import CustomModal from "../../../../components/Modal/CustomModal";
import { postNewsLetter } from "../../CustomerActions.js";
import { getNewsletter, getClientMD } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import CircleLoader from "../../../../components/masks/CircleLoader";
import { PushDL_Newsletter_Popup_behavior } from "../../../Analytics/components/GA";
import { PushDL_FB_CustomerInfo } from "../../../Analytics/components/FB";


class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal,
      newsvalue: "",
      email_err: false,
      page: 0,
      err: "",
      press_once: false,
      close_for_mobile: this.props.showModal,
      waitForResponse: false
    };
    this.close = this.close.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onchange = this.onchange.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.renderJoinList = this.renderJoinList.bind(this);
    this.renderAlreadyJoin = this.renderAlreadyJoin.bind(this);
    this.errMsg = this.errMsg.bind(this);
    this.renderSubscriptionAlready = this.renderSubscriptionAlready.bind(this);
    this.renderMobileSubscription = this.renderMobileSubscription.bind(this);
    this.closeForMobile = this.closeForMobile.bind(this);
    this.showInput = this.showInput.bind(this);
    this.input_Onblur = this.input_Onblur.bind(this);
    this.renderSignUpButton = this.renderSignUpButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal) {
      this.setState({
        showModal: nextProps.showModal,
        close_for_mobile: nextProps.showModal
      });
    }
  }

  onclick() {
    this.setState({ showModal: false });
  }

  onchange(input) {
    this.setState({
      newsvalue: input, email_err: false, err: "", dirty: true, page: 0
    });
  }

  onsubmit(event) {
    event.preventDefault();
    this.setState({ press_once: true, dirty: false, waitForResponse: true });
    this.props.dispatch(postNewsLetter(this.state.newsvalue, this.errMsg));
  }

  close(params) {
    this.setState({ showModal: false });
    if (this.state.page === 0) {
      if (params === "click cross to close") {
        PushDL_Newsletter_Popup_behavior(params);
      } else if (params === "click not-today button to close") {
        PushDL_Newsletter_Popup_behavior(params);
      }
    }
  }

  closeForMobile(params) {
    this.setState({ close_for_mobile: false });
    if (this.state.page === 0) {
      if (params === "click cross to close") PushDL_Newsletter_Popup_behavior(params);
      else if (params === "click not-today button to close") {
        PushDL_Newsletter_Popup_behavior(params);
      }
    }
  }

  showInput() {
    setTimeout(() => {
      window.document.getElementById("disappear").style.position = "relative";
      window.document.getElementById("disappear").scrollIntoViewIfNeeded();
    }, 300);
  }

  input_Onblur() {
    window.document.getElementById("disappear").style.position = "fixed";
  }

  errMsg(error, msg) {
    this.setState({ press_once: false, waitForResponse: false });
    if (error && msg != "This email has already been subscribed.") {
      this.setState({
        email_err: true,
        err: msg
      });
    } else if (msg == "This email has already been subscribed.") {
      PushDL_Newsletter_Popup_behavior("input an existed email");
      this.setState({ page: 2, click_blank: false });
    } else {
      PushDL_Newsletter_Popup_behavior("input a new email");
      if (!this.props.authenticated) {
        PushDL_FB_CustomerInfo({
          email: this.state.newsvalue,
          tier: 0,
          firstName: "",
          lastname: ""
        });
      }
      this.setState({ page: 1, click_blank: false });
    }
  }

  renderAlreadyJoin() {
    return (
      <Link to="/" onClick={this.onclick}>
        <button className={styles.gotIt1} type="submit" onClick={this.close}>
          <i
            className="ion-checkmark-circled"
            style={{ fontSize: "20px", marginRight: "10px", verticalAlign: "middle" }}
          />
          Thank you for subscribing!
        </button>
      </Link>
    );
  }

  renderSubscriptionAlready() {
    return (
      <Link to="/" onClick={this.onclick}>
        <button className={styles.gotIt2} type="submit" onClick={this.close}>
          This email has already been added.
        </button>
      </Link>
    );
  }

  renderSignUpButton() {
    return (
      <button
        className={styles.emailButton}
        onClick={this.onsubmit}
        disabled={this.state.press_once}
      >
        {this.state.waitForResponse ? <CircleLoader /> : "SIGN UP"}
      </button>
    );
  }

  renderJoinList() {
    return (
      <div>
        <h2 className={styles.h2_page1}>Wait! Before you go...</h2>
        <div className={styles.discountNum}> 10% Off Your First Order</div>
        <div>
          <form>
            <input
              className={styles.emailInput}
              type="text"
              placeholder="Enter your email"
              onChange={event => this.onchange(event.target.value)}
              style={{ borderColor: this.state.email_err ? "red" : "" }}
            />
            <div
              className={styles.errShow}
              style={{ display: !this.state.email_err ? "none" : "" }}
            >
              {this.state.err}
            </div>
            {this.state.page == 0
              ? this.renderSignUpButton()
              : this.state.page == 1
                ? this.renderAlreadyJoin()
                : this.renderSubscriptionAlready()}
          </form>
          <button
            className={styles.tobecontinued}
            onClick={() => {
              this.close("click not-today button to close");
            }}
          >
            {" "}
            No thanks. I
            {" "}
            {"don't"}
            {" "}
want to save 10% right now
          </button>
        </div>
      </div>
    );
  }

  renderMobileSubscription() {
    const page = this.state.page;
    switch (page) {
      case 0:
        return (
          <div
            id="disappear"
            className={styles.mobileSubscription}
            style={{ bottom: this.state.email_err ? "-306px" : "", zIndex: "1049" }}
          >
            <button
              className={styles.closeBtn_mobile}
              onClick={() => this.closeForMobile("click cross to close")}
            >
              <i className="ion-android-close" />
            </button>
            <div>
              <h2 className={styles.h2_mobile_page1}>Join the list to get</h2>
              <h className={styles.h_mobile}> 10% Off </h>
              <div className={styles.discount_mobile}>
                Sign up now to take
                {" "}
                <span>10% OFF</span>
                {" "}
your first purchase, on
                absolutely everything you choose.
              </div>
            </div>
            <div>
              <form>
                <input
                  className={styles.emailInput_mobile}
                  type="text"
                  placeholder="Your email"
                  onBlur={this.input_Onblur}
                  onFocus={this.showInput}
                  onChange={event => this.onchange(event.target.value)}
                  style={{ borderColor: this.state.email_err ? "red" : "" }}
                />
                <button
                  className={styles.emailButton_mobile}
                  onClick={this.onsubmit}
                  disabled={this.state.press_once}
                >
                  {this.state.waitForResponse ? (
                    <CircleLoader />
                  ) : (
                    <i className="ion-ios-arrow-right" style={{ fontSize: "18px" }} />
                  )}
                </button>
              </form>
              <div
                className={styles.errShow}
                style={{
                  display: !this.state.email_err ? "none" : "",
                  marginLeft: "20px"
                }}
              >
                {this.state.err}
              </div>
              <button
                className={styles.tobecontinued_mobile}
                onClick={() => {
                  this.closeForMobile("click not-today button to close");
                }}
              >
                {" "}
                No thanks. I
                {" "}
                {"don't"}
                {" "}
want to save 10% right now
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div
            className={styles.mobileSubscription}
            style={{ bottom: "-204px", zIndex: "2" }}
          >
            <button className={styles.closeBtn_mobile} onClick={this.closeForMobile}>
              <i className="ion-android-close" />
            </button>
            <div>
              <h2 className={styles.h2_mobile}>
                <i className="ion-checkmark-circled" />
                {" "}
                {"You're in"}
              </h2>
              <div className={styles.userdiscount_mobile}>
                {"And don't worry, that 10% off code is on its way to your inbox"}
                {" "}
                <span>{this.state.newsvalue}</span>
                {" "}
now.
              </div>
            </div>
            <div>
              <Link to="/" onClick={this.onclick}>
                <button
                  className={styles.gotIt1_mobile}
                  type="submit"
                  onClick={this.closeForMobile}
                >
                  GOT IT
                </button>
              </Link>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            className={styles.mobileSubscription}
            style={{ bottom: "-204px", zIndex: "2" }}
          >
            <button className={styles.closeBtn_mobile} onClick={this.closeForMobile}>
              <i className="ion-android-close" />
            </button>
            <div>
              <h2 className={styles.h2_mobile}>Hello Again.</h2>
              <div className={styles.userdiscount_mobile}>
                {"Your email has already been added. Welcome back!"}
              </div>
            </div>
            <div>
              <Link to="/" onClick={this.onclick}>
                <button
                  className={styles.gotIt2_mobile}
                  type="submit"
                  onClick={this.closeForMobile}
                >
                  GOT IT
                </button>
              </Link>
            </div>
          </div>
        );
      default:
        break;
    }
  }

  render() {
    const { clientMD } = this.props;
    let notShowModalCase = true;
    try {
      notShowModalCase = window.location.pathname.split("/")[1] === "cms";
    } catch (err) {}
    const modalProps = {
      width: "680px",
      height: "410px",
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

export default connect(mapStateToProps)(Newsletter);
