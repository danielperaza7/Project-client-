/*
  sign in page

*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import SigninForm from "../../components/SigninForm/SigninForm";
import history from "../../../../history";
import { getAuthStatus } from "../../AuthReducer";
import { PushDL_LiveChat } from "../../../Analytics/components/LiveChat";
import CircleLoader from "../../../../components/masks/CircleLoader";
import FacebookLogin from "../../components/socialLogin/FacebookLogin";
// import style
import styles from "./SigninPage.css";
import { getClientMD } from "../../../App/AppReducer";

class SignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      live_chat_loading: false
    };
    this.socialSigninCallback = this.socialSigninCallback.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.location && this.props.location.state) {
        history.push(this.props.location.state.wherefrom);
      } else {
        history.push("/"); // if previous history still in our site call goback, otherwise redirect to /  FERV2
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      if (nextProps.location && nextProps.location.state) {
        history.push(nextProps.location.state.wherefrom);
      } else {
        history.push("/"); // if previous history still in our site call goback, otherwise redirect to /  FERV2
      }
    }
  }

  socialSigninCallback(failed, msg) {
    console.log("socialSigninCallback failed:", failed, " msg:", msg);
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

  renderSocialLogin() {
    return (
      <div className={styles["another-section"]}>
        <div className="text-center">
          <FacebookLogin socialSigninCallback={this.socialSigninCallback} />
        </div>
      </div>
    );
  }

  renderNewCustomerInfo() {
    return (
      <div className={styles.linkContainer}>
        <Link to="/signup" className={styles.creatAccountLink}>
          CREATE AN ACCOUNT
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.contentBox}>
        <Helmet
          title="Eve’s Temptation - Sign In"
          meta={[
            {
              name: "description",
              content:
                "Sign in to shop your perfect lingerie today at evestemptation.com. Free Shipping & Free Return!"
            },
            {
              property: "og:title",
              content: "Eve’s Temptation - Sign In"
            },
            {
              property: "og:description",
              content:
                "Sign in to shop your perfect lingerie today at evestemptation.com. Free Shipping & Free Return!"
            },
            {
              property: "og:url",
              content: "https://www.evestemptation.com/signin"
            },
            {
              property: "twitter:url",
              content: "https://www.evestemptation.com/signin"
            },
            {
              property: "twitter:title",
              content: "Eve’s Temptation - Sign In"
            },
            {
              property: "twitter:description",
              content:
                "Sign in to shop your perfect lingerie today at evestemptation.com. Free Shipping & Free Return!"
            },
            {
              property: "pinterest:description",
              content:
                "Sign in to shop your perfect lingerie today at evestemptation.com. Free Shipping & Free Return!"
            }
          ]}
        />
        <div className={styles.signInBox}>
          <div className={styles.signInLabel}>SIGN IN</div>
          <div className={styles.signInContainer}>
            <SigninForm wherefrom={this.props.location.state} />
            {this.renderNewCustomerInfo()}
          </div>
          {this.renderSocialLogin()}
          {this.renderLiveChat()}
        </div>
        <div className={styles.textBox}>
          <strong>Join Eve’s Star Membership and enjoy even more benefits.</strong>
          <br />
          <br />
          As a member, you will gain access to exclusive members-only items and
          promotions.
          <br />
          <br />
          It’s simple - the more you shop, the more you save.
          {" "}
          <strong>Start earning stars with your Eve’s Temptation purchases today!</strong>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    authenticated: getAuthStatus(store),
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(SignPage);
