import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderMenuMobile.css";

export const SaleMobileInfo = {
  id: "sale_mobile",
  description: "sale component on mobile menu",
  props: {
    specialOffer: [
      {
        image_url: {
          xl:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
          lg:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
          md:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          sm:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          xs:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
        },
        link: {
          path: "product/h123456",
          click: true,
          url: null
        },
        description: "Eve by Eve's Skincare",
        title: "Eve by Eve's Skincare",
        text_over_image: "special offer 1"
      },
      {
        image_url: {
          xl:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
          lg:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
          md:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          sm:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          xs:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
        },
        link: {
          path: "product/h123456",
          click: true,
          url: null
        },
        description: "Eve by Eve's Skincare",
        title: "Eve by Eve's Skincare",
        text_over_image: "special offer 2"
      },
      {
        image_url: {
          xl:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
          lg:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
          md:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          sm:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          xs:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
        },
        link: {
          path: "product/h123456",
          click: true,
          url: null
        },
        description: "Eve by Eve's Skincare",
        title: "Eve by Eve's Skincare",
        text_over_image: "special offer 3"
      }
    ],
    hot_rows: [(0, 0)], // index of the row // index of the row
    new_rows: [(2, 3)] // index of the row // index of the row
  },
  responsive: {
    xl: false,
    lg: false,
    md: false,
    sm: false,
    xs: true
  }
};

class SaleMobile extends Component {
  renderSpecialOffer(prop_list) {
    if (!prop_list) return null;
    const specialOffer_list = prop_list.map((item, index) => (
      <div
        className={styles.specialOffer_item}
        style={{ marginLeft: index === 0 ? "0px" : "" }}
      >
        <Link to={item.link ? item.link.path : null}>
          <div className={styles.specialOffer_img}>
            <img
              src={item.image_url ? item.image_url.xs : null}
              alt={item.title}
              title={item.title}
              width={200}
              height={123}
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
    if (!this.props) return null;
    const { specialOffer } = this.props;

    return (
      <div>
        <div className={styles.title}>Special Offers</div>
        {this.renderSpecialOffer(specialOffer)}
      </div>
    );
  }
}

export default SaleMobile;
