import React, { Component } from "react";
import styles from "../FieldFormControl/FieldFormControl.css";

class ArrowIcon extends Component {
  render() {
    return (
      <div style={{ marginTop: "5px" }}>
        <i className={`ion-android-arrow-dropup ${styles["arrowIcon-style"]}`} />
        <i
          className={`ion-android-arrow-dropdown ${styles["arrowIcon-style"]}`}
          style={{ marginTop: "-15px" }}
        />
      </div>
    );
  }
}

export default ArrowIcon;
