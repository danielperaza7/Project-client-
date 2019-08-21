import React, { Component } from "react";
import _ from "lodash";

import styles from "./clearanceTypeMobile.css";

class ClearanceTypeMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.renderSizeCard = this.renderSizeCard.bind(this);
    this.renderSizeCardList = this.renderSizeCardList.bind(this);
    this.selectProductSize = this.selectProductSize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { product_type, querySelection } = nextProps;
    if (product_type == "1") {
      if (!querySelection.cupSize) this.setState({ error: "please select cup size!" });
      else if (!querySelection.lowerBreast) {
        this.setState({ error: "please select lowerBreast size!" });
      }
    } else if (!querySelection.normalSize) {
      this.setState({ error: "please select lowerBreast size!" });
    }
  }

  selectProductSize(size, type) {
    this.setState({ error: "" });
    this.props.selectProductSize(size, type);
  }

  renderSizeCard(sizeList, type) {
    const { querySelection } = this.props;
    const elements_size = [];
    const size_type = type === ""
      ? "normalSize"
      : type === "罩杯" || type === "Cup"
        ? "cupSize"
        : "lowerBreast";
    for (let k = 0; k < sizeList.length; k++) {
      elements_size.push(
        <div
          className={
            querySelection[size_type] == sizeList[k]
              ? styles.sizeCard_BTN_selected
              : styles.sizeCard_BTN
          }
          key={k}
          onClick={() => this.selectProductSize(sizeList[k], size_type)}
        >
          <span>{sizeList[k]}</span>
        </div>
      );
    }
    return elements_size;
  }

  renderSizeCardList() {
    const { ClearanceType, product_type } = this.props;

    const sizePartList = [];
    for (let i = 0; i < ClearanceType[product_type].sizeComponent.length; i++) {
      const clearanceSizeType = ClearanceType[product_type].sizeComponent[i];
      const clearanceSizeList = clearanceSizeType.componentContent;
      sizePartList.push(
        <div key={i + clearanceSizeType.componentName} className={styles.sizeCard}>
          <div className={styles.componentName}>
            {`${
              clearanceSizeType.componentName ? `${clearanceSizeType.componentName}:` : ""
            }`}
          </div>
          <div className={styles.sizeCardWrapper}>
            {this.renderSizeCard(clearanceSizeList, clearanceSizeType.componentName)}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.sizeDetail}>
        <h2
          className={styles.sizeDetail_title}
          style={{ marginBottom: product_type != "1" ? "24px" : "" }}
        >
          {ClearanceType[product_type].sizeSelectionTitle}
        </h2>
        {sizePartList}
      </div>
    );
  }

  render() {
    const {
      ClearanceType,
      product_type,
      goToCategory,
      language
    } = this.props;

    if (!ClearanceType || !ClearanceType["1"]) {
      return null;
    }

    const typePartList = ["1", "2", "3"].map((key) => {
      return (
        <div
          className={
            product_type === key
              ? styles.ClearanceType_BTN_selected
              : styles.ClearanceType_BTN
          }
          key={key}
          onClick={() => this.props.selectProductType(ClearanceType, key)}
        >
          <span>{ClearanceType[key].typeName}</span>
        </div>
      );
    });

    return (
      <div
        className={styles.clearanceTypeWrapper}
        style={{ fontFamily: language === "en" ? "GothamBook" : "PingFang SC" }}
      >
        <h2 className={styles.topWording}>
          {language === "en" ? "Select a category" : "请选择分类"}
        </h2>
        <div
          className={styles.clearanceType}
          style={{ borderBottom: product_type == "0" ? "none" : "" }}
        >
          {typePartList}
        </div>
        {product_type == "0" ? null : <div>{this.renderSizeCardList()}</div>}
        {product_type == "0" ? null : (
          <button
            className={styles.btn_bottom}
            disabled={this.state.error}
            onClick={goToCategory}
          >
            {ClearanceType[product_type].bottom_button_text}
          </button>
        )}
      </div>
    );
  }
}

export default ClearanceTypeMobile;
