import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import history from "../../../../history";

import SigninForm from "../../components/SigninForm/SigninForm";
import FacebookLogin from "../../components/socialLogin/FacebookLogin";
import CircleLoader from "../../../../components/masks/CircleLoader";

import styles from "./CheckoutSignin.css";
import { PushDL_LiveChat } from "../../../Analytics/components/LiveChat";

class CheckoutSigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialogue: false,
      live_chat_loading: false
    };
  }

  continueToCheckout() {
    history.push("/checkout");
  }

  handleOpenLiveChat() {
    this.setState({ live_chat_loading: true });
    PushDL_LiveChat(() => {
      this.setState({ live_chat_loading: false });
    });
  }

  renderLiveChat() {
    return (
      <div
        className={styles.liveChat}
        onClick={() => {
          this.handleOpenLiveChat();
        }}
      >
        <img
          style={{ marginRight: "10px" }}
          src="https://hiddenfigure.evestemptation.com/email/Component/chat.svg"
          alt="Chat Pic."
        />
        NEED HELP? Start a live chat now!
        {this.state.live_chat_loading ? (
          <span>
            <CircleLoader />
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}> Sign in </div>
        <div className={styles.signInBody}>
          <div className={styles.signInContainer}>
            <Modal
              show={this.state.showDialogue}
              onHide={() => {
                this.setState({ showDialogue: false });
              }}
              dialogClassName={styles.dialog}
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
                  <p className={styles.textTitle}>Customer Notice</p>
                  <p className={styles.textDescription}>
                    Sign up to become our member to receive 10% off Eve's Temptation
                    products for your first order!
                  </p>
                  <p className={styles.textNote}>
                    *Excludes special deal and Eve by Eve’s items. Please visit membership
                    rules for more details.
                  </p>
                </div>
                <div className={styles.buttonBox}>
                  <div className={styles.singleButton} style={{ width: "40%" }}>
                    <Link to="/checkout/signup"> Sign Up </Link>
                  </div>
                  <div className={styles.singleButton} style={{ width: "60%" }}>
                    <Link to="/checkout"> Continue as GUEST </Link>
                  </div>
                </div>
              </div>
            </Modal>
            <div className={styles.signInBox}>
              <SigninForm checkoutMode signinCallback={this.continueToCheckout} />
              <div className={styles.routeLinks}>
                <div
                  onClick={() => {
                    this.setState({ showDialogue: true });
                  }}
                  className={styles.linkWrapper}
                >
                  <Link>CHECKOUT AS GUEST</Link>
                </div>
                <div className={styles.linkWrapper}>
                  <Link to="/checkout/signup"> CREATE AN ACCOUNT </Link>
                </div>
              </div>
            </div>
            <FacebookLogin socialSigninCallback={this.continueToCheckout} />
            {this.renderLiveChat()}
          </div>
          <div className={styles.textContainer}>
            <strong>Join Eve’s Star Membership and enjoy even more benefits.</strong>
            <br />
            <br />
            As a member, you will gain access to exclusive members-only items and
            promotions.
            <br />
            <br />
            It’s simple - the more you shop, the more you save.
            {" "}
            <strong>
              Start earning stars with your Eve’s Temptation purchases today!
            </strong>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutSigninPage;
