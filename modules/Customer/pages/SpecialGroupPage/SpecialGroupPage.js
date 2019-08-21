/*
  account page
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../../../history";
import { postGroupInfo } from "../../CustomerActions";
import styles from "./SpecialGroupPage.css";

class SpecialGroupPage extends Component {
  componentWillMount() {
    let currentLocation = null;
    try {
      currentLocation = window.location.pathname;
    } catch (err) {
      console.log("err", err);
    }
    const token = currentLocation
      ? currentLocation.substring(currentLocation.lastIndexOf(":") + 1)
      : null;
    this.props.dispatch(postGroupInfo(token));
  }

  render() {
    return (
      <div className={styles.specialGroupContainer}>
        <i
          className="ion-checkmark-circled"
          style={{ color: "#63D270", fontSize: "100px", marginTop: "100px" }}
        />
        <div className={styles.success}>Success!</div>
        <div className={styles.note}>
          {" "}
          You have successfully activated your account. Enter your account to view your
          status now.
        </div>
        <div
          className={styles.button}
          onClick={() => history.push("/account/dashboard")}
        >
          {" "}
          Your Account
        </div>
      </div>
    );
  }
}

export default connect()(SpecialGroupPage);
