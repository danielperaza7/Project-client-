import React, { Component } from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

// Normal text, like paragraph <p>
export const Text1Info = {
  id: "text_1",
  description: "Normal text without styling, like paragraph",
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
    },
    html_tag: "p" // h1-h6, p
  },
  responsive_styles: {
    xl: { fontSize: "50px" },
    lg: { fontSize: "40px" },
    md: { fontSize: "30px" },
    sm: { fontSize: "20px" },
    xs: { fontSize: "10px" }
  }
};

class Text1 extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  switch_HTML_Tag(html_tag, child, onClick, inline_styles) {
    switch (html_tag) {
      case "p":
        return (
          <p onClick={onClick} style={inline_styles || {}}>
            {child}
          </p>
        );
      case "h1":
        return (
          <h1 onClick={onClick} style={inline_styles || {}}>
            {child}
          </h1>
        );
      case "h2":
        return (
          <h2 onClick={onClick} style={inline_styles || {}}>
            {child}
          </h2>
        );
      case "h3":
        return (
          <h3 onClick={onClick} style={inline_styles || {}}>
            {child}
          </h3>
        );
      case "h4":
        return (
          <h4 onClick={onClick} style={inline_styles || {}}>
            {child}
          </h4>
        );
      case "h5":
        return (
          <h5 onClick={onClick} style={inline_styles || {}}>
            {child}
          </h5>
        );
      case "h6":
        return (
          <h6 onClick={onClick} style={inline_styles || {}}>
            {child}
          </h6>
        );
      default:
        return (
          <p onClick={onClick} style={inline_styles || {}}>
            {child}
          </p>
        );
    }
  }

  render() {
    const {
      text, link, html_tag, onClick, fakeDeviceWidth, inline_styles
    } = this.props;

    if (!text) {
      return null;
    }

    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };

    const responsive_list = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      return (
        <MediaQuery
          minWidth={width_configs.min[key]}
          maxWidth={width_configs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          {text[key]}
        </MediaQuery>
      );
    });

    return (
      <LinkWrapper {...link}>
        {this.switch_HTML_Tag(html_tag, responsive_list, onClick, inline_styles)}
      </LinkWrapper>
    );
  }
}

export default Text1;
