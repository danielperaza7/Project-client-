import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import styles from "./SingleFilter.css";

import { PushLocal_FilterData } from "../../../Analytics/components/GA";

export default class SingleFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { optionStatus: {}, list_panel: false };
  }

  componentDidMount() {
    // let initialOptionStatus=[];
    // let options=this.props.filter.options;
    // for(let option of options){
    //   if(!option.id){
    //     console.log(option);
    //   }
    //   initialOptionStatus[option.id]=option.status;
    // }
    // this.setState({optionStatus:initialOptionStatus});
  }

  componentWillReceiveProps(props) {
    const initialOptionStatus = [];
    const options = props.filter.options;
    for (const option of options) {
      if (!option.id) {
        console.log(option);
      }
      initialOptionStatus[option.id] = option.status;
    }
    this.setState({ optionStatus: initialOptionStatus });
  }

  handleChangeOption(option) {
    if (this.state.optionStatus[option.id] === -1) return;
    if (this.state.optionStatus[option.id] === 1) {
      // this.setState({optionStatus:{...this.state.optionStatus,[option.id]:0}});
      this.props.removeFilter(this.props.filter.id, option);
    } else {
      // this.setState({optionStatus:{...this.state.optionStatus,[option.label]:1}});
      this.props.addFilter(this.props.filter.id, option);

      PushLocal_FilterData(this.props.filter.id, option.name);
    }
  }

  renderMenuOption(option, index, multiselect) {
    // console.log('renderMenuOption called')
    // if( option.id = "Pink Label"){
    //   console.log(option.id)
    //   console.log(this.state.optionStatus)
    // }

    let optionItem = null;
    switch (this.state.optionStatus[option.id]) {
      case -1: {
        // not available option
        optionItem = (
          <div className={`${styles.disabled} ${styles.option}`}>
            <span className={styles.nocheck}>{option.name}</span>
          </div>
        );
        break;
      }
      case 1: {
        // selected
        optionItem = (
          <div className={`${styles.option}`}>
            <span className={styles.checkboxIcon}>
              <i className="ion-android-done" />
            </span>
            <span className={styles.check}>{option.name}</span>
          </div>
        );
        break;
      }
      default: {
        optionItem = (
          <div className={styles.option}>
            <span className={styles.nocheck}>{option.name}</span>
          </div>
        );
        break;
      }
    }
    return (
      <MenuItem
        className={multiselect === 0 ? styles.radio : ""}
        eventKey={index}
        key={option.id}
        onClick={() => this.handleChangeOption(option)}
      >
        {optionItem}
      </MenuItem>
    );
  }

  render() {
    const filter = this.props.filter;
    const optionList = filter.options.map((option, index) => {
      return this.renderMenuOption(option, index, filter["multi-slct"]);
    });
    return (
      <DropdownButton
        style={{ zIndex: "1010" }}
        className={styles.filter_btn}
        bsStyle="link"
        title={filter.name}
        key={filter.id}
        id={`filter-${filter.id}`}
        onMouseEnter={() => {
          this.setState({ list_panel: true });
        }}
        onMouseLeave={() => {
          this.setState({ list_panel: false });
        }}
        onTouchStart={() => {
          this.setState({ list_panel: true });
        }}
        open={this.state.list_panel}
        onToggle={() => {}}
      >
        <div className={styles["option-panel"]} id={`option-panel-${filter.id}`}>
          {optionList}
        </div>
      </DropdownButton>
    );
  }
}
