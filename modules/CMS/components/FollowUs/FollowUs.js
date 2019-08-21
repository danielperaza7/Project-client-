import React, { Component } from "react";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import styles from "./FollowUs.css";

export const FollowUsInfo = {
  id: "FollowUs",
  description: "some social icons with customized background and border style",
  props: {
    Facebook: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "https://www.facebook.com/evebyeves/"
      }
    },
    Instagram: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "http://instagram.com/evebyeves"
      }
    },
    Pinterest: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "http://pinterest.com/evebyeves"
      }
    },
    Twitter: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "http://twitter.com/evebyeves"
      }
    },
    Youtube: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "https://www.youtube.com/channel/UCXQTY1RHiu4_f8Vj9qrmSsQ"
      }
    },
    Wechat: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "https://www.youtube.com/channel/UCXQTY1RHiu4_f8Vj9qrmSsQ"
      }
    },
    Weibo: {
      icon: true,
      link: {
        path: null,
        click: true,
        url: "https://www.youtube.com/channel/UCXQTY1RHiu4_f8Vj9qrmSsQ"
      }
    },
    border_radius: "50%",
    bg_height: "36px",
    bg_width: "36px",
    background: "#F2F2F2",
    border: "1px solid #F2F2F2"
  }
};

class FollowUs extends Component {
  constructor(props) {
    super(props);
    this.selectSocialIcon = this.selectSocialIcon.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  selectSocialIcon(key, icon_style) {
    switch (key) {
      case "Facebook":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "2px" }}>
              <i
                className={`ion-social-facebook ${styles["select-social-FBicon"]}`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "45%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      case "Instagram":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "2px" }}>
              <i
                className={`ion-social-instagram-outline ${
                  styles["select-social-INSicon"]
                }`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "33%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      case "Pinterest":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "2px" }}>
              <i
                className={`ion-social-pinterest ${styles["select-social-PTicon"]}`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "27%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      case "Twitter":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "2px" }}>
              <i
                className={`ion-social-twitter ${styles["select-social-TTicon"]}`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "26%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      case "Youtube":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "2px" }}>
              <i
                className={`ion-social-youtube ${styles["select-social-TYicon"]}`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "25%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      case "Wechat":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "5px" }}>
              <i
                className={`fa fa-weixin ${styles["select-social-WCicon"]}`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "23%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      case "Weibo":
        return (
          <LinkWrapper {...this.props[key].link}>
            <div style={{ ...icon_style, paddingTop: "5px" }}>
              <i
                className={`fa fa-weibo ${styles["select-social-WBicon"]}`}
                aria-hidden="true"
                style={{ fontSize: "20px", marginLeft: "25%", verticalAlign: "text-top" }}
              />
            </div>
          </LinkWrapper>
        );
      default:
        break;
    }

    return null;
  }

  render() {
    const icon_style = {
      borderRadius: this.props.border_radius,
      height: this.props.bg_height,
      width: this.props.bg_width,
      background: this.props.background,
      border: this.props.border,
      float: "left",
      marginLeft: "5px"
    };
    const responsive_list = [
      "Facebook",
      "Instragram",
      "Pinterest",
      "Twitter",
      "Youtube",
      "Wechat",
      "Weibo"
    ].map((key) => {
      return this.props[key].icon ? (
        <div key={key}>{this.selectSocialIcon(key, icon_style)}</div>
      ) : null;
    });

    return <div>{responsive_list}</div>;
  }
}

export default FollowUs;
