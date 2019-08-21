import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./StateGroup.css";
import { hasActiveFilter } from "../../../CategoryActions.js";

class StateGroup extends Component {
  constructor(props) {
    super(props);
    this.removeState.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.filters) {
      let hasFilter = false;
      for (const filter of props.filters) {
        for (const option of filter.options) {
          if (option.status === 1) {
            hasFilter = true;
          }
        }
      }
      this.props.dispatch(hasActiveFilter(hasFilter));
    }
  }

  removeState(ele) {
    ele.setAttribute("style", "display:none");
  }

  render() {
    if (!this.props.filters || this.props.filters.length === 0) {
      return null;
    }
    return (
      <div className={styles["state-group-wrapper"]}>
        {this.props.filters.map((filter) => {
          return filter.options.map((option) => {
            if (option.status === 1) {
              return (
                <div key={option.id} className={styles["single-state"]}>
                  <div
                    className={styles.state}
                    onClick={(event) => {
                      this.props.removeFilter(filter.id, option);
                      this.removeState(event.currentTarget);
                    }}
                  >
                    <div className={styles.cross}>&#x2715;</div>
                    {option.name}
                  </div>
                </div>
              );
            }
            return undefined;
          });
        })}
      </div>
    );
  }
}

export default connect()(StateGroup);
