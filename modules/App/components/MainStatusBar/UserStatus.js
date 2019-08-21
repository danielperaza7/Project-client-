/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./MainStatusBar.css";

import { logout } from "../../../Authentication/AuthActions";
import { resetCheckoutState } from "../../../CheckoutV2/CheckoutActions";
import history from "../../../../history";

const UserStatus = React.memo(({ authenticated, userData: customer, dispatch }) => {
  let currentLocation = "/";

  if (authenticated) {
    // has token, may be guest or sign-ined user
    if (customer && (customer.firstname || customer.lastname)) {
      return (
        <div>
          <span
            className={styles["user-logout"]}
            onClick={() => {
              dispatch(logout());
              dispatch(resetCheckoutState());
              try {
                currentLocation = window.location.pathname;
              } catch (err) {
                console.error(err);
              }
              if (currentLocation === "/checkout") history.push("/");
            }}
          >
              Logout
          </span>
          <Link to="/account/dashboard/" className={styles["user-signin"]}>
            <i className={`ion-android-person ${styles["account-icon"]}`} />
            <span className={styles["user-name"]}>
              {
              // eslint-disable-next-line no-nested-ternary
              customer.firstname
                ? customer.firstname
                : ` ${customer.lastname}`
                  ? customer.lastname
                  : ""}
            </span>
          </Link>
        </div>
      );
    }
    if (typeof window !== "undefined") {
      currentLocation = window.location.pathname;
    }
    return (
      <div>
        <Link to={{ pathname: "/signin", state: { wherefrom: currentLocation } }}>
            SIGN IN
        </Link>
        <Link to="/signup">JOIN US</Link>
      </div>
    );
  }
  if (typeof window !== "undefined") {
    currentLocation = window.location.pathname;
  }
  return (
    <div>
      <Link to={{ pathname: "/signin", state: { wherefrom: currentLocation } }}>
          SIGN IN
      </Link>
      <Link to="/signup">JOIN US</Link>
    </div>
  );
});

export default connect()(UserStatus);
