import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../../../history";
import SignupForm from "../../components/SignupForm/SignupForm";
import CircleLoader from "../../../../components/masks/CircleLoader";
import styles from "../CheckoutSigninPage/CheckoutSignin.css";
import { PushDL_LiveChat } from "../../../Analytics/components/LiveChat";

class CheckoutSignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <div className={styles.title}> Create account </div>
        <div className={styles.signInBody}>
          <div className={styles.signInContainer}>
            <div className={styles.signInBox}>
              <SignupForm checkoutMode signupCallback={this.continueToCheckout} />
              <div className={styles.routeLinks} style={{ border: "none" }}>
                <div>
                  <Link to="/checkout/signin"> Have an account? Sign In Now </Link>
                </div>
                <div>
                  <Link to="/checkout"> CHECK OUT AS GUEST </Link>
                </div>
              </div>
            </div>
            {this.renderLiveChat()}
          </div>
          <div className={styles.textContainer}>
            <strong>Enjoy faster, secure checkout</strong>
            {" "}
for registering an account!
            <br />
            <br />
            <strong>Become a new member</strong>
            {" "}
with us to make the most out of Eve’s
            Star Membership. By creating an account with our store, you will be able to:
            shop faster, store multiple shipping addresses, view and track your orders,
            and earn stars for your Eve's Temptation purchases. Plus, you’ll get
            {" "}
            <strong>10% off Eve's Temptation products for your first order!</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutSignupPage;
