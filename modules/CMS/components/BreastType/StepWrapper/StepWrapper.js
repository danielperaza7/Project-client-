import React, { Component } from "react";

import LinkWrapper from "../../LinkWrapper/LinkWrapper";

import styles from "./StepWrapper.css";

class StepWrapper extends Component {
  render() {
    const { step, stepNumber } = this.props;

    return (
      <div className={styles.stepWrapper}>
        <div className={styles.title}>
          <span className={styles.titleNumber}>{stepNumber}</span>
          <h3 className={styles.titleText}>{step.content.text1}</h3>
        </div>
        <div className={styles.images}>
          <div className={styles.leftCard}>
            <div className={styles.stepCardTitle}>
              {" "}
              <p>{step.content.text2}</p>
              {" "}
            </div>
            <div className={styles.stepCard}>
              <LinkWrapper {...step.images.img1.link}>
                <img
                  src={step.images.img1.PC}
                  title={step.content.text2}
                  alt={step.content.text2}
                  className={styles.Card_img}
                />
              </LinkWrapper>
              <LinkWrapper {...step.images.img2.link}>
                <img
                  src={step.images.img2.PC}
                  title={step.content.text2}
                  alt={step.content.text2}
                  className={styles.Card_img}
                />
              </LinkWrapper>
              <LinkWrapper {...step.see_more.link}>
                <div className={styles.Card_seeMore}>{step.see_more.text}</div>
              </LinkWrapper>
            </div>
          </div>
          <LinkWrapper {...step.PC_right_hand_image.link}>
            <img
              src={step.PC_right_hand_image.PC}
              title={step.content.text1}
              alt={step.content.text1}
              className={styles.rightImg}
            />
          </LinkWrapper>
        </div>
        {step.bottom_link_with_image ? (
          <LinkWrapper {...step.bottom_link_with_image.link}>
            <div className={styles.bottomBar}>
              <img
                src={step.bottom_link_with_image.image.PC}
                alt={step.bottom_link_with_image.text}
                title={step.bottom_link_with_image}
                className={styles.bottomImg}
              />
              <span className={styles.bottomText}>
                <p>{step.bottom_link_with_image.text}</p>
              </span>
            </div>
          </LinkWrapper>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default StepWrapper;
