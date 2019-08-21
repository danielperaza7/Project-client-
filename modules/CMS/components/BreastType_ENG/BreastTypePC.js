import React, { Component } from "react";
import _ from "lodash";

import Scroll from "react-scroll";

import TypeNav from "./TypeNav/TypeNav";
import TypeCarousel from "./TypeCarousel/TypeCarousel";
import StepWrapper from "./StepWrapper/StepWrapper";

import styles from "./BreastTypePC.css";

class BreastTypePC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: "1" // allowed is 1 ~ 6
    };

    this.handleChangeType = this.handleChangeType.bind(this);
  }

  componentDidMount() {
    try {
      if (
        typeof window !== "undefined"
        && window
        && window.location
        && window.location.hash
      ) {
        const allowedTypes = ["1", "2", "3", "4", "5", "6"];
        const type = window.location.hash.replace("#", "");
        if (allowedTypes.indexOf(type) > -1) {
          this.setState({ selectedType: type });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChangeType(key, doNotScroll) {
    this.setState({
      selectedType: key
    });
    if (!doNotScroll) {
      try {
        // window.scrollTo(0, 450);
        Scroll.animateScroll.scrollTo(450, {
          duration: 200,
          delay: 0
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const { BreastType } = this.props;

    if (!BreastType || !BreastType["1"]) {
      return null;
    }

    return (
      <div className={styles.breastTypePC}>
        <h2 className={styles.topWording}>
          {BreastType["1"].title === "Petite"
            ? "Find and click your shape here."
            : "开始选择你的胸型种类"}
          {" "}
        </h2>
        <TypeNav
          BreastType={BreastType}
          handleChangeType={this.handleChangeType}
          selectedType={this.state.selectedType}
        />
        <div className={styles.mainWrapper} ref="main">
          <TypeCarousel
            BreastType={BreastType}
            handleChangeType={this.handleChangeType}
            selectedType={this.state.selectedType}
          />
          <div className={styles.mainContent}>
            <h2 className={styles.stepTitle}>
              {BreastType[this.state.selectedType].recommendation}
            </h2>
            {_.values(BreastType[this.state.selectedType].details).map((value, index) => {
              return <StepWrapper step={value} stepNumber={index + 1} />;
            })}
          </div>
        </div>
        <TypeNav
          BreastType={BreastType}
          handleChangeType={this.handleChangeType}
          selectedType={this.state.selectedType}
        />
      </div>
    );
  }
}

export default BreastTypePC;
