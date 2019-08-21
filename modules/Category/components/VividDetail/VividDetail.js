import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import { getClientMD } from "../../../App/AppReducer";

import styles from "./VividDetail.css";

class VividDetail extends Component {
  renderText(title, content, clientWidth) {
    return (
      <div className={styles["text-col"]}>
        <div className={styles["text-wrapper"]}>
          <h3 className={styles.title}>{title}</h3>
          <MediaQuery minWidth={768} values={{ width: clientWidth }}>
            <p className={styles.content}>{content}</p>
          </MediaQuery>
        </div>
      </div>
    );
  }

  renderImage(image, clientWidth) {
    if (image.device) {
      const urls = {
        xl: image.device.pc ? image.device.pc.xl : "",
        lg: image.device.pc ? image.device.pc.xl : "",
        md: image.device.pc ? image.device.pc.xl : "",
        sm: image.device.pc ? image.device.pc.lg : "",
        xs: image.device.mobile ? image.device.mobile.lg : ""
      };
      return (
        <div className={styles["image-col"]}>
          <MediaQuery minWidth={1440} values={{ width: clientWidth }}>
            <img
              className={styles.image}
              src={urls.xl}
              alt={image.alt || image.title || ""}
              title={image.title || image.alt || ""}
            />
          </MediaQuery>

          <MediaQuery minWidth={1200} maxWidth={1439} values={{ width: clientWidth }}>
            <img
              className={styles.image}
              src={urls.lg}
              alt={image.alt || image.title || ""}
              title={image.title || image.alt || ""}
            />
          </MediaQuery>

          <MediaQuery minWidth={992} maxWidth={1199} values={{ width: clientWidth }}>
            <img
              className={styles.image}
              src={urls.md}
              alt={image.alt || image.title || ""}
              title={image.title || image.alt || ""}
            />
          </MediaQuery>

          <MediaQuery minWidth={768} maxWidth={991} values={{ width: clientWidth }}>
            <img
              className={styles.image}
              src={urls.sm}
              alt={image.alt || image.title || ""}
              title={image.title || image.alt || ""}
            />
          </MediaQuery>

          <MediaQuery maxWidth={767} values={{ width: clientWidth }}>
            <img
              className={styles.image}
              src={urls.xs}
              alt={image.alt || image.title || ""}
              title={image.title || image.alt || ""}
            />
          </MediaQuery>
        </div>
      );
    }
    return <div className={styles["image-col"]}>{image.alt || image.title || ""}</div>;
  }

  render() {
    const { details, clientMD } = this.props;

    if (!details || (details && details.length === 0)) {
      return <div className={styles.divider} />;
    }

    return (
      <div className={styles["vivid-detail"]}>
        <h2 className={styles.header}>Product Details</h2>
        {details.map((row, index) => {
          return index % 2 === 0 ? (
            <div key={index} className={styles.row}>
              {this.renderImage(row.image, clientMD.fakeDeviceWidth)}
              {this.renderText(row.title, row.content, clientMD.fakeDeviceWidth)}
            </div>
          ) : (
            <div key={index} className={styles.row}>
              {this.renderText(row.title, row.content, clientMD.fakeDeviceWidth)}
              {this.renderImage(row.image, clientMD.fakeDeviceWidth)}
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(VividDetail);
