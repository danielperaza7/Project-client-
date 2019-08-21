import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import history from "../../../../history";

// import getters
import { getPreviousCustomHistory, getClientMD } from "../../AppReducer";

import styles from "./GoBack.css";

class GoBack extends Component {
  render() {
    const { previousCustomHistory, clientMD } = this.props;
    if (!previousCustomHistory) {
      return null;
    }
    let wording = "Go Back";
    if (previousCustomHistory.name && previousCustomHistory.name !== "") {
      wording = previousCustomHistory.name;
    }
    return (
      <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
        <div className={styles.goBackWrapper} onClick={() => history.goBack()}>
          <span>
            <i className="ion-chevron-left" />
          </span>
          <span className={styles.goBackRight}>{wording}</span>
        </div>
      </MediaQuery>
    );
  }
}

function mapStateToProps(store) {
  return {
    previousCustomHistory: getPreviousCustomHistory(store),
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(GoBack);
