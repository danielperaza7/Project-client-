import React, { Component } from "react";
import MediaQuery from "react-responsive";
import styles from "./BreastTypeCard.css";
import history from "../../../../history";

class BreastTypeCard extends Component {
  render() {
    const { BreastTypeCardInfo, fakeDeviceWidth } = this.props;

    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };

    const responsive_list = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      if (key === "xs") {
        return (
          <MediaQuery
            minWidth={width_configs.min[key]}
            maxWidth={width_configs.max[key]}
            values={{ width: fakeDeviceWidth }}
            key={key}
          >
            <div
              style={{
                fontSize: "12px",
                letterSapcing: "2px",
                display: "inline-block",
                fontFamily: "GothamBook",
                paddingTop: "20px",
                paddingBottom: "10px"
              }}
            >
              {" "}
              {BreastTypeCardInfo.content.text2}
            </div>
            <div style={{ display: "inline-block", marginBottom: "20px" }}>
              <img
                className={styles.Card_img1_mobile}
                src={BreastTypeCardInfo.images.img1.mobile}
                alt=""
                onClick={() => {
                  history.push(`/${BreastTypeCardInfo.images.img1.link.path}`);
                }}
              />
              <img
                className={styles.Card_img1_mobile}
                id="card"
                src={BreastTypeCardInfo.images.img2.mobile}
                alt=""
                onClick={() => {
                  history.push(`/${BreastTypeCardInfo.images.img2.link.path}`);
                }}
              />
              <div
                className={styles.Card_seeMore_mobile}
                style={{ height: "100%" }}
                onClick={() => {
                  history.push(`/${BreastTypeCardInfo.see_more.link.path}`);
                }}
              >
                {" "}
                {BreastTypeCardInfo.see_more.text}
                {" "}
              </div>
            </div>
            {BreastTypeCardInfo.bottom_link_with_image ? (
              <button
                className={styles.bottom_btn}
                onClick={() => history.push(
                  `/${BreastTypeCardInfo.bottom_link_with_image.link.path}`
                )
                }
              >
                <img
                  src={BreastTypeCardInfo.bottom_link_with_image.image.mobile}
                  alt=""
                />
                <div
                  style={{ textAlign: "left", paddingTop: "8px", paddingLeft: "31.3%" }}
                >
                  {BreastTypeCardInfo.bottom_link_with_image.text}
                </div>
              </button>
            ) : null}
          </MediaQuery>
        );
      } if (key === "sm") {
        return (
          <MediaQuery
            minWidth={width_configs.min[key]}
            maxWidth={width_configs.max[key]}
            values={{ width: fakeDeviceWidth }}
            key={key}
          >
            <div
              style={{ fontSize: "14px", display: "inline-block", fontWeight: "bolder" }}
            >
              {" "}
              {BreastTypeCardInfo.content.text2}
            </div>
            <div>
              <img
                className={styles.Card_img1_tablet}
                src={BreastTypeCardInfo.images.img1.PC}
                alt=""
              />
              <img
                className={styles.Card_img1_tablet}
                src={BreastTypeCardInfo.images.img2.PC}
                alt=""
              />
              <div className={styles.Card_seeMore_tablet}>
                {" "}
                {BreastTypeCardInfo.see_more.text}
                {" "}
              </div>
            </div>
          </MediaQuery>
        );
      }
      return (
        <MediaQuery
          minWidth={width_configs.min[key]}
          maxWidth={width_configs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          <div
            style={{ fontSize: "14px", display: "inline-block", fontWeight: "bolder" }}
          >
            {" "}
            {BreastTypeCardInfo.content.text2}
          </div>
          <div>
            <img
              className={styles.Card_img1_pc}
              src={BreastTypeCardInfo.images.img1.PC}
              alt=""
            />
            <img
              className={styles.Card_img1_pc}
              src={BreastTypeCardInfo.images.img2.PC}
              alt=""
            />
            <div className={styles.Card_seeMore_pc}>
              {" "}
              {BreastTypeCardInfo.see_more.text}
              {" "}
            </div>
          </div>
        </MediaQuery>
      );
    });

    return (
      <div style={{ borderTop: "1px solid #E4D8BF", marginTop: "-28px" }}>
        {responsive_list}
      </div>
    );
  }
}

export default BreastTypeCard;
