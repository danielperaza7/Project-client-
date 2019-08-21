import React, { Component } from "react";
import styles from "./CollapsedWrapper.css";

class CollapsedWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse_state: true
    };
    this.onclick = this.onclick.bind(this);
  }

  onclick() {
    const cur = this.state.collapse_state;
    this.setState({ collapse_state: !cur });
  }

  render() {
    const {
      minHeight,
      maxHeight,
      borderColor,
      collapsedInfo,
      expandedInfo,
      collapsedBoxHeight,
      children,
      expandedCollapse
    } = this.props;

    console.log("CollapsedWrapper");
    console.log(this.props);
    const collapsed_style = {
      maxHeight: this.state.collapse_state ? maxHeight : "700px",
      minHeight: !this.state.collapse_state ? minHeight : "0px",
      overflow: this.state.collapse_state ? "hidden" : "",
      width: "100%",
      fontSize: "14px"
    };

    const renderExpandedWrapper = (expandedCollapse) => {
      if (expandedCollapse) {
        return (
          <div
            className={styles.expandedWrapper}
            onClick={this.onclick}
            style={{
              height: "24px",
              display: this.state.collapse_state ? "none" : "",
              borderColor
            }}
          >
            <span>
              {expandedInfo}
              <i className={`ion-chevron-up ${styles["select-arrow-icon"]}`} />
            </span>
          </div>
        );
      }

      return null;
    };

    return (
      <div>
        <div style={collapsed_style}>{children}</div>
        <div
          className={styles.collapseWrapper}
          onClick={this.onclick}
          style={{
            height: collapsedBoxHeight,
            display: this.state.collapse_state ? "" : "none",
            borderColor
          }}
        >
          <span style={{ verticalAlign: "text-top" }}>
            {collapsedInfo}
            <i className={`ion-chevron-down ${styles["select-arrow-icon"]}`} />
          </span>
        </div>

        {renderExpandedWrapper(expandedCollapse)}
      </div>
    );
  }
}

export default CollapsedWrapper;
