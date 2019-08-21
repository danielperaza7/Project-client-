import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./MembershipProgressBar.css";

class MembershipProgressBar extends Component {
  render() {
    const son = this.props.son !== undefined ? this.props.son : 0;
    const father = this.props.father !== undefined ? this.props.father : 1;
    return (
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: [`${((son / father) * 100).toString()}%`] }}
        />
        <div className={styles.progressLabel}>{`${son}/${father}`}</div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MembershipProgressBar);
