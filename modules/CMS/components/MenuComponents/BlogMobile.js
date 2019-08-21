import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./HeaderMenuMobile.css";
import { handleNavStatus } from "../../../App/AppActions";

export const BlogMobileInfo = {
  id: "blog_mobile",
  description: "blog component on mobile menu",
  props: {
    left_text: "Any related information can be put here",
    right_btn_text: "Visit The Blog",
    blog: {
      1: {
        image_bg_url: {
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
        text_over_image: "Beauty",
        content_title: "5 FALL NAIL TRENDS WE’RE EXCITED TO TRY",
        content_time: "AUGUST 30, 2017",
        content_details:
          "Fall is just around the corner and that means one thing:  and rich jewel tones.and that means one thing:  and rich jewel tones.",
        content_btn_text: "More Beauty Blog"
      },
      2: {
        image_bg_url: {
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
        text_over_image: "Beauty",
        content_title: "5 FALL NAIL TRENDS WE’RE EXCITED TO TRY",
        content_time: "AUGUST 30, 2017",
        content_details:
          "Fall is just around the corner and that means one thing: time to transition from bright, bold colors, to warm, crisp neutrals and rich jewel tones.",
        content_btn_text: "More Beauty Blog"
      },
      3: {
        image_bg_url: {
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
        text_over_image: "Beauty",
        content_title: "5 FALL NAIL TRENDS WE’RE EXCITED TO TRY",
        content_time: "AUGUST 30, 2017",
        content_details:
          "Fall is just around the corner and that means one thing: time to transition from bright, bold colors, to warm, crisp neutrals and rich jewel tones.",
        content_btn_text: "More Beauty Blog"
      }
    }
  },
  responsive: {
    xl: false,
    lg: false,
    md: false,
    sm: false,
    xs: true
  }
};

class BlogMobile extends Component {
  renderBlogCard(prop) {
    if (!prop) return null;
    const { Blog_contents, storeName } = prop;
    const blog = Blog_contents[`BLOG_${storeName}`];

    const blog_list = ["1", "2", "3"].map(key => (
      <div
        key={key}
        className={styles.blog_card}
        style={{ marginLeft: key === "1" ? "0px" : "" }}
      >
        <div className={styles.blog_img}>
          <a href={blog[key].link ? blog[key].link.url : null}>
            <img
              src={blog[key].image_bg_url ? blog[key].image_bg_url.xs : null}
              alt={blog[key].title}
              title={blog[key].title}
              width={230}
              height={115}
            />
          </a>
        </div>
        <div className={styles.blog_details}>
          <div style={{ width: "80%" }}>
            <div className={styles.blog_title}>{blog[key].content_title}</div>
            <div className={styles.blog_date}>{blog[key].content_time}</div>
          </div>
          <div
            style={{ paddingTop: "14px" }}
            onClick={() => this.props.dispatch(handleNavStatus(false))}
          >
            <a href={blog[key].content_btn_link ? blog[key].content_btn_link.url : null}>
              <i className={`ion-chevron-right ${styles["ion-chevron-right"]}`} />
            </a>
          </div>
        </div>
      </div>
    ));

    return <div className={styles.blog_card_container}>{blog_list}</div>;
  }

  render() {
    if (!this.props) return null;

    return <div className={styles.blog_container}>{this.renderBlogCard(this.props)}</div>;
  }
}

export default connect(null)(BlogMobile);
