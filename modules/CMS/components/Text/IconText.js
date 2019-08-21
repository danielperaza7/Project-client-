import React, { Component } from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

export const IconTextInfo = {
  id: "iconText",
  description: "Normal text with icon at left",
  props: {
    text: {
      xl: "Some Text xl",
      lg: "Some Text lg",
      md: "Some Text md",
      sm: "Some Text sm",
      xs: "Some Text xs"
    },
    link: {
      path: "product/h123456",
      click: true,
      url: null
    }
  },
  responsive_styles: {
    xl: { fontSize: "50px" },
    lg: { fontSize: "40px" },
    md: { fontSize: "30px" },
    sm: { fontSize: "20px" },
    xs: { fontSize: "10px" }
  }
};

class IconText extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  renderIconText(child, onClick, inline_styles) {
    return (
      <div>
        <MediaQuery minWidth={992}>
          <div
            style={{ ...inline_styles, paddingTop: "35px", paddingLeft: "150px" }}
            onClick={onClick}
          >
            {child}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={769} maxWidth={991}>
          <div
            style={{ ...inline_styles, paddingTop: "15px", paddingLeft: "150px" }}
            onClick={onClick}
          >
            {child}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={551} maxWidth={768}>
          <div
            style={{
              ...inline_styles,
              paddingTop: "15px",
              float: "right",
              marginRight: "20px"
            }}
            onClick={onClick}
          >
            {child}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={550}>
          <div
            style={{
              ...inline_styles,
              paddingTop: "15px",
              float: "right",
              marginRight: "10px"
            }}
            onClick={onClick}
          >
            {child}
          </div>
        </MediaQuery>
      </div>
    );
  }

  render() {
    const {
      text,
      link,
      onClick,
      fakeDeviceWidth,
      inline_styles,
      icon,
      iconStyle
    } = this.props;
    console.log("IconText props", this.props);
    if (!text) {
      return null;
    }

    const widthConfigs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };

    const responsiveList = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      return (
        <MediaQuery
          minWidth={widthConfigs.min[key]}
          maxWidth={widthConfigs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          <i className={`${icon} ${iconStyle}`} style={{ marginRight: "10px" }} />
          {text[key]}
        </MediaQuery>
      );
    });

    return (
      <LinkWrapper {...link}>
        {this.renderIconText(responsiveList, onClick, inline_styles, icon, iconStyle)}
      </LinkWrapper>
    );
  }
}

export default IconText;
