import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderMenuDesktop.css";

class SpecialOffer extends Component {
  renderSpecialOffer(prop_list) {
    if (!prop_list) return null;
    const specialOffer_list = prop_list.map((item, index) => (
      <div
        className={styles.specialOffer_item}
        style={{ marginLeft: index === 0 ? "0px" : "" }}
        key={index}
      >
        <Link to={item.link ? item.link.path : null}>
          <div className={styles.specialOffer_img}>
            <img
              src={item.image_url ? item.image_url.md : null}
              alt={item.title}
              title={item.title}
              width={260}
              height={160}
            />
          </div>
        </Link>
        <div className={styles.specialOffer_text_container}>
          <div className={styles.specialOffer_text}>{item.text_over_image}</div>
        </div>
      </div>
    ));
    return (
      <div className={styles.specialOffer_container}>
        {" "}
        {specialOffer_list}
        {" "}
      </div>
    );
  }

  render() {
    const { prop } = this.props;
    if (!prop) return null;
    const { specialOffer } = prop;

    return (
      <div style={{ borderBottom: "1px solid #E0E0E0" }}>
        {this.renderSpecialOffer(specialOffer)}
      </div>
    );
  }
}

export default SpecialOffer;
