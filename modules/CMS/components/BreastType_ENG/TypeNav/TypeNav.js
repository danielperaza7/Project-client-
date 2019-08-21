import React, { Component } from "react";
import _ from "lodash";

import styles from "./TypeNav.css";

class TypeNav extends Component {
  render() {
    const { BreastType, handleChangeType, selectedType } = this.props;

    if (!BreastType) {
      return null;
    }

    const PC_list = _.map(BreastType, (value, key) => {
      return (
        <div
          key={key}
          className={`${styles.singleWrapper} singleCircleNav`}
          onClick={() => {
            handleChangeType(key);
          }}
        >
          <span
            className={
              key === selectedType
                ? `${styles.imageHolderOuter} ${styles.imageHolderOuterSelected}`
                : styles.imageHolderOuter
            }
          >
            <span className={styles.imageHolderInner}>
              <img
                src={value.img_main.PC}
                alt={value.conclusion}
                title={value.title}
                className={styles.image}
              />
            </span>
          </span>
          <h3 className={styles.title}>{value.title}</h3>
        </div>
      );
    });
    // console.log("=====", PC_list);

    return <div className={`${styles.wrapper} circleNavWrapper`}>{PC_list}</div>;
  }
}

export default TypeNav;
