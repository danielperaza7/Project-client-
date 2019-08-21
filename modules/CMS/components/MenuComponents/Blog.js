import React, { Component } from "react";
import styles from "./HeaderMenuDesktop.css";

class Blog extends Component {
  renderBlogCard(prop) {
    if (!prop) return null;
    const { Blog_contents } = prop;
    const blog_list = ["1", "2", "3"].map(key => (
      <div
        key={key}
        className={styles.blog_card}
        style={{ marginLeft: key === "1" ? "0px" : "" }}
      >
        <div className={styles.blog_img}>
          <a href={Blog_contents[key].link ? Blog_contents[key].link.url : null}>
            <img
              src={
                Blog_contents[key].image_bg_url
                  ? Blog_contents[key].image_bg_url.md
                  : null
              }
              alt={Blog_contents[key].title}
              title={Blog_contents[key].title}
              width={240}
              height={120}
            />
          </a>
          <div className={styles.blog_details}>
            <div className={styles.blog_title}>{Blog_contents[key].content_title}</div>
            <div className={styles.blog_date}>{Blog_contents[key].content_time}</div>
            <div className={styles.details}>{Blog_contents[key].content_details}</div>
            <a href={Blog_contents[key].content_btn_link}>
              <div className={styles.content_btn_text}>
                {Blog_contents[key].content_btn_text}
              </div>
            </a>
          </div>
        </div>
      </div>
    ));

    return <div className={styles.blog_card_container}>{blog_list}</div>;
  }

  render() {
    const { prop } = this.props;
    if (!prop) return null;
    const { left_text, right_btn_text, right_btn_link } = prop;

    return (
      <div className={styles.blog_container}>
        <div style={{ maxWidth: "960px", position: "relative" }}>
          <div className={styles.blog_left_text}>{left_text}</div>
          <div className={styles.right_btn_text}>
            <a href={right_btn_link ? right_btn_link.url : null}>
              {" "}
              {right_btn_text}
            </a>
          </div>
        </div>
        {this.renderBlogCard(prop)}
      </div>
    );
  }
}

export default Blog;
