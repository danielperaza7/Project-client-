/*
  Config panel, choose color and size etc
*/

import React, { Component } from "react";
import { ButtonToolbar, Modal } from "react-bootstrap";
import _ from "lodash";
import SizeGuide from "../../../../CMS/components/SizeGuide/SizeGuide";
import ErrorTag from "../../../../../components/ErrorTag/ErrorTag";

import styles from "./ConfigPanel.css";

export default class ConfigPanel extends Component {
  constructor(props) {
    super(props);
    const unavailable = _.mapValues(this.props.configs, () => {
      return false;
    });
    this.state = {
      show: false,
      optionsStates: null,
      unavailable
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentWillMount() {
    this.updateOptionsStates(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateOptionsStates(props);
  }

  updateOptionsStates(props) {
    // get each option avail and instock status
    const {
      configs, configsStatus, simples, isKit
    } = props;
    // console.log('updateOptionsStates', props);
    const newOptionsStates = {};
    for (const configKey in configs) {
      newOptionsStates[configKey] = {};
      configs[configKey].options.forEach((option) => {
        newOptionsStates[configKey][option.id] = {};
        // copy current selected config
        const newSelected = JSON.parse(JSON.stringify(configsStatus));
        // assume this option is selected
        newSelected[configKey].selected = option.id;
        // go through simples to see any match any in stock
        let match = false;
        let inStock = false;
        simples.forEach((simple) => {
          let satisfyAllKeys = true;
          for (const _configKey in newSelected) {
            if (newSelected[_configKey].selected !== null) {
              const matchIndex = _.findIndex(simple.config[_configKey], {
                id: newSelected[_configKey].selected
              });
              if (matchIndex < 0) {
                satisfyAllKeys = false;
              }
            }
          }
          if (satisfyAllKeys || configKey === "price") {
            match = true;
            if (isKit) {
              inStock = true;
            } else if (simple.stock && simple.stock.in_stock && simple.stock.qty > 0) {
              inStock = true;
            }
          }
        });
        newOptionsStates[configKey][option.id].avail = match;
        newOptionsStates[configKey][option.id].inStock = inStock;
      });
    }
    this.setState({
      optionsStates: newOptionsStates
    });
  }

  hideModal() {
    this.setState({
      show: false
    });
  }

  showModal() {
    this.setState({
      show: true
    });
  }

  renderConfig(id, name) {
    // return <text>Hello World</text>;

    // console.log('renderConfig', this.props);
    if (!this.props.configs) return;
    const localConfig = this.props.configs[id];
    // if config does not exist, return nothing
    if (localConfig == null) {
      return;
    }
    // Get selected value name
    const optionIndex = _.findIndex(localConfig.options, [
      "id",
      this.props.configsStatus[id].selected
    ]);
    const optionName = optionIndex >= 0 ? localConfig.options[optionIndex].name : "";
    // render options in e.g. color
    const options = localConfig.options.map((option) => {
      const avail = this.state.optionsStates
        && this.state.optionsStates[id][option.id].avail
        && this.state.optionsStates[id][option.id].inStock
        ? styles.avail
        : styles["n-avail"];
      const selected = this.props.configsStatus[id].selected === option.id ? styles.selected : "";
      const buttonContent = option.image ? (
        <img src={option.image} alt="" />
      ) : (
        <span className={styles["option-name"]}>
          {" "}
          {option.name}
          {" "}
        </span>
      );
      // console.log('avail selected buttoncontent', avail, selected, buttonContent);
      return (
        <button
          className={`${avail} ${selected} ${option.image ? styles.imageBtn : ""}`}
          key={option.id}
          onClick={() => {
            this.props.selectConfig(id, option.id);
          }}
        >
          {buttonContent}
        </button>
      );
    });
    return (
      <div>
        {!this.props.configsStatus[`${id}`].selected && this.props.remind_user ? (
          <ErrorTag>
            {" "}
            {`Please select ${name.toUpperCase()}`}
            {" "}
          </ErrorTag>
        ) : (
          ""
        )}
        <span>
          {name}
:
          {" "}
        </span>
        <span className={styles["option-title-current-option"]}>{optionName}</span>
        {this.state.unavailable[`${id}`] ? (
          <span style={{ color: "red" }}>unavailable</span>
        ) : (
          ""
        )}
        {(id === "size"
          || id === "band_size"
          || (id === "cup_size" && !this.props.configs.band_size))
        && (this.props.selectedCategory && this.props.selectedCategory !== "") ? (
          <span
            className={styles.sizeGuideBtn}
            onClick={() => {
              this.showModal();
            }}
          >
            Size & Fit
          </span>
          ) : null}
        <ButtonToolbar className={styles["button-toolbar"]}>{options}</ButtonToolbar>
      </div>
    );
  }

  render() {
    return (
      <div className={styles["config-panel"]}>
        <div>{this.renderConfig("color", "Color")}</div>
        <div>{this.renderConfig("size", "Size")}</div>
        <div>{this.renderConfig("band_size", "Band Size")}</div>
        <div>{this.renderConfig("cup_size", "Cup Size")}</div>
        <div>{this.renderConfig("price", "Value")}</div>

        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName={styles["sizeguide-modal"]}
        >
          <Modal.Header closeButton>
            <Modal.Title className={styles.sizeGuideHeader}>
              Size and Fit Guide
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SizeGuide selectedCategory={this.props.selectedCategory} />
          </Modal.Body>
          <Modal.Footer>
            <button className={styles.close} onClick={this.hideModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
