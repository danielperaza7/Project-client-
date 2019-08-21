import React, { Component } from "react";
import { Row } from "react-bootstrap";
import styles from "./BreastTypeMobileNew.css";
import BreastTypeCard from "./BreastTypeCard";
import history from "../../../../history";

class BreastTypeMobile extends Component {
  renderBreastTypeList(BreastType) {
    const typeList = ["1", "2", "3", "4", "5", "6"].map((key) => {
      const pos = `#${key}`;
      return (
        <a href={pos} key={key}>
          <div className={styles.BreastTypeCard} key={key}>
            <img
              className={styles.BreastTypeCard_img}
              src={BreastType[key].img_main.mobile}
              alt=""
            />
            <div className={styles.BreastType_title}>{BreastType[key].title}</div>
          </div>
        </a>
      );
    });

    return (
      <div>
        <div className={styles.startTxt}>
          {BreastType["1"].title === "Petite"
            ? "Find your shape and click to learn more."
            : "开始选择你的胸型种类"}
        </div>
        <div style={{ marginLeft: "33px", marginRight: "20px" }}>{typeList}</div>
      </div>
    );
  }

  renderBreastTypeCard(BreastTypeCardInf) {
    const elements = Object.keys(BreastTypeCardInf).map((key) => {
      return (
        <div>
          <div className={styles.stepInfo}>
            <span className={styles.stepNum}>{key.substring(key.length - 1)}</span>
          </div>
          <div className={styles.text2}>{BreastTypeCardInf[key].content.text1}</div>
          <BreastTypeCard
            fakeDeviceWidth={this.props.fakeDeviceWidth}
            BreastTypeCardInfo={BreastTypeCardInf[key]}
          />
        </div>
      );
    });
    return <div className={styles.breastTypeCard}>{elements}</div>;
  }

  renderBreastTypePart(BreastType) {
    const typePartList = ["1", "2", "3", "4", "5", "6"].map((key) => {
      return (
        <div key={key} id={key}>
          <div className={styles.part_title}>{BreastType[key].title}</div>
          <div>
            <img className={styles.img_sub} src={BreastType[key].img_sub.mobile} alt="" />
            <div className={styles.conclusion}>
              {BreastType[key].conclusion}
              <button
                className={styles.buttonForCategory}
                onClick={() => history.push(`/${BreastType[key].see_all_button.link.path}`)
                }
              >
                {BreastType[key].see_all_button.text}
              </button>
            </div>
            <div className={styles.typeCard}>
              <div className={styles.recommendation}>
                {BreastType[key].recommendation}
              </div>
              {this.renderBreastTypeCard(BreastType[key].details)}
              <div className={styles.card_bottom}>
                <a href="#start">
                  <button className={styles.bottomBtn}>
                    <i className={`ion-arrow-up-a ${styles["select-arrowup-icon"]}`} />
                    <span style={{ verticalAlign: "text-top" }}>
                      {BreastType["1"].title === "Petite"
                        ? "Return to Top"
                        : "返回胸型类别"}
                    </span>
                  </button>
                </a>
                <button
                  className={styles.bottomBtn_sec}
                  onClick={() => history.push(
                    `/${BreastType[key].see_all_button_bottom.link.path}`
                  )
                  }
                >
                  {BreastType[key].see_all_button_bottom.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className={styles.typePart}>
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>{typePartList}</div>
      </div>
    );
  }

  render() {
    const { BreastType } = this.props;

    if (!BreastType || !BreastType["1"]) return null;
    return (
      <div id="start" className={styles.BreastTypeMobile}>
        <Row>{this.renderBreastTypeList(BreastType)}</Row>
        <Row>{this.renderBreastTypePart(BreastType)}</Row>
      </div>
    );
  }
}

export default BreastTypeMobile;
