import React, { Component } from "react";
import SingleFilter from "./SingleFilter";
import SingleFilter_2 from "./SingleFilter_2";
import styles from "./FilterGroup.css";
import { PushDL_EventData } from "../../../Analytics/components/GA";

export default class FilterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { showAllFilters: false, filterGroupHeight: 156, filterFullHeight: {} };
    this.modifyFilterGroupContainer = this.modifyFilterGroupContainer.bind(this);
    this.recordFilterFullHeight = this.recordFilterFullHeight.bind(this);
  }

  handleViewMoreFilters() {
    if (!this.state.showAllFilters) {
      const Eventdata = {
        eventCategory: "New Filter Events",
        eventAction: "Click",
        eventLabel: "View More Filters clicked"
      };
      PushDL_EventData("normalComponentClicked", Eventdata);
    }
    this.setState({ showAllFilters: !this.state.showAllFilters });
    if (this.refs.FilterGroup !== undefined) {
      const fg = this.refs.FilterGroup.children;
      let height = 0;
      for (let i = 0; i < fg.length && i < 3; i++) {
        height += fg[i].clientHeight;
      }
      this.setState({ filterGroupHeight: height });
    }
  }

  recordFilterFullHeight(filter, height) {
    this.state.filterFullHeight[filter] = height;
  }

  modifyFilterGroupContainer(seeAllState, filter) {
    if (seeAllState) {
      this.setState({
        filterGroupHeight:
          this.state.filterGroupHeight - this.state.filterFullHeight[filter] + 52
      });
    } else {
      this.setState({
        filterGroupHeight:
          this.state.filterGroupHeight + this.state.filterFullHeight[filter] - 52
      });
    }
  }

  render() {
    if (!this.props.filters) {
      return null;
    }
    switch (this.props.mode) {
      case 1: {
        return (
          <div className={styles["filter-group"]} style={{ zIndex: "3" }}>
            <span className={styles["filter-title"]}>Filter by</span>
            {this.props.filters.map((filter) => {
              return (
                <SingleFilter
                  key={filter.id}
                  filter={filter}
                  addFilter={
                    filter["multi-slct"] === 1
                      ? this.props.addFilter
                      : this.props.changeFilter
                  }
                  removeFilter={this.props.removeFilter}
                />
              );
            })}
          </div>
        );
      }
      case 2: {
        return (
          <div className={styles["filter-group_2"]}>
            <div
              ref="FilterGroup"
              style={{
                height: this.state.showAllFilters ? "auto" : this.state.filterGroupHeight,
                overflow: "hidden"
              }}
            >
              {this.props.filters.map((filter) => {
                return (
                  <SingleFilter_2
                    key={filter.id}
                    filter={filter}
                    addFilter={
                      filter["multi-slct"] === 1
                        ? this.props.addFilter
                        : this.props.changeFilter
                    }
                    removeFilter={this.props.removeFilter}
                    specialFilters={this.props.specialFilters}
                    modifyFilterGroupContainer={this.modifyFilterGroupContainer}
                    recordFilterFullHeight={this.recordFilterFullHeight}
                    mode={1}
                  />
                );
              })}
            </div>
            {this.props.filters.length > 4 ? (
              <div
                className={styles.ViewMoreFiltersButton}
                onClick={this.handleViewMoreFilters.bind(this)}
              >
                {this.state.showAllFilters
                  ? "View Less"
                  : `View More Filters (${this.props.filters.length - 3})`}
                <i
                  className={
                    this.state.showAllFilters ? "ion-chevron-up" : "ion-chevron-down"
                  }
                  style={{ color: "black", marginLeft: "15px" }}
                />
              </div>
            ) : null}
          </div>
        );
      }
    }
  }
}
