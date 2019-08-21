import React, { Component } from "react";
import {
  Button, Modal, Nav, NavItem
} from "react-bootstrap";
import { connect } from "react-redux";

import { PushLocal_FilterData } from "../../../../Analytics/components/GA";

import styles from "./MobileFilterGroup.css";

class MobileFilterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showFilter: 0,
      showOptionState: false,
      optionStatus: this.props.optionStatus
    };
    this.removeState.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.optionStatus.sum !== this.state.optionStatus.sum) {
      this.setState({ optionStatus: nextProps.optionStatus });
    }
  }

  close() {
    this.setState({ ...this.state, showModal: false });
  }

  open() {
    this.setState({ ...this.state, showModal: true });
  }

  handleSelect(selectKey) {
    this.setState({ ...this.state, showFilter: selectKey });
  }

  removeState(ele, filter) {
    ele.setAttribute("style", "display:none");
    const cur = this.state.optionStatus[filter.id];
    const status = JSON.parse(JSON.stringify(this.state.optionStatus));
    status[filter.id] = cur - 1;
    this.setState({ optionStatus: status });
    if (cur - 1 === 0) this.setState({ showOptionState: false });
  }

  clearAll() {
    this.props.clearAllFilters();
    this.setState({ showOptionState: false });
  }

  // for mobile we can trigger url change until user click apply instead of when clicking every option
  handleChangeOption(filter, option) {
    let cur = this.state.optionStatus[filter.id];
    cur = cur === undefined ? 0 : cur;
    const status = JSON.parse(JSON.stringify(this.state.optionStatus));
    if (option.status === -1) {
      return;
    }
    if (option.status === 1) {
      this.props.removeFilter(filter.id, option);
      status[filter.id] = cur - 1;
      this.setState({ optionStatus: status });
      cur -= 1;
      if (cur === 0) this.setState({ showOptionState: false });
    } else {
      if (filter["multi-slct"] === 1) {
        status[filter.id] = cur + 1;
        this.setState({ optionStatus: status });
        this.setState({ showOptionState: true });
        this.props.addFilter(filter.id, option);
      } else {
        this.props.changeFilter(filter.id, option);
      }

      PushLocal_FilterData(filter.id, option.name);
    }
  }

  showFilterOptions() {
    const filter = this.props.filters[this.state.showFilter];
    if (!filter || !filter.options) return <p>loading</p>;
    return (
      <ul className={styles.optionList}>
        {filter.options.map((option) => {
          return this.renderMenuOption(option, filter, filter["multi-slct"]);
        })}
      </ul>
    );
  }

  showFilterStates() {
    const filters = this.props.filters;
    if (!filters) {
      return <p>loading</p>;
    }
    let show_stateList = false;
    filters.map((filter) => {
      if (!filter || !filter.options) return <p>loading</p>;
      return filter.options.map((option) => {
        if (option.status === 1) {
          show_stateList = true;
        }
        return undefined;
      });
    });
    if (!show_stateList) return <p>loading</p>;
    return (
      <div style={{ display: "flex" }} className={styles.filterState}>
        <ul className={styles.stateList}>
          {filters.map((filter) => {
            if (!filter || !filter.options) return <p>loading</p>;
            return filter.options.map((option) => {
              if (option.status === 1) {
                return this.renderState(option, filter);
              }
              return undefined;
            });
          })}
        </ul>
        <Button
          className={styles.clear_btn_bottom}
          bsClass="link"
          onClick={this.clearAll}
        >
          Clear All
        </Button>
      </div>
    );
  }

  renderMenuOption(option, filter, multiselect) {
    let optionItem = null;

    switch (option.status) {
      case -1: {
        // not available option
        optionItem = (
          <div className={`${styles.disabled} ${styles.option}`}>
            <span>{option.name}</span>
          </div>
        );
        break;
      }
      case 1: {
        // selected
        optionItem = (
          <div
            className={
              option.name === "Style" ? styles.option_for_style : styles.option_for_others
            }
            style={{ borderColor: "black" }}
          >
            <i
              className="ion-android-done"
              style={{ fontSize: "11px", marginLeft: "-13px", marginRight: "5px" }}
            />
            <span>{option.name}</span>
          </div>
        );
        break;
      }
      default: {
        optionItem = (
          <div
            className={
              option.name === "Style" ? styles.option_for_style : styles.option_for_others
            }
          >
            <span>{option.name}</span>
          </div>
        );
        break;
      }
    }
    return (
      <li
        className={
          multiselect === 0
            ? styles.radio
            : filter.name === "Style"
              ? ""
              : styles.optionlist_for_others
        }
        key={option.id}
        onClick={() => this.handleChangeOption(filter, option)}
      >
        {optionItem}
      </li>
    );
  }

  renderState(option, filter) {
    return (
      <div className={styles["single-state"]}>
        <span
          className={styles.state}
          key={`${filter.id}-${option.id}`}
          onClick={(event) => {
            this.props.removeFilter(filter.id, option);
            this.removeState(event.currentTarget);
          }}
        >
          {option.name}
          <span className={styles.cross}>&#x2715;</span>
        </span>
      </div>
    );
  }

  renderFilterList() {
    return (
      <Nav
        stacked
        activeKey={this.state.showFilter}
        onSelect={(selectKey) => {
          this.handleSelect(selectKey);
        }}
      >
        {this.props.filters.map((filter, index) => {
          const current = this.props.optionStatus[filter.id];
          return (
            <NavItem eventKey={index} key={filter.id}>
              {filter.name}
              <span
                className={styles.countItems}
                style={{ display: current === undefined || current <= 0 ? "none" : "" }}
              >
                {current === undefined || current <= 0 ? "" : current}
              </span>
            </NavItem>
          );
        })}
      </Nav>
    );
  }

  render() {
    if (!this.props.filters) {
      return null;
    }
    // let resSum=this.props.optionStatus.sum-(this.props.optionStatus[this.props.specialFiltersItem]===undefined?0:this.props.optionStatus[this.props.specialFiltersItem])
    let resSum = 0;
    if (this.props.optionStatus && this.props.optionStatus.sum !== undefined) {
      resSum = this.props.optionStatus.sum
        - (this.props.optionStatus[this.props.specialFiltersItem] === undefined
          ? 0
          : this.props.optionStatus[this.props.specialFiltersItem]);
    }
    return (
      <div className={styles.mobile_filter_btn}>
        <Button
          className={styles.filter_btn_top}
          bsStyle="link"
          onClick={() => {
            this.open();
          }}
        >
          {"Filter by"}
          {resSum !== 0 ? (
            <span
              className={styles.countItems_sum}
              style={{ display: resSum !== 0 ? "" : "none" }}
            >
              {!resSum ? "" : resSum}
            </span>
          ) : (
            <i
              className="ion-chevron-right"
              style={{ color: "black", marginLeft: "15px" }}
            />
          )}
        </Button>
        <Modal
          className={styles.mobile_filter_group}
          show={this.state.showModal}
          onHide={() => {
            this.close();
          }}
        >
          <Modal.Header>
            <span className={styles.filter_letters}>Filter</span>
            <Button
              className={styles.filter_btn_bottom}
              bsClass="link"
              onClick={() => {
                this.close();
              }}
            >
              APPLY
              {" "}
              <i className="ion-chevron-right" style={{ marginLeft: "10px" }} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: resSum ? "" : "none" }}>{this.showFilterStates()}</div>
            <div
              className={
                this.state.optionStatus && this.state.optionStatus.sum !== 0
                  ? styles.filterList_selected
                  : styles.filterList
              }
              style={{
                height:
                  this.state.optionStatus && this.state.optionStatus.sum
                    ? "calc(100% - 52px)"
                    : "100%"
              }}
            >
              {this.renderFilterList()}
            </div>
            <div
              className={
                this.state.optionStatus && this.state.optionStatus.sum !== 0
                  ? styles.showFilter_selected
                  : styles.showFilter
              }
              style={{
                height:
                  this.state.optionStatus && this.state.optionStatus.sum
                    ? "calc(100% - 52px)"
                    : "100%"
              }}
            >
              {this.showFilterOptions()}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default connect()(MobileFilterGroup);
