import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import styles from "./SingleFilter_2.css";

import { PushLocal_FilterData } from "../../../Analytics/components/GA";

export default class SingleFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionStatus: {},
      specialOptionStatus: {},
      list_panel: false,
      seeAllState: true,
      seeAllButton: false
    };
    this.getClientWidth = _.debounce(this.getClientWidth, 500).bind(this);
  }

  componentDidMount() {
    this.setState({
      clientWidth: window.document.documentElement.clientWidth
    });
    if (this.props.filter && this.props.filter.name && this.props.filter.id) {
      if (this.props.mode === 1) {
        const ele = ReactDOM.findDOMNode(this.refs[this.props.filter.name]);
        if (this.props.recordFilterFullHeight) {
          this.props.recordFilterFullHeight(this.props.filter.id, ele.clientHeight);
        }
        if (ele.clientHeight > 52 && !this.props.specialFilters) {
          this.setState({ seeAllButton: true });
          this.setState({ seeAllState: false });
        }
      }
    }
    window.addEventListener("resize", this.getClientWidth);
  }

  componentWillReceiveProps(props) {
    const initialOptionStatus = [];
    const initialSpecialOptionStatus = [];
    const options = props.filter.options;
    let AllStates = 1;
    for (const option of options) {
      if (!this.props.specialFilters) {
        initialOptionStatus[option.id] = option.status;
      } else {
        initialSpecialOptionStatus[option.id] = option.status;
        if (option.status === 1) {
          AllStates = 0;
        }
      }
    }
    initialSpecialOptionStatus.All = AllStates;
    this.setState({
      optionStatus: initialOptionStatus,
      specialOptionStatus: initialSpecialOptionStatus
    });
  }

  getClientWidth() {
    this.setState({ clientWidth: window.document.documentElement.clientWidth });
  }

  handleChangeOption(option) {
    if (this.state.optionStatus[option.id] == -1) return;
    if (this.state.optionStatus[option.id] == 1) {
      this.props.removeFilter(this.props.filter.id, option);
    } else {
      this.props.addFilter(this.props.filter.id, option);

      PushLocal_FilterData(this.props.filter.id, option.name);
    }
  }

  handleSeeAllEvent() {
    this.setState({ seeAllState: !this.state.seeAllState });
    this.props.modifyFilterGroupContainer(this.state.seeAllState, this.props.filter.id);
  }

  handleSpecialFilterChangeOption_All() {
    this.props.clearAllSpecialFilters();
    PushLocal_FilterData(this.props.filter.id, "All");
  }

  handleSpecialFilterChangeOption(option) {
    const id = option.id;
    if (this.props.multiSelection) {
      if (this.state.specialOptionStatus[option.id] === 1) {
        this.props.removeSpecialFilter(this.props.filter.id, option);
      } else {
        this.props.addSpecialFilter(this.props.filter.id, option);
        PushLocal_FilterData(this.props.filter.id, option.name);
      }
    } else if (
      this.state.specialOptionStatus[id] === undefined
      || this.state.specialOptionStatus[id] === 0
    ) {
      this.props.changeFilter(this.props.filter.id, option);
      PushLocal_FilterData(this.props.filter.id, option.name);
    }
  }

  renderMenuOption(option /* index, multiselect */) {
    // build normal or special filter option items.
    if (!this.state.optionStatus) return null;
    switch (
      this.state.optionStatus[option.id] || this.state.specialOptionStatus[option.id]
    ) {
      case -1: {
        // not available option
        return (
          <div className={`${styles.disabled} ${styles.option}`}>
            <span className={styles.nocheck}>{option.name}</span>
          </div>
        );
      }
      case 1: {
        // selected
        return this.props.specialFilters ? (
          <div
            className={
              this.state.clientWidth > 992
                ? styles.CheckedSpecialOption
                : styles.mobileCheckedSpecialOption
            }
            onClick={() => this.handleSpecialFilterChangeOption(option)}
          >
            <div
              className={styles.specialFilterLable}
              style={{ height: this.state.clientWidth > 992 ? "45%" : "40%" }}
            >
              <div
                style={{ alignSelf: "flex-end", marginRight: "auto", marginLeft: "auto" }}
              >
                {option.name.toUpperCase()}
              </div>
            </div>
            <img
              className={styles.specialFilterPicture}
              src={`https://hiddenfigure.evestemptation.com/email/Category/${encodeURIComponent(
                option.id.toLowerCase()
              )}_gold.svg`}
              alt={`${option.name} Pic`}
            />
          </div>
        ) : (
          <div
            className={styles.CheckedOption}
            onClick={() => {
              this.handleChangeOption(option);
            }}
          >
            {option.name}
          </div>
        );
      }
      default: {
        return this.props.specialFilters ? (
          <div
            className={
              this.state.clientWidth > 992
                ? styles.SpecialOption
                : styles.mobileSpecialOption
            }
            style={{
              border: this.props.multiSelection ? "2px solid rgba(00,00,00,0.05)" : "none"
            }}
            onClick={() => this.handleSpecialFilterChangeOption(option)}
          >
            <div
              className={styles.specialFilterLable}
              style={{ height: this.state.clientWidth > 992 ? "45%" : "40%" }}
            >
              <div
                style={{ alignSelf: "flex-end", marginRight: "auto", marginLeft: "auto" }}
              >
                {option.name.toUpperCase()}
              </div>
            </div>
            <img
              className={styles.specialFilterPicture}
              src={`https://hiddenfigure.evestemptation.com/email/Category/${encodeURIComponent(
                option.id.toLowerCase()
              )}.svg`}
              alt={`${option.name} pic`}
            />
          </div>
        ) : (
          <div
            className={styles.option}
            onClick={() => {
              this.handleChangeOption(option);
            }}
          >
            {option.name}
          </div>
        );
      }
    }
  }

  render() {
    const filter = this.props.filter;
    const optionList = filter.options.map((option, index) => {
      return this.renderMenuOption(option, index, filter["multi-slct"]);
    });
    if (this.props.specialFilters && filter.options.length > 1) {
      // build ALL fucntion button in special filters
      const allButton = this.state.specialOptionStatus.All === 1 ? (
        <div
          className={
              this.state.clientWidth > 992
                ? styles.CheckedSpecialOption
                : styles.mobileCheckedSpecialOption
            }
          onClick={this.handleSpecialFilterChangeOption_All.bind(this)}
        >
          <div
            className={styles.specialFilterLable}
            style={{ height: this.state.clientWidth > 992 ? "45%" : "40%" }}
          >
            <div
              style={{ alignSelf: "flex-end", marginRight: "auto", marginLeft: "auto" }}
            >
              {"ALL"}
            </div>
          </div>
          <img
            className={styles.specialFilterPicture}
            src="https://hiddenfigure.evestemptation.com/email/Category/all_gold.svg"
            alt="All Button Pic"
          />
        </div>
      ) : (
        <div
          className={
              this.state.clientWidth > 992
                ? styles.SpecialOption
                : styles.mobileSpecialOption
            }
          style={{ border: "none" }}
          onClick={this.handleSpecialFilterChangeOption_All.bind(this)}
        >
          <div
            className={styles.specialFilterLable}
            style={{ height: this.state.clientWidth > 992 ? "45%" : "40%" }}
          >
            <div
              style={{ alignSelf: "flex-end", marginRight: "auto", marginLeft: "auto" }}
            >
              {"ALL"}
            </div>
          </div>
          <img
            className={styles.specialFilterPicture}
            src="https://hiddenfigure.evestemptation.com/email/Category/all.svg"
            alt="All Button Pic"
          />
        </div>
      );
      optionList.splice(0, 0, allButton);
    }
    switch (this.props.mode) {
      case 1: {
        return this.props.specialFilters ? (
          <div className={styles.SpecialFilterContainer} ref={filter.name}>
            {optionList}
          </div>
        ) : (
          <div className={styles.SingleFilterContainer} ref={`${filter.name}Container`}>
            <div className={styles["option-title"]}>
              {filter.name}
:
            </div>
            <div
              className={
                this.state.seeAllState
                  ? styles["option-panel"]
                  : styles["option-panel-see-less"]
              }
              ref={filter.name}
            >
              {optionList}
            </div>
            {this.state.seeAllButton ? (
              <div
                className={styles["seeall-panel"]}
                ref={`${this.props.filter.name}SeeAll`}
                onClick={this.handleSeeAllEvent.bind(this)}
              >
                {this.state.seeAllState ? "See Less" : "See All"}
              </div>
            ) : null}
          </div>
        );
      }
      case 2: {
        return (
          <div
            className={
              this.state.clientWidth > 400
                ? styles.SpecialFilterContainer
                : styles.MobileSpecialFilterContainer
            }
          >
            {optionList}
          </div>
        );
      }
      default:
        return null;
    }
  }
}
