import React, { Component } from "react";

import LinkWrapper from "../../LinkWrapper/LinkWrapper";
import styles from "./TypeCarousel.css";

class SingleType extends Component {
  render() {
    const { singleType } = this.props;

    return (
      <div className={`${styles.singleWrapper} singleCircleNav`}>
        <img
          src={singleType.img_sub.PC}
          alt={singleType.conclusion}
          title={singleType.title}
          className={styles.image}
        />
        <span className={styles.texts}>
          <h3 className={styles.title}>{singleType.title}</h3>
          <h4 className={styles.conclusion}>{singleType.conclusion}</h4>
        </span>
        <LinkWrapper {...singleType.see_all_button.link}>
          <button className={styles.seeThisType}>{singleType.see_all_button.text}</button>
        </LinkWrapper>
      </div>
    );
  }
}

export default SingleType;
