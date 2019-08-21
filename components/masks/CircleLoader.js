import React, { Component } from "react";
import styles from "./CircleLoader.css";

class CircleLoader extends Component {
  render() {
    return (
      <span className={`${styles.spin} CircleLoader`}>
        <i className="ion-load-c" />
      </span>
    );
  }
}

export default CircleLoader;
