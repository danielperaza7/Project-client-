import React, { Component } from "react";
import styles from "./InfoWithButtons.css";

export default class InfoWithButtons extends Component {
  renderID() {
    const { is_new, url_id, handleConfigInputChange } = this.props;
    if (is_new) {
      return (
        <span className={styles["cms-id"]}>
          <label className={styles.labels}>CMS id: </label>
          <input
            className={styles["id-input"]}
            type="text"
            placeholder="input your new id"
            onChange={event => handleConfigInputChange("url_id", event.target.value)}
          />
        </span>
      );
    }
    return (
      <span>
        <label className={styles.labels}>CMS id:</label>
        <span>{url_id}</span>
      </span>
    );
  }

  renderURL(URL) {
    const { is_new, type } = this.props;
    if (is_new || type !== "page") {
      return (
        <div>
          <span>URL: Not available</span>
        </div>
      );
    }
    return (
      <div>
        <label className={styles.labels}>URL:</label>
        <a href={URL}>{URL}</a>
      </div>
    );
  }

  render() {
    const {
      url_id, country, lan, handleSave, goBackToList
    } = this.props;

    const URL = `/page/${url_id}`;

    return (
      <div className={styles["info-panel"]}>
        <div className={styles["id-url"]}>
          <div>
            {this.renderID()}
            <span className={styles["country-lan"]}>{`[${country} ${lan}]`}</span>
          </div>
          <div>{this.renderURL(URL)}</div>
        </div>
        <div className={styles["btn-save-back"]}>
          <div>
            <button onClick={handleSave}> Save </button>
          </div>
          <div>
            <button onClick={goBackToList}> Go to list </button>
          </div>
        </div>
      </div>
    );
  }
}
