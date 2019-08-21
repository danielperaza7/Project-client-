import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { signinFacebookUser } from "../../AuthActions";
import styles from "./FacebookLogin.css";

class FbLogin extends Component {
  responseFacebook = (response) => {
    const { socialSigninCallback } = this.props;
    this.props.dispatch(signinFacebookUser(response, socialSigninCallback));
  };

  componentClicked = () => {

  };

  render() {
    const FBIcon = (
      <div className={styles.fbBTN}>
        <div className={styles.fbBTN_icon}>
          <i className={`ion-social-facebook ${styles["fb-icon"]}`} />
        </div>
        <div className={styles.fbBTN_text}>Sign in with Facebook</div>
      </div>
    );

    return (
      <div className={styles.BTN}>
        <FacebookLogin
          appId="359938904575577"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onClick={this.componentClicked}
          size="medium"
          textButton=""
          icon={FBIcon}
        />
      </div>
    );
  }
}

export default connect()(FbLogin);
