import React, { Component } from "react";
import { Link } from "react-router-dom";
import CMSBlock from "../../pages/CMS/CMSBlock";
import styles from "./HeaderMenuDesktop.css";

class NewArrivalsPanel extends Component {
  render() {
    const { prop, component } = this.props;
    if (!prop) return null;
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "80vw",
            maxWidth: "960px",
            position: "relative",
            margin: "10px auto"
          }}
        >
          <div className={styles.left_text}>{prop.right_text}</div>
          <Link to={prop.button_text_link ? prop.button_text_link.path : null}>
            <div className={styles.right_btn_text_news}>{prop.button_text}</div>
          </Link>
        </div>
        <div>
          <div className={styles.newArrives} />
          <div className={styles.new_container}>
            <CMSBlock
              cmsid={
                component.indexOf("et") !== -1
                  ? "NewArrivalCarousal_Desktop_et"
                  : "NewArrivalCarousal_Desktop_ebe"
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewArrivalsPanel;
