import React, { Component } from "react";
import styles from "./FitBar.css";

class FitBar extends Component {
  render() {
    const { keyList, percentage, labels } = this.props;
    const circle_list = [];
    const label_list = [];
    // const people_think_fit_percent = [0, 0.3, 0.45, 0.1, 0.15];
    let position = 0.0;
    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      position += percentage[key] * (i / 4);
    }

    for (let i = 0; i < keyList.length; i++) {
      circle_list.push(
        <div
          className={styles.circle}
          style={{ marginRight: i !== keyList.length - 1 ? "calc( 25% - 7.5px)" : "" }}
        />
      );
    }

    for (let i = 0; i < labels.length; i++) {
      label_list.push(
        <div
          className={styles.label}
          style={{ marginRight: i !== labels.length - 1 ? "calc( 50% - 75px)" : "" }}
        >
          {labels[i]}
        </div>
      );
    }

    return (
      <div className={styles.fitBar}>
        <div
          className={styles.person}
          style={{ marginLeft: `calc( ${100 * position}% - ${8 * position}px` }}
        >
          <img src="https://hiddenfigure.evestemptation.com/email/person.png" alt="" />
        </div>
        <div className={styles.horizon} />
        <div className={styles.circle_list}>{circle_list}</div>
        <div className={styles.label_list}>{label_list}</div>
      </div>
    );
  }
}

export default FitBar;
