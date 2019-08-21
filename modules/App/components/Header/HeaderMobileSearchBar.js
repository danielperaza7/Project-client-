/**
 * Created by chris on 3/28/17.
 */
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { getRecentSearchedTerms } from "../../AppReducer";

import SearchBar from "./searchBarAnimated";
import RecommendSearch from "../Search/RecommendSearch";
import styles from "./HeaderMobileSearchBar.css";

class HeaderMobileSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
    this.close = this.close.bind(this);
  }

  close() {
    const newState = false;
    this.setState({
      showModal: newState
    });
    this.props.callbackParent(newState);
  }

  render() {
    return (
      <Modal
        show={this.state.showModal}
        className={styles.searchPageWrapper}
        onHide={this.close}
      >
        <Modal.Body>
          <div className={styles.topPart}>
            <p> Search by keywords, style etc. </p>
            <span className={styles.closeBtn} onClick={this.close}>
              <i className="ion-android-close" />
            </span>
            <div className={styles.searchInput}>
              <SearchBar forceOpen parentClose={this.close} fullWidth />
            </div>
          </div>
          <div className={styles.bottomPart}>
            <div className={styles.recent}>
              <RecommendSearch
                recommendData={{
                  title: "Recently searched",
                  terms: this.props.recentSearchedTerms
                }}
                parentClose={this.close}
              />
            </div>
            <div className={styles.popular} />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(store) {
  return {
    recentSearchedTerms: getRecentSearchedTerms(store)
  };
}

export default connect(mapStateToProps)(HeaderMobileSearchBar);
