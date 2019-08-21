// /*
//  signup page
//  */
import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import SignupForm from "../../components/SignupForm/SignupForm";
import history from "../../../../history";
import styles from "./SignupPage.css";
import { PushDL_LiveChat } from "../../../Analytics/components/LiveChat";
import CircleLoader from "../../../../components/masks/CircleLoader";

import { getAuthStatus } from "../../AuthReducer";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      live_chat_loading: false
    };
  }

  componentWillMount() {
    if (this.props.authenticated) {
      history.push("/");
    }
  }

  renderLiveChat() {
    return (
      <div
        className={`text-center ${styles["contact-us-link"]}`}
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

  handleOpenLiveChat() {
    this.setState({ live_chat_loading: true });
    PushDL_LiveChat(() => {
      this.setState({ live_chat_loading: false });
    });
  }

  render() {
    return (
      <div className={styles.contentBox}>
        <Helmet
          title="Eve’s Temptation - Sign Up"
          meta={[
            {
              name: "description",
              content:
                "Sign up & subscribe today to receive 10% off at evestemptation.com. Free Shipping & Free Return!"
            },
            {
              property: "og:title",
              content: "Eve’s Temptation - Sign Up"
            },
            {
              property: "og:description",
              content:
                "Sign up & subscribe today to receive 10% off at evestemptation.com. Free Shipping & Free Return!"
            },
            {
              property: "og:url",
              content: "https://www.evestemptation.com/signup"
            },
            {
              property: "twitter:url",
              content: "https://www.evestemptation.com/signup"
            },
            {
              property: "twitter:title",
              content: "Eve’s Temptation - Sign Up"
            },
            {
              property: "twitter:description",
              content:
                "Sign up & subscribe today to receive 10% off at evestemptation.com. Free Shipping & Free Return!"
            },
            {
              property: "pinterest:description",
              content:
                "Sign up & subscribe today to receive 10% off at evestemptation.com. Free Shipping & Free Return!"
            }
          ]}
        />
        <div className={styles.signInBox}>
          <SignupForm />
          {this.renderLiveChat()}
        </div>
        <div className={styles.textBox}>
          <strong>Enjoy faster, secure checkout</strong>
          {" "}
for registering an account!
          <br />
          <br />
          <strong>Become a new member</strong>
          with us to make the most out of Eve’s Star Membership. By creating an account
          with our store, you will be able to: shop faster, store multiple shipping
          addresses, view and track your orders, and earn stars for your Eve's Temptation
          purchases. Plus, you’ll get
          <strong>10% off Eve's Temptation products for your first order!</strong>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    authenticated: getAuthStatus(store)
  };
}

export default connect(mapStateToProps)(SignupPage);
// export default SignupPage;
