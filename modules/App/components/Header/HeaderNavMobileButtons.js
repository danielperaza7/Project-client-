/**
 * Created by chris on 3/31/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Button, ButtonGroup } from "react-bootstrap";
import history from "../../../../history";
import styles from "./Header.css";
import { logout } from "../../../Authentication/AuthActions";

class HeaderNavMobileButtons extends Component {
  getName(position) {
    const { onLangSwitched, authenticated, userData } = this.props;
    if (position === "left") {
      if (onLangSwitched) {
        return "Confirm";
      }
      if (authenticated) {
        return (
          <span>
            <i
              className="ion-android-person"
              style={{ marginRight: "10px", fontSize: "16px" }}
            />
            {userData.firstname}
          </span>
        );
      }

      return "Sign in";
    }

    if (onLangSwitched) {
      return "Cancel";
    }

    if (authenticated) {
      return "Log out";
    }
    return "Join us";
  }

  getOnClickName(position) {
    const { onLangSwitched, authenticated, userData } = this.props;
    if (position === "left") {
      if (onLangSwitched) {
        return "confirm";
      }
      if (authenticated) {
        return (
          <span>
            <i
              className="ion-android-person"
              style={{ marginRight: "10px", fontSize: "16px" }}
            />
            {userData.firstname}
          </span>
        );
      }
      return "signin";
    }
    if (onLangSwitched) {
      return "cancel";
    }
    if (authenticated) {
      return "logout";
    }
    return "signup";
  }

  handleButtonClick(name) {
    switch (name) {
      case "confirm":
        /* language switch */ this.props.close();
        break;
      case "account":
        history.push("/account/dashboard/");
        this.props.close();
        break;
      case "logout":
        this.props.dispatch(logout());
        history.push("/account/dashboard/");
        this.props.close();
        break;
      case "signin":
        history.push("/signin");
        this.props.close();
        break;
      case "cancel":
        close();
        break;
      case "cart":
        history.push("/cart");
        this.props.close();
        break;
      case "signup":
        history.push("/signup");
        this.props.close();
        break;
      default:
        break;
    }
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className={styles["mobile-nav-sub"]}>
        <Row className={styles["mobile-nav-row"]}>
          <ButtonGroup vertical block>
            <Button
              bsClass="link"
              className={styles["mobile-nav-row-btn-left"]}
              style={{ textTransform: authenticated ? "" : "uppercase" }}
              onClick={() => this.handleButtonClick(this.getOnClickName("left"))}
            >
              {this.getName("left")}
            </Button>
            <Button
              bsClass="link"
              className={styles["mobile-nav-row-btn-right"]}
              style={{ textTransform: "uppercase" }}
              onClick={() => this.handleButtonClick(this.getOnClickName("right"))}
            >
              {this.getName("right")}
            </Button>
          </ButtonGroup>
        </Row>
      </div>
    );
  }
}
export default connect()(HeaderNavMobileButtons);
